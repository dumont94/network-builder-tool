/**
 * Summary.jsx — The final recap screen.
 *
 * Shows:
 *   1. Track card — chosen platform, tagline, gear, cert focus, phase count
 *   2. Network diagram — the topology for this track
 *   3. Command cheat-sheet — every phase and the command to verify it
 *   4. Doc / study links
 *   5. Actions — start over or jump back to a specific phase
 */

import NetworkDiagram from "./NetworkDiagram.jsx";

export default function Summary({ recommendation, onReset, onReviewStep }) {
  const { track, track_info, steps, sources } = recommendation;

  return (
    <div className="summary">

      {/* ── 1. Track overview ── */}
      <div className="summary__path-card">
        <div className="summary__path-badge">Your build track</div>
        <h1 className="summary__path-name">{track_info.name}</h1>
        <p className="summary__path-tagline">{track_info.tagline}</p>

        <div className="summary__costs">
          <div className="cost-card">
            <div className="cost-card__label">Platform</div>
            <div className="cost-card__value" style={{ fontSize: "13px", color: "var(--text)", lineHeight: 1.5 }}>
              {track_info.gear}
            </div>
          </div>
          <div className="cost-card">
            <div className="cost-card__label">Cert Focus</div>
            <div className="cost-card__value" style={{ fontSize: "13px", color: "var(--text)", lineHeight: 1.5 }}>
              {track_info.cert}
            </div>
          </div>
          <div className="cost-card">
            <div className="cost-card__label">Phases</div>
            <div className="cost-card__value">{steps.length}</div>
          </div>
        </div>

        <p className="summary__path-desc">{track_info.description}</p>
      </div>

      {/* ── 2. Network diagram ── */}
      <NetworkDiagram track={track} />

      {/* ── 3. Command cheat-sheet ── */}
      <div>
        <h2 className="summary__section-title">Command Cheat-Sheet</h2>
        <table className="stack-table">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Where it applies</th>
              <th>Verify with</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step) => (
              <tr
                key={step.id}
                style={{ cursor: "pointer" }}
                onClick={() => onReviewStep(step.order - 1)}
                title={`Click to review Phase ${step.order}: ${step.title}`}
              >
                <td className="stack-table__step">{step.order}. {step.title}</td>
                <td className="stack-table__product">{step.gear}</td>
                <td className="stack-table__price">{step.verify[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ fontSize: "12px", color: "var(--text-dim)", marginTop: "var(--space-3)", fontFamily: "var(--mono)" }}>
          ↑ Click any row to jump back to that phase's full CLI and notes
        </p>
      </div>

      {/* ── 4. Study reminder ── */}
      <div className="pricing-note">
        <span className="pricing-note__icon">📖</span>
        <span>
          Commands target current IOS-XE and FortiOS syntax and are written for a
          single-site lab. Model, version, and licensing differences apply —
          always confirm against the vendor docs below, and lab it in a simulator
          before production.
        </span>
      </div>

      {/* ── 5. Sources ── */}
      <div>
        <h2 className="summary__section-title">Docs & Study Resources</h2>
        <div className="sources-grid">
          {sources.map((source) => (
            <a
              key={source.vendor}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="source-card"
            >
              <div className="source-card__vendor">{source.vendor}</div>
              <div className="source-card__url">{source.url}</div>
              <div className="source-card__note">{source.note}</div>
            </a>
          ))}
        </div>
      </div>

      {/* ── 6. Actions ── */}
      <div className="summary__actions">
        <button className="btn btn--ghost" onClick={() => onReviewStep(0)}>
          ← Review Phases
        </button>
        <button className="btn btn--secondary" onClick={onReset}>
          Switch Track
        </button>
      </div>

    </div>
  );
}
