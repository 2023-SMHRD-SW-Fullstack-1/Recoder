const express = require('express')
const { Rack } = require('../models')
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



module.exports = router