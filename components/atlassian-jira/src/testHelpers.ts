import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { jiraBasicConnection } from "./connections";

export const JIRA_HOST = "example.atlassian.net";

export const basicConnection = () =>
  createConnection(jiraBasicConnection, {
    host: JIRA_HOST,
    username: "user@example.com",
    password: "api-token",
    version: "3",
  });

export const jiraApi = () => nock(`https://${JIRA_HOST}`);
