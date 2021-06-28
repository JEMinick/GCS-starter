// const express = require("express")
// const router = express.Router()
// const db = require("../models")
// const { Router } = require("express")

// router.get("/", (req, res) => {
//     res.render("index")
// })

// router.post("/", (req, res) => {
//     console.log( req.body );
//     res.render("index")
// })

// module.exports = router

// =============================================================================================

const sequelize = require('../config/connection');
const { User } = require('../models');
const router = require('express').Router();

router.get("/", (req, res) => {
    res.render("index")
})

router.post("/", (req, res) => {
    console.log( req.body );
    res.render("index")
})

module.exports = router;

// =============================================================================================
