const express = require('express')
const router = express.Router()
// const User = require('../models/user');
const { User, Warehouse, Rack, Loading, Stock, Company } = require('../models'); // 모델들을 import
const { Op } = require('sequelize');


// 출고 메인 페이지 => 출고될 리스트 조회
router.post('/create', async (req, res) => {
    let id = req.body.id

    try {
        const result = await User.findAll({
            where: {
                user_id: id
            },
            include: [{
                model: Company,
                include: [{
                    model: Warehouse,
                    attributes: ['wh_seq', 'wh_name'],
                    include: [{
                        model: Rack,
                        include: [{
                            model: Loading,
                            where: {
                                loading_type: 'I' 
                            },
                            include: [{
                                model: Stock
                            }]
                        }]
                    }]
                }]
            }]
        })
        res.json(result)
    } catch (error) {
        console.error(error);
    }

})


// 출고버튼 클릭(출고 등록)
router.post('/create/loading', async (req, res) => {

    try {
        console.log(req.body);
        const outLoading = await Loading.update(
            {
                loading_type: 'O',
                out_created_at: req.body.created_at,
                loading_cnt: req.body.loading_cnt,
                stock_shipping_des: req.body.stock_shipping_des,
                loading_manager: req.body.loading_manager,
                loading_floor:null,
                loading_position:null,
            },
            {
                where: {
                    loading_seq: req.body.loading_seq
                }

            })
            
        console.log(outLoading);
        res.json(outLoading)
    } catch (error) {
        console.log(error);
    }
})



// 출고이력 페이지 - 모든 출고 리스트 조회
router.post('/controll', async (req, res) => {

    let { id } = req.body;
    try {
        const outControllList = await User.findAll({
            attributes: ['com_seq'],
            where: {
                user_id: id
            },
            include: [{
                model: Company,
                include: [{
                    model: Warehouse,
                    attributes: ['wh_seq', 'wh_name']
                    ,
                    include: [{
                        model: Rack,

                        include: [{
                            model: Loading,
                             where: {
                                loading_type: 'O' 
                            },

                            include: [{
                                model: Stock,

                            }]
                        }]
                    }]
                }]

            }]
        });
        console.log(outControllList);
        res.json(outControllList)
    } catch (error) {
        console.error(error);
    }


})

// 배송지 관리 페이지
router.post('/des/detail', async (req, res) => {

    let { com_seq } = req.body;
    try {
        const desDetail = await Stock.findAll({
            include: [
                {
                  model: Loading,
                  where: {
                    loading_type: 'O',
                    com_seq: com_seq,
                  },
                },
              ],
            })
        console.log(desDetail);
        res.json(desDetail)
    } catch (error) {
        console.error(error);
    }
})
module.exports = router