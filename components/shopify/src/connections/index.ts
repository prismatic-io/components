import { adminApiAccessToken } from "./adminApiAccessToken";
import { shopifyConnection } from "./oauth2";
import { shopifyTemplatedConnection } from "./oauth2DynamicInputs";
export { adminApiAccessToken } from "./adminApiAccessToken";
export { shopifyConnection } from "./oauth2";
export { shopifyTemplatedConnection } from "./oauth2DynamicInputs";
export default [
  shopifyTemplatedConnection,
  shopifyConnection,
  adminApiAccessToken,
];
