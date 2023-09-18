const express = require('express')
const router = express.Router()
const { User, Warehouse, Rack, Loading, Stock, Company, sequelize } = require('../models'); // 모델들을 import
const { Op, fn, col, NOW } = require('sequelize');


// 입고 예정 페이지 => 입고될 리스트 조회 : 바코드 찍힌 모든 제품 가져오기
router.post('/create', async (req, res) => {
    console.log('바코드', req.body);
    const barCodes = req.body.barCode; // 입력 데이터의 바코드 배열

    try {
        const result = await Stock.findAll({
            where: {
                stock_barcode: {
                    [Op.in]: barCodes // $in 연산자 사용      
                },
                update_at : null
            }
        });

        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

// 입고 에정 페이지 : 바코드 등록하고 입고 페이지로 넘기기  => 입고 추가정보 등록 후 입고처리
router.post('/send/loading', async (req, res) => {
   
    let {stock_barcode} = (req.body)
    console.log('update_at 업데이트', req.body.stock_barcode);
    try {
        const result = await Stock.update(
            { update_at: fn('NOW') },
            {
                where : {
                    stock_barcode:stock_barcode
                }
            }
        )

        res.json(result)
    } catch (error) {
        console.error(error);
    }
  
})

// 입고 메인 페이지 : 추가정보 입력 후 입고등록
router.post('/loading', async (req,res)=>{
    let {rack_seq,stock_seq,loading_floor,loading_position,loading_manager,com_seq,stock_barcode} = (req.body)

    try {
        console.log('loading',req.body);
        const result = await Loading.create({
            rack_seq: rack_seq,
            loading_type : "I",
            stock_seq: stock_seq,
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