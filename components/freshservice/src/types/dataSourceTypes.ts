export interface Agent {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Asset {
  display_id: number;
  name: string;
  asset_tag: string;
}

export interface Problem {
  id: number;
  subject: string;
}

export interface Requester {
  id: number;
  first_name: string;
  last_name: string;
  primary_email: string;
}

export interface Software {
  id: number;
  name: string;
}

export interface Ticket {
  id: number;
  subject: string;
}

export interface Workspace {
  id: number;
  name: string;
}

export type AgentsResponse = { agents: Agent[] };
export type AssetsResponse = { assets: Asset[] };
export type ProblemsResponse = { problems: Problem[] };
export type RequestersResponse = { requesters: Requester[] };
export type SoftwareResponse = { applications: Software[] };
export type TicketsResponse = { tickets: Ticket[] };
export type WorkspacesResponse = { workspaces: Workspace[] };
