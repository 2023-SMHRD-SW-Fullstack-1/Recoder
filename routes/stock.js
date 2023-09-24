const express = require('express')
const { fn, col } = require('sequelize');
const { Client, Company, Loading, Notice, Rack, Stock, User, Warehouse } = require('../models')

const router = express.Router()

router.get('/', async (req, res, next) => {

  let com_seq = 1004

  try {
    const result = await Warehouse.findAll({
      attributes: ['wh_seq', 'wh_name'],
      where: {
        com_seq: com_seq
      },
      include: [{
        model: Rack,
        attributes: ['rack_seq'],
        include: [{
          model: Loading,
          where: {
            out_created_at: null
          },
          include: [{
            model: Stock,
          }]
        }]
      }],
    })
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

module.exports = router