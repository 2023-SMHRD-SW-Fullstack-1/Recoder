const express = require('express')
const router = express.Router()
// const User = require('../models/user');
const { User, Warehouse, Rack, Loading, Stock } = require('../models'); // 모델들을 import



// 출고 메인 페이지 => 출고될 리스트 조회
router.post('/main',async(req,res)=>{

 
try {
    const result = await User.findOne({
      where: { user_id: 'user_id 001' },
      include: [
        {
          model: Warehouse,
          include: [
            {
              model: Rack,
              include: [
                {
                  model: Loading,
                  include: [
                    {
                      model: Stock,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  
    if (result) {
      // 결과를 클라이언트에 응답으로 보내줍니다.
      console.log('결과', result);
      res.json(result);
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