const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Tbox router works!");
});

module.exports = router;
