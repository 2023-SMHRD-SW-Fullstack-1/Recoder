const express = require('express')
const router = express.Router()
// const User = require('../models/user');
const { User, Warehouse, Rack, Loading, Stock, Company } = require('../models'); // 모델들을 import




// 출고 메인 페이지 => 출고될 리스트 조회
router.post('/', async (req, res) => {
    let { id } = req.body;
    try {
        const outList = await User.findAll({
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

                            include: [{
                                model: Stock,

                            }]
                        }]
                    }]
                }]

            }]
        });
        console.log(outList);
        res.json(outList)
    } catch (error) {
        console.error(error);
    }

})


router.post('/loading',async(req, res)=>{

try {
    console.log("===============================================================");
    console.log(req.body);
    const outLoading = await Loading.update(
        {
            loading_type: 'O',
            created_at: req.body.created_at,
            loading_cnt : req.body.loading_cnt,
            stock_shipping_des: req.body.stock_shipping_des,
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



module.exports = router