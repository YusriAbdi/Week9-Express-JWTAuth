const validateObat = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body is required. Please provide nama, kategori, dosis, harga, and exp"
        });
    }

    const {nama, kategori, dosis, harga, exp} = req.body;
    if (!nama || !kategori || !dosis || !harga || !exp) {
        return res.status(400).json({
            message: "nama, kategori, dosis, harga, and exp are required"
        });
    }
    next();
};

module.exports = validateObat;