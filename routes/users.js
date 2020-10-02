var express = require('express');
var router = express.Router();
const User = require('../db/model/User')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 注册
router.post('/register', async function(req, res, next) {
  const {name = '', password = ''} = req.body
  if(!/^[\s\S]{2,20}$/.test(name)) {
    res.status(200).send({
      code: 100001,
      mag: '用户名为2-20个字符'
    })
    return
  }
  if(!(/^[\s\S]{2,20}$/.test(name) && /^(\w){6,20}$/.test(password))) {
    res.status(200).send({
      code: 100002,
      mag: '密码为6-20个字符'
    })
    return
  }
  let result = {}
  await User.create({ name, password }).catch(err=>{
    if(err && err.original) {
      const {errno, sqlMessage} = err.original
      result.code = errno
      result.msg = sqlMessage
    }
  })
  res.send({code: result.code||200, msg: result.msg||'请求成功'});
});

// 登陆
router.post('/login', async function(req, res, next) {
  const {name = '', password = ''} = req.body
  let result = {}
  const getData = await User.findAll({
    attributes: ['name', 'password'],
    where: {
      name,
      password
    }
  }).catch(err=>{
    if(err && err.original) {
      const {errno, sqlMessage} = err.original
      result.code = errno
      result.msg = sqlMessage
    }
  })
  console.log(typeof getData)
  if(Array.isArray(getData) && !getData.length) {
    result.code = '100003'
    result.msg = '用户名或密码错误'
  }
  res.send({code: result.code||200, msg: result.msg||'请求成功'});
})

module.exports = router;
