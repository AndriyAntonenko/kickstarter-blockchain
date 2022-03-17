import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Input, Message, Button } from "semantic-ui-react";

import { useContributeForm } from "./contributeFormHook"

export const ContributeForm = ({ address }) => {
  const router = useRouter();
  const { 
    errorMessage, 
    setContributeAmount, 
    loading, 
    contribute, 
    contributeAmount 
  } = useContributeForm(address);

  const onSubmit = async (e) => {
    e.preventDefault();
    await contribute();
    router.replace(`/campaigns/show?address=${address}`);
  };

  const changeContributeAmount = (e) => setContributeAmount(e.target.value);

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={contributeAmount}
          onChange={changeContributeAmount}
          label="wei"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};
