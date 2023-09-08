const express = require('express')
const router = express.Router()
// const User = require('../models/user');
const { User, Warehouse, Rack, Loading, Stock, Company } = require('../models'); // 모델들을 import



// 출고 메인 페이지 => 출고될 리스트 조회
router.post('/main',async(req,res)=>{
    let { id } = req.body;

 
    try {        
        const loadings = await User.findAll({
            where: {
                user_id: id
            },
            include: [{
                model: Company,
                include: [{
                    model: Loading
                }]
            }]
        })

  
    if (loadings) {
      // 결과를 클라이언트에 응답으로 보내줍니다.
      console.log('결과', loadings);
      res.json(loadings);
    } else {
      // 데이터가 없을 경우, 적절한 응답을 보내줍니다.
      console.log('데이터가 없습니다.');
      res.status(404).json({ error: '데이터가 없습니다.' });
    }
  } catch (err) {
    console.log('/main 에러', err);
    res.status(500).json({ error: '서버 오류 발생' });
  }

})
module.exports = router