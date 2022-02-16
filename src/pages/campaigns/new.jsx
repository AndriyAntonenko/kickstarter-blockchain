import React, { useState } from "react";
import { useRouter } from "next/router"
import { Form, Button, Input, Message, FormField } from "semantic-ui-react";
import { CampaignFactory } from "../../contracts";
import web3 from "../../web3";

export default () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await CampaignFactory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });

        router.push("/")
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false)
    }
  };

  const changeContribution = (e) => setMinimumContribution(e.target.value);

  return (
    <React.Fragment>
      <h3>Create Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <FormField>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={changeContribution}
          />
        </FormField>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </React.Fragment>
  );
};
