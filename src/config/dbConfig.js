import { Sequelize } from "sequelize";
import path from "path";

let sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    pool: {
      min: 1,
      max: 5,
      idle: 5000
    },
    logging: false
  }
);

const models = {
  User: sequelize.import(path.join(__dirname, "../models/users.js"))
};

Object.keys(models).forEach(function(key) {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
