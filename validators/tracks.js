const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorCreateItem = [
    check("name")
        .exists()
        .notEmpty()
        .isLength({min:5, max:90}),
    check("artist")
        .exists()
        .notEmpty()
        .isLength({min:5, max:90}), 
    check("artist.name")
        .exists()
        .notEmpty()
        .isLength({min:5, max:90}), 
    check("artist.nickname")
        .exists()
        .notEmpty()
        .isLength({min:5, max:90}),
    check("artist.nationality")
        .exists()
        .notEmpty(),
    check("duration.start")
        .exists()
        .notEmpty(),
    check("duration.end")
        .exists()
        .notEmpty(),
    check("mediaId")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req, res, next) => validateResults(req, res, next)                                     
]


const validatorGetItem = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req, res, next) => validateResults(req, res, next)                                     
]
module.exports = { validatorCreateItem, validatorGetItem };