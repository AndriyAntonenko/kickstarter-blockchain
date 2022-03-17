import web3 from "../web3";
import CampaignFactory from '../../ethereum/build/CampaignFactory.json'

const CAMPAIGN_FACTORY_ADDRESS = "0x8C8D8157f262ADf1b8f8ed32864223eA0E26518e";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  CAMPAIGN_FACTORY_ADDRESS
);

export default instance;
