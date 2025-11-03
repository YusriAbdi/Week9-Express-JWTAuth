# Express dengan JWT Auth
Nama: [Yusri Abdi]
NIM: [F1D02310098]

## Ringkasan Proyek
Proyek ini mengimplementasikan REST API sederhana menggunakan Node.js dengan framework Express.js yang dilengkapi fitur JWT (JSON Web Token) Authentication. Proyek menyediakan sistem autentikasi berupa pendaftaran (register) dan masuk (login) untuk menghasilkan token JWT yang digunakan sebagai akses terproteksi ke endpoint tertentu. Struktur aplikasi menerapkan pola Model-View-Controller (MVC) agar lebih modular dan mudah dikembangkan.

## Struktur Folder Proyek
Struktur folder mengadopsi pola MVC (Model, Controller, Routes) yang dipadukan dengan folder untuk Config dan Middleware. 

<img width="259" height="818" alt="Screenshot 2025-11-03 120921" src="https://github.com/user-attachments/assets/7c3125ae-1374-4e68-a71a-eddfe9c9d4f0" />

## Database
Saya menggunakan database MySQL dengan nama week6-express-db dan dua tabel bernama obat dan users.

<img width="1920" height="1080" alt="Database user" src="https://github.com/user-attachments/assets/39dea05c-a533-4c03-974e-3f666c4b794b" />

## Penjelasan Kode Utama
Berikut adalah penjelasan singkat untuk setiap file berdasarkan kode yang Anda berikan:
1. **config/db.js**: Menghubungkan aplikasi ke database MySQL menggunakan mysql2/promise dengan konfigurasi yang diambil dari .env. Ini memastikan informasi sensitif terpisah dari kode.

2. **models/obatModel.js**: Bertanggung jawab untuk semua interaksi database (CRUD). Fungsi-fungsi di sini mengeksekusi query SQL murni, seperti getAllObat, addObat, updateObat, dan deleteObat.

3. **controllers/obatController.js**: Mengandung logika bisnis dan menangani request dari client (mengambil data dari req.params atau req.body) dan mengirimkan response JSON. Ia memanggil fungsi dari obatModel dan menangani error dasar (misalnya, data tidak ditemukan).

4. **routes/obatRoutes.js**: Mendefinisikan semua endpoint CRUD untuk resource /api/produk dan mengarahkan request ke controller yang sesuai.
    GET /: getAllObat (Mengambil semua data produk)
    GET /:id: getObatById (Mengambil data produk berdasarkan ID)
    POST /: validateObat, createProduct (Menambahkan produk baru)
    PUT /:id: validateObat, updateProduct (Memperbarui data produk berdasarkan ID)
    DELETE /:id: deleteObat (Menghapus produk berdasarkan ID)

5. **middleware/logger.js**: Middleware sederhana untuk mencatat metode HTTP (req.method) dan URL (req.url) dari setiap request yang masuk ke server.

6. **middleware/validateObat.js**: Middleware validasi input. Ini memastikan field wajib (nama, kategori, dosis, harga, exp) tidak kosong sebelum request dilanjutkan ke controller. Jika ada yang kosong, ia akan mengembalikan response HTTP 400 Bad Request.

7. **middleware/errorHandler.js**: Middleware penanganan error. Jika ada error yang tidak tertangkap (HTTP 500), middleware ini akan mencatat error tersebut di konsol server dan mengirimkan response JSON ke client dengan pesan error umum.

8. **app.js** File entry point. Menginisialisasi Express, mendaftarkan middleware global (express.json(), logger, errorHandler), dan mengaitkan route (/api/produk) ke router produk.

9. **authController**: komponen yang menangani proses autentikasi pengguna dalam aplikasi. Biasanya berisi fungsi seperti register (daftar) dan login. Tujuannya adalah mengelola proses validasi, enkripsi password, verifikasi kredensial, serta pembuatan token JWT.

10. **authMiddleware**: Berfungsi memeriksa dan memverifikasi token JWT pada header Authorization untuk memastikan hanya pengguna yang sah dapat mengakses endpoint tertentu; jika token valid, proses dilanjutkan, sedangkan token tidak ada atau tidak valid akan ditolak.

11. **authRouter**: Bertugas mengatur dan mendefinisikan rute (endpoint) yang berkaitan dengan proses autentikasi, seperti register dan login, kemudian mengarahkan setiap request ke fungsi yang sesuai dalam AuthController.

## Implementasi Middleware Wajib
- logger (middleware/logger.js): Mencatat setiap request yang masuk (METHOD URL) ke konsol server.
- validateProduct (middleware/validateProduct.js): Memastikan field wajib (nama, kategori, dosis, harga, exp) terisi sebelum operasi POST atau PUT dilanjutkan. Jika gagal, mengembalikan HTTP 400.
- errorHandler (middleware/errorHandler.js): Middleware terakhir untuk menangkap error yang tidak terduga dan mengembalikan response HTTP 500 yang seragam.
- Authentication: Memastikan bahwa pengguna masuk dengan mendaftar dan melakukanlogin dengan kode token yang diberikan

## Hasil Uji API dengan Postman
1. Screenshot Endpoint GET: Gambar dibawah menunjukkan hasil pengujian endpoint GET pada URL http://localhost:3000/obat/ menggunakan Postman. Endpoint ini berfungsi untuk mengambil seluruh data obat yang tersimpan di dalam database. Pada bagian pengaturan request, tidak terdapat parameter maupun body karena metode GET hanya digunakan untuk membaca data. Hasil response yang ditampilkan dalam format JSON menunjukkan bahwa proses pengambilan data berhasil dengan nilai "success": true. Data yang dikembalikan berupa array berisi beberapa objek obat, masing-masing memiliki atribut seperti id, nama, kategori, dosis, harga, exp. Berdasarkan hasil tersebut dapat disimpulkan bahwa endpoint GET /api/produk berfungsi dengan baik dan berhasil menampilkan seluruh data produk secara lengkap dari database.
   
   <img width="1920" height="1080" alt="GET All data" src="https://github.com/user-attachments/assets/de883ea2-b522-4196-81dd-366274af9510" />

2. Screenshot Endpoint GET berdasarkan ID: Gambar dibawah menunjukkan hasil pengujian endpoint GET pada URL http://localhost:3000/obat/1 menggunakan Postman. Endpoint ini digunakan untuk mengambil data produk berdasarkan ID tertentu, dalam hal ini produk dengan ID = 1. Pada pengaturan request, tidak terdapat body karena metode GET hanya digunakan untuk membaca data dari server. Hasil response yang diterima dalam format JSON menampilkan status "success": true, yang menandakan permintaan berhasil diproses. Data yang dikembalikan berupa satu objek produk dengan detail seperti "id": 1, "nama": "Paracetamol", "kategori": "Analgesik", "dosis": "500mg", "harga": 5000, "exp": 2027. Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint GET /obat/:id berfungsi dengan baik dan berhasil menampilkan data produk sesuai ID yang diminta.
   
   <img width="1920" height="1080" alt="GET data by ID" src="https://github.com/user-attachments/assets/62537840-6419-4f13-8135-db81ddf3ed4f" />

3. Screenshot Endpoint POST: Gambar dibawah menunjukkan hasil pengujian endpoint POST pada URL http://localhost:3000/obat/ menggunakan Postman. Endpoint ini berfungsi untuk menambahkan data obat baru ke dalam database. Pada bagian pengaturan request, tipe body yang digunakan adalah raw JSON, di mana pengguna mengirimkan data produk seperti nama, kategori, dosis, harga, exp. Setelah permintaan dikirim, server merespons dengan kode status 201 Created, yang menandakan bahwa data berhasil ditambahkan. Response JSON menampilkan "success": true dan pesan "message": "Obat berhasil ditambahkan". Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint POST /api/produk berfungsi dengan baik dan berhasil menambahkan obat baru ke dalam database sesuai data yang dikirimkan melalui request.
   
   <img width="1920" height="1080" alt="POST data" src="https://github.com/user-attachments/assets/b03b3160-efa0-4829-b5aa-c7c98b303560" />

4. Screenshot Endpoint PUT dengan ID: Gambar dibawah menunjukkan hasil pengujian endpoint PUT pada URL http://localhost:3000/obat/9 menggunakan Postman. Endpoint ini digunakan untuk memperbarui data produk yang sudah ada berdasarkan ID tertentu, dalam hal ini produk dengan ID = 9. Pada bagian body, pengguna mengirimkan data baru dalam format raw JSON, seperti nama, kategori, dosis, harga, exp. Setelah permintaan dijalankan, server memberikan respons dengan status 200 OK yang menandakan pembaruan data berhasil dilakukan. Hasil response JSON menampilkan "success": true dan pesan "message": "Obat updated". Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint PUT /obat/:id berfungsi dengan baik dan berhasil memperbarui data obat sesuai dengan informasi yang dikirimkan melalui request.
   
   <img width="1920" height="1080" alt="PUT data by ID" src="https://github.com/user-attachments/assets/da05e85b-8e75-4645-b4fd-7b18eb6f2d42" />

5. Screenshot Endpoint DELETE dengan ID: Gambar dibawah menunjukkan hasil pengujian endpoint DELETE pada URL http://localhost:3000/obat/9 menggunakan Postman. Endpoint ini digunakan untuk menghapus data produk berdasarkan ID tertentu, dalam hal ini produk dengan ID = 9. Pada pengujian ini, metode DELETE digunakan untuk menghapus data secara permanen dari database, sehingga tidak diperlukan body pada request. Setelah permintaan dijalankan, server memberikan respons dalam format JSON dengan nilai "success": true dan pesan "message": "Product deleted", yang menandakan bahwa proses penghapusan data berhasil dilakukan. Berdasarkan hasil tersebut, dapat disimpulkan bahwa endpoint DELETE /obat/:id berfungsi dengan baik dan berhasil menghapus data produk sesuai dengan ID yang diminta dari database.
 
   <img width="1920" height="1080" alt="DELETE by ID" src="https://github.com/user-attachments/assets/a874fa63-f651-4d24-bc57-36f7b44bf6d5" />

6. Screenshot Register

<img width="1920" height="1080" alt="Register" src="https://github.com/user-attachments/assets/2a988cb5-d691-402d-af28-6dbdda16efb6" />

8. Screenshot Login

<img width="1920" height="1080" alt="Login" src="https://github.com/user-attachments/assets/2f82d525-1e2b-434b-af9a-b8c1d0b51045" />

10. Screenshot Login Gagal

<img width="1920" height="1080" alt="Login Gagal" src="https://github.com/user-attachments/assets/ed89295c-ba32-498c-95e2-95d56fb24450" />

11. Screenshot register tapi udername sudah ada

<img width="1920" height="1080" alt="Username sudah ada" src="https://github.com/user-attachments/assets/ee03ee08-1f5f-425b-a13f-e9e24fc85f18" />

12. Screenshot gagal login karna token kadaluarsa

<img width="1920" height="1080" alt="Token kadaluarsa" src="https://github.com/user-attachments/assets/e04d9c33-af26-4aba-a1dc-ef0d1ee24ab9" />

13. Screenshot penambahan token untuk login

<img width="1743" height="635" alt="Penambahan token" src="https://github.com/user-attachments/assets/64177bf0-fcce-4a53-8e40-eb275d1c7f59" />
