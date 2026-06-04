export interface GuruCard {
  id: string;
  preferredPhrase: string;
}

export interface GuruCollection {
  id: string;
  name: string;
}

export interface GuruFolder {
  id: string;
  title: string;
}

export interface GuruUser {
  id: string;
  email: string;
  status: string;
}

export interface GuruGroup {
  id: string;
  name: string;
}

export interface GuruTeamMember {
  id: string;
  user: GuruUser;
}

export interface GuruWebhookSubscription {
  id: string;
  owner: Owner;
  filter: string; 
  status: "ENABLED" | "DISABLED";
  team: Team;
  dateCreated: string; 
  targetUrl: string;
  deliveryMode: "BATCH" | "IMMEDIATE"; 
  dateLastModified: string; 
}

export interface Owner {
  id: string;
  status: "ACTIVE" | "INACTIVE";
  email: string;
  lastName: string;
  firstName: string;
}

export interface Team {
  organization: Organization;
  topLevelOrganizationId: string;
  description: string;
  name: string;
  id: string;
  status: "ACTIVE" | "INACTIVE";
  dateCreated: string; 
  profilePicUrl: string;
}

export interface Organization {
  name: string;
  id: string;
}
