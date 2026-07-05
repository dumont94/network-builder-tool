/**
 * StepCard.jsx — Renders a single build phase as a study-guide entry.
 *
 * Sections, color-coded so a reader can scan quickly:
 *   Blue   — Concept (what this phase is)
 *   Amber  — Where it fits in the build (why it matters)
 *   Purple — Configuration (the vendor CLI, in a monospace code block)
 *   Green  — Verify it works (show / get / diagnose commands)
 *   Red    — Common pitfalls (the mistakes that break it)
 *   Gray   — Study notes (cert-relevant context: CCNA / Fortinet NSE)
 *
 * CLI arrays render as code blocks. Lines beginning with "!" (Cisco) or
 * "#" (annotation) are treated as comments and dimmed.
 */

export default function StepCard({ step, total }) {
  return (
    <div className="step-card">

      {/* ── Header ── */}
      <div className="step-card__header">
        <span className="step-card__num">Phase {step.order} of {total}</span>
        <h2 className="step-card__title">{step.title}</h2>
      </div>

      {/* ── Concept ── */}
      <Section modifier="what" icon="●" title="Concept">
        <p className="section__text">{step.what}</p>
      </Section>

      {/* ── Where it fits ── */}
      <Section modifier="why" icon="◆" title="Where It Fits in the Build">
        <p className="section__text">{step.why}</p>
      </Section>

      {/* ── Configuration (CLI) ── */}
      <Section modifier="config" icon="#" title="Configuration">
        {step.gear && <div className="cli-gear">{step.gear}</div>}
        <CodeBlock lines={step.cli} />
      </Section>

      {/* ── Verify ── */}
      <Section modifier="products" icon="✓" title="Verify It Works">
        <CodeBlock lines={step.verify} />
      </Section>

      {/* ── Common pitfalls ── */}
      <Section modifier="patch" icon="⚠" title="Common Pitfalls">
        <ul className="pitfall-list">
          {step.pitfalls.map((p, i) => (
            <li key={i} className="pitfall-item">{p}</li>
          ))}
        </ul>
      </Section>

      {/* ── Study notes ── */}
      <Section modifier="alts" icon="✱" title="Study Notes">
        <p className="section__text">{step.study}</p>
      </Section>

    </div>
  );
}

// ── Section wrapper subcomponent ─────────────────────────────────

function Section({ modifier, icon, title, children }) {
  return (
    <div className={`section section--${modifier}`}>
      <div className="section__header">
        <div className="section__icon">{icon}</div>
        <div className="section__title">{title}</div>
      </div>
      <div className="section__body">
        {children}
      </div>
    </div>
  );
}

// ── CodeBlock subcomponent ───────────────────────────────────────
// Renders an array of CLI lines. Comment lines (starting with ! or #)
// are dimmed so the actual commands stand out.

function CodeBlock({ lines }) {
  if (!lines || lines.length === 0) return null;
  return (
    <pre className="cli-block">
      {lines.map((line, i) => {
        const trimmed = line.trimStart();
        const isComment = trimmed.startsWith("!") || trimmed.startsWith("#");
        return (
          <span
            key={i}
            className={`cli-line${isComment ? " cli-line--comment" : ""}`}
          >
            {line || " "}
          </span>
        );
      })}
    </pre>
  );
}
