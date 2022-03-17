import React from "react";
import Link from "next/link";
import { Card, Grid, Button } from "semantic-ui-react";

import { ContributeForm } from "../../components/ContributeForm"
import { Campaign } from "../../contracts";
import web3 from "../../web3";

export default ({
  balance,
  manager,
  minimumContribution,
  requestsCount,
  approversCount,
  address
}) => {
  const items = [
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
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Campaign Balance (ether)",
      description:
        "The balance is how much money this campaign has left to spend.",
    },
  ];

  return (
    <React.Fragment>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.query;
  const campaign = new Campaign(address);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
}
