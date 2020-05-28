const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const router = express.Router();
const upload = multer(uploadConfig);

const SessionControler = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/Dashboard');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

router.post('/sessions', SessionControler.store);
router.get('/spots', SpotController.index);
router.post('/spots', upload.single('thumbnail'), SpotController.store);
router.post('/spots/:spot_id/booking', BookingController.store);
router.get('/dashboard', DashboardController.show);
router.post('/bookings/:booking_id/approvals', ApprovalController.store);
router.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = router;