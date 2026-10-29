import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listOrdersExamplePayload } from "../../examplePayloads/orders";
import {
  ActualFulfillmentSupplySourceId,
  AmazonOrderIds,
  BuyerEmail,
  CreatedAfter,
  CreatedBefore,
  connectionInput,
  EasyShipShipmentStatuses,
  ElectronicInvoiceStatuses,
  FulfillmentChannels,
  IsISPU,
  LastUpdatedAfter,
  LastUpdatedBefore,
  MarketplaceIds,
  MaxResultsPerPage,
  NextToken,
  OrderStatuses,
  PaymentMethods,
  SellerOrderId,
  StoreChainStoreId,
} from "../../inputs";

export const listOrders = action({
  display: {
    label: "List Orders",
    description:
      "Returns orders created or updated during the time frame indicated by the specified parameters.",
  },
  examplePayload: listOrdersExamplePayload,
  inputs: {
    connectionInput,
    MarketplaceIds,
    CreatedAfter,
    CreatedBefore,
    LastUpdatedAfter,
    LastUpdatedBefore,
    OrderStatuses,
    FulfillmentChannels,
    PaymentMethods,
    BuyerEmail,
    SellerOrderId,
    MaxResultsPerPage,
    EasyShipShipmentStatuses,
    ElectronicInvoiceStatuses,
    NextToken,
    AmazonOrderIds,
    ActualFulfillmentSupplySourceId,
    IsISPU,
    StoreChainStoreId,
  },
  perform: async (
    context,
    {
      connectionInput,
      CreatedAfter,
      CreatedBefore,
      LastUpdatedAfter,
      LastUpdatedBefore,
      OrderStatuses,
      FulfillmentChannels,
      PaymentMethods,
      BuyerEmail,
      SellerOrderId,
      MaxResultsPerPage,
      EasyShipShipmentStatuses,
      ElectronicInvoiceStatuses,
      NextToken,
      AmazonOrderIds,
      ActualFulfillmentSupplySourceId,
      IsISPU,
      StoreChainStoreId,
      MarketplaceIds,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get("/orders/v0/orders", {
      params: {
        MarketplaceIds: MarketplaceIds || undefined,
        CreatedAfter: CreatedAfter || undefined,
        CreatedBefore: CreatedBefore || undefined,
        LastUpdatedAfter: LastUpdatedAfter || undefined,
        LastUpdatedBefore: LastUpdatedBefore || undefined,
        OrderStatuses: OrderStatuses || undefined,
        FulfillmentChannels: FulfillmentChannels || undefined,
        PaymentMethods: PaymentMethods || undefined,
        BuyerEmail: BuyerEmail || undefined,
        SellerOrderId: SellerOrderId || undefined,
        MaxResultsPerPage: MaxResultsPerPage || undefined,
        EasyShipShipmentStatuses: EasyShipShipmentStatuses || undefined,
        ElectronicInvoiceStatuses: ElectronicInvoiceStatuses || undefined,
        NextToken: NextToken || undefined,
        AmazonOrderIds: AmazonOrderIds || undefined,
        ActualFulfillmentSupplySourceId:
          ActualFulfillmentSupplySourceId || undefined,
        IsISPU: IsISPU || undefined,
        StoreChainStoreId: StoreChainStoreId || undefined,
      },
    });
    return {
      data,
    };
  },
});
