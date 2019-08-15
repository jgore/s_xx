import "babel-polyfill";
import chai, { assert } from "chai";
import server from "../index";
import chaiHttp from "chai-http";
import Company from "../models/company";
import Country from "../models/country";
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
      .get("/api/company/page/1")
      .end((err, res) => {
        validResponse(err, res, 200);
        expect(res.body).to.have.all.keys("companies", "numberOfCompanies");
        expect(res.body.companies).to.be.an("array");
        expect(res.body.numberOfCompanies).to.be.a("number");
        done();
      });
  });
});

describe("get company by id", function() {
  it("should return 200", function(done) {
    Company.find({}).then(companies => {
      chai
        .request(server)
        .get(`/api/company/${companies[0]._id}`)
        .end((err, res) => {
          validResponse(err, res, 200);
          expect(res.body).to.have.property("_id");
          expect(res.body._id).to.equal(companies[0]._id.toString());
          done();
        });
    });
  });

  it("should return 404", function(done) {
    chai
      .request(server)
      .get("/api/company/abc")
      .end((err, res) => {
        validResponse(err, res, 404);
        done();
      });
  });
});

describe("create new company", function() {
  let company = {
    nameOfCompany: "Transport Tech Service 10 ",
    name: "Marcin",
    surname: "Warzybok",
    taxNumber: "6793184304",
    plan: "Enterprise",
    email: "admin@teachtechservice.com",
    country: "PL"
  };
  it("should return 201 on creating company", function(done) {
    chai
      .request(server)
      .post("/api/company")
      .send(company)
      .end((err, res) => {
        validResponse(err, res, 201);
        done();
      });
  });

  it("should return 202 on foreign country", function(done) {
    chai
      .request(server)
      .post("/api/company")
      .send({
        ...company,
        country: "DE"
      })
      .end((err, res) => {
        validResponse(err, res, 202);
        expect(res.body).to.have.property("msg");
        done();
      });
  });

  it("should return 400 on missing required property", function(done) {
    let { email, ...wrongCompany } = company;
    chai
      .request(server)
      .post("/api/company")
      .send(wrongCompany)
      .end((err, res) => {
        validResponse(err, res, 400);
        done();
      });
  });

  it("should return 400 on missing country", function(done) {
    let { country, ...wrongCompany } = company;
    chai
      .request(server)
      .post("/api/company")
      .send(wrongCompany)
      .end((err, res) => {
        validResponse(err, res, 400);
        done();
      });
  });

  it("should return 400 on wrong country", function(done) {
    chai
      .request(server)
      .post("/api/company")
      .send({
        ...company,
        country: "XD"
      })
      .end((err, res) => {
        validResponse(err, res, 400);
        done();
      });
  });
});

describe("update company-info on existing company", function() {
  let update = {
    margin: 20
  };

  it("should return 200 on updating company", function(done) {
    Company.find({}).then(companies => {
      chai
        .request(server)
        .put(`/api/company/company-info/${companies[0]._id}`)
        .send({ update })
        .end((err, res) => {
          validResponse(err, res, 200);
          done();
        });
    });
  });

  it("should return 200 on correct country while update", function(done) {
    Company.find({}).then(companies => {
      chai
        .request(server)
        .put(`/api/company/company-info/${companies[0]._id}`)
        .send({ update: { ...update, country: "PL" } })
        .end((err, res) => {
          validResponse(err, res, 200);
          done();
        });
    });
  });

  it("should return 400 on unallowed property", function(done) {
    Company.find({}).then(companies => {
      chai
        .request(server)
        .put(`/api/company/company-info/${companies[0]._id}`)
        .send({ update: { ...update, abc: "unallowe property" } })
        .end((err, res) => {
          validResponse(err, res, 400);
          done();
        });
    });
  });

  it("should return 400 on missing company", function(done) {
    chai
      .request(server)
      .put(`/api/company/company-info/notworking`)
      .send({ update })
      .end((err, res) => {
        validResponse(err, res, 404);
        done();
      });
  });

  it("should return 400 on missing country while update", function(done) {
    Company.find({}).then(companies => {
      chai
        .request(server)
        .put(`/api/company/company-info/${companies[0]._id}`)
        .send({ update: { ...update, country: "XD" } })
        .end((err, res) => {
          validResponse(err, res, 400);
          done();
        });
    });
  });
});

describe("delete company by admin", function() {
  let company = {
    nameOfCompany: "Transport Tech Service 10 ",
    name: "Marcin",
    surname: "Warzybok",
    taxNumber: "6793184304",
    plan: "Enterprise",
    email: "admin@teachtechservice.com",
    _id: new Types.ObjectId()
  };

  it("should return 200 on delete", function(done) {
    Country.find({ name: "PL" }).then(country => {
      company.country = country._id;
      console.log(company);
      Company.create(company, function(savedCompany) {
        console.log(savedCompany);
        done();
      });
    });
  });
});

describe("delete company by company", function() {});

describe("update tax-info on existing company", function() {});

describe("update company email", function() {});
