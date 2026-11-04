interface Policy {
  name: string;
  id: string;
}

export interface PoliciesResponse {
  policyList: Policy[];
}
