from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
# CORS configuration - Allows connections from everywhere
CORS(app, resources={r"/*": {"origins": "*"}})

# --- REUSABLE LOGIC FUNCTION ---
def process_tracking_data():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    data = request.json
    if not data:
        return jsonify({"status": "error", "message": "No data received"}), 400

    email = data.get('email', 'Unknown')
    mobile = data.get('mobile', 'Unknown')
    
    # Coordinates handling with safety defaults
    try:
        lat = float(data.get('lat', 0.0))
        lon = float(data.get('lon', 0.0))
        alt = float(data.get('alt', 0.0)) if data.get('alt') is not None else 0.0
    except (ValueError, TypeError):
        lat, lon, alt = 0.0, 0.0, 0.0

    # --- MATH LOGIC: DEGREES TO METERS ---
    R = 6371000 
    lat_rad = math.radians(lat)
    lon_rad = math.radians(lon)
    
    y_meters = lat_rad * R
    x_meters = lon_rad * R * math.cos(lat_rad)

    # --- OUTPUT TO RENDER LOGS ---
    print("\n" + "═"*45)
    print("         🚀 USER TRACKING DATA RECEIVED")
    print("═"*45)
    print(f"👤 USER    : {email}")
    print(f"📱 MOBILE  : {mobile}")
    print(f"📍 X-AXIS  : {x_meters:.2f} meters")
    print(f"📍 Y-AXIS  : {y_meters:.2f} meters")
    print(f"⛰️ ALTITUDE: {alt:.2f} meters")
    print("═"*45 + "\n")

    return jsonify({
        "status": "Success",
        "message": "3D Location Logged",
        "altitude": alt
    }), 200

# --- ROUTES ---

# 1. Main Login Route
@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    return process_tracking_data()

# 2. SAFETY NET: Handle hits to the root URL (Fixes Mobile 404)
@app.route('/', methods=['POST', 'OPTIONS'])
def home_redirect():
    # If mobile accidentally hits '/', it still runs the same logic
    return process_tracking_data()

if __name__ == '__main__':
    # Render requirements: host 0.0.0.0 and port 10000
    app.run(port=10000, host='0.0.0.0')
