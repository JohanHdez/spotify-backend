const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const rolesByUser = user.role;
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));
        if (!checkValueRol) {
            handleHttpError(res, "User not permissions", 403);
            return
        }
        next();
    } catch (error) {
        handleHttpError(res, "Error permissions", 403);
    }
}

module.exports = checkRol;