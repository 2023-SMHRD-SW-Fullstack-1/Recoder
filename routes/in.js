const express = require('express')
const router = express.Router()
const { User, Warehouse, Rack, Loading, Stock, Company, sequelize } = require('../models'); // 모델들을 import
const { Op, fn, col } = require('sequelize');


// 입고 메인 페이지 => 입고될 리스트 조회 : 바코드 찍힌 모든 제품 가져오기
router.post('/create', async (req, res) => {
    //    let user_id = req.user.user_id
    let stock_barcode = (req.body.stock_barcode)
    console.log('바코드', stock_barcode);

    try {
        const result = await Stock.findAll({

            where: { stock_barcode: stock_barcode }
        })

        res.json(result)
    } catch (error) {
        console.error(error);
    }

})


// 입고품 등록  => 입고 추가정보 등록 후 입고처리
router.post('/create/loading', async (req, res) => {
   
    let {rack_seq,stock_seq,loading_floor,loading_position,loading_manager,com_seq} = (req.body)
    console.log('입고등록정보', req.body);

    try {
        const result = await Loading.create({
            rack_seq: rack_seq,
            stock_seq: stock_seq,
            loading_type : "I",
            loading_floor: loading_floor,
            loading_position: loading_position,
            loading_manager:loading_manager,
            com_seq: com_seq
          })

        res.json(result)
    } catch (error) {
        console.error(error);
    }

})


module.exports = router