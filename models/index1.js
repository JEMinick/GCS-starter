'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
console.log( `basename: [${basename}]` );
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize1;
if (config.use_env_variable) {
  sequelize1 = new Sequelize(process.env[config.use_env_variable], config);
} else {
  console.log( `Utilizing Sequelize config as follows:` );
  console.log( `config: [${JSON.stringify(config)}]` );
  sequelize1 = new Sequelize(config.database, config.username, config.password, config);
  console.log( `\nThe 'sequelize instance contains the following:` );
  console.log( sequelize1 );
}

console.log( `\nPerforming a file search in [${__dirname}]...`)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = new sequelize1['import'](path.join(__dirname, file));
    db[model.name] = model;
    console.log( `db[${model.name}] : [${model}]` );
    const model1 = (path.join(__dirname, file));
    console.log( `const model = sequelize['import'](${model1})` );
    console.log( `db[model.name] = model` );
  });

console.log( `\n` );

Object.keys(db).forEach(modelName => {
  console.log( `db[${modelName}]` );
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize1;
db.Sequelize = Sequelize;

module.exports = db;
