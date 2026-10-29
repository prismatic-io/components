import { salesforceBasic } from "./salesforceBasic";
import { salesforceClientCredentials } from "./salesforceClientCredentials";
import { salesforceOAuth } from "./salesforceOauth";

export { salesforceBasic };
export { salesforceClientCredentials };
export { salesforceOAuth };

export default [salesforceOAuth, salesforceBasic, salesforceClientCredentials];
