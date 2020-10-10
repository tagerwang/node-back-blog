var express = require('express');
var router = express.Router();
const Admin = require('../db/model/Admin')
// 增
router.post('/create', async function(req, res, next) {
  const {title = '', desc = '', content = ''} = req.body
  if(!title || !desc || !content) {
    res.status(200).send({
      code: 100002,
      mag: '标题、描述或内容不能为空'
    })
    return 
  }
  let result = {}
  await Admin.create({ title, desc, content }).catch(err=>{
    if(err && err.original) {
      const {errno, sqlMessage} = err.original
      result.code = errno
      result.msg = sqlMessage
    }
  })
  res.send({code: result.code||200, msg: result.msg||'请求成功'});
});
// 删
router.post('/delete', async function(req, res, next) {
  const {articleId} = req.body
  let result = {}
  await Admin.destroy({
    where: {
      articleId
    }
  }).catch(err=>{
    if(err && err.original) {
      const {errno, sqlMessage} = err.original
      result.code = errno
      result.msg = sqlMessage
    }
  })
  res.send({code: result.code||200, msg: result.msg||'请求成功'});
});
// 改
router.post('/edit', async function(req, res, next) {
  const {articleId, title, desc, content, articleType} = req.body
  let updateData = {}
  title && (updateData.title = title)
  desc && (updateData.desc = desc)
  content && (updateData.content = content)
  articleType && (updateData.articleType = articleType)
  let result = {}
  await Admin.update(updateData,{
    where: {
      articleId
    }
  }).catch(err=>{
    if(err && err.original) {
      const {errno, sqlMessage} = err.original
      result.code = errno
      result.msg = sqlMessage
    }
  })
  res.send({code: result.code||200, msg: result.msg||'请求成功'});
});
// 查单条 或 列表
router.get('/detail/:id', async function(req, res, next) {
  let {id} = req.params
  if(!id) {
    res.send({code: 100002, msg: 'id错误'});
    return
  }
  let result = {}
  let where = {} 
  if(id != 0) {
    where.articleId = id
  }
  await Admin.findAll({where}).then(res=>{
    result.data = res//JSON.stringify(res, null, 2)
  }).catch(err=>{
    if(err && err.original) {
      const {errno, sqlMessage} = err.original
      result.code = errno
      result.msg = sqlMessage
    }
  })
  res.send({code: result.code||200, msg: result.msg||'请求成功', data: result.data||[]});
});

module.exports = router;
