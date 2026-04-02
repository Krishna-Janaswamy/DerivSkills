'use client';

import Link from 'next/link';
import { useState } from 'react';

export function RoleTabs({ roles }) {
  const [activeRoleId, setActiveRoleId] = useState(roles[0]?.id);
  const activeRole = roles.find((role) => role.id === activeRoleId) ?? roles[0];

  return (
    <section className="tabs-shell">
      <div className="role-tabs" role="tablist" aria-label="AI roles">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            role="tab"
            aria-selected={activeRole.id === role.id}
            className={`role-tab ${activeRole.id === role.id ? 'is-active' : ''}`}
            onClick={() => setActiveRoleId(role.id)}
          >
            <span>{role.title}</span>
            <small>{role.goalWindow}</small>
          </button>
        ))}
      </div>

      <article className="tab-panel" role="tabpanel" aria-label={activeRole.title}>
        <div className="tab-panel-copy">
          <p className="eyebrow">Selected Role</p>
          <h2>{activeRole.title}</h2>
          <p className="hero-text">{activeRole.summary}</p>

          <div className="tab-points">
            <div>
              <span>Market demand</span>
              <strong>{activeRole.marketDemand}</strong>
            </div>
            <div>
              <span>Estimated timeline</span>
              <strong>{activeRole.goalWindow}</strong>
            </div>
            <div>
              <span>Hiring emphasis</span>
              <strong>{activeRole.salaryBand}</strong>
            </div>
          </div>
        </div>

        <div className="tab-panel-preview">
          <p className="eyebrow">Track Preview</p>
          <div className="preview-nodes">
            {activeRole.roadmap.slice(0, 4).map((module, index) => (
              <div className="preview-node" key={module.title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{module.title}</strong>
                  <p>{module.duration}</p>
                </div>
              </div>
            ))}
          </div>

          <Link className="role-link" href={`/tracks/${activeRole.id}`}>
            View complete track
          </Link>
        </div>
      </article>
    </section>
  );
}
