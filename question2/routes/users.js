/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const express = require('express');
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/users.json');
const jsonDbPathPlace = path.join(__dirname, '/../data/places.json');
const jsonDbPathFav = path.join(__dirname, '/../data/fav.json');

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

router.post('/addUser', (req, res, next) => {
  const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;

  const users = parse(jsonDbPath);
  if (!name || !email) return res.sendStatus(404);

  if (users.findIndex((e) => e.email === email) !== -1) return res.sendStatus(401);

  const id = uuidv4();
  const addUser = {
    id,
    name,
    email,
  };

  users.push(addUser);
  serialize(jsonDbPath, users);

  return res.json(id);
});

router.post('/addFav', (req, res, next) => {
  const userID = req?.body?.userID?.length !== 0 ? req.body.userID : undefined;
  const placeID = req?.body?.placeID?.length !== 0 ? req.body.placeID : undefined;

  const users = parse(jsonDbPath);
  const places = parse(jsonDbPathPlace);
  const favs = parse(jsonDbPathFav);

  if (!userID || !placeID) return res.sendStatus(404);

  if (users.findIndex((e) => e.userID === userID) !== -1
   || places.findIndex((e) => e.placeID === placeID) !== -1) return res.sendStatus(409);

  if (favs.findIndex((e) => e.userID === userID && e.placeID === placeID) !== -1) return res.sendStatus(409);

  const addUser = {
    userID,
    placeID,
  };

  users.push(addUser);
  serialize(jsonDbPath, users);

  return res.send('oui');
});

module.exports = router;
