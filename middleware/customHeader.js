const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key;
        if(apiKey === 'Johan-123') {
            next();
        } else {
            res.status(403);
            res.send({ error: "El Api key no es correcta"})
        }
    } catch (error) {
        res.status(403);
        res.send({ error: "Ocurrio un error en el custom header"})
    }
}

module.exports = customHeader;