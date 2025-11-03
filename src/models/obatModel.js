const  db = require('../config/db');

const getAllObat = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM obat');
        return rows;
    } catch (error) {
        console.error('Error in getAllObat model: ', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const getObatById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM obat WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error in getObatById model: ', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const addObat = async (dataObat) => {
    try {
        const {nama, kategori, dosis, harga, exp} = dataObat;
        const [result] = await db.query(
            'INSERT INTO obat (nama, kategori, dosis, harga, exp) VALUES (?, ?, ?, ?, ?)',
            [nama, kategori, dosis, harga, exp]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error in addObat model: ', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const updateObat = async (id, dataObat) => {
    try {
        const {nama, kategori, dosis, harga, exp} = dataObat;
        const [result] = await db.query(
            'UPDATE obat SET nama = ?, kategori = ?, dosis = ?, harga = ?, exp = ? WHERE id = ?',
            [nama, kategori, dosis, harga, exp, id]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error in updateObat model: ', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const deleteObat = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM obat WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error in deleteObat model: ', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

module.exports = { 
    getAllObat,
    getObatById,
    addObat,
    updateObat,
    deleteObat
 };