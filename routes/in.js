const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const { updateStockAfterUploadImg } = require('../controllers/img')

const router = express.Router()
const { Loading, Stock, Client } = require('../models'); // 모델들을 import
const { Op, fn, col, NOW, Model } = require('sequelize');

// 이미지 업로드 관련
// -----------------------------
try {
    fs.readdirSync('uploads')
} catch (error) {
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads')
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname)
            done(null, path.basename(file.originalname, ext) + Date.now() + ext)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

router.post('/img', upload.single('file'), updateStockAfterUploadImg)
// --------------------------------------------------------------------------------

// com_seq로 loading_type이 'B'인 데이터 5개만 내림차순 조회
router.get('/:com_seq/:loading_type', async (req, res, next) => {

    let com_seq = req.params.com_seq
    let loading_type = req.params.loading_type

    let date = ''
    if (loading_type === 'O') {
        // 출고일 경우 out_created_at을 내림차순으로
        date = 'out_created_at'
    } else {
        date = 'created_at'
    }

    try {
        const result = await Loading.findAll({
            where: {
                com_seq: com_seq,
                loading_type: loading_type
            },
            include: [{
                model: Stock,
                include: [{
                    model: Client
                }]
            }],
            order: [
                [col(date), 'DESC'],
            ],
            limit: 5
        })
        res.json(result)
    } catch (error) {
        console.error(error);
    }
})


// 바코드...
router.post('/barcode', async (req, res) => {
    console.log('바코드', req.body);
    const barCodes = req.body; // 입력 데이터의 바코드 배열

    try {
        const result = await Stock.update(

            { update_at: fn('NOW') }, // 업데이트할 필드와 값을 설정합니다.
            {
                where: {
                    stock_barcode: {
                        [Op.in]: barCodes // $in 연산자 사용      
                    }
                }
            }
        );
        console.log('업데이트바코드 조회', result);
        res.json(result);
    } catch (error) {
        console.error(error);
    }

});



router.post('/create', async (req, res) => {
    console.log('입고바코드', req.body);
    const barCodes = req.body; // 입력 데이터의 바코드 배열

    try {
        const result = await Stock.findAll({
            where: {
                stock_barcode: {
                    [Op.in]: barCodes // $in 연산자 사용      
                },
                update_at: {
                                            [Op.ne]: null
                                        }
            }
        });
        console.log('stock바코드 조회', result);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

// router.post('/create', async (req, res) => {
//     console.log('바코드', req.body);
//     const barCodes = req.body.barCode; // 입력 데이터의 바코드 배열

//     try {
//         const result = await Stock.findAll(
//             { update_at: fn('NOW') }, // 업데이트할 필드와 값을 설정합니다.
//             {
//                 where: {
//                     stock_barcode: {
//                         [Op.in]: barCodes // $in 연산자 사용      
//                     },
//                     update_at: {
//                         [Op.ne]: null
//                     }
//                 }
//             }
//         );
//         console.log('업데이트바코드 조회', result);
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//     }
// });

// (in_01)입고 예정 페이지 => 입고될 리스트 조회 : 바코드 찍힌 모든 제품 가져오기
// router.post('/create', async (req, res) => {
//     console.log('바코드', req.body);
//     const barCodes = req.body.barCode; // 입력 데이터의 바코드 배열

//     try {
//         const result = await Stock.findAll(
//             { update_at: fn('NOW') }, // 업데이트할 필드와 값을 설정합니다.
//             {
//                 where: {
//                     stock_barcode: {
//                         [Op.in]: barCodes // $in 연산자 사용      
//                     },
//                     update_at: {
//                         [Op.ne]: null
//                     }
//                 }
//             }
//         );
//         console.log('업데이트바코드 조회', result);
//         res.json(result);
//     } catch (error) {
//         console.error(error);
//     }
// });

// (in_01)입고 에정 페이지 : 등록버튼 누르고 입고 페이지로 넘기기  => 이후 입고 페이지에서 추가정보 등록 후 입고처리
router.post('/send/loading', async (req, res, next) => {
    let { stock_barcode, com_seq, stock_seq } = req.body;
    console.log('update_at 넣을 바코드', req.body);
    // try {
    //     const result = await Stock.update(
    //         { update_at: fn('NOW') },
    //         {
    //             where: {
    //                 stock_barcode: stock_barcode
    //             }
    //         }
    //     );
    //     console.log('loading에 업데이트', req.body);
    //     const result2 = await Loading.create({
    //         stock_seq: stock_seq,
    //         com_seq: com_seq,
    //         loading_type: 'B'
    //     });
    //     console.log('로딩에 업데이트', result2);
    //     res.json(result2);
    // } catch (error) {
    //     console.error(error);
    //     next(error); // 에러가 발생하면 에러 핸들러 미들웨어로 전달합니다.
    // }

    try { // 등록클릭 > 로딩타입 B로 row 생성
        const result2 = await Loading.create({
            stock_seq: stock_seq,
            com_seq: com_seq,
            loading_type: 'B'
        });
        res.json(result2);
    } catch (error) {
        console.log(error);
    }

});


// (in_02) : in_01에서 등록 누른 제품들만 보여주기

router.post('/get/loading', async (req, res) => {

    let com_seq = req.body.com_seq

    try {
        console.log("in_02 : com_seq", com_seq);

        const result = await Loading.findAll({
            where: {
                loading_type: 'B',
                com_seq: com_seq
            },
            include: [{
                model: Stock
            }]
        })
        res.json(result)
    } catch (error) {
        console.log(error);
    }
})

//  (in_02) : 입고취소 : 입고취소 버튼 클릭시 입고 예정 리스트로 데이터 보내기
router.post('/del/loaing', async (req, res) => {
    let stock_seq = req.body.stock_seq
    try {
        console.log('입고취소요', stock_seq)
        const result = await Loading.update(
            {
                loading_type: null,
            },
            {
                where: {
                    stock_seq: stock_seq,
                },
                include: [
                    {
                        model: Stock,
                    },
                ],
            }
        );
        res.json(result)
    } catch (error) {
        console.log('입고취소 에러', error);
    }
})

// (in_02) :  추가정보 입력 후 입고등록
router.post('/loading', async (req, res) => {
    let { rack_seq, stock_seq, loading_floor, loading_position, loading_manager, com_seq, stock_barcode } = (req.body)

    try {
        console.log('loading', req.body);
        const result = await Loading.create({
            rack_seq: rack_seq,
            loading_type: "I",
            stock_seq: stock_seq,
            loading_floor: loading_floor,
            loading_position: loading_position,
            loading_manager: loading_manager,
            com_seq: com_seq
        })

        res.json(result)
    } catch (error) {
        console.error(error);
    }
})

module.exports = router