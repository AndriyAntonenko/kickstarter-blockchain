pragma solidity ^0.4.17;

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign(uint minimumContribution) public {
    address newCampaign = new Campaign(minimumContribution, msg.sender);
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address[]) {
    return deployedCampaigns;
  }
}

contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    mapping(address => bool) approvals;
    uint approvalCount;
  }

  address public manager;
  uint public minimumContribution;
  mapping(address => bool) public approvers;
  uint public approversCount;
  Request[] public requests;

  modifier restricted() {
    require(msg.sender == manager); 
    _;
  }

  constructor(uint minContribution, address creator) public {
    manager = creator;
    minimumContribution = minContribution;
    approversCount = 0;
  }

  function contribute() public payable {
    require(msg.value > minimumContribution);
    approvers[msg.sender] = true;
    approversCount++;
  }

  function createRequest(string description, uint amount, address recipient) public restricted {
    Request memory newRequest = Request({
        description: description,
        value: amount,
        recipient: recipient,
        complete: false,
        approvalCount: 0
    });

    requests.push(newRequest);
  }

  function approveRequest(uint requestIndex) public {
    Request storage currentRequest = requests[requestIndex];

    require(approvers[msg.sender]);
    require(!currentRequest.approvals[msg.sender]);

    currentRequest.approvals[msg.sender] = true;
    currentRequest.approvalCount++;
  }

  function finalyzeRequest(uint requestIndex) public restricted {
    Request storage currentRequest = requests[requestIndex];

    require(!currentRequest.complete);
    // at least 50% of contributors have to approve request
    require(currentRequest.approvalCount > (approversCount / 2));

    currentRequest.recipient.transfer(currentRequest.value);
    currentRequest.complete = true;
  }

  function getSummary() public view returns (
    uint, uint, uint, uint, address
  ) {
    return (
      minimumContribution,
      this.balance,
      requests.length,
      approversCount,
      manager
    );
  }
    
  function getRequestsCount() public view returns (uint) {
    return requests.length;
  }
}
