import models from "../config/dbConfig";
import Sequelize from "sequelize";

export function createUser(newUser) {
  return new Promise((resolve, reject) => {
    models.User.create(newUser)
      .then(user => {
        resolve(user);
      })
      .catch(Sequelize.UniqueConstraintError, err => {
        reject({
          error: "Unique Field Error",
          payload: {
            msg:
              "This account is occupied, this client doesn not service checking unique"
          }
        });
      })
      .catch(Sequelize.ValidationError, err => {
        let payload = [];
        for (let i = 0; i < err.errors.length; i++) {
          let currentError = err.errors[i];
          payload.push({
            path: currentError.path,
            origin: currentError.value,
            problem: currentError.validatorKey
          });
        }
        reject({ error: "Validation Error", payload });
      })
      .catch(err => {
        reject({ error: "Unhandled Error" });
      });
  });
}
