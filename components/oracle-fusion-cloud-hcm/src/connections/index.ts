import { basicAuthConnection } from "./basicAuth";
import { oauth2ClientCredentialsConnection } from "./oauth2ClientCredentials";
export { basicAuthConnection } from "./basicAuth";
export { oauth2ClientCredentialsConnection } from "./oauth2ClientCredentials";
export default [oauth2ClientCredentialsConnection, basicAuthConnection];
