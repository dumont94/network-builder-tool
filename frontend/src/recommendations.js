/**
 * recommendations.js — Assembles the build payload for a chosen track.
 *
 * The tool has a single input: the vendor track (cisco | fortinet). This
 * module reads the pre-built networkData.json and flattens each build step
 * down to the selected track's guidance so the UI never has to know about
 * the nested tracks structure.
 */

import networkData from "./networkData.json";

const { tracks, steps, sources } = networkData;

export const VALID_TRACKS = Object.keys(tracks); // ["cisco", "fortinet"]

export function buildRecommendation({ vendor }) {
  const trackInfo = tracks[vendor];
  if (!trackInfo) {
    throw new Error(`Unknown track: ${vendor}. Choose one of: ${VALID_TRACKS.join(", ")}`);
  }

  const flatSteps = steps.map((step) => {
    const t = step.tracks[vendor];
    return {
      id: step.id,
      order: step.order,
      title: step.title,
      icon: step.icon,
      what: step.what,
      why: step.why,
      gear: t.gear,
      cli: t.cli,
      verify: t.verify,
      pitfalls: t.pitfalls,
      study: t.study,
    };
  });

  return {
    track: vendor,
    track_info: trackInfo,
    steps: flatSteps,
    sources,
    inputs: { vendor },
  };
}
