export interface Realm {
  id: string;
  created: string;
  lastUpdated: string;
  isDefault: boolean;
  profile: Profile;
  _links: Links;
}

interface Links {
  self: Record<string, string>;
}

interface Profile {
  name: string;
  realmType: string;
  domains: string[];
}

export interface GlobalCache {
  accessToken: string;
  expiresDate: number;
}
