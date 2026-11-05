interface PriceSet {
  shopMoney: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
}

interface TaxLine {
  rate: number | null;
  ratePercentage: number | null;
  source: string | null;
  priceSet: PriceSet | null;
  channelLiable: boolean | null;
  title: string | null;
}

interface Discount {
  title: string | null;
  value: number | null;
  valueType: string | null;
  description: string | null;
  amountSet: PriceSet | null;
}

interface ShippingLine {
  title: string | null;
  custom: boolean | null;
  shippingRateHandle: string | null;
  originalPriceSet: PriceSet | null;
  discountedPriceSet: PriceSet | null;
}

interface PaymentTerms {
  dueInDays: number | null;
  paymentTermsName: string | null;
  paymentTermsType: string | null;
  overdue: boolean | null;
}

interface Address {
  firstName: string | null;
  address1: string | null;
  phone: string | null;
  city: string | null;
  zip: string | null;
  province: string | null;
  country: string | null;
  lastName: string | null;
  address2: string | null;
  company: string | null;
  latitude: number | null;
  longitude: number | null;
  name: string | null;
  countryCodeV2: string | null;
  provinceCode: string | null;
  id?: string | null;
}

interface Customer {
  id: string | null;
  email: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  firstName: string | null;
  lastName: string | null;
  numberOfOrders: number | null;
  state: string | null;
  amountSpent: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
  lastOrder: {
    id: string | null;
    name: string | null;
  } | null;
  note: string | null;
  verifiedEmail: boolean | null;
  multipassIdentifier: string | null;
  taxExempt: boolean | null;
  tags: string[] | null;
  phone: string | null;
  taxExemptions: string[] | null;
  emailMarketingConsent: {
    marketingState: string | null;
    consentUpdatedAt: string | null;
  } | null;
  smsMarketingConsent: {
    marketingState: string | null;
    consentUpdatedAt: string | null;
    consentCollectedFrom: string | null;
  } | null;
  defaultAddress: Address | null;
}

interface LineItem {
  id: string | null;
  variant: {
    id: string | null;
  } | null;
  product: {
    id: string | null;
  } | null;
  title: string | null;
  variantTitle: string | null;
  sku: string | null;
  vendor: string | null;
  quantity: number | null;
  requiresShipping: boolean | null;
  taxable: boolean | null;
  isGiftCard: boolean | null;
  fulfillmentService: {
    type: string | null;
  } | null;
  weight: {
    unit: string | null;
    value: number | null;
  } | null;
  taxLines: TaxLine[] | null;
  appliedDiscount: Discount | null;
  name: string | null;
  custom: boolean | null;
  originalUnitPriceSet: PriceSet | null;
}

export interface DraftOrder {
  id: string | null;
  note2: string | null;
  email: string | null;
  taxesIncluded: boolean | null;
  currencyCode: string | null;
  invoiceSentAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  taxExempt: boolean | null;
  completedAt: string | null;
  name: string | null;
  status: string | null;
  lineItems: {
    nodes: LineItem[] | null;
  } | null;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  invoiceUrl: string | null;
  appliedDiscount: Discount | null;
  order: {
    id: string | null;
  } | null;
  shippingLine: ShippingLine | null;
  taxLines: TaxLine[] | null;
  tags: string[] | null;
  totalPriceSet: PriceSet | null;
  subtotalPriceSet: PriceSet | null;
  totalTaxSet: PriceSet | null;
  paymentTerms: PaymentTerms | null;
  customer: Customer | null;
}

interface RestDraftOrderLineItemTaxLine {
  channel_liable: boolean | null;
  rate: number | null;
  title: string | null;
  price_set: { shop_money: { amount: string | null; currency_code: string | null } | null } | null;
  price: string | null;
}

interface RestDraftOrderAppliedDiscount {
  title: string | null;
  value: number | null;
  value_type: string | null;
  description: string | null;
  amount_set: { shop_money: { amount: string | null; currency_code: string | null } | null } | null;
}

interface RestDraftOrderLineItem {
  id: number | null;
  variant_id: number | null;
  product_id: number | null;
  title: string | null;
  variant_title: string | null;
  sku: string | null;
  vendor: string | null;
  quantity: number | null;
  requires_shipping: boolean | null;
  taxable: boolean | null;
  gift_card: boolean | null;
  fulfillment_service: string | null;
  tax_lines: RestDraftOrderLineItemTaxLine[];
  applied_discount: RestDraftOrderAppliedDiscount | null;
  name: string | null;
  custom: boolean | null;
  original_unit_price: string | null;
  admin_graphql_api_id: string | null;
}

interface RestDraftOrderAddress {
  first_name: string | null;
  address1: string | null;
  phone: string | null;
  city: string | null;
  zip: string | null;
  province: string | null;
  country: string | null;
  last_name: string | null;
  address2: string | null;
  company: string | null;
  latitude: number | null;
  longitude: number | null;
  name: string | null;
  country_code: string | null;
  province_code: string | null;
}

interface RestDraftOrderShippingLine {
  title: string | null;
  custom: boolean | null;
  shipping_rate_handle: string | null;
  original_price_set: {
    shop_money: { amount: string | null; currency_code: string | null } | null;
  } | null;
  discounted_price_set: {
    shop_money: { amount: string | null; currency_code: string | null } | null;
  } | null;
}

interface RestDraftOrderTaxLine {
  rate: number | null;
  rate_percentage: number | null;
  source: string | null;
  price_set: { shop_money: { amount: string | null; currency_code: string | null } | null } | null;
  price: string | null;
  channel_liable: boolean | null;
  title: string | null;
}

interface RestDraftOrderPaymentTerms {
  due_in_days: number | null;
  payment_terms_name: string | null;
  payment_terms_type: string | null;
  overdue: boolean | null;
}

interface RestDraftOrderCustomerDefaultAddress {
  id: number | null;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  zip: string | null;
  phone: string | null;
  name: string | null;
  province_code: string | null;
  country_code: string | null;
  country_name: string | null;
}

interface RestDraftOrderCustomer {
  id: number | null;
  email: string | null;
  created_at: string | null;
  updated_at: string | null;
  first_name: string | null;
  last_name: string | null;
  orders_count: number | null;
  state: string | null;
  total_spent: string | null;
  last_order_id: string | null;
  note: string | null;
  verified_email: boolean | null;
  multipass_identifier: string | null;
  tax_exempt: boolean | null;
  tags: string | never[];
  last_order_name: string | null;
  phone: string | null;
  tax_exemptions: string[] | null;
  email_marketing_consent: { state: string | null; consent_updated_at: string | null } | null;
  sms_marketing_consent: {
    state: string | null;
    consent_updated_at: string | null;
    consent_collected_from: string | null;
  } | null;
  admin_graphql_api_id: string | null;
  default_address: RestDraftOrderCustomerDefaultAddress | null;
}

export interface RestDraftOrder {
  id: number | null;
  note: string | null;
  email: string | null;
  taxes_included: boolean | null;
  currency: string | null;
  invoice_sent_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  tax_exempt: boolean | null;
  completed_at: string | null;
  name: string | null;
  status: string | null;
  line_items: RestDraftOrderLineItem[];
  shipping_address: RestDraftOrderAddress | null;
  billing_address: RestDraftOrderAddress | null;
  invoice_url: string | null;
  applied_discount: RestDraftOrderAppliedDiscount | null;
  order_id: number | null;
  shipping_line: RestDraftOrderShippingLine | null;
  tax_lines: RestDraftOrderTaxLine[];
  tags: string | null;
  total_price: string | null;
  subtotal_price: string | null;
  total_tax: string | null;
  payment_terms: RestDraftOrderPaymentTerms | null;
  customer: RestDraftOrderCustomer | null;
  admin_graphql_api_id: string | null;
}
