// setup
'use strict';

const db = require('../db');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// firestore firebase
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  query,
  where,
} = require('firebase/firestore');
const actualDb = getFirestore(db);
// uuid
const { v4: uuidv4 } = require('uuid');

// function to embbed timestamp if needed
const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

// registers user into firestore,
// response is token so user is authenticated to do CRUD in firestore,
// token expires in 1h
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const currentDateTime = giveCurrentDateTime();

    // query to firebase
    const usernameQuery = query(
      collection(actualDb, 'registeredUsers'),
      where('username', '==', username)
    );
    const usernameSnapshot = await getDocs(usernameQuery);
    if (!usernameSnapshot.empty) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const userDocRef = doc(actualDb, 'registeredUsers', uuid);
    await setDoc(userDocRef, {
      createdAt: currentDateTime,
      username: username,
      password: hashedPassword,
    });
    const token = jwt.sign({ uuid }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ uuid, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// logins user to firestore to do CRUD operations,
// response is token, token expires in 1h
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usersCollection = collection(actualDb, 'registeredUsers');
    // console.log(usersCollection);
    const querySnapshot = await getDocs(
      query(usersCollection, where('username', '==', username))
    );
    if (querySnapshot.empty) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const hashedPassword = userData.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordMatch) {
      const token = jwt.sign({ userId: userDoc.id }, 'secret_key', {
        expiresIn: '1h',
      });
      res.status(200).json({ userId: userDoc.id, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// function to authenticate the tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// after registering, user can add their datas here,
// ex: adding profile datas
const addUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const userDoc = doc(actualDb, 'users', userId);
    await setDoc(userDoc, { ...data, id: userId });

    res.redirect(`/user/get-user-data-by-id/${userId}`);
    console.log(`userData record saved with id: ${userId}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// returns the "profile" datas made from addUserData function
const getUserDataById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userIdDocRef = doc(actualDb, 'users', userId);
    const userData = await getDoc(userIdDocRef);

    if (!userData.exists()) {
      res.status(404).send('User datas not found');
    } else {
      const data = userData.data();
      const userWithId = {
        id: userId,
        fullName: data.fullName,
        age: data.age,
        description: data.description,
        profilePhoto: data.profilePhoto,
        cv: data.cv,
        skills: data.skills,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        linkedIn: data.linkedIn,
      };
      res.send(userWithId);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// returns every users "profile" datas in firestore
const getAllUsersData = async (req, res) => {
  try {
    const allUserDoc = collection(actualDb, 'users');
    const allUserData = await getDocs(allUserDoc);

    let responseArr = [];
    allUserData.forEach((doc) => {
      const data = doc.data();
      const responseObject = {
        id: doc.id,
        fullName: data.fullName,
        age: data.age,
        description: data.description,
        profilePhoto: data.profilePhoto,
        cv: data.cv,
        skills: data.skills,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        linkedIn: data.linkedIn,
      };
      responseArr.push(responseObject);
    });
    res.send(responseArr);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// updates user "profile" datas
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const userDocRef = doc(actualDb, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      res.status(404).send('User not found');
    } else {
      await setDoc(userDocRef, data, { merge: true });
      res.send('User updated successfully');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// to delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDocRef = doc(actualDb, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    const registeredUserDocRef = doc(actualDb, 'registeredUsers', userId);
    const registeredUserDoc = await getDoc(registeredUserDocRef);

    if (!userDoc.exists() || !registeredUserDoc.exists()) {
      res.status(404).send('User not found');
    } else {
      await deleteDoc(userDocRef);
      await deleteDoc(registeredUserDocRef);
      res.send('User deleted successfully');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUserData,
  getUserDataById,
  getAllUsersData,
  deleteUser,
  registerUser,
  loginUser,
  updateUser,
  authenticateToken,
};
