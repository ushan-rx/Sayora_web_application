const express = require('express');
const router = express.Router();

const { getAllDoctors,
     createDoctor,

    } = require('../controllers/doctor.controller');

router.route('/').post(createDoctor).get(getAllDoctors);      // '/doctor'


// // GET a single doctor
// router.get('/:id', getDoctor, (req, res) => {                // '/doctor/:id'
    
//     res.json(res.doctor);
// });

// // CREATE a new doctor
// router.post('/', async (req, res) => {
//   const doctor = new Doctor({
//     name: req.body.name,
//     specialization: req.body.specialization,
//     // Add other doctor properties here
//   });

//   try {
//     const newDoctor = await doctor.save();
//     res.status(201).json(newDoctor);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // UPDATE a doctor
// router.patch('/:id', getDoctor, async (req, res) => {
//   if (req.body.name != null) {
//     res.doctor.name = req.body.name;
//   }
//   if (req.body.specialization != null) {
//     res.doctor.specialization = req.body.specialization;
//   }
//   // Update other doctor properties here

//   try {
//     const updatedDoctor = await res.doctor.save();
//     res.json(updatedDoctor);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // DELETE a doctor
// router.delete('/:id', getDoctor, async (req, res) => {
//   try {
//     await res.doctor.remove();
//     res.json({ message: 'Doctor deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Middleware function to get a single doctor by ID
// async function getDoctor(req, res, next) {
//   let doctor;
//   try {
//     doctor = await Doctor.findById(req.params.id);
//     if (doctor == null) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

//   res.doctor = doctor;
//   next();
// }

module.exports = router;
