const obatModel = require('../models/obatModel');

const getAllObat = async (req, res) => {
    try {
        const obat = await obatModel.getAllObat();
        res.json({
            success: true,
            data: obat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting obat',
            error: error.message
        });
    }
};

const getObatById = async (req, res) => {
    try {
        const {id} = req.params;
        const obat = await obatModel.getObatById(id);

        if (!obat) {
            return res.status(404).json({
                success: false,
                message: 'Obat not found',
            });
        }
        res.json({
            success: true,
            data: obat
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting obat',
            error: error.message
        });
    }
};

const addObat = async (req, res) => {
    try {
        const {nama, kategori, dosis, harga, exp} = req.body;
        const obatId = await obatModel.addObat({nama, kategori, dosis, harga, exp});

        res.status(201).json({
            success: true,
            message: 'Obat suskses ditambahkan',
            data: (id = obatId, nama, kategori, dosis, harga, exp)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating obat',
            error: error.message
        });
    }
};

const updateObat = async (req, res) => {
    try {
        const {id} = req.params;
        const {nama, kategori, dosis, harga, exp} = req.body;

        // if (!nama || !kategori || !dosis || !harga || !exp) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'nama, kategori, dosis, harga, and exp are required',
        //     });
        // }

        const result = await obatModel.updateObat(id, {nama, kategori, dosis, harga, exp});

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Obat not found',
            });
        }

        res.json({
            success: true,
            message: 'Obat sukses diedit',
            data: (id, nama, kategori, dosis, harga, exp)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating obat',
            error: error.message
        });
    }
};

const deleteObat = async (req, res) => {
    try {
        const {id} = req.params;
        const affectedRows = await obatModel.deleteObat(id);

        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Obat not found',
            });
        }
        res.json({
            success: true,
            message: 'Obat dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting obat',
            error: error.message
        });
    }
};

module.exports = { 
    getAllObat,
    getObatById,
    addObat,
    updateObat,
    deleteObat
 };