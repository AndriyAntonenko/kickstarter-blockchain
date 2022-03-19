import React from "react";
import Link from "next/link";
import { Card, Grid, Button } from "semantic-ui-react";

import { getItems } from "./content";
import { ContributeForm } from "../ContributeForm";
import web3 from "../../web3";

export const CampaignDetails = ({
  balance,
  manager,
  minimumContribution,
  requestsCount,
  approversCount,
  address
}) => {
  const items = getItems({ 
    manager, 
    minimumContribution, 
    requestsCount, 
    approversCount,
    balance: web3.utils.fromWei(balance, "ether"),
  });

  return (
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
          <Link href={`/campaigns/requests?address=${address}`}>
            <a>
              <Button primary>View Requests</Button>
            </a>
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
