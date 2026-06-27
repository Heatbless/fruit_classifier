const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS if you plan to fetch the model from a different domain later
app.use(cors());

// Serve static files from the 'public' directory
// This exposes your index.html and your model files to the browser
app.use(express.static(path.join(__dirname, 'public')));

// Basic API route for health checking
app.get('/api/status', (req, res) => {
    res.json({ status: 'Server is running', modelLoaded: true });
});

// Fallback route: send index.html for any unknown requests
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`Serving model from http://localhost:${PORT}/public/combined_class/tfjs/model.json`);
});