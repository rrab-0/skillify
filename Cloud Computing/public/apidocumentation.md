API Documentation

# Skillify API Documentation[](https://github.com/rrab-0/skillify)

This is the API documentation for C23-PR506's product capstone.

## Workflow

All methods need an Authorization header, token can be obtained after user is registered successfully.

The typical workflow is as follows:

1.  User registers with /user/register.
2.  User obtains token and add a profile photo with /upload.
3.  User adds datas with /user/add-user-data/{id}, id is uuid provided in register's response.
4.  User can list, update, or delete their user datas here.
5.  User adds job datas with /job/add-job.
6.  User can list, update, delete a single job, or delete their entire jobs here.

## Uploads, to upload files such as profile photo, CV, company photos, etc. and deleting.

POST /upload

to upload files used in user/job datas.

#### Response

                {
                  "message": "file uploaded",
                  "name": "cat.png",
                  "type": "image/png",
                  "downloadURL": "https://firebasestorage.googleapis.com/v0/b/bangkit-product-capstone.appspot.com/o/files%2Fref-1.png%20%20%20%20%20%20%20(9%3A3%3A19%20and%202023-6-8)?alt=media&token=be69817f-e0fa-4f73-9569-f4ab16f3d4ec"
                }


## User, to perform operations on user data such as adding, listing, updating, and deleting.

POST /user/register

to register a user.

#### Request

          {
            "username": "username1",
            "password": "password"
          }


#### Response

          {
            "uuid": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjJhM2QwYzctYjkwYS00MWYwLWIwZmItNzNjNjY1YjQ0ODNhIiwiaWF0IjoxNjg2MjgwMjM4LCJleHAiOjE2ODYyODM4Mzh9.Zv1Epg9M05inOt8Au-xvDn87cj1KD7CMDUQH6wUczMk"
          }


POST /user/login

to login a user.

#### Request

          {
            "username": "username1",
            "password": "password"
          }


#### Response

          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZjJhM2QwYzctYjkwYS00MWYwLWIwZmItNzNjNjY1YjQ0ODNhIiwiaWF0IjoxNjg2MjgwMjM4LCJleHAiOjE2ODYyODM4Mzh9.Zv1Epg9M05inOt8Au-xvDn87cj1KD7CMDUQH6wUczMk"
          }


POST /user/add-user-data/{id}

to add user datas.

#### Request

          {
            "firstName": "Andre",
            "lastName": "Budiman",
            "age": "20",
            "description": "Pekerja yang tertarik dengan teknologi",
            "profilePhoto": "fill with link from google cloud storage",
            "cv": "fill with link from google cloud storage",
            "skills": "python",
            "address": "Jl anggrek",
            "phoneNumber": "08123445232",
            "email": "your@mail.com",
            "website": "andre.co.id",
            "linkedIn": "linkedin.com/andre"
          }


#### Response

          {
            "id": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
            "firstName": "Andre",
            "lastName": "Budiman",
            "age": "20",
            "description": "Pekerja yang tertarik dengan teknologi",
            "profilePhoto": "fill with link from google cloud storage",
            "cv": "fill with link from google cloud storage",
            "skills": "python",
            "address": "Jl anggrek",
            "phoneNumber": "08123445232",
            "email": "your@mail.com",
            "website": "andre.co.id",
            "linkedIn": "linkedin.com/andre"
          }


GET /user/get-user-data-by-id/{id}

to list datas of a user.

#### Response

          {
            "id": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
            "firstName": "Andre",
            "lastName": "Budiman",
            "age": "20",
            "description": "Pekerja yang tertarik dengan teknologi",
            "profilePhoto": "fill with link from google cloud storage",
            "cv": "fill with link from google cloud storage",
            "skills": "python",
            "address": "Jl anggrek",
            "phoneNumber": "08123445232",
            "email": "your@mail.com",
            "website": "andre.co.id",
            "linkedIn": "linkedin.com/andre"
          }


GET /user/get-all-user

to list all users registered.

#### Response

          [
            {
              "id": "e8175a69-15ff-459d-b847-ce65c236db3f",
              "firstName": "momooooo",
              "lastName": "world",
              "age": "20",
              "description": "short story",
              "profilePhoto": "link from cloud storage",
              "cv": "hello cv",
              "skills": "basketball",
              "address": "jump street",
              "phoneNumber": "08123445",
              "email": "your@mail.com",
              "website": "whdwadaw",
              "linkedIn": "this should be an array of links from cloud storage"
            },
            {
              "id": "ea8fa941-5d02-4d5f-a88f-1c2c2b326e55",
              "firstName": "momooooo",
              "lastName": "world",
              "age": "20",
              "description": "short story",
              "profilePhoto": "link from cloud storage",
              "cv": "cool cv",
              "skills": "basketball",
              "address": "jump street",
              "phoneNumber": "08123445",
              "email": "your@mail.com"
            },
            {
              "id": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
              "firstName": "Andre",
              "lastName": "Budiman",
              "age": "20",
              "description": "Pekerja yang tertarik dengan teknologi",
              "profilePhoto": "fill with link from google cloud storage",
              "cv": "fill with link from google cloud storage",
              "skills": "python",
              "address": "Jl anggrek",
              "phoneNumber": "08123445232",
              "email": "your@mail.com",
              "website": "andre.co.id",
              "linkedIn": "linkedin.com/andre"
            }
          ]


PATCH /user/update-user/{id}

to update user's data.

#### Request

          {
            "firstName": "Andreas"
          }


#### Response

          User updated successfully


DELETE /user/delete-user/{id}

to delete user's data.

#### Response

          User deleted successfully


## Job, to perform operations on jobs a user posted such as adding, listing, updating, and deleting.

POST /job/add-job

to add jobs for a user.

#### Request

          {
            "userId": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
            "jobTitle": "IT engineer",
            "description": "Pekerjaan untuk yang tertarik dengan teknologi",
            "qualifications": "menguasai html",
            "companyName": "PT ABC",
            "address": "Jl mawar",
            "phoneNumber": "08123445232",
            "email": "your@mail.com",
            "website": "abc.co.id",
            "linkedIn": "linkedin.com/abc"
          }


#### Response

          {
            "userId": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
            "createdAt": "2023-6-9 11:22:38",
            "id": "6d78a5a0-d890-4f0e-8911-cd03ec8fb658",
            "jobTitle": "IT engineer",
            "description": "Pekerjaan untuk yang tertarik dengan teknologi",
            "qualifications": "menguasai html",
            "companyName": "PT ABC",
            "address": "Jl mawar",
            "phoneNumber": "08123445232",
            "email": "your@mail.com",
            "website": "abc.co.id",
            "linkedIn": "linkedin.com/abc"
          }


GET /job/get-job-id/{id}

to list datas of a job from a user.

#### Response

          {
            "userId": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
            "createdAt": "2023-6-9 11:22:38",
            "id": "6d78a5a0-d890-4f0e-8911-cd03ec8fb658",
            "jobTitle": "IT engineer",
            "description": "Pekerjaan untuk yang tertarik dengan teknologi",
            "qualifications": "menguasai html",
            "companyName": "PT ABC",
            "address": "Jl mawar",
            "phoneNumber": "08123445232",
            "email": "your@mail.com",
            "website": "abc.co.id",
            "linkedIn": "linkedin.com/abc"
          }


GET /job/get-all-jobs-for-a-user?userId={userId}

to list all posted jobs of a user.

#### Response

          [
            {
                "userId": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
                "createdAt": "2023-6-9 11:22:38",
                "id": "6d78a5a0-d890-4f0e-8911-cd03ec8fb658",
                "jobTitle": "IT engineer",
                "description": "Pekerjaan untuk yang tertarik dengan teknologi",
                "qualifications": "menguasai html",
                "companyName": "PT ABC",
                "address": "Jl mawar",
                "phoneNumber": "08123445232",
                "email": "your@mail.com",
                "website": "abc.co.id",
                "linkedIn": "linkedin.com/abc"
            },
            {
                "userId": "f2a3d0c7-b90a-41f0-b0fb-73c665b4483a",
                "createdAt": "2023-6-9 11:28:26",
                "id": "a74646e5-2659-4fc6-8ac5-aabb658a955f",
                "jobTitle": "IT engineer Manager",
                "description": "Pekerjaan untuk yang berpengalaman dengan teknologi",
                "qualifications": "menguasai html CSS",
                "companyName": "PT ABC",
                "address": "Jl mawar",
                "phoneNumber": "08123445232",
                "email": "your@mail.com",
                "website": "abc.co.id",
                "linkedIn": "linkedin.com/abc"
            }
          ]


PATCH /job/update-job/{id}

to update datas of a job from a user.

#### Request

          {
            "qualifications": "Mahir CSS dan JS"
          }


#### Response

          Job updated successfully


DELETE /jobs/delete-job/{id}

to delete a job from.

#### Response

          Job deleted successfully


DELETE /job/delete-all-jobs-for-a-user?userId={userId}

to delete all jobs associated with a user.

#### Response

          Jobs deleted successfully
