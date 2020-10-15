const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');
var sequelize = require('../main');

class Admin extends Model {}

Admin.init({
  // 在这里定义模型属性
  articleId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    primaryKey: false,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  articleType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'tager'
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'Admin', // 我们需要选择模型名称
  freezeTableName: true
});
// (async function(){
//   await sequelize.sync({alter: true});
// })();
module.exports = Admin