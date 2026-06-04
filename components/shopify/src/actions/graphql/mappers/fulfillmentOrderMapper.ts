import { getNumericId } from "../../../util";
import type { FulfillmentOrder } from "../../interfaces/FulfillmentOrder";

export const fulfillmentOrderMapper = (fulfillmentOrder: FulfillmentOrder) => {
  const fulfillmentOrderId = fulfillmentOrder.id ? getNumericId(fulfillmentOrder.id) : null;
  const orderId = fulfillmentOrder.orderId ? getNumericId(fulfillmentOrder.orderId) : null;

  const destinationId = fulfillmentOrder.destination.id
    ? getNumericId(fulfillmentOrder.destination.id)
    : null;
  return {
    id: fulfillmentOrderId,

    order_id: orderId,

    request_status: fulfillmentOrder.requestStatus
      ? fulfillmentOrder.requestStatus.toLowerCase()
      : null,
    status: fulfillmentOrder.status ? fulfillmentOrder.status.toLowerCase() : null,
    supported_actions: (fulfillmentOrder.supportedActions || []).map(
      (supportedAction) => supportedAction.action,
    ),
    destination: fulfillmentOrder.destination
      ? {
          id: destinationId,
          address1: fulfillmentOrder.destination.address1 ?? null,
          address2: fulfillmentOrder.destination.address2 ?? null,
          city: fulfillmentOrder.destination.city ?? null,
          company: fulfillmentOrder.destination.company ?? null,
          country: fulfillmentOrder.destination.countryCode ?? null,
          email: fulfillmentOrder.destination.email ?? null,
          first_name: fulfillmentOrder.destination.firstName ?? null,
          last_name: fulfillmentOrder.destination.lastName ?? null,
          phone: fulfillmentOrder.destination.phone ?? null,
          province: fulfillmentOrder.destination.province ?? null,
          zip: fulfillmentOrder.destination.zip ?? null,
        }
      : null,
    line_items: (fulfillmentOrder.lineItems.nodes || []).map((lineItem) => ({
      id: lineItem.id ? getNumericId(lineItem.id) : null,
      quantity: lineItem.totalQuantity,
      line_item_id: lineItem.lineItem?.id ? getNumericId(lineItem.lineItem.id) : null,
      inventory_item_id: lineItem.inventoryItemId ? getNumericId(lineItem.inventoryItemId) : null,
      variant_id: lineItem.variant?.id ? getNumericId(lineItem.variant.id) : null,
    })),
    international_duties: fulfillmentOrder.internationalDuties?.incoterm ?? null,
    fulfill_at: fulfillmentOrder.fulfillAt,
    fulfill_by: fulfillmentOrder.fulfillBy,
    fulfillment_holds: (fulfillmentOrder.fulfillmentHolds || []).map((hold) => ({
      reason: hold.reason,
      reasonNotes: hold.reasonNotes,
      displayReason: hold.displayReason,
      id: hold.id ? getNumericId(hold.id) : null,
      heldByRequestingApp: hold.heldByRequestingApp,
    })),
    created_at: fulfillmentOrder.createdAt,
    updated_at: fulfillmentOrder.updatedAt,
    delivery_method: fulfillmentOrder.deliveryMethod
      ? {
          id: fulfillmentOrder.deliveryMethod.id
            ? getNumericId(fulfillmentOrder.deliveryMethod.id)
            : null,
          method_type: fulfillmentOrder.deliveryMethod.methodType ?? null,
          min_delivery_date_time: fulfillmentOrder.deliveryMethod.minDeliveryDateTime ?? null,
          max_delivery_date_time: fulfillmentOrder.deliveryMethod.maxDeliveryDateTime ?? null,
          additional_information: fulfillmentOrder.deliveryMethod.additionalInformation
            ? {
                instructions: fulfillmentOrder.deliveryMethod.additionalInformation.instructions,
                phone: fulfillmentOrder.deliveryMethod.additionalInformation.phone,
              }
            : null,
          service_code: fulfillmentOrder.deliveryMethod.serviceCode,
          source_reference: fulfillmentOrder.deliveryMethod.sourceReference,
          branded_promise: fulfillmentOrder.deliveryMethod.brandedPromise
            ? {
                name: fulfillmentOrder.deliveryMethod.brandedPromise.name,
                handle: fulfillmentOrder.deliveryMethod.brandedPromise.handle,
              }
            : null,
          presented_name: fulfillmentOrder.deliveryMethod.presentedName,
        }
      : null,
    assigned_location: fulfillmentOrder.assignedLocation
      ? {
          address1: fulfillmentOrder.assignedLocation.address1,
          address2: fulfillmentOrder.assignedLocation.address2,
          city: fulfillmentOrder.assignedLocation.city,
          country_code: fulfillmentOrder.assignedLocation.countryCode,
          location_id: fulfillmentOrder.assignedLocation.location?.id
            ? getNumericId(fulfillmentOrder.assignedLocation.location.id)
            : null,
          name: fulfillmentOrder.assignedLocation.name,
          phone: fulfillmentOrder.assignedLocation.phone,
          province: fulfillmentOrder.assignedLocation.province,
          zip: fulfillmentOrder.assignedLocation.zip,
        }
      : null,
    merchant_requests: (fulfillmentOrder.merchantRequests.nodes || []).map((merchantRequest) => ({
      message: merchantRequest.message,
      request_options: merchantRequest.requestOptions,
      kind: merchantRequest.kind,
    })),
  };
};
