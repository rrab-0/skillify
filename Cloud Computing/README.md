# Cloud Computing

### Deployed Link: https://skillify-backend-boq7zjhvoq-et.a.run.app

### API Documentation Link: https://skillify-backend-boq7zjhvoq-et.a.run.app/documentation

## Tech Stack

- **Back-End**: Express.js
- **Database**: Firestore + Firebase's Cloud Storage
- **Deployment**: Google Cloud Run

## Back-End Depedency

- Multer
- Bcrypt
- Cors
- Firebase
- UUID
- JsonWebToken (JWT)

## How to run locally

### `npm install`

Pertama, install seluruh depedency yang digunakan terlebih dahulu menggunakan `npm install`

### `npm run start`

Setelah dependency berhasil diinstall, gunakan command `npm run start` untuk memulai program. Server akan berjalan di `localhost:8080`.

## How to deploy to cloud run

### `login to console.cloud.google.com`

Login to google cloud's console, then open their cloud shell

### `git clone https://github.com/rrab-0/skillify.git`

Clone our application's repository

### `cd skillify/Cloud\ Computing/`

Change to "Cloud Computing" directory

### `gcloud run deploy`

After this process is completed, you will get the URL.

## File Structure

```
Cloud Computing
│   README.md
│   Dockerfile
|   index.js
|   db.js
|   config.js
│
└───controllers
│   └───jobController.js
│   └───uploadController.js
│   └───userController.js
│
└───models
│   └───job.js
│   └───user.js
│
└───routes
│   └───jonRoutes.js
│   └───uploadRoutes.js
│   └───userRoutes.js
│
└───views
|    └───apidocumentation.html
|
└───public
    └───apidocumentation.md
    └───style.css

```
