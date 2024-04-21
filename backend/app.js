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
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));



app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const authRouter = require('./routes/authRoutes');
const bookingRoute = require("./routes/booking.route.js");
const serviceRoute = require('./routes/serviceAdding.route.js');
const doctorRoute = require('./routes/doctor.route.js');
const patientRoute = require('./routes/patient.route.js');
const feedbackRoute = require('./routes/feedback.route.js');
const dailyQuestionsRoute = require('./routes/dailyquestions.route.js');
const daillyUpdateRoute = require('./routes/dailyupdate.route.js');
const requesition = require('./routes/requesition.route.js');
const PrescriptionRouter = require('./routes/prescription.route');
const treatmentHistory = require('./routes/treatmentHistory.route.js')
const reportRoute = require('./routes/report.route');

const productRouter = require('./routes/Product.route');

const supplierRouter = require('./routes/Supplier.route');
const itemRouter = require('./routes/Inventory_Item.route');
const orderRouter = require('./routes/Inventory_Order.route');

const appoinmentRouter = require('./routes/Appointment.route');
const doctorTimeRouter = require('./routes/DoctorTime.route'); //doctor times are available here.


const staffRoute = require('./routes/staff.route.js');
const tempUserRoute = require('./routes/tempUser.route.js');
const StaffLeavesRoute = require('./routes/staffLeaves.route.js');

const cashierRoutes = require('./routes/cashierRoutes.js')
const treatmentRoutes = require('./routes/treatment.js')


//use route
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/Booking_data", bookingRoute);
app.use('/api/v1/doctor', doctorRoute);
app.use('/api/v1/patient', patientRoute);
app.use('/api/v1/feedback', feedbackRoute);
app.use('/api/v1/dailyquestions', dailyQuestionsRoute);
app.use('/api/v1/dailyupdate', daillyUpdateRoute);
app.use('/api/v1/requesition', requesition);
app.use('/api/v1/serviceAdding', serviceRoute);
app.use('/api/v1/treatmentHistory', treatmentHistory)
app.use('/api/v1/report', reportRoute);
app.use('/api/v1/prescription', PrescriptionRouter);

app.use('/doctortime', doctorTimeRouter);

app.use(productRouter);

app.use(supplierRouter);
app.use(itemRouter);
app.use('/Inventory', orderRouter);

app.use(appoinmentRouter);
app.use('/doctortime', doctorTimeRouter);
app.use('/cashier', cashierRoutes);
app.use('/treatment', treatmentRoutes);

app.use('/api/v1/staff', staffRoute);
app.use('/staff/leaves', StaffLeavesRoute);
app.use('/api/v1/add-user', tempUserRoute);

// app.use('/api/v1/Email_data', emailRouter);

const NotFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

// Start the server
start();