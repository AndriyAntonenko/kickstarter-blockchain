const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({ 
    from: accounts[0],
    gas: "1000000"
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress,
  );
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(factory.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });

    const isApprover = await campaign.methods.approvers(accounts[1]).call();
    
    assert.ok(isApprover);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "50",
        from: accounts[1]
      });
      assert.ok(false);
    } catch (error) {
      assert.ok(error);
    }
  });

  it("allows a manager to make a payment request", async () => {
    const expectedDescription = "Buy batteries";
    const expectedAmount = "100";

    await campaign.methods
      .createRequest(expectedDescription, expectedAmount, accounts[2])
      .send({
        from: accounts[0], // manager address
        gas: "1000000"
      });

    const request = await campaign.methods.requests(0).call();

    assert.equal(request.description, expectedDescription);
    assert.equal(request.value, expectedAmount);
  });

  it("processes request", async () => {
    await campaign.methods.contribute().send({
      from: accounts[3],
      value: web3.utils.toWei("10", "ether")
    });

    await campaign.methods
      .createRequest("I need employees", web3.utils.toWei("5", "ether"), accounts[4])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[3],
      gas: "1000000"
    });

    let recipientStartBalance = await web3.eth.getBalance(accounts[4]);
    recipientStartBalance = web3.utils.fromWei(recipientStartBalance, "ether");
    recipientStartBalance = parseFloat(recipientStartBalance);

    await campaign.methods.finalyzeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let recipientBalance = await web3.eth.getBalance(accounts[4]);
    recipientBalance = web3.utils.fromWei(recipientBalance, "ether");
    recipientBalance = parseFloat(recipientBalance);

    assert.ok(Math.ceil(recipientBalance - recipientStartBalance) === 5);
  });
});
