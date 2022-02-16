import web3 from "../web3";
import CampaignFactory from '../../ethereum/build/CampaignFactory.json'

const CAMPAIGN_FACTORY_ADDRESS = "0x6e1FD36Fe1df46c9Cf0A0C9aAcbA73B1AF534b9a";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  CAMPAIGN_FACTORY_ADDRESS
);

export default instance;
