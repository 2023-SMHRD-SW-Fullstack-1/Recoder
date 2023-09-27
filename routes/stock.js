const express = require('express')
const { fn, col, Op } = require('sequelize');
const { Client, Company, Loading, Notice, Rack, Stock, User, Warehouse } = require('../models')

const router = express.Router()

// loading_type이 I인 데이터 전체 조회
router.get('/:com_seq', async (req, res, next) => {
  let com_seq = req.params.com_seq
  console.log("혹시 너니?");
  try {
    const result = await Loading.findAndCountAll({
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

// 페이지별로 데이터 조회
router.get('/:com_seq/:limit/:offset', async (req, res, next) => {
  let com_seq = req.params.com_seq
  let limit = parseInt(req.params.limit)
  let offset = parseInt(req.params.offset)

  console.log(limit, offset);

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
      }],
      offset: (offset - 1) * limit,
      limit: limit,
    })
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

router.get('/show/:comSeq', async (req, res) => {
  console.log("제발가져와주라");
  // let wh_seq = req.params.wh_seq
  try {
    const stockList = await Loading.findAll({
      // attributes: ['rack_x', 'rack_z', 'rack_width', 'rack_length', 'rack_floor'],
      where: {
        com_seq: req.params.comSeq,
        loading_type: 'I',
        loading_floor: {
          [Op.ne]: null
        }
      },
      include: [{
        model: Stock,
      }]
    })
    console.log('stock 가져오기', stockList);
    res.json(stockList)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/stockcount/:wh_seq', async (req, res) => {
  try {
    const result = await Warehouse.findAndCountAll({
      where: {
        wh_seq: parseInt(req.params.wh_seq)
      },
      include: [{
        model: Rack,
        include: [{
          model: Loading
        }]
      }]
    })
    res.send(`${result.count}`)
  } catch (error) {
    console.error(error);
  }
})

module.exports = router