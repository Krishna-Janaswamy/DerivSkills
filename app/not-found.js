import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="detail-card">
        <p className="eyebrow">Role not found</p>
        <h1>This roadmap does not exist yet.</h1>
        <p className="hero-text">
          Go back to the role explorer and choose one of the available AI career
          paths.
        </p>
        <Link className="back-link" href="/">
          Back to roles
        </Link>
      </section>
    </main>
  );
}
