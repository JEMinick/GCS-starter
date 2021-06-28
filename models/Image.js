// const { DataTypes } = require('sequelize');
// module.exports = function( sequelize, datatypes ) {
//   let Image = sequelize.define( "Image", {
//     image_name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     Image: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   })
//   return Image;
// }

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Image extends Model {}

Image.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0
  },
  image_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'Image'
});

module.exports = Image;
