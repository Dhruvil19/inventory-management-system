const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.send('User List');
});

// Export the router
module.exports = router;
