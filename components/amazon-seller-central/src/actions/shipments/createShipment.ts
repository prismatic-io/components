import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createShipmentExamplePayload } from "../../examplePayloads/shipments";
import { createShipmentInputs } from "../../inputs";
import { createShipmentOutputSchema } from "../../outputSchemas";

export const createShipment = action({
  display: {
    label: "Create Shipment",
    description: "Creates a shipment with the information provided.",
  },
  examplePayload: createShipmentExamplePayload,
  inputs: createShipmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createShipmentOutputSchema,
  }),
  performSafety: PerformSafety.NOT_ALLOWED,
  perform: async (
    context,
    {
      connectionInput,
      AmazonOrderId,
      SellerOrderId,
      ItemList,
      ShipFromAddress,
      PackageDimensions,
      Weight,
      ShipDate,
      ShippingServiceOptions,
      LabelCustomization,
      ShippingServiceId,
      ShippingServiceOfferId,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post("/mfn/v0/shipments", {
      ShipmentRequestDetails: {
        AmazonOrderId: AmazonOrderId || undefined,
        SellerOrderId: SellerOrderId || undefined,
        ItemList: ItemList || undefined,
        ShipFromAddress: ShipFromAddress || undefined,
        PackageDimensions: PackageDimensions || undefined,
        Weight: Weight || undefined,
        MustArriveByDate: additionalFields.MustArriveByDate || undefined,
        ShipDate: ShipDate || undefined,
        ShippingServiceOptions: ShippingServiceOptions || undefined,
        LabelCustomization: LabelCustomization || undefined,
      },
      ShippingServiceId: ShippingServiceId || undefined,
      ShippingServiceOfferId: ShippingServiceOfferId || undefined,
      HazmatType: additionalFields.HazmatType || undefined,
      LabelFormatOption: {
        IncludePackingSlipWithLabel:
          additionalFields.IncludePackingSlipWithLabel,
      },
      ShipmentLevelSellerInputsList:
        additionalFields.ShipmentLevelSellerInputsList,
    });
    return {
      data,
    };
  },
  examplePerform: async () => createShipmentExamplePayload,
});
