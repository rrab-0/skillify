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
  serverTimestamp,
  query,
  where,
} = require('firebase/firestore');
const actualDb = getFirestore(db);
// uuid
const { v4: uuidv4 } = require('uuid');

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;
  return dateTime;
};

const addUser = async (req, res) => {
  try {
    const uuid = uuidv4();
    const currentDateTime = giveCurrentDateTime();
    const data = req.body;
    const userDoc = doc(actualDb, 'users', uuid);
    await setDoc(userDoc, { data, createdAt: currentDateTime });

    res.redirect(`/user/get-user-id/${uuid}`);
    console.log(`${currentDateTime} with id: ${uuid} record saved`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const userIdDocRef = doc(actualDb, 'users', userId);
    const userData = await getDoc(userIdDocRef);

    if (!userData.exists()) {
      res.status(404).send('User not found');
    } else {
      const data = userData.data();
      const userWithId = {
        id: userId,
        createdAt: data.createdAt,
        userData: {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          age: data.data.age,
          description: data.data.description,
          profilePhoto: data.data.profilePhoto,
          username: data.data.username,
          password: data.data.password,
          cv: data.data.cv,
          skills: data.data.skills,
          address: data.data.address,
          phoneNumber: data.data.phoneNumber,
          email: data.data.email,
          // links could be empty array for later
          links: data.data.links,
        },
      };
      res.send(userWithId);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUserDoc = collection(actualDb, 'users');
    const allUserData = await getDocs(allUserDoc);

    let responseArr = [];
    allUserData.forEach((doc) => {
      const data = doc.data();
      const responseObject = {
        id: doc.id,
        createdAt: data.createdAt,
        userData: {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          age: data.data.age,
          description: data.data.description,
          profilePhoto: data.data.profilePhoto,
          username: data.data.username,
          password: data.data.password,
          cv: data.data.cv,
          skills: data.data.skills,
          address: data.data.address,
          phoneNumber: data.data.phoneNumber,
          email: data.data.email,
          // links could be empty array for later
          links: data.data.links,
        },
      };
      responseArr.push(responseObject);
    });
    res.send(responseArr);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDocRef = doc(actualDb, 'users', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      res.status(404).send('User not found');
    } else {
      await deleteDoc(userDocRef);
      res.send('User deleted successfully');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usernameQuery = query(
      collection(actualDb, 'users'),
      where('username', '==', username)
    );
    const usernameSnapshot = await getDocs(usernameQuery);
    if (!usernameSnapshot.empty) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = uuidv4();
    const userDocRef = doc(actualDb, 'users', uuid);
    await setDoc(userDocRef, {
      username: username,
      password: hashedPassword,
    });
    const token = jwt.sign({ uuid }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usersCollection = collection(actualDb, 'users');
    console.log(usersCollection);
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
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

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

module.exports = {
  addUser,
  getUserId,
  getAllUser,
  deleteUser,
  registerUser,
  loginUser,
};
