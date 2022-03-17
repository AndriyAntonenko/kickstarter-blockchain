import React, { useMemo } from "react";
import Link from "next/link";
import { Card } from "semantic-ui-react";

export const Campaigns = ({ campaigns = [] }) => {
  const items = useMemo(() => campaigns.map(address => ({
    header: address,
    description: (
      <Link href={`/campaigns/show?address=${address}`}>
        <a>View Campaign</a>
      </Link>
    ),
    fluid: true
  })), [campaigns]);

  return (
    <Card.Group items={items} />
  );
};
