export const getItems = ({
  manager,
  minimumContribution,
  requestsCount,
  approversCount,
  balance
}) => ([
  {
    header: manager,
    meta: "Address of Manager",
    description:
      "The manager created this campaign and can create requests to withdraw money",
    style: { overflowWrap: "break-word" },
  },
  {
    header: minimumContribution,
    meta: "Minimum Contribution (wei)",
    description:
      "You must contribute at least this much wei to become an approver",
  },
  {
    header: requestsCount,
    meta: "Number of Requests",
    description:
      "A request tries to withdraw money from the contract. Requests must be approved by approvers",
  },
  {
    header: approversCount,
    meta: "Number of Approvers",
    description:
      "Number of people who have already donated to this campaign",
  },
  {
    header: balance,
    meta: "Campaign Balance (ether)",
    description:
      "The balance is how much money this campaign has left to spend.",
  },
]);
