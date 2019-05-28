const express       = require('express');
const mongoose      = require('mongoose');
const connectDB     = require('./config/db');
var cors            = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
// DB Config

const db = require('./config/keys').mongoURI;

// Conncts to MongoDB through mongoose
connectDB();

// Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello World !');
})

// Define routes
app.use('/api/users', require('./routes/api/users.js'))
app.use('/api/auth', require('./routes/api/auth.js'))
app.use('/api/profile', require('./routes/api/profile.js'))
app.use('/api/posts', require('./routes/api/posts.js'))

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})