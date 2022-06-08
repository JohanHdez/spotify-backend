const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener la lista de base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async(req, res) => {
    try {
        const user = req.user;
        const data = await tracksModel.find({});
        res.send({data, user})
    } catch (error) {
        handleHttpError(res, 'Error en get items')
    }
};
/**
 * Obtener la el detalle de un item
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req;
        const data = await tracksModel.findById(id);
        res.send({data})
    } catch (error) {
        handleHttpError(res, "Error en get item")
    }
};
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({ data })
    } catch (error) {
        handleHttpError(res, 'Error en create item')
    }
};

const updateItem = async (req, res) => {
    try {
        const {id, ...body } = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(
            id, body
        );
        res.send({ data })
    } catch (error) {
        handleHttpError(res, 'Error en update item')
    }
};
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req;
        const data = await tracksModel.delete({_id:id});
        res.send({data})
    } catch (error) {
        handleHttpError(res, "Error en delete item")
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };