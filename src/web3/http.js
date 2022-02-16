import Web3 from "web3";

export function httpWeb3(host) {
  const provider = new Web3.providers.HttpProvider(host);
  return new Web3(provider);
}
