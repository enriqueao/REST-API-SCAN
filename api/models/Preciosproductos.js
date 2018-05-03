/**
 * Preciosproductos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'productsprices',
  attributes: {
    idPrice: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      columnName: 'idPrice'
    },
    price: {
      type: 'float',
      columnName: 'price'
    },
    idMarket: {
      type: 'integer',
      columnName: 'idMarket'
    },
    numofconfirms: {
      type: 'integer',
      defaultsTo: 10,
      columnName: 'numofconfirms'
    }
  }
};
