# Herbalyze API
API untuk mengidentifikasi dan mengelola data tanaman herbal.

## Endpoint
```https://express-app-yyd2mje6vq-et.a.run.app/api/```

## Get all plants
- URL
  
  - ```/plants```
- Method
  
    - GET

- Response

```json
[
    {
        "_id": "6665deb48ee3b0004892894c",
        "name": "Lidah Buaya (Aloe vera L)",
        "imageUrl": "https://storage.googleapis.com/herbalyze-response-image/lidah-buaya.jpeg",
        "description": "Lidah buaya, dikenal secara ilmiah sebagai Aloe vera L., adalah tumbuhan sukulen yang telah dikenal dan digunakan selama ribuan tahun karena manfaat medis dan kecantikannya. Lidah buaya memiliki daun tebal dan berdaging yang menyimpan gel bening yang kaya akan nutrisi dan senyawa bioaktif."
    }
]
```

## Predict plant type
- URL

  - `/predict`
- Method

  - POST
- Headers

  - Content-Type: multipart/form-data
- Request Body

    - `userId` as `text`
    - `image` as `file`, must be a valid image file (jpeg, jpg, png), max size 4MB
- Response (Success)

```json
{
    "_id": "666999564ebcf30468ecd1ef",
    "name": "Seledri (Apium graveolens L)",
    "imageUrl": "https://storage.googleapis.com/herbalyze-users-image/fc91c986-49b1-4ca7-8aee-f4f95ee669fd.jpg",
    "description": "Seledri, yang dikenal dengan nama ilmiah Apium graveolens L., adalah tanaman herbal yang sering digunakan sebagai bahan makanan dan obat tradisional. Bagian dari keluarga Apiaceae, seledri dikenal karena aroma khasnya dan nilai nutrisinya yang tinggi.",
    "createdAt": "2024-06-12T12:49:26.752Z",
    "predictionScore": 0.9999997615814209
}
```
- Response (Error: No file provided)

```json
{
    "error": "Tidak ada file yang disertakan"
}
```
- Response (Error: File too large)

```json
{
    "error": "Multer error: File too large"
}
```

## Get plant detail
- URL
  - /plant/:id
- Method
  - GET

- Response

```json
{
    "name": "Lidah Buaya (Aloe vera L)",
    "imageUrl": "https://storage.googleapis.com/herbalyze-response-image/lidah-buaya.jpeg",
    "description": "Lidah buaya, dikenal secara ilmiah sebagai Aloe vera L., adalah tumbuhan sukulen yang telah dikenal dan digunakan selama ribuan tahun karena manfaat medis dan kecantikannya. Lidah buaya memiliki daun tebal dan berdaging yang menyimpan gel bening yang kaya akan nutrisi dan senyawa bioaktif.",
    "usage": "Getah dan cairannya diambil lalu dioleskan",
    "recipes": [
        {
            "name": "Gel Lidah Buaya untuk Perawatan Kulit",
            "description": "Ambil daun lidah buaya segar dan potong untuk mendapatkan gel bening di dalamnya. Kumpulkan gel dalam wadah bersih. Oleskan gel secara merata pada area kulit yang mengalami kemerahan atau peradangan. Biarkan selama 20-30 menit, lalu bilas dengan air bersih. Gunakan secara rutin untuk hasil terbaik.",
            "_id": "6665deb48ee3b0004892894d"
        }
    ]
}
```

## Get favorit plants from user
- URL

  - `/favorites/:userid`
- Method
  - GET

- Response

```json
[
    {
        "_id": "6668f987dea00f3d38632459",
        "userId": "hkL7JqqEQUYo135nhphBAbUSmMj2",
        "plantId": {
            "_id": "6665deb48ee3b0004892894e",
            "name": "Seledri (Apium graveolens L)",
            "imageUrl": "https://storage.googleapis.com/herbalyze-response-image/seledri.jpeg",
            "description": "Seledri, yang dikenal dengan nama ilmiah Apium graveolens L., adalah tanaman herbal yang sering digunakan sebagai bahan makanan dan obat tradisional. Bagian dari keluarga Apiaceae, seledri dikenal karena aroma khasnya dan nilai nutrisinya yang tinggi."
        },
        "__v": 0
    }
]
```
## Add plant to user favorites
- URL
  - `/favorite`
- Method
  - POST
- Headers
    - Content-Type: application/json
- Request Body
    - `userId` as `string`
    - `plantId` as `string`
- Response (Success)

```json
{
    "userId": "hkL7JqqEQUYo135nhphBAbUSmMj2",
    "plantId": "6665deb48ee3b0004892894c",
    "_id": "666999c24ebcf30468ecd1fc",
    "__v": 0
}
```
- Response (Error: Plant already in favorites)

```json
{
    "error": "Plant already in favorites!"
}
```

## Remove plant from user favorites
- URL
  - `/favorite`
- Method
  - DELETE
- Headers

    - Content-Type: application/json
- Request Body

    - `userId` as `string`
    - `plantId` as `string`

- Response (Success)

```json
{
    "message": "Favorite successfully removed"
}
```
- Response (Error: Favorite not found)

```json
{
    "error": "Favorite not found"
}
```
