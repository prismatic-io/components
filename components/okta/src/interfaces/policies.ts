export interface Policy {
  type: string;
  id: string;
  status: string;
  name: string;
  description: string;
  priority: number;
  system: boolean;
  conditions: string | null;
  created: string;
  lastUpdated: string;
  _links: Links;
}

interface Links {
  self: Rules;
  rules: Rules;
}

interface Rules {
  href: string;
  hints: Hints;
}

interface Hints {
  allow: string[];
}
