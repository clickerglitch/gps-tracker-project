import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // High accuracy is vital for getting Altitude (Z-axis)
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const payload = {
        email: email,
        mobile: mobile,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        alt: position.coords.altitude // Capturing height/altitude
      };

      try {
        
const response = await axios.post('https://gps-backend-cg96.onrender.com/login', payload);
        alert("Login successful! Check your VS Code terminal for the meters.");
        console.log("Server Response:", response.data);
      } catch (error) {
        console.error("Connection Error:", error);
        alert("Make sure your Python server (app.py) is running!");
      }
    }, (error) => {
      alert("Error: Please enable Location/GPS permissions.");
    }, geoOptions);
  };

  // Simple Styling
  const styles = {
    container: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', fontFamily: 'Arial' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', width: '300px' },
    input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
    button: { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <h2>GPS Tracker Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input 
          style={styles.input} type="email" placeholder="Email ID" 
          onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          style={styles.input} type="text" placeholder="Mobile Number" 
          onChange={(e) => setMobile(e.target.value)} required 
        />
        <button type="submit" style={styles.button}>Login & Track</button>
      </form>
    </div>
  );
}


export default App;



