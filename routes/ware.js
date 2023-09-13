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

router.post('/wareList', async(req, res) => {
    let {wareId} = req.body;
    try{
        const warehouseList = await Warehouse.findAll({
            
        })
    } catch (error) {
        console.error(error);
    }
})
module.exports = router