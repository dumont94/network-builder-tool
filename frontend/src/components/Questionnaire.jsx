/**
 * Questionnaire.jsx — The entry screen.
 *
 * One decision drives the whole guide: which platform are you building on,
 * Cisco (IOS / IOS-XE) or Fortinet (FortiOS)? The rest of the tool is a
 * step-by-step, CLI-first walkthrough of standing up a network on that
 * platform, written to double as a study guide (CCNA / Fortinet NSE).
 *
 * To add a track: add an entry to TRACKS below and a matching "tracks" key
 * in networkData.json.
 */

import { useState } from "react";

// ── Option data ───────────────────────────────────────────────────

const TRACKS = [
  {
    id: "cisco",
    label: "Cisco",
    desc: "IOS / IOS-XE · Catalyst switches · ISR routers — the CCNA-track build",
  },
  {
    id: "fortinet",
    label: "Fortinet",
    desc: "FortiOS · FortiGate NGFW · FortiSwitch — the FortiGate-centric build",
  },
];

// ── Component ─────────────────────────────────────────────────────

export default function Questionnaire({ onSubmit, error }) {
  const [vendor, setVendor] = useState("cisco");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ vendor });
  }

  return (
    <div className="questionnaire">
      {/* ── Hero ── */}
      <div className="questionnaire__hero">
        <div className="questionnaire__eyebrow">Network Build Study Guide</div>
        <h1 className="questionnaire__title">Stand Up a Network, Phase by Phase</h1>
        <p className="questionnaire__subtitle">
          Pick a platform and walk the full build — management, VLANs, routing,
          NAT, firewall, HA, and VPN — with the real CLI, the commands to verify
          each phase, and the pitfalls that cost you points and uptime. Built as
          a study guide for network engineers.
        </p>
        <p className="questionnaire__byline">Built by Nigel Dumont</p>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="error-card" style={{ marginBottom: "var(--space-8)" }}>
          <div className="error-card__icon">⚠</div>
          <div className="error-card__title">Something went wrong</div>
          <div className="error-card__message">{error}</div>
        </div>
      )}

      <form className="questionnaire__form" onSubmit={handleSubmit}>

        {/* ── Q1: Platform / Track ── */}
        <div className="question-block">
          <div className="question-block__label">
            <span className="question-block__number">1</span>
            Platform
          </div>
          <div className="question-block__title">Which platform are you building on?</div>
          <div className="option-grid option-grid--2col">
            {TRACKS.map((t) => (
              <OptionCard
                key={t.id}
                label={t.label}
                desc={t.desc}
                selected={vendor === t.id}
                onClick={() => setVendor(t.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Scope note — not a question, a statement of what you get ── */}
        <div className="security-banner">
          <div className="security-banner__icon">🖧</div>
          <div>
            <div className="security-banner__title">Same 10 phases, either platform</div>
            <div className="security-banner__body">
              This walks a single-site build in real deployment order. Both tracks
              cover identical concepts — only the CLI and product names change — so
              you can compare Cisco IOS and FortiOS side by side by running it twice.
            </div>
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="questionnaire__submit">
          <button type="submit" className="btn btn--primary btn--lg btn--full">
            Start the Build →
          </button>
        </div>

      </form>
    </div>
  );
}

// ── OptionCard subcomponent ───────────────────────────────────────

function OptionCard({ label, desc, selected, onClick }) {
  const classes = [
    "option-card",
    selected ? "option-card--selected" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}>
      {selected && <span className="option-card__check" />}
      <div className="option-card__title">{label}</div>
      <div className="option-card__desc">{desc}</div>
    </div>
  );
}
