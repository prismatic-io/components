import { WEBHOOK_TOPICS_MAP } from "../constants";
import type {
  Customer,
  DraftOrder,
  Fulfillment,
  FulfillmentOrder,
  MailingAddressInput,
  PageInfo,
  Product,
  ProductImage,
  RestAddress,
  RestCustomer,
  RestDraftOrder,
  RestFulfillment,
  RestFulfillmentOrder,
  RestPagination,
  RestProduct,
  RestProductImage,
  RestShop,
  Shop,
  ShopifyWebhook,
  WebhookSubscription,
} from "../types";
import { getNumericId } from "./clean";
import { createTimezoneString, findKeyByValue } from "./transform";

export const addressMapper = (input: RestAddress): MailingAddressInput => {
  return {
    firstName: input.first_name || undefined,
    lastName: input.last_name || undefined,
    company: input.company || undefined,
    address1: input.address1 || undefined,
    address2: input.address2 || undefined,
    city: input.city || undefined,
    provinceCode: input.province_code || undefined,
    countryCode: input.country_code || undefined,
    zip: input.zip || undefined,
    phone: input.phone || undefined,
  };
};

export const customerMapper = (customer: Customer): RestCustomer => {
  const customerId = customer.id ? getNumericId(customer.id) : null;
  return {
    id: customerId,
    email: customer.email,
    created_at: customer.createdAt,
    updated_at: customer.updatedAt,
    first_name: customer.firstName,
    last_name: customer.lastName,
    state: customer.state,
    last_order_id: customer.lastOrder?.id
      ? getNumericId(customer.lastOrder.id)
      : null,
    note: customer.note,
    verified_email: customer.verifiedEmail,
    multipass_identifier: customer.multipassIdentifier,
    tax_exempt: customer.taxExempt,
    tags: customer.tags?.join(",") ?? null,
    last_order_name: customer.lastOrder?.name ?? null,
    phone: customer.phone,
    addresses: customer.addresses
      ? customer.addresses.map((address) => ({
          id: address.id ? getNumericId(address.id) : null,
          customer_id: customerId,
          first_name: address.firstName,
          last_name: address.lastName,
          company: address.company,
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          province: address.province,
          country: address.country,
          zip: address.zip,
          phone: address.phone,
          name: address.name,
          province_code: address.provinceCode,
          country_code: address.countryCodeV2,
          country_name: address.country,
        }))
      : null,

    tax_exemptions: customer.taxExemptions,
    email_marketing_consent: customer.emailMarketingConsent
      ? {
          state: customer.emailMarketingConsent.marketingState,
          opt_in_level: customer.emailMarketingConsent.marketingOptInLevel,
          consent_updated_at: customer.emailMarketingConsent.consentUpdatedAt,
        }
      : null,
    sms_marketing_consent: customer.smsMarketingConsent
      ? {
          state: customer.smsMarketingConsent.marketingState,
          opt_in_level: customer.smsMarketingConsent.marketingOptInLevel,
          consent_updated_at: customer.smsMarketingConsent.consentUpdatedAt,
          consent_collected_from:
            customer.smsMarketingConsent.consentCollectedFrom,
        }
      : null,
    admin_graphql_api_id: customer.id,
    default_address: {
      id: customer.defaultAddress?.id
        ? getNumericId(customer.defaultAddress.id)
        : null,
      customer_id: customerId,
      first_name: customer.defaultAddress?.firstName ?? null,
      last_name: customer.defaultAddress?.lastName ?? null,
      company: customer.defaultAddress?.company ?? null,
      address1: customer.defaultAddress?.address1 ?? null,
      address2: customer.defaultAddress?.address2 ?? null,
      city: customer.defaultAddress?.city ?? null,
      province: customer.defaultAddress?.province ?? null,
      country: customer.defaultAddress?.country ?? null,
      zip: customer.defaultAddress?.zip ?? null,
      phone: customer.defaultAddress?.phone ?? null,
      name: customer.defaultAddress?.name ?? null,
      province_code: customer.defaultAddress?.provinceCode ?? null,
      country_code: customer.defaultAddress?.countryCodeV2 ?? null,
      country_name: customer.defaultAddress?.country ?? null,
    },
  };
};

export const draftOrderMapper = (draftOrder: DraftOrder): RestDraftOrder => {
  return {
    id: draftOrder.id ? getNumericId(draftOrder.id) : null,
    note: draftOrder.note2,
    email: draftOrder.email,
    taxes_included: draftOrder.taxesIncluded,
    currency: draftOrder.currencyCode,
    invoice_sent_at: draftOrder.invoiceSentAt,
    created_at: draftOrder.createdAt,
    updated_at: draftOrder.updatedAt,
    tax_exempt: draftOrder.taxExempt,
    completed_at: draftOrder.completedAt,
    name: draftOrder.name,
    status: draftOrder.status,
    line_items: (draftOrder.lineItems.nodes || []).map((lineItem) => ({
      id: lineItem.id ? getNumericId(lineItem.id) : null,
      variant_id: lineItem.variant?.id
        ? getNumericId(lineItem.variant?.id)
        : null,
      product_id: lineItem.product?.id
        ? getNumericId(lineItem.product?.id)
        : null,
      title: lineItem.title,
      variant_title: lineItem.variantTitle,
      sku: lineItem.sku,
      vendor: lineItem.vendor,
      quantity: lineItem.quantity,
      requires_shipping: lineItem.requiresShipping,
      taxable: lineItem.taxable,
      gift_card: lineItem.isGiftCard,
      fulfillment_service: lineItem.fulfillmentService?.type ?? null,
      tax_lines: (lineItem.taxLines || []).map((taxLine) => ({
        channel_liable: taxLine.channelLiable,
        rate: taxLine.rate,
        title: taxLine.title,
        price_set: taxLine.priceSet
          ? {
              shop_money: taxLine.priceSet.shopMoney
                ? {
                    amount: taxLine.priceSet.shopMoney.amount,
                    currency_code: taxLine.priceSet.shopMoney.currencyCode,
                  }
                : null,
            }
          : null,
        price: taxLine.priceSet?.shopMoney?.amount ?? null,
      })),
      applied_discount: lineItem.appliedDiscount
        ? {
            title: lineItem.appliedDiscount.title,
            value: lineItem.appliedDiscount.value,
            value_type: lineItem.appliedDiscount.valueType,
            description: lineItem.appliedDiscount.description,
            amount_set: lineItem.appliedDiscount.amountSet
              ? {
                  shop_money: lineItem.appliedDiscount.amountSet.shopMoney
                    ? {
                        amount:
                          lineItem.appliedDiscount.amountSet.shopMoney.amount,
                        currency_code:
                          lineItem.appliedDiscount.amountSet.shopMoney
                            .currencyCode,
                      }
                    : null,
                }
              : null,
          }
        : null,
      name: lineItem.name,
      custom: lineItem.custom,
      original_unit_price:
        lineItem.originalUnitPriceSet?.shopMoney?.amount ?? null,
      admin_graphql_api_id: lineItem.id,
    })),
    shipping_address: draftOrder.shippingAddress
      ? {
          first_name: draftOrder.shippingAddress.firstName,
          address1: draftOrder.shippingAddress.address1,
          phone: draftOrder.shippingAddress.phone,
          city: draftOrder.shippingAddress.city,
          zip: draftOrder.shippingAddress.zip,
          province: draftOrder.shippingAddress.province,
          country: draftOrder.shippingAddress.country,
          last_name: draftOrder.shippingAddress.lastName,
          address2: draftOrder.shippingAddress.address2,
          company: draftOrder.shippingAddress.company,
          latitude: draftOrder.shippingAddress.latitude,
          longitude: draftOrder.shippingAddress.longitude,
          name: draftOrder.shippingAddress.name,
          country_code: draftOrder.shippingAddress.countryCodeV2,
          province_code: draftOrder.shippingAddress.provinceCode,
        }
      : null,

    billing_address: draftOrder.billingAddress
      ? {
          first_name: draftOrder.billingAddress.firstName,
          address1: draftOrder.billingAddress.address1,
          phone: draftOrder.billingAddress.phone,
          city: draftOrder.billingAddress.city,
          zip: draftOrder.billingAddress.zip,
          province: draftOrder.billingAddress.province,
          country: draftOrder.billingAddress.country,
          last_name: draftOrder.billingAddress.lastName,
          address2: draftOrder.billingAddress.address2,
          company: draftOrder.billingAddress.company,
          latitude: draftOrder.billingAddress.latitude,
          longitude: draftOrder.billingAddress.longitude,
          name: draftOrder.billingAddress.name,
          country_code: draftOrder.billingAddress.countryCodeV2,
          province_code: draftOrder.billingAddress.provinceCode,
        }
      : null,
    invoice_url: draftOrder.invoiceUrl,
    applied_discount: draftOrder.appliedDiscount
      ? {
          title: draftOrder.appliedDiscount.title,
          value: draftOrder.appliedDiscount.value,
          value_type: draftOrder.appliedDiscount.valueType,
          description: draftOrder.appliedDiscount.description,
          amount_set: draftOrder.appliedDiscount.amountSet
            ? {
                shop_money: draftOrder.appliedDiscount.amountSet.shopMoney
                  ? {
                      amount:
                        draftOrder.appliedDiscount.amountSet.shopMoney.amount,
                      currency_code:
                        draftOrder.appliedDiscount.amountSet.shopMoney
                          .currencyCode,
                    }
                  : null,
              }
            : null,
        }
      : null,
    order_id: draftOrder.order?.id ? getNumericId(draftOrder.order?.id) : null,
    shipping_line: draftOrder.shippingLine
      ? {
          title: draftOrder.shippingLine.title,
          custom: draftOrder.shippingLine.custom,
          shipping_rate_handle: draftOrder.shippingLine.shippingRateHandle,
          original_price_set: draftOrder.shippingLine.originalPriceSet
            ? {
                shop_money: draftOrder.shippingLine.originalPriceSet.shopMoney
                  ? {
                      amount:
                        draftOrder.shippingLine.originalPriceSet.shopMoney
                          .amount,
                      currency_code:
                        draftOrder.shippingLine.originalPriceSet.shopMoney
                          .currencyCode,
                    }
                  : null,
              }
            : null,
          discounted_price_set: draftOrder.shippingLine.discountedPriceSet
            ? {
                shop_money: draftOrder.shippingLine.discountedPriceSet.shopMoney
                  ? {
                      amount:
                        draftOrder.shippingLine.discountedPriceSet.shopMoney
                          .amount,
                      currency_code:
                        draftOrder.shippingLine.discountedPriceSet.shopMoney
                          .currencyCode,
                    }
                  : null,
              }
            : null,
        }
      : null,

    tax_lines: (draftOrder.taxLines || []).map((taxLine) => ({
      rate: taxLine.rate,
      rate_percentage: taxLine.ratePercentage,
      source: taxLine.source,
      price_set: taxLine.priceSet
        ? {
            shop_money: taxLine.priceSet.shopMoney
              ? {
                  amount: taxLine.priceSet.shopMoney.amount,
                  currency_code: taxLine.priceSet.shopMoney.currencyCode,
                }
              : null,
          }
        : null,
      price: taxLine.priceSet?.shopMoney?.amount ?? null,
      channel_liable: taxLine.channelLiable,
      title: taxLine.title,
    })),
    tags: draftOrder.tags ? draftOrder.tags.join(",") : null,
    total_price: draftOrder.totalPriceSet?.shopMoney?.amount ?? null,
    subtotal_price: draftOrder.subtotalPriceSet?.shopMoney?.amount ?? null,
    total_tax: draftOrder.totalTaxSet?.shopMoney?.amount ?? null,
    payment_terms: draftOrder.paymentTerms
      ? {
          due_in_days: draftOrder.paymentTerms.dueInDays,
          payment_terms_name: draftOrder.paymentTerms.paymentTermsName,
          payment_terms_type: draftOrder.paymentTerms.paymentTermsType,
          overdue: draftOrder.paymentTerms.overdue,
        }
      : null,
    customer: draftOrder.customer
      ? {
          id: draftOrder.customer.id
            ? getNumericId(draftOrder.customer.id)
            : null,
          email: draftOrder.customer.email,
          created_at: draftOrder.customer.createdAt,
          updated_at: draftOrder.customer.updatedAt,
          first_name: draftOrder.customer.firstName,
          last_name: draftOrder.customer.lastName,
          orders_count: draftOrder.customer.numberOfOrders,
          state: draftOrder.customer.state,
          total_spent: draftOrder.customer.amountSpent?.amount ?? null,
          last_order_id: draftOrder.customer.lastOrder?.id ?? null,
          note: draftOrder.customer.note,
          verified_email: draftOrder.customer.verifiedEmail,
          multipass_identifier: draftOrder.customer.multipassIdentifier,
          tax_exempt: draftOrder.customer.taxExempt,
          tags: draftOrder.customer.tags
            ? draftOrder.customer.tags.join(",")
            : [],
          last_order_name: draftOrder.customer.lastOrder?.name ?? null,
          phone: draftOrder.customer.phone,
          tax_exemptions: draftOrder.customer.taxExemptions,
          email_marketing_consent: draftOrder.customer.emailMarketingConsent
            ? {
                state: draftOrder.customer.emailMarketingConsent.marketingState,
                consent_updated_at:
                  draftOrder.customer.emailMarketingConsent.consentUpdatedAt,
              }
            : null,
          sms_marketing_consent: draftOrder.customer.smsMarketingConsent
            ? {
                state: draftOrder.customer.smsMarketingConsent.marketingState,
                consent_updated_at:
                  draftOrder.customer.smsMarketingConsent.consentUpdatedAt,
                consent_collected_from:
                  draftOrder.customer.smsMarketingConsent.consentCollectedFrom,
              }
            : null,
          admin_graphql_api_id: draftOrder.customer.id,
          default_address: draftOrder.customer.defaultAddress
            ? {
                id: draftOrder.customer.defaultAddress.id
                  ? getNumericId(draftOrder.customer.defaultAddress.id)
                  : null,
                first_name: draftOrder.customer.defaultAddress.firstName,
                last_name: draftOrder.customer.defaultAddress.lastName,
                company: draftOrder.customer.defaultAddress.company,
                address1: draftOrder.customer.defaultAddress.address1,
                address2: draftOrder.customer.defaultAddress.address2,
                city: draftOrder.customer.defaultAddress.city,
                province: draftOrder.customer.defaultAddress.province,
                country: draftOrder.customer.defaultAddress.country,
                zip: draftOrder.customer.defaultAddress.zip,
                phone: draftOrder.customer.defaultAddress.phone,
                name: draftOrder.customer.defaultAddress.name,
                province_code: draftOrder.customer.defaultAddress.provinceCode,
                country_code: draftOrder.customer.defaultAddress.countryCodeV2,
                country_name: draftOrder.customer.defaultAddress.country,
              }
            : null,
        }
      : null,
    admin_graphql_api_id: draftOrder.id,
  };
};

export const fulfillmentMapper = (
  fulfillment: Fulfillment,
): RestFulfillment => ({
  id: fulfillment.id ? getNumericId(fulfillment.id) : null,
  order_id: fulfillment.order?.id ? getNumericId(fulfillment.order.id) : null,
  status: fulfillment.status,
  created_at: fulfillment.createdAt,
  service: fulfillment.service?.type ?? null,
  updated_at: fulfillment.updatedAt,
  tracking_company:
    fulfillment.trackingInfo && fulfillment.trackingInfo.length > 0
      ? fulfillment.trackingInfo[0].company
      : null,

  location_id: fulfillment.location?.id
    ? getNumericId(fulfillment.location.id)
    : null,
  origin_address: fulfillment.originAddress
    ? {
        address1: fulfillment.originAddress.address1,
        address2: fulfillment.originAddress.address2,
        city: fulfillment.originAddress.city,
        zip: fulfillment.originAddress.zip,
        country_code: fulfillment.originAddress.countryCode,
        province_code: fulfillment.originAddress.provinceCode,
      }
    : null,
  line_items: (fulfillment.fulfillmentLineItems?.nodes || []).map(
    (fullfilmentLineItem) => ({
      id: fullfilmentLineItem.id ? getNumericId(fullfilmentLineItem.id) : null,
      variant_id: fullfilmentLineItem.lineItem?.variant?.id
        ? getNumericId(fullfilmentLineItem.lineItem.variant.id)
        : null,
      title: fullfilmentLineItem.lineItem?.title,
      quantity: fullfilmentLineItem.lineItem?.quantity,
      sku: fullfilmentLineItem.lineItem?.sku,
      variant_title: fullfilmentLineItem.lineItem?.variant?.title,
      vendor: fullfilmentLineItem.lineItem?.vendor,
      product_id: fullfilmentLineItem.lineItem?.variant?.product?.id,
      requires_shipping: fullfilmentLineItem.lineItem?.requiresShipping,
      taxable: fullfilmentLineItem.lineItem?.taxable,
      gift_card: fullfilmentLineItem.lineItem?.isGiftCard,
      name: fullfilmentLineItem.lineItem?.name,

      price: fullfilmentLineItem.lineItem?.originalUnitPriceSet?.shopMoney,
      total_discount: fullfilmentLineItem.lineItem?.totalDiscountSet?.shopMoney,
      fulfillment_status: fullfilmentLineItem.lineItem?.fulfillmentStatus,
      price_set: fullfilmentLineItem.lineItem?.originalUnitPriceSet
        ? {
            shop_money: fullfilmentLineItem.lineItem?.originalUnitPriceSet
              .shopMoney
              ? {
                  amount:
                    fullfilmentLineItem.lineItem?.originalUnitPriceSet.shopMoney
                      .amount,
                  currency_code:
                    fullfilmentLineItem.lineItem?.originalUnitPriceSet.shopMoney
                      .currencyCode,
                }
              : null,
            presentment_money: fullfilmentLineItem.lineItem
              ?.originalUnitPriceSet.presentmentMoney
              ? {
                  amount:
                    fullfilmentLineItem.lineItem?.originalUnitPriceSet
                      .presentmentMoney.amount,
                  currency_code:
                    fullfilmentLineItem.lineItem?.originalUnitPriceSet
                      .presentmentMoney.currencyCode,
                }
              : null,
          }
        : null,
      total_discount_set: fullfilmentLineItem.lineItem?.totalDiscountSet
        ? {
            shop_money: fullfilmentLineItem.lineItem?.totalDiscountSet.shopMoney
              ? {
                  amount:
                    fullfilmentLineItem.lineItem?.totalDiscountSet.shopMoney
                      .amount,
                  currency_code:
                    fullfilmentLineItem.lineItem?.totalDiscountSet.shopMoney
                      .currencyCode,
                }
              : null,
            presentment_money: fullfilmentLineItem.lineItem?.totalDiscountSet
              .presentmentMoney
              ? {
                  amount:
                    fullfilmentLineItem.lineItem?.totalDiscountSet
                      .presentmentMoney.amount,
                  currency_code:
                    fullfilmentLineItem.lineItem?.totalDiscountSet
                      .presentmentMoney.currencyCode,
                }
              : null,
          }
        : null,
      discount_allocations: (
        fullfilmentLineItem.lineItem?.discountAllocations || []
      ).map((discountAllocation) => ({
        amount:
          discountAllocation.allocatedAmountSet?.shopMoney?.amount ?? null,
        discount_application_index:
          discountAllocation.discountApplication?.index ?? null,
        amount_set: discountAllocation.allocatedAmountSet
          ? {
              shop_money: discountAllocation.allocatedAmountSet.shopMoney
                ? {
                    amount:
                      discountAllocation.allocatedAmountSet.shopMoney.amount,
                    currency_code:
                      discountAllocation.allocatedAmountSet.shopMoney
                        .currencyCode,
                  }
                : null,
              presentment_money: discountAllocation.allocatedAmountSet
                .presentmentMoney
                ? {
                    amount:
                      discountAllocation.allocatedAmountSet.presentmentMoney
                        .amount,
                    currency_code:
                      discountAllocation.allocatedAmountSet.presentmentMoney
                        .currencyCode,
                  }
                : null,
            }
          : null,
      })),
      duties: (fullfilmentLineItem.lineItem?.duties || []).map((duty) => ({
        id: duty.id ? getNumericId(duty.id) : null,
        price: duty.price
          ? {
              shop_money: duty.price.shopMoney
                ? {
                    amount: duty.price.shopMoney.amount,
                    currency_code: duty.price.shopMoney.currencyCode,
                  }
                : null,
            }
          : null,
        tax_lines: (duty.taxLines || []).map((taxLine) => ({
          rate: taxLine.rate,
          title: taxLine.title,
          price_set: taxLine.priceSet
            ? {
                shop_money: taxLine.priceSet.shopMoney
                  ? {
                      amount: taxLine.priceSet.shopMoney.amount,
                      currency_code: taxLine.priceSet.shopMoney.currencyCode,
                    }
                  : null,
                presentment_money: taxLine.priceSet.presentmentMoney
                  ? {
                      amount: taxLine.priceSet.presentmentMoney.amount,
                      currency_code:
                        taxLine.priceSet.presentmentMoney.currencyCode,
                    }
                  : null,
              }
            : null,
          channel_liable: taxLine.channelLiable,
        })),
      })),
      admin_graphql_api_id: fullfilmentLineItem.id,
    }),
  ),
  tracking_number:
    fulfillment.trackingInfo && fulfillment.trackingInfo.length > 0
      ? fulfillment.trackingInfo[0].number
      : null,
  tracking_numbers: (fulfillment.trackingInfo || []).map(
    (trackingInfo) => trackingInfo.number,
  ),
  tracking_url:
    fulfillment.trackingInfo && fulfillment.trackingInfo.length > 0
      ? fulfillment.trackingInfo[0].url
      : null,
  tracking_urls: (fulfillment.trackingInfo || []).map(
    (trackingInfo) => trackingInfo.url,
  ),
  name: fulfillment.name,
  admin_graphql_api_id: fulfillment.id,
});

export const fulfillmentOrderMapper = (
  fulfillmentOrder: FulfillmentOrder,
): RestFulfillmentOrder => {
  const fulfillmentOrderId = fulfillmentOrder.id
    ? getNumericId(fulfillmentOrder.id)
    : null;
  const orderId = fulfillmentOrder.orderId
    ? getNumericId(fulfillmentOrder.orderId)
    : null;

  const destinationId = fulfillmentOrder.destination.id
    ? getNumericId(fulfillmentOrder.destination.id)
    : null;
  return {
    id: fulfillmentOrderId,

    order_id: orderId,

    request_status: fulfillmentOrder.requestStatus
      ? fulfillmentOrder.requestStatus.toLowerCase()
      : null,
    status: fulfillmentOrder.status
      ? fulfillmentOrder.status.toLowerCase()
      : null,
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
      line_item_id: lineItem.lineItem?.id
        ? getNumericId(lineItem.lineItem.id)
        : null,
      inventory_item_id: lineItem.inventoryItemId
        ? getNumericId(lineItem.inventoryItemId)
        : null,
      variant_id: lineItem.variant?.id
        ? getNumericId(lineItem.variant.id)
        : null,
    })),
    international_duties:
      fulfillmentOrder.internationalDuties?.incoterm ?? null,
    fulfill_at: fulfillmentOrder.fulfillAt,
    fulfill_by: fulfillmentOrder.fulfillBy,
    fulfillment_holds: (fulfillmentOrder.fulfillmentHolds || []).map(
      (hold) => ({
        reason: hold.reason,
        reasonNotes: hold.reasonNotes,
        displayReason: hold.displayReason,
        id: hold.id ? getNumericId(hold.id) : null,
        heldByRequestingApp: hold.heldByRequestingApp,
      }),
    ),
    created_at: fulfillmentOrder.createdAt,
    updated_at: fulfillmentOrder.updatedAt,
    delivery_method: fulfillmentOrder.deliveryMethod
      ? {
          id: fulfillmentOrder.deliveryMethod.id
            ? getNumericId(fulfillmentOrder.deliveryMethod.id)
            : null,
          method_type: fulfillmentOrder.deliveryMethod.methodType ?? null,
          min_delivery_date_time:
            fulfillmentOrder.deliveryMethod.minDeliveryDateTime ?? null,
          max_delivery_date_time:
            fulfillmentOrder.deliveryMethod.maxDeliveryDateTime ?? null,
          additional_information: fulfillmentOrder.deliveryMethod
            .additionalInformation
            ? {
                instructions:
                  fulfillmentOrder.deliveryMethod.additionalInformation
                    .instructions,
                phone:
                  fulfillmentOrder.deliveryMethod.additionalInformation.phone,
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
    merchant_requests: (fulfillmentOrder.merchantRequests.nodes || []).map(
      (merchantRequest) => ({
        message: merchantRequest.message,
        request_options: merchantRequest.requestOptions,
        kind: merchantRequest.kind,
      }),
    ),
  };
};

export const paginationMapper = (pageInfo: PageInfo): RestPagination => {
  return {
    pagination: pageInfo.hasNextPage
      ? {
          next: {
            page_info: pageInfo.endCursor,
            rel: "next",
          },
        }
      : null,

    pageInfo: pageInfo.hasNextPage ? pageInfo.endCursor : null,
    rel: pageInfo.hasNextPage ? 'rel="next"' : null,
  };
};

export const productImageMapper = (
  productImage: ProductImage,
  productId: number,
  position: number,
): RestProductImage => ({
  id: productImage.id ? getNumericId(productImage.id) : undefined,
  alt: productImage.alt,
  position,
  product_id: productId,
  created_at: productImage.createdAt,
  updated_at: productImage.updatedAt,
  admin_graphql_api_id: productImage.id,
  width: productImage.image?.width ?? null,
  height: productImage.image?.height ?? null,
  src: productImage.image?.url,
});

export const productMapper = (product: Product): RestProduct => {
  const productId = product.id ? getNumericId(product.id) : null;
  const firstImage = product.media.nodes[0] || null;
  const variantsMapping: Record<string, number[]> = {};
  const variants = product.variants.nodes.map((variant) => {
    const imageUrl = variant.image?.url ?? null;
    const id = variant.id ? getNumericId(variant.id) : null;
    if (imageUrl !== null) {
      if (!variantsMapping[imageUrl]) {
        variantsMapping[imageUrl] = [];
      }
      variantsMapping[imageUrl].push(id);
    }

    return {
      id,
      product_id: productId,
      title: variant.title,
      price: variant.price,
      position: variant.position,
      inventory_policy: variant.inventoryPolicy,
      compare_at_price: variant.compareAtPrice,
      created_at: variant.createdAt,
      updated_at: variant.updatedAt,
      taxable: variant.taxable,
      barcode: variant.barcode,
      requires_shipping: variant.inventoryItem?.requiresShipping ?? null,
      sku: variant.sku,
      weight: variant.inventoryItem?.measurement?.weight?.value ?? null,
      weight_unit: variant.inventoryItem?.measurement?.weight?.unit ?? null,
      inventory_item_id: variant.inventoryItem?.id
        ? getNumericId(variant.inventoryItem.id)
        : null,
      inventory_quantity: variant.inventoryQuantity ?? null,
      image_url: imageUrl,
      admin_graphql_api_id: variant.id,
    };
  });
  const images = product.media.nodes.map((media, index) => {
    const imageId = media.id ? getNumericId(media.id) : null;
    const src = media.image?.url ?? null;

    return {
      id: imageId,
      alt: media.alt,
      position: index + 1,
      product_id: productId,
      created_at: media.createdAt,
      updated_at: media.updatedAt,
      admin_graphql_api_id: media.id,
      width: media.image?.width ?? null,
      height: media.image?.height ?? null,
      src,
      variant_ids: variantsMapping[src] ?? [],
    };
  });
  return {
    id: productId,
    title: product.title,
    body_html: product.descriptionHtml,
    vendor: product.vendor,
    product_type: product.productType,
    created_at: product.createdAt,
    handle: product.handle,
    updated_at: product.updatedAt,
    published_at: product.publishedAt,
    template_suffix: product.templateSuffix,
    tags: product.tags?.join(",") ?? null,
    status: product.status.toLowerCase(),
    admin_graphql_api_id: product.id,

    variants,

    options: (product.options ?? []).map((option) => {
      return {
        id: option.id ? getNumericId(option.id) : null,
        product_id: productId,
        name: option.name,
        position: option.position,
        values: option.values,
      };
    }),

    images,
    image: firstImage
      ? {
          id: firstImage.id ? getNumericId(firstImage.id) : null,
          alt: firstImage.alt,
          product_id: productId,
          created_at: firstImage.createdAt,
          updated_at: firstImage.updatedAt,
          admin_graphql_api_id: firstImage.id,
          width: firstImage.image?.width ?? null,
          height: firstImage.image?.height ?? null,
          src: firstImage.image?.url ?? null,
          variant_ids: images[0].variant_ids,
        }
      : null,
  };
};

export const shopMapper = (shop: Shop): RestShop => {
  return {
    id: shop ? getNumericId(shop.id) : null,
    name: shop.name,
    email: shop.email,
    domain: shop.myshopifyDomain,
    province: shop.billingAddress?.province ?? null,
    country: shop.billingAddress?.country ?? null,
    address1: shop.billingAddress?.address1 ?? null,
    zip: shop.billingAddress?.zip ?? null,
    city: shop.billingAddress?.city ?? null,
    phone: shop.billingAddress?.phone ?? null,
    latitude: shop.billingAddress?.latitude ?? null,
    longitude: shop.billingAddress?.longitude ?? null,
    address2: shop.billingAddress?.address2 ?? null,
    created_at: shop.createdAt,
    updated_at: shop.updatedAt,
    country_code: shop.billingAddress?.countryCodeV2 ?? null,
    country_name: shop.billingAddress?.country ?? null,
    currency: shop.currencyCode,
    timezone:
      shop.ianaTimezone && shop.timezoneOffset
        ? createTimezoneString(shop.timezoneOffset, shop.ianaTimezone)
        : null,
    iana_timezone: shop.ianaTimezone,
    shop_owner: shop.shopOwnerName,
    money_format: shop.currencyFormats?.moneyFormat ?? null,
    money_with_currency_format:
      shop.currencyFormats?.moneyWithCurrencyFormat ?? null,
    weight_unit: shop.weightUnit,
    province_code: shop.billingAddress?.provinceCode ?? null,
    taxes_included: shop.taxesIncluded,
    tax_shipping: shop.taxShipping,
    plan_display_name: shop.plan?.displayName,
    myshopify_domain: shop.myshopifyDomain,
    money_in_emails_format: shop.currencyFormats?.moneyInEmailsFormat ?? null,
    money_with_currency_in_emails_format:
      shop.currencyFormats?.moneyWithCurrencyInEmailsFormat ?? null,
    checkout_api_supported: shop.checkoutApiSupported,
    setup_required: shop.setupRequired,
    enabled_presentment_currencies: shop.enabledPresentmentCurrencies,
    marketing_sms_consent_enabled_at_checkout:
      shop.marketingSmsConsentEnabledAtCheckout,
    transactional_sms_disabled: shop.transactionalSmsDisabled,
  };
};

export const webhookMapper = (
  webhookSubscription: WebhookSubscription,
): ShopifyWebhook => {
  return {
    id: getNumericId(webhookSubscription.id),
    address: webhookSubscription.endpoint.callbackUrl,
    topic: findKeyByValue(WEBHOOK_TOPICS_MAP, webhookSubscription.topic),
    created_at: webhookSubscription.createdAt,
    updated_at: webhookSubscription.updatedAt,
    format:
      webhookSubscription.format.toLowerCase() as ShopifyWebhook["format"],
    fields: webhookSubscription.includeFields,
    metafield_namespaces: webhookSubscription.metafieldNamespaces,
    api_version: webhookSubscription.apiVersion.displayName,
    private_metafield_namespaces: [],
  };
};
