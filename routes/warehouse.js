const express = require('express')
const { Warehouse, Rack, Stock, Loading } = require('../models')
const router = express.Router()

// router.post('/', async (req, res, next) => {
//     let { width, length } = req.body
//     try {
//         const result = await Warehouse.findOne({
//             wh_width: width,
//             wh_length: length,

//         })
//         console.log("처음에 넘겨줄 데이터", result.toJSON());
//         res.json(result.toJSON())
//     } catch (error) {
//         console.error(error);
//     }
// })

router.get('/:wh_seq', async (req, res) => {
    console.log("asd");
    let wh_seq = req.params.wh_seq
    try {
        const warehouseList = await Warehouse.findOne({
            attributes: ['wh_width', 'wh_length'],
            where: {
                wh_seq : wh_seq
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