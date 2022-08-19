const router = require('express').Router();
const courseRoutes = require('./userRoutes');
const studentRoutes = require('./thoughtRoutes');

router.use('/users', courseRoutes);
router.use('/thoughts', studentRoutes);

module.exports = router;