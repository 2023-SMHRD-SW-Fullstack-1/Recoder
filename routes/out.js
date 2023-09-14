const express = require('express')
const router = express.Router()
// const User = require('../models/user');
const { User, Warehouse, Rack, Loading, Stock, Company } = require('../models'); // 모델들을 import
const { Op } = require('sequelize');


// 출고 메인 페이지 => 출고될 리스트 조회
router.post('/create', async (req, res) => {

    let wh_seq = (req.body.wh_seq)
    console.log('req', wh_seq);


    try {
        const result = await Warehouse.findAll({
            where: {
                wh_seq: wh_seq
            },
            attributes: ['wh_seq', 'wh_name'],
            include: [{
                model: Rack,
                include: [{
                    model: Loading,
                    where: {
                        loading_type: 'I',
                    },
                    include: [{
                        model: Stock
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
                loading_floor: null,
                loading_position: null,
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

    let { id, wh_seq } = req.body;
    console.log("aaaaaaaaa", req.body);
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
                    where: {
                        wh_seq: wh_seq
                    },
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

// 출고품 관리 페이지 -- 창고별
router.post('/des', async (req, res) => {

    let { com_seq, wh_seq } = req.body;
    try {
        const desDetail = await Warehouse.findAll({
            where: {
                wh_seq: wh_seq,
            },
            attributes :['wh_name'],
            include: [
                {
                    model: Rack,
                    attributes: ['rack_seq'],
                    include: [
                        {
                            model: Loading,
                            where: { loading_type: 'O' },
                            attributes : 
                                ['stock_shipping_des']
                               ,
                            include: [
                                {
                                    model: Stock,
                                   attributes :[ 
                                    'stock_name','stock_kind'
                                   ]
                                }
                            ]
                        }
                    ]

                }

            ],
        })
        console.log(desDetail);
        res.json(desDetail)
    } catch (error) {
        console.error(error);
    }
})


// 출고품 하나의 정보 관리 des/name
router.post('/des/name', async (req, res) => {

    let { wh_seq,stock_name } = req.body;
    try {
        const sNameList = await Warehouse.findAll({
            where: {
                wh_seq: wh_seq,
            },
            attributes :['wh_name'],
            include: [
                {
                    model: Rack,
                    attributes: ['rack_seq'],
                    include: [
                        {
                            model: Loading,
                            where: { loading_type: 'O' },
                            attributes : 
                                ['stock_shipping_des']
                               ,
                            include: [
                                {
                                    model: Stock,
                                    where:{stock_name:stock_name},
                                   attributes :[ 
                                    'stock_name','stock_kind'
                                   ]
                                }
                            ]
                        }
                    ]

                }

            ],
        })
        console.log( sNameList);
        res.json( sNameList)
    } catch (error) {
        console.error(error);
    }
})


router.post('/des/count', async (req, res) => {

    let { wh_seq,stock_name } = req.body;
    try {
        const count = await Loading.count({
            where: {
              loading_type: 'O',
            },
            include: [
              {
                model: Stock,
                where: {
                  stock_name: stock_name,
                },
              },
            ],
            group: ['stock_shipping_des'],
            attributes: ['stock_shipping_des', [sequelize.fn('COUNT', sequelize.col('stock_shipping_des')), 'count']],
          });
        console.log( count);
        res.json(count)
    } catch (error) {
        console.error(error);
    }
})
module.exports = router