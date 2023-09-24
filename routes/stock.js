const express = require('express')
const { fn, col } = require('sequelize');
const { Client, Company, Loading, Notice, Rack, Stock, User, Warehouse } = require('../models')

const router = express.Router()

// loading_type이 I인 데이터 전체 조회
router.get('/:com_seq', async (req, res, next) => {

  let com_seq = req.params.com_seq

  try {
    const result = await Loading.findAll({
      where: {
        com_seq: com_seq,
        loading_type: 'I',
      },
      include: [{
        model: Stock,
        include: [{
          model: Client
        }]
      }]
    })
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

module.exports = router