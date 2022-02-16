import Web3 from "web3";

export function browserWeb3() {
  window.ethereum.request({ method: "eth_requestAccounts" });
  return new Web3(window.ethereum);
}
