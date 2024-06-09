# Herbalyze - Cloud Computing

## Home (Get All Plants)
**GET** `/api/plants`  
Mengambil semua tanaman yang tersedia, termasuk nama, URL gambar, dan deskripsi singkat.

## Prediction
**POST** `/api/predict`  
Mengunggah gambar tanaman ke bucket Google Cloud Storage, menjalankan inferensi model ML untuk memprediksi label tanaman, dan mengembalikan hasil prediksi beserta detail tanaman.

## Plant Detail
**GET** `/api/plants/:id`  
Mengambil informasi detail tentang tanaman tertentu berdasarkan ID, termasuk nama, URL gambar, daftar manfaat, dan cara memanfaatkannya.

## Favorites
**GET** `/api/favorites/:userId`  
Mengambil daftar tanaman favorit pengguna berdasarkan userId.

**POST** `/api/favorites`  
Menambahkan tanaman ke daftar favorit pengguna. Data yang diperlukan: `userId` dan `plantId`.

**DELETE** `/api/favorites`  
Menghapus tanaman dari daftar favorit pengguna. Data yang diperlukan: `userId` dan `plantId`.
