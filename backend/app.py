"""
app.py — Flask API for the Network Build Study Guide.

Routes:
  GET  /api/health   — liveness check (useful for Docker/k8s health probes)
  GET  /api/tracks   — list available platform tracks (cisco, fortinet)
  POST /api/build    — accepts a track choice, returns the full study guide

Design decisions:
  - CORS is enabled for all origins in development. In production, restrict
    origins to your actual domain via the CORS_ORIGINS env var.
  - All content lives in frontend/src/networkData.json (loaded by data.py),
    shared with the React app so the two never drift.
  - No database. All state lives in the request/response cycle.

Note: the React app runs entirely client-side off networkData.json, so this
API is optional — it exists for programmatic access and parity.
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from data import TRACKS
from recommendations import build_recommendation, VALID_TRACKS

app = Flask(__name__)

# Allow the React dev server (localhost:5173) to call this API.
# In production, set CORS_ORIGINS to your actual frontend domain.
cors_origins = os.environ.get("CORS_ORIGINS", "*")
CORS(app, origins=cors_origins)


@app.route("/api/health")
def health():
    """Simple liveness check — returns 200 if the server is running."""
    return jsonify({"status": "ok"})


@app.route("/api/tracks")
def tracks():
    """Return the available platform tracks and their metadata."""
    return jsonify({"tracks": TRACKS})


@app.route("/api/build", methods=["POST"])
def build():
    """
    Accept a track choice and return the complete study guide.

    Request body (JSON):
      { "vendor": "cisco" | "fortinet" }

    Response (JSON):
      {
        "track":      "cisco" | "fortinet",
        "track_info": { name, tagline, gear, cert, description },
        "steps":      [ { id, order, title, icon, what, why, gear,
                          cli, verify, pitfalls, study } x 10 ],
        "sources":    [ { vendor, url, note } ... ],
        "inputs":     { vendor }
      }
    """
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Request body must be JSON."}), 400

    if "vendor" not in data:
        return jsonify({"error": "Missing required field: vendor"}), 400

    if data["vendor"] not in VALID_TRACKS:
        return jsonify({
            "error": "Invalid track.",
            "details": f"vendor must be one of: {VALID_TRACKS}",
        }), 400

    return jsonify(build_recommendation(vendor=data["vendor"]))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_DEBUG", "true").lower() == "true"
    app.run(debug=debug, port=port)
