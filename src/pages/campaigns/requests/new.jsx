import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Button, Message, Input } from "semantic-ui-react";

import { Campaign } from "../../../contracts";
import web3 from "../../../web3";

export default ({ address }) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");

  const changeDescription = e => setDescription(e.target.value);
  const changeValue = e => setValue(e.target.value);
  const changeRecipient = e => setRecipient(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    const campaign = new Campaign(address);
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });

      router.push(`/campaigns/requests?address=${address}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Link href={`/campaigns/requests?address=${address}`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input value={description} onChange={changeDescription} />
        </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input value={value} onChange={changeValue} />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input value={recipient} onChange={changeRecipient} />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button primary loading={loading}>
            Create!
          </Button>
        </Form>
    </React.Fragment>
  );
};

export function getServerSideProps(context) {
  return {
    props: { address: context.query.address }
  };
}