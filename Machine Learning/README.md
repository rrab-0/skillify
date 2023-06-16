# Machine Learning Project Documentation

### Deployed Link: https://skillify-ml-webservice-boq7zjhvoq-et.a.run.app/predict

## Project Description

This documentation serves as a comprehensive guide for the machine learning project titled `Job Recommendation System using Tensorflow Neural Network`. The project aims to provide a personalized list of job recommendations based on user preferences such as location, career level, education level, and more.

The primary objective of this machine learning project is to assist job applicants in easily finding job vacancies that match their personal preferences. By leveraging advanced machine learning techniques, we aim to deliver a tailored job recommendation system that enhances the job search experience.

## Table of Contents

- [Project Description](#project-description)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Data](#data)
- [Model Training](#model-training)
- [Evaluation](#evaluation)
- [Results](#results)
- [Deployment](#deployment)

## Installation

To set up this project locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/rrab-0/skillify.git
```

2. Change directory:

```sh
cd "Machine Learning"
```

3. Install the required dependencies:

```sh
pip install -r requirements.txt
```

## Usage

To use this project, follow these instructions (you may skip to step 4 for direct inference):

1. Run the `data_cleaning.ipynb` notebook to clean the data by removing unnecessary features and unusual symbols. This step will generate the `data_cleaned.csv` file.
2. Run the `data_processing.ipynb` notebook to process the data by performing one-hot encoding and label encoding. This step will generate the `data_encoded.csv` file.
3. Run the `build_model.ipynb `notebook to build the machine learning model using TensorFlow. This step will generate the `saved_model.h5` file.
4. Run the `inference.ipynb` notebook to perform inference or make predictions. The results will be provided as a list of job recommendations in DataFrame format.

## Data

The data used for this project consists of a collection of job listings and job seekers' profiles. The job listings are sourced from a public dataset available on [Kaggle](https://www.kaggle.com/datasets/canggih/jog-description-and-salary-in-indonesia), while the job seekers' profiles are obtained through user input on the application.

The data is stored in CSV format and undergoes preprocessing steps, including encoding and scaling, to ensure consistency and quality.

## Model Training

The machine learning model behind the Job Recommender System is trained using a neural network implemented with Keras and TensorFlow. The model learns from the job listing dataset to make accurate recommendations based on user preferences. Code snippets for the training pipeline can be found in the [build_model.ipynb](/build_model.ipynb) file.

## Evaluation

The performance of the model is evaluated using the `categorical_crossentropy` loss since the model predicts multiple classes. The model is trained for 10 epochs, and the loss shows a significant decrease over the training process.

- Epoch History

  ![history_epoch](/Machine%20Learning/image/history_epoch.png)

- Training Loss History

  ![history_training_loss](/Machine%20Learning/image/history_training_loss.png)

## Results

The model is tested using the following user preference JSON input:

```json
{
  "location": "Jakarta Utara",
  "career_level": "Supervisor/Koordinator",
  "experience_level": "2 tahun",
  "education_level": "Sarjana (S1)",
  "employment_type": "Penuh Waktu",
  "job_function": "Komputer/Teknologi Informasi,IT-Perangkat Lunak,Top Management / Manajemen Tingkat Atas",
  "company_industry": "Manufaktur/Produksi"
}
```

The resulting job recommendations are as follows:

![result_inference](/Machine%20Learning/image/result_inference.png)

We can observe that the recommended job listings align with the user's preferences. For code snippets related to testing the model, please refer to the [inference.ipynb](/inference.ipynb) file.

## Deployment

To deploy the machine learning model, we utilize Flask to easily handle user input processing using Python. We collaborate with our cloud computing team to deploy the model on the cloud. The DataFrame output is converted to JSON format. Here is an example of calling the API using Postman:

![api_call_postman](/Machine%20Learning/image/api_call_postman.png)

### How to deploy to cloud run

#### `login to console.cloud.google.com`

Login to google cloud's console, then open their cloud shell

#### `git clone https://github.com/rrab-0/skillify.git`

Clone our application's repository

#### `cd skillify/Machine\ Learning/`

Change to "Cloud Computing" directory

#### `gcloud run deploy`

After this process is completed, you will get the URL.
