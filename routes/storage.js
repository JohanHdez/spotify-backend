
const express = require("express");
const { createItem, getItems, getItem, deleteItem } = require("../controllers/storage");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItem } = require("../validators/storage");

/** Listar items */
router.get("/", getItems);
/** Seleccionar un item */
router.get("/:id", validatorGetItem, getItem);
/** Eliminar logicamente un item */
router.delete("/:id", validatorGetItem, deleteItem);
/** Crear un item */
router.post("/", uploadMiddleware.single("myFile"), createItem);


module.exports = router;