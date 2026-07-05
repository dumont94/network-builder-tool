"""
recommendations.py — Assembles the study-guide payload for a chosen track.

The tool takes a single input: the vendor track (cisco | fortinet). This module
flattens each build phase down to the selected track's guidance so the API
response never exposes the nested tracks structure. Mirrors the client-side
logic in frontend/src/recommendations.js.
"""

from data import TRACKS, BUILD_STEPS, SOURCES

# Valid values — used for input validation in app.py
VALID_TRACKS = list(TRACKS.keys())  # ["cisco", "fortinet"]


def build_recommendation(vendor: str) -> dict:
    """Assemble a complete study-guide payload for the frontend/API.

    Returns a dict containing:
      track       — the selected track ID
      track_info  — metadata about that track (name, tagline, gear, cert, desc)
      steps       — 10 build phases with the track-specific cli/verify/etc.
      sources     — vendor doc + study links
    """
    track_info = TRACKS[vendor]

    steps = []
    for step in BUILD_STEPS:
        track_step = step["tracks"][vendor]
        steps.append({
            "id": step["id"],
            "order": step["order"],
            "title": step["title"],
            "icon": step["icon"],
            "what": step["what"],
            "why": step["why"],
            "gear": track_step["gear"],
            "cli": track_step["cli"],
            "verify": track_step["verify"],
            "pitfalls": track_step["pitfalls"],
            "study": track_step["study"],
        })

    return {
        "track": vendor,
        "track_info": track_info,
        "steps": steps,
        "sources": SOURCES,
        "inputs": {"vendor": vendor},
    }
