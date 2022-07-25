//Require the dev-dependencies
const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

chai.use(chaiHttp);

describe("Server!", () => {
  it("welcomes user to the api", (done) => {
    chai
      .request(server)
      .get("/api/retailer/rewards")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.data).to.have.property("totalPointsPerCustomer");
        expect(res.body.data).to.have.property("totalPointsOfCustomerPerMonth");
        expect(res.body.data).to.have.property("transactionsList");
        done();
      });
  });
});
