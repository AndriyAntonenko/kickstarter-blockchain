import React from "react";
import Link from "next/link";
import { Button, Table } from "semantic-ui-react";

import { RequestRow } from "../../../components/RequestRow";
import { Campaign } from "../../../contracts";

export default ({
  requests,
  approversCount,
  requestsCount,
  address
}) => {
  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <React.Fragment>
      <h3>Requests</h3>
      <Link href={`/campaigns/requests/new?address=${address}`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((request, id) => (
            <RequestRow 
              request={request}
              id={id}
              approversCount={approversCount}
              address={address}
            />
          ))}
        </Body>
      </Table>
      <div>Found {requestsCount} requests.</div>
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const { address } = context.query;
  const campaign = new Campaign(address);
  const [requestsCount, approversCount] = await Promise.all([
    campaign.methods.getRequestsCount().call(),
    campaign.methods.approversCount().call()
  ]);

  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((_, i) => campaign.methods.requests(i).call())
  );

  return {
    props: {
      requests: requests.map(({ description, value, complete, recipient, approvalCount }) => ({
        description, 
        value, 
        complete, 
        recipient, 
        approvalCount
      })),
      approversCount,
      requestsCount,
      address
    }
  };
}
