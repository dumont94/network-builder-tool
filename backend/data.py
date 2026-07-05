"""
data.py — Loads the network study-guide dataset.

The canonical content lives in frontend/src/networkData.json so the React app
(which imports it directly) and this Flask API never drift apart. This module
just reads that file and exposes the pieces the API needs.

Dataset shape:
  tracks  — { cisco: {...}, fortinet: {...} }  platform metadata
  steps   — 10 build phases, each with per-track cli/verify/pitfalls/study
  sources — vendor doc + study links
"""

import json
import os

# frontend/src/networkData.json, relative to this file (backend/).
_DATA_PATH = os.path.join(
    os.path.dirname(__file__), "..", "frontend", "src", "networkData.json"
)

with open(_DATA_PATH, encoding="utf-8") as f:
    _DATA = json.load(f)

TRACKS = _DATA["tracks"]
BUILD_STEPS = _DATA["steps"]
SOURCES = _DATA["sources"]
