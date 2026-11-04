interface Card {
  cardName: string;
  cardID: string;
}

export interface CardsResponse {
  domainCardList: Card[];
}
