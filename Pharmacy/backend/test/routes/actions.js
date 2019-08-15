import "babel-polyfill";
import chai, { assert } from "chai";
import server from "../index";
import chaiHttp from "chai-http";
import { Types } from "mongoose";

const { expect } = chai;

chai.use(chaiHttp);

function validResponse(err, res, status) {
  expect(err).to.be.null;
  expect(res).to.have.status(status);
  expect(res).to.be.json;
  expect(res.body).to.be.an("object");
}

describe("get one page of companies", function() {
  it("should return page with companies", function(done) {
    chai
      .request(server)
      .get("/api/actions/")
      .end((err, res) => {
        validResponse(err, res, 200);
        
        done();
      });
  });
});
