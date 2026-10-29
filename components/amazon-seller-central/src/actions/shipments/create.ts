import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createShipmentExamplePayload } from "../../examplePayloads/shipments";
import {
  AmazonOrderId,
  connectionInput,
  HazmatType,
  IncludePackingSlipWithLabel,
  ItemList,
  LabelCustomization,
  MustArriveByDate,
  PackageDimensions,
  SellerOrderId,
  ShipDate,
  ShipFromAddress,
  ShipmentLevelSellerInputsList,
  ShippingServiceId,
  ShippingServiceOfferId,
  ShippingServiceOptions,
  Weight,
} from "../../inputs";

export const createShipment = action({
  display: {
    label: "Create Shipment",
    description: "Create a shipment with the information provided.",
  },
  examplePayload: createShipmentExamplePayload,
  inputs: {
    connectionInput,
    AmazonOrderId,
    SellerOrderId: {
      ...SellerOrderId,
      required: false,
      comments: "A seller-defined order identifier.",
    },
    ItemList,
    ShipFromAddress,
    PackageDimensions,
    Weight,
    MustArriveByDate,
    ShipDate,
    ShippingServiceOptions,
    LabelCustomization,
    ShippingServiceId,
    ShippingServiceOfferId,
    HazmatType,
    IncludePackingSlipWithLabel,
    ShipmentLevelSellerInputsList,
  },
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
      MustArriveByDate,
      ShipDate,
      ShippingServiceOptions,
      LabelCustomization,
      ShippingServiceId,
      ShippingServiceOfferId,
      HazmatType,
      IncludePackingSlipWithLabel,
      ShipmentLevelSellerInputsList,
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
        MustArriveByDate: MustArriveByDate || undefined,
        ShipDate: ShipDate || undefined,
        ShippingServiceOptions: ShippingServiceOptions || undefined,
        LabelCustomization: LabelCustomization || undefined,
      },
      ShippingServiceId: ShippingServiceId || undefined,
      ShippingServiceOfferId: ShippingServiceOfferId || undefined,
      HazmatType: HazmatType || undefined,
      LabelFormatOption: {
        IncludePackingSlipWithLabel,
      },
      ShipmentLevelSellerInputsList,
    });
    return {
      data,
    };
  },
});
