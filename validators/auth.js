const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");


const validatorRegister = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({min: 3, max: 90}),
    check("age")
        .exists()
        .notEmpty()
        .isNumeric(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 3, max: 15}),
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),            
    (req, res, next) => validateResults(req, res, next)                                     
]


const validatorLogin = [
    check("email")
        .exists()
        .notEmpty()
        .isEmail(),
    check("password")
        .exists()
        .notEmpty()
        .isLength({min: 3, max: 15}),            
    (req, res, next) => validateResults(req, res, next)                                     
]

module.exports = { validatorRegister, validatorLogin };