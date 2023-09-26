const express = require('express')
const { Rack, Loading, Stock } = require('../models')
const router = express.Router()

router.post('/', async (req, res, next) => {
    let { rackName, rackWidth, rackLength, rackFloor, rackX, rackZ, rackRotateYN, wh_seq } = req.body
    try {
        const result = await Rack.create({
            rack_id: rackName,
            rack_position: '1234',
            rack_width: rackWidth,
            rack_length: rackLength,
            rack_floor: rackFloor,
            rack_x: rackX,
            rack_z: rackZ,
            rack_rotate_yn: rackRotateYN,
            wh_seq: wh_seq

        })
        res.json(result.toJSON())
    } catch (error) {
        console.error(error);
    }
})

router.get('/:wh_seq', async (req, res) => {
    console.log("qwe");
    let wh_seq = req.params.wh_seq
    try{
        const rackList = await Rack.findAll({
            // attributes: ['rack_x', 'rack_z', 'rack_width', 'rack_length', 'rack_floor'],
            where: {
                wh_seq : wh_seq
            },
            include: [{
                model: Loading,
                include: [{
                    model: Stock,
                    
                }]
            }]
        })
        console.log('rackList 가져오기', rackList);
        res.json(rackList)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router