
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');

const incidentRoutes = require('./Routes/incidents');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/trafficDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/incidents', incidentRoutes);

// Start server
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Socket.io setup
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('reportIncident', (data) => {
    io.emit('incidentReported', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
