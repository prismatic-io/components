import type { JiraApiOptions } from "jira-client";

export type JiraApiCustomOptions = JiraApiOptions & { auth: string };
