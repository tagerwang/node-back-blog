const { Sequelize } = require('sequelize');
const {database, username, password, host} = require('../config');
const sequelize = new Sequelize(database, username, password, {
  define: {
    freezeTableName: true
  },
  host,
  dialect: 'mysql'/* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});
(async function(){
  await sequelize.sync();
})();
module.exports = sequelize
