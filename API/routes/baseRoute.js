const express = require("express");
const router = express.Router();

// Set the common part of the path for the routes in this router
const base = '/'

router.get(`${base}`,(req,res)=>{
    return res.status(200).json({
        api_status: 'working',
        success: true,
    })
});

module.exports = router;

