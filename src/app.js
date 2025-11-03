const express = require('express');
const obatRouter = require('../src/routes/obatRouter');
const authRouter = require('../src/routes/authRouter');
const app = express();
const PORT = 4000;
const log = require("./middleware/log");
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
require("dotenv").config();

app.use(express.json());
app.use(log);

app.get('/', (req, res) => {
    res.send('API Obat Berjalan!!!');
});

app.post('/tambah_obat', (req, res) => {
    const namaObat = req.body.nama_obat
    console.log("Menambahkan Obat: " + namaObat)
    res.json("Berhasil menambahkan Obat: " + namaObat)
});

app.use('/obat', obatRouter);

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`App port http://localhost:${PORT}`);
});

app.use(notFoundHandler);
app.use(errorHandler);
