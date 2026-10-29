import type https from "node:https";

export interface GitlabRequestTarget {
  baseUrl: string;
  headers: Record<string, string>;
  viaTunnel: boolean;
  httpsAgent?: https.Agent;
}
