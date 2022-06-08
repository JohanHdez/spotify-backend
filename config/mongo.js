const mongoose = require("mongoose");

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, res) => {
        !err ? console.log('Conexion correcta') : console.log('Error de conexion', err);
    });
};

module.exports = dbConnect;