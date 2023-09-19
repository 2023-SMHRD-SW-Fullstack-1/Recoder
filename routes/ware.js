const express = require('express')
const { Warehouse } = require('../models')
const router = express.Router()

router.post('/', async (req, res, next) => {
    let { width, length, name, comSeq } = req.body
    try {
        const result = await Warehouse.create({
            wh_name: name,
            wh_width: width,
            wh_length: length,
            com_seq: comSeq
        })
        console.log("처음에 넘겨줄 데이터", result.toJSON());
        res.json(result.toJSON())
    } catch (error) {
        console.error(error);
    }
})

router.get('/manage/:com_seq', async (req, res) => {
    console.log("asd");
    let com_seq = req.params.com_seq
    try {
        const warehouseList = await Warehouse.findAll({
            attributes: ['wh_name', 'createdAt', 'wh_seq'],
            where: {
                com_seq : com_seq
            },

        });
        console.log('warehouseList 가져오기',warehouseList);
        res.json(warehouseList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router