const express = require('express');
const { client, connectDB, closeDB } = require('./config/db');
const bcrypt = require('bcrypt');
const { registerUser, loginUser } = require('./controllers/userController');
const { addTask, getTasks, updateTask } = require('./controllers/taskController');
const authenticateToken = require('./middlewares/authenticateToken'); // Middleware to protect routes

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// User registeration and login Routes
app.post('/register', registerUser);
app.post('/login', loginUser);

// Task routes
app.get('/tasks', authenticateToken, getTasks) // Get all user tasks
app.post('/tasks', authenticateToken, addTask); // Create new task
app.patch('/tasks/:id', authenticateToken, updateTask); // New route for updating tasks






// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
// handle closing the database connection
process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});