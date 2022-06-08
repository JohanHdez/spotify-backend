const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { usersModel}  = require("../models")

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "Not token", 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (!dataToken._id) {
            handleHttpError(res, "Error id token", 401);
            return;
        }

        const user = await usersModel.findById(dataToken._id);
        req.user = user;
        next()
    } catch (error) {
        handleHttpError(res, "Not session", 401)
    }
}


module.exports = authMiddleware;