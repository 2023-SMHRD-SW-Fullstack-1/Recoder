const express = require('express')
const router = express.Router()
const User = require('../models/user');


// 출고 메인 페이지 => 출고될 리스트 조회
router.get('/create',(req,res)=>{


    const result = User.create({ // 생성된 쿼리 결과를 얻는다.
    
        user_id: '23',
        user_pw: "123",
        user_authority:"U"

    });

    res.send('성공!')

})

module.exports = router