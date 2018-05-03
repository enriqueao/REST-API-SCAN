/**
 * Tiendas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  tableName: 'markets',
  attributes: {
    idMarket: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      columnName: 'idMarket'
    },
    marketname: {
      type: 'string',
      size: 30,
      columnName: 'marketname'
    }
  }
};
