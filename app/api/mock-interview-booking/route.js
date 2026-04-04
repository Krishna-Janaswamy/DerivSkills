import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import nodemailer from 'nodemailer';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BOOKING_RECIPIENTS = [
  'izanaminozomi@gmail.com',
  'pavankumarparitala@gmail.com',
];

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function buildEmailTemplate(payload) {
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const subject = `Mock Interview Booking Request - ${payload.fullName || 'Candidate'} - ${payload.targetRole || 'Role Pending'}`;
  const body = [
    'Hello Krishna,',
    '',
    'A new mock interview booking request has been submitted through DerivSkills.',
    '',
    'Candidate Details',
    `Name: ${payload.fullName || 'Not provided'}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Current Role / Status: ${payload.currentRole || 'Not provided'}`,
    `Company / College: ${payload.organization || 'Not provided'}`,
    '',
    'Interview Request',
    `Target Role: ${payload.targetRole || 'Not provided'}`,
    `Interview Type: ${payload.interviewTypeLabel || 'Not provided'}`,
    `Seniority Level: ${payload.seniorityLabel || 'Not provided'}`,
    `Preferred Timeline: ${payload.preferredTimelineLabel || 'Not provided'}`,
    '',
    'Candidate Context',
    payload.notes || 'No additional notes provided.',
    '',
    'Prepared Summary',
    payload.requestPreview || 'No summary generated.',
    '',
    `Submitted At: ${submittedAt}`,
    '',
    'Please review this request and coordinate the mock interview schedule.',
    '',
    'Regards,',
    'DerivSkills',
  ].join('\n');

  return { subject, body };
}

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error('SMTP configuration is incomplete.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function getEmailErrorMessage(error) {
  if (!(error instanceof Error)) {
    return 'The booking was saved, but the notification email could not be sent.';
  }

  if (error.message === 'SMTP configuration is incomplete.') {
    return 'The booking was saved, but SMTP is not configured yet. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM to enable notification emails.';
  }

  const smtpCode = error && typeof error === 'object' ? error.code : undefined;

  if (smtpCode === 'EAUTH') {
    return 'The booking was saved, but the mail server rejected the SMTP login. Please check SMTP_USER and SMTP_PASS.';
  }

  if (smtpCode === 'ECONNECTION' || smtpCode === 'ESOCKET') {
    return 'The booking was saved, but the app could not reach the mail server. Please check SMTP_HOST, SMTP_PORT, and network access.';
  }

  return 'The booking was saved, but the notification email could not be sent.';
}

export async function POST(request) {
  try {
    const body = await request.json();
    const session = await getServerSession(authOptions);

    const payload = {
      fullName: normalizeText(body.fullName),
      email: normalizeText(body.email),
      currentRole: normalizeText(body.currentRole),
      organization: normalizeText(body.organization),
      targetRole: normalizeText(body.targetRole),
      interviewType: normalizeText(body.interviewType),
      interviewTypeLabel: normalizeText(body.interviewTypeLabel || body.interviewType),
      seniority: normalizeText(body.seniority),
      seniorityLabel: normalizeText(body.seniorityLabel || body.seniority),
      preferredTimeline: normalizeText(body.preferredTimeline),
      preferredTimelineLabel: normalizeText(body.preferredTimelineLabel || body.preferredTimeline),
      notes: normalizeText(body.notes),
      requestPreview: normalizeText(body.requestPreview),
    };

    if (!payload.fullName || !payload.email || !payload.targetRole) {
      return NextResponse.json(
        { error: 'Name, email, and target role are required.' },
        { status: 400 }
      );
    }

    const { subject, body: emailBody } = buildEmailTemplate(payload);

    const booking = await prisma.mockInterviewBooking.create({
      data: {
        userId: session?.user?.id || null,
        fullName: payload.fullName,
        email: payload.email,
        currentRole: payload.currentRole || null,
        organization: payload.organization || null,
        targetRole: payload.targetRole,
        interviewType: payload.interviewType,
        interviewTypeLabel: payload.interviewTypeLabel,
        seniority: payload.seniority,
        seniorityLabel: payload.seniorityLabel,
        preferredTimeline: payload.preferredTimeline,
        preferredTimelineLabel: payload.preferredTimelineLabel,
        notes: payload.notes || null,
        requestPreview: payload.requestPreview || null,
        notificationRecipient: BOOKING_RECIPIENTS.join(', '),
        notificationSubject: subject,
      },
    });

    let notificationSent = false;
    let warning = '';

    try {
      const smtpFrom = process.env.SMTP_FROM || process.env.SMTP_USER;

      if (!smtpFrom) {
        throw new Error('SMTP configuration is incomplete.');
      }

      const transport = getMailTransport();

      await transport.sendMail({
        from: smtpFrom,
        to: BOOKING_RECIPIENTS.join(', '),
        replyTo: payload.email,
        subject,
        text: emailBody,
      });

      notificationSent = true;

      await prisma.mockInterviewBooking.update({
        where: { id: booking.id },
        data: {
          notificationSent: true,
          notificationSentAt: new Date(),
          notificationError: null,
        },
      });
    } catch (emailError) {
      warning = getEmailErrorMessage(emailError);

      await prisma.mockInterviewBooking.update({
        where: { id: booking.id },
        data: {
          notificationSent: false,
          notificationError: warning,
        },
      });

      console.error('Mock Interview Email Notification Error:', emailError);
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      recipient: BOOKING_RECIPIENTS.join(', '),
      notificationSent,
      warning,
      message: notificationSent
        ? `Mock interview request saved and notification sent to ${BOOKING_RECIPIENTS.join(', ')}.`
        : 'Mock interview request saved successfully.',
    });
  } catch (error) {
    console.error('Mock Interview Booking Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2021' || error.code === 'P2022') {
        return NextResponse.json(
          {
            error: 'Mock interview bookings are not initialized in the database yet. Run `npx prisma db push` and restart the app, then try again.',
          },
          { status: 500 }
        );
      }
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          error: 'The app could not connect to the database. Please check DATABASE_URL and ensure the database is reachable.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save the mock interview booking request.' },
      { status: 500 }
    );
  }
}
