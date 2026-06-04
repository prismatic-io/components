


export interface Order {
  purchaseOrderNumber: string;
  AmazonOrderId: string;
  PurchaseDate?: string;
  LastUpdateDate?: string;
  OrderStatus: string;
  FulfillmentChannel?: string;
  SalesChannel?: string;
  OrderChannel?: string;
  ShipServiceLevel?: string;
  OrderTotal?: {
    CurrencyCode: string;
    Amount: string;
  };
  billToParty: {
    name: string;
  };
  NumberOfItemsShipped?: number;
  NumberOfItemsUnshipped?: number;
  PaymentMethod?: string;
  PaymentMethodDetails?: string[];
  MarketplaceId?: string;
  ShipmentServiceLevelCategory?: string;
  OrderType?: string;
  EarliestShipDate?: string;
  LatestShipDate?: string;
  EarliestDeliveryDate?: string;
  LatestDeliveryDate?: string;
  IsBusinessOrder?: boolean;
  IsPrime?: boolean;
  IsGlobalExpressEnabled?: boolean;
  IsPremiumOrder?: boolean;
  IsSoldByAB?: boolean;
  IsIBA?: boolean;
  IsISPU?: boolean;
  IsAccessPointOrder?: boolean;
}

export interface OrdersResponse {
  Orders: Order[];
  NextToken?: string;
  CreatedBefore?: string;
}


export interface Feed {
  feedId: string;
  feedType: string;
  marketplaceIds?: string[];
  createdTime: string;
  processingStatus: string;
  processingStartTime?: string;
  processingEndTime?: string;
  resultFeedDocumentId?: string;
}

export interface FeedsResponse {
  feeds: Feed[];
  nextToken?: string;
}


export interface Destination {
  name: string;
  destinationId: string;
  resource: {
    sqs?: {
      arn: string;
    };
    eventBridge?: {
      accountId: string;
      region: string;
      name: string;
    };
  };
}

export interface DestinationsResponse {
  destinations: Destination[];
}


export interface Subscription {
  subscriptionId: string;
  payloadVersion: string;
  destinationId: string;
  processingDirective?: {
    eventFilter?: {
      eventFilterType: string;
      marketplaceIds?: string[];
      orderChangeTypes?: string[];
    };
  };
}

export interface SubscriptionsResponse {
  subscriptions: Subscription[];
}
