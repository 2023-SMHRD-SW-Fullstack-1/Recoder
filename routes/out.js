const express = require('express')
const router = express.Router()
const db_config = require('../config/config')

const conn = db_config.init()
db_config.connect(conn)


// 출고 메인 페이지 => 출고될 리스트 조회
router.post('/main',(req,res)=>{

    

})

module.exports = router