import React from "react";

import { CampaignDetails } from "../../components/CampaignDetails"
import { Campaign } from "../../contracts";

export default (props) => {
  return (
    <React.Fragment>
      <h3>Campaign Show</h3>
      <CampaignDetails {...props}/>
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
