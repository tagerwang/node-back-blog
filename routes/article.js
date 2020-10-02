var express = require('express');
var sequelize = require('../db/main');
var router = express.Router();

// 增
router.get('/crete', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 删
router.get('/delete', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 改
router.get('/edit', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 查
router.get('/detail/:id', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
