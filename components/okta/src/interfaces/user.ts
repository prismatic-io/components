export interface User {
  id: string;
  status: string;
  created: string;
  activated: boolean | string | null;
  statusChanged: boolean | string | null;
  lastLogin: string;
  lastUpdated: string;
  passwordChanged: string;
  type: Type;
  profile: Profile;
  realmId: string;
  credentials: Credentials;
  _links: Links;
}

export interface Links {
  self: Self;
}

export type Self = Record<string, unknown>;

export interface Credentials {
  password: Self;
  provider: Self;
}

export interface Profile {
  firstName: string;
  lastName: string;
  mobilePhone: string | string | null;
  secondEmail: string | string | null;
  login: string;
  email: string;
}

export interface Type {
  id: string;
}

export interface UserType {
  id: string;
  displayName: string;
  name: string;
  description: string;
  createdBy: string;
  lastUpdatedBy: string;
  created: string;
  lastUpdated: string;
  default: boolean;
}

export interface Factor {
  id: string;
  factorType: string;
  provider: string;
  vendorName: string;
  status: string;
  created: string;
  lastUpdated: string;
  profile: FactorProfile;
  _links: FactorLinks;
}

interface FactorLinks {
  questions: HintsLink;
  self: HintsLink;
  user: HintsLink;
}

interface HintsLink {
  href: string;
  hints: Hint;
}

interface Hint {
  allow: string[];
}

interface FactorProfile {
  question: string;
  questionText: string;
}
