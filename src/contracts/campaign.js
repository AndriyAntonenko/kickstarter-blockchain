import web3 from "../web3";
import Campaign from "../../ethereum/build/Campaign.json";

export default class CampaignExtended extends web3.eth.Contract {
  constructor(address) {
    super(JSON.parse(Campaign.interface), address);
  }
}
