const express = require('express')
const { Company, Client } = require('../models')

const router = express.Router()

router.get('/:comNum', async (req, res, next) => {
  try {
    const removeHyphens = req.params.comNum.replaceAll('-', '')
    const result = await Company.findAll({
      where: {
        com_business_num: removeHyphens
      }
    })
    console.log(result);
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

module.exports = router