import { browserWeb3 } from './browser';
import { httpWeb3 } from './http';

export default typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  ? browserWeb3()
  : httpWeb3(process.env.DEPLOY_LINK);
