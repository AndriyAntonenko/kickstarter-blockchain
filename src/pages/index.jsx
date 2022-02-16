import React from "react";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import { CampaignFactory } from "../contracts";
import { Campaigns } from '../components/Campaigns'

export default ({ campaigns }) => {
  return (
    <div>
      <h3>Open Campaigns</h3>
      <Link href="/campaigns/new">
        <a>
          <Button
            floated="right"
            content="Create Campaign"
            icon="add circle"
            primary
          />
        </a>
      </Link>
      {<Campaigns campaigns={campaigns} />}
    </div>
  );
};

export async function getStaticProps() {
  const campaigns = await CampaignFactory.methods.getDeployedCampaigns().call();
  return {
    props: { campaigns },
  };
};
