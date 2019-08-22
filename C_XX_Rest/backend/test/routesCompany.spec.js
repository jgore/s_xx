import "babel-polyfill";
import chai, { assert } from "chai";
import server from "../index";
import chaiHttp from "chai-http";
import Serial from '../src/models/serial'
import { Types } from "mongoose";

const { expect } = chai;

chai.use(chaiHttp);

function validResponse(err, res, status) {
  expect(err).to.be.null;
  expect(res).to.have.status(status);
  expect(res).to.be.json;
  expect(res.body).to.be.an("object");
}

let serials = []

describe("get one page of companies", function() {
  beforeEach(() => {
    return new Promise((resolve) => {
      Serial.find({}).limit(600).then((docs) => {
        serials = docs.map((value) => {
          return value._id
        })
        resolve()
      })
    })
  })
  it("should return page with companies", function(done) {
    chai
      .request(server)
      .post("/api/get-drugs")
      .send()
      .end((err, res) => {
        validResponse(err, res, 200);
        done();
      });
  });
});