export interface Group {
  id: string;
  created: string;
  lastUpdated: string;
  lastMembershipUpdated: string;
  objectClass: string[];
  type: string;
  profile: Profile;
  _links: Links;
}

export interface Links {
  logo: Logo[];
  users: Apps;
  apps: Apps;
}

export interface Apps {
  href: string;
}

export interface Logo {
  name: string;
  href: string;
  type: string;
}

export interface Profile {
  name: string;
  description: string;
}
