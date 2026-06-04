import { getNumericId } from "../../../util";
import type { Fulfillment } from "../../interfaces/Fulfillment";

export const fulfillmentMapper = (fulfillment: Fulfillment) => ({
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

  location_id: fulfillment.location?.id ? getNumericId(fulfillment.location.id) : null,
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
  line_items: (fulfillment.fulfillmentLineItems?.nodes || []).map((fullfilmentLineItem) => ({
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
          shop_money: fullfilmentLineItem.lineItem?.originalUnitPriceSet.shopMoney
            ? {
                amount: fullfilmentLineItem.lineItem?.originalUnitPriceSet.shopMoney.amount,
                currency_code:
                  fullfilmentLineItem.lineItem?.originalUnitPriceSet.shopMoney.currencyCode,
              }
            : null,
          presentment_money: fullfilmentLineItem.lineItem?.originalUnitPriceSet.presentmentMoney
            ? {
                amount: fullfilmentLineItem.lineItem?.originalUnitPriceSet.presentmentMoney.amount,
                currency_code:
                  fullfilmentLineItem.lineItem?.originalUnitPriceSet.presentmentMoney.currencyCode,
              }
            : null,
        }
      : null,
    total_discount_set: fullfilmentLineItem.lineItem?.totalDiscountSet
      ? {
          shop_money: fullfilmentLineItem.lineItem?.totalDiscountSet.shopMoney
            ? {
                amount: fullfilmentLineItem.lineItem?.totalDiscountSet.shopMoney.amount,
                currency_code:
                  fullfilmentLineItem.lineItem?.totalDiscountSet.shopMoney.currencyCode,
              }
            : null,
          presentment_money: fullfilmentLineItem.lineItem?.totalDiscountSet.presentmentMoney
            ? {
                amount: fullfilmentLineItem.lineItem?.totalDiscountSet.presentmentMoney.amount,
                currency_code:
                  fullfilmentLineItem.lineItem?.totalDiscountSet.presentmentMoney.currencyCode,
              }
            : null,
        }
      : null,
    discount_allocations: (fullfilmentLineItem.lineItem?.discountAllocations || []).map(
      (discountAllocation) => ({
        amount: discountAllocation.allocatedAmountSet?.shopMoney?.amount ?? null,
        discount_application_index: discountAllocation.discountApplication?.index ?? null,
        amount_set: discountAllocation.allocatedAmountSet
          ? {
              shop_money: discountAllocation.allocatedAmountSet.shopMoney
                ? {
                    amount: discountAllocation.allocatedAmountSet.shopMoney.amount,
                    currency_code: discountAllocation.allocatedAmountSet.shopMoney.currencyCode,
                  }
                : null,
              presentment_money: discountAllocation.allocatedAmountSet.presentmentMoney
                ? {
                    amount: discountAllocation.allocatedAmountSet.presentmentMoney.amount,
                    currency_code:
                      discountAllocation.allocatedAmountSet.presentmentMoney.currencyCode,
                  }
                : null,
            }
          : null,
      }),
    ),
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
                    currency_code: taxLine.priceSet.presentmentMoney.currencyCode,
                  }
                : null,
            }
          : null,
        channel_liable: taxLine.channelLiable,
      })),
    })),
    admin_graphql_api_id: fullfilmentLineItem.id,
  })),
  tracking_number:
    fulfillment.trackingInfo && fulfillment.trackingInfo.length > 0
      ? fulfillment.trackingInfo[0].number
      : null,
  tracking_numbers: (fulfillment.trackingInfo || []).map((trackingInfo) => trackingInfo.number),
  tracking_url:
    fulfillment.trackingInfo && fulfillment.trackingInfo.length > 0
      ? fulfillment.trackingInfo[0].url
      : null,
  tracking_urls: (fulfillment.trackingInfo || []).map((trackingInfo) => trackingInfo.url),
  name: fulfillment.name,
  admin_graphql_api_id: fulfillment.id,
});
