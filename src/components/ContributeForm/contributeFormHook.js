import { useState } from "react";

import { Campaign } from "../../contracts";
import web3 from "../../web3";

export const useContributeForm = (address) => {
  const [contributeAmount, setContributeAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const contribute = async () => {
    const campaign = new Campaign(address);
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: contributeAmount,
      });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    errorMessage,
    loading,
    setContributeAmount,
    contribute,
    contributeAmount
  };
};
