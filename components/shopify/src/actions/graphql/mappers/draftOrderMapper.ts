import { getNumericId } from "../../../util";
import type { DraftOrder } from "../../interfaces/DraftOrder";

export const draftOrderMapper = (draftOrder: DraftOrder) => {
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
      variant_id: lineItem.variant?.id ? getNumericId(lineItem.variant?.id) : null,
      product_id: lineItem.product?.id ? getNumericId(lineItem.product?.id) : null,
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
                        amount: lineItem.appliedDiscount.amountSet.shopMoney.amount,
                        currency_code: lineItem.appliedDiscount.amountSet.shopMoney.currencyCode,
                      }
                    : null,
                }
              : null,
          }
        : null,
      name: lineItem.name,
      custom: lineItem.custom,
      original_unit_price: lineItem.originalUnitPriceSet?.shopMoney?.amount ?? null,
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
                      amount: draftOrder.appliedDiscount.amountSet.shopMoney.amount,
                      currency_code: draftOrder.appliedDiscount.amountSet.shopMoney.currencyCode,
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
                      amount: draftOrder.shippingLine.originalPriceSet.shopMoney.amount,
                      currency_code:
                        draftOrder.shippingLine.originalPriceSet.shopMoney.currencyCode,
                    }
                  : null,
              }
            : null,
          discounted_price_set: draftOrder.shippingLine.discountedPriceSet
            ? {
                shop_money: draftOrder.shippingLine.discountedPriceSet.shopMoney
                  ? {
                      amount: draftOrder.shippingLine.discountedPriceSet.shopMoney.amount,
                      currency_code:
                        draftOrder.shippingLine.discountedPriceSet.shopMoney.currencyCode,
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
          id: draftOrder.customer.id ? getNumericId(draftOrder.customer.id) : null,
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
          tags: draftOrder.customer.tags ? draftOrder.customer.tags.join(",") : [],
          last_order_name: draftOrder.customer.lastOrder?.name ?? null,
          phone: draftOrder.customer.phone,
          tax_exemptions: draftOrder.customer.taxExemptions,
          email_marketing_consent: draftOrder.customer.emailMarketingConsent
            ? {
                state: draftOrder.customer.emailMarketingConsent.marketingState,
                consent_updated_at: draftOrder.customer.emailMarketingConsent.consentUpdatedAt,
              }
            : null,
          sms_marketing_consent: draftOrder.customer.smsMarketingConsent
            ? {
                state: draftOrder.customer.smsMarketingConsent.marketingState,
                consent_updated_at: draftOrder.customer.smsMarketingConsent.consentUpdatedAt,
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
