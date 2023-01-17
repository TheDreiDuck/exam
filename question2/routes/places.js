/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const path = require('node:path');

const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/places.json');

router.post('/addPlace', (req, res, next) => {
    const name = req?.body?.name?.length !== 0 ? req.body.name : undefined;
    const description = req?.body?.description?.length !== 0 ? req.body.description : undefined;

    if (!name || !description) return res.status(404);

    const id = uuidv4();
    const addPlace = {
        id,
        name,
        description,
    };

    const place = parse(jsonDbPath);
    place.push(addPlace);
    serialize(jsonDbPath, place);

    return res.json(id);
});

module.exports = router;
