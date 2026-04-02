export function getSubtopicKey(phaseTitle, subtopicTitle) {
  return `${phaseTitle}::${subtopicTitle}`;
}

export function getPlanSubtopics(plan) {
  return (plan?.weeklyPlan || []).flatMap((phase) => {
    const topics = phase.subtopics?.length ? phase.subtopics : [phase.focus];

    return topics.map((topic) => ({
      phase: phase.phase,
      topic,
      key: getSubtopicKey(phase.phase, topic),
      duration: phase.duration,
      focus: phase.focus,
      outcome: phase.outcome
    }));
  });
}

export function migrateLegacySubtopicProgress(plan, savedProgress = {}, savedPhaseProgress = {}) {
  const nextProgress = { ...savedProgress };

  (plan?.weeklyPlan || []).forEach((phase) => {
    if (!savedPhaseProgress?.[phase.phase]) return;

    const topics = phase.subtopics?.length ? phase.subtopics : [phase.focus];
    topics.forEach((topic) => {
      const key = getSubtopicKey(phase.phase, topic);
      if (!nextProgress[key]) {
        nextProgress[key] = 'done';
      }
    });
  });

  return nextProgress;
}

export function migrateLegacySubtopicTime(plan, savedTime = {}) {
  const nextTime = {};

  Object.entries(savedTime || {}).forEach(([key, value]) => {
    if (typeof value !== 'number') return;

    if (key.includes('::')) {
      nextTime[key] = value;
      return;
    }

    const phase = (plan?.weeklyPlan || []).find((item) => item.phase === key);
    if (!phase) return;

    const firstTopic = phase.subtopics?.[0] || phase.focus;
    nextTime[getSubtopicKey(phase.phase, firstTopic)] = value;
  });

  return nextTime;
}

export function computePlanAnalytics(plan, subtopicProgress = {}, subtopicTime = {}) {
  const entries = getPlanSubtopics(plan);
  const totalSubtopics = entries.length;
  const completedSubtopics = entries.filter((entry) => subtopicProgress[entry.key] === 'done').length;
  const continueLearningCount = entries.filter((entry) => subtopicProgress[entry.key] === 'continue').length;
  const totalSeconds = Object.values(subtopicTime).reduce(
    (sum, seconds) => sum + (typeof seconds === 'number' ? seconds : 0),
    0
  );

  const phaseBreakdown = (plan?.weeklyPlan || []).map((phase) => {
    const phaseTopics = phase.subtopics?.length ? phase.subtopics : [phase.focus];
    const doneCount = phaseTopics.filter(
      (topic) => subtopicProgress[getSubtopicKey(phase.phase, topic)] === 'done'
    ).length;

    return {
      phase: phase.phase,
      totalSubtopics: phaseTopics.length,
      completedSubtopics: doneCount,
      progressPercent: phaseTopics.length ? Math.round((doneCount / phaseTopics.length) * 100) : 0
    };
  });

  const nextFocus = entries.find((entry) => subtopicProgress[entry.key] !== 'done') || null;

  return {
    totalSubtopics,
    completedSubtopics,
    continueLearningCount,
    totalSeconds,
    progressPercent: totalSubtopics ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0,
    nextFocus,
    phaseBreakdown
  };
}
