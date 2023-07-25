'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Twit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Twit.belongsTo(models.User) //---------------- Buat koneksi antar models atau tabel
      Twit.hasOne(models.Like)
    }
  }
  Twit.init({
    konten: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Image: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Twit',
    freezeTableName: true
  });
  return Twit;
};