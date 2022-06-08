const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleJWT");
const { usersModel } = require("../models");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */

const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password};
        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, {strict:false });
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({data});
    } catch (error) {
        handleHttpError(res, 'Error register user');
    }
}

/**
 * Este controlador es el encargado de logear una persona
 * @param {} req 
 * @param {*} res 
 */

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email})
                                    .select('password name role email',);
        if (!user) {
            handleHttpError(res, 'User not exists', 404);
            return
        }
        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);
        if (!check) {
            handleHttpError(res, 'password invalid', 401);
            return
        }
        user.set('password', undefined, {strict: false});
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data});

    } catch (error) {
        handleHttpError(res, 'Error login user');
    }
}

module.exports = { loginCtrl, registerCtrl };