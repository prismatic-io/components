import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listOrdersExamplePayload } from "../../examplePayloads/orders";
import { listOrdersInputs } from "../../inputs";
import { listOrdersOutputSchema } from "../../outputSchemas";

export const listOrders = action({
  display: {
    label: "List Orders",
    description:
      "Returns orders created or updated during the time frame indicated by the specified parameters.",
  },
  examplePayload: listOrdersExamplePayload,
  inputs: listOrdersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOrdersOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    {
      connectionInput,
      CreatedAfter,
      LastUpdatedAfter,
      OrderStatuses,
      FulfillmentChannels,
      PaymentMethods,
      SellerOrderId,
      EasyShipShipmentStatuses,
      ElectronicInvoiceStatuses,
      AmazonOrderIds,
      ActualFulfillmentSupplySourceId,
      StoreChainStoreId,
      MarketplaceIds,
      pagination,
      filters,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get("/orders/v0/orders", {
      params: {
        MarketplaceIds: MarketplaceIds || undefined,
        CreatedAfter: CreatedAfter || undefined,
        CreatedBefore: filters.CreatedBefore || undefined,
        LastUpdatedAfter: LastUpdatedAfter || undefined,
        LastUpdatedBefore: filters.LastUpdatedBefore || undefined,
        OrderStatuses: OrderStatuses || undefined,
        FulfillmentChannels: FulfillmentChannels || undefined,
        PaymentMethods: PaymentMethods || undefined,
        BuyerEmail: filters.BuyerEmail || undefined,
        SellerOrderId: SellerOrderId || undefined,
        MaxResultsPerPage: pagination.MaxResultsPerPage || undefined,
        EasyShipShipmentStatuses: EasyShipShipmentStatuses || undefined,
        ElectronicInvoiceStatuses: ElectronicInvoiceStatuses || undefined,
        NextToken: pagination.NextToken || undefined,
        AmazonOrderIds: AmazonOrderIds || undefined,
        ActualFulfillmentSupplySourceId:
          ActualFulfillmentSupplySourceId || undefined,
        IsISPU: filters.IsISPU || undefined,
        StoreChainStoreId: StoreChainStoreId || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => listOrdersExamplePayload,
});
