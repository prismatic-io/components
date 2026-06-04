export interface Cards {
  domainCardList: Card[];
}

export interface Card {
  cardName: string;
  cardID: string;
}

export interface Policies {
  policyList: Policy[];
}

export interface Policy {
  name: string;
  id: string;
}
