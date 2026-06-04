import { getMicrosoftOAuth2AuthorizationCodeConnection } from "./OAuth2AuthorizationCodeConnection";
import { getMicrosoftCertificateCredentialsConnection } from "./OAuth2CertificateCredentialsConnection";
import { getMicrosoftOAuth2ClientCredentialsConnection } from "./OAuth2ClientCredentialsConnection";

export enum ConnectionKeys {
  SharedOauth = "oauth",
  SharepointTemplatedOauth = "sharepointTemplatedOauth",
  MsExcelOauth = "ms-excel-oauth",
  OauthClientCredentials = "oauthClientCredentials",
  CertificateCredentials = "certificateCredentials",
}

export default [
  getMicrosoftOAuth2AuthorizationCodeConnection,
  getMicrosoftOAuth2ClientCredentialsConnection,
  getMicrosoftCertificateCredentialsConnection,
];
