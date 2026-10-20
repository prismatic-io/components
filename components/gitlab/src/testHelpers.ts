import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { accessToken, oauth2 } from "./connections";
export const GITLAB_URL = "https://gitlab.example.com";
export const accessTokenConnection = createConnection(accessToken, {
  gitlabUrl: GITLAB_URL,
  accessToken: "glpat-test-token",
});
export const oauthConnection = createConnection(
  oauth2,
  { gitlabUrl: GITLAB_URL },
  { access_token: "oauth-test-token" },
);
export const onPremConnectionValue = (fields: Record<string, unknown>) =>
  createConnection(accessToken, {
    gitlabUrl: "https://gitlab.test",
    accessToken: "glpat-test-token",
    ignoreSslErrors: false,
    ...fields,
  });
export const onPremOauthConnectionValue = (fields: Record<string, unknown>) =>
  createConnection(
    oauth2,
    { gitlabUrl: "https://gitlab.test", ignoreSslErrors: false, ...fields },
    { access_token: "oauth-test-token" },
  );
