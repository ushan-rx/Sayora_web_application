const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ["GET","POST"],
  credentials: true
})); 



app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

// Routes
const authRouter = require('./routes/authRoutes');


//use route
app.use('/api/v1/auth', authRouter);





const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

// Start the server
start();
