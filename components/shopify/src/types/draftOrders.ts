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
interface Address {
  id?: string | null;
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
interface TaxLine {
  rate: number | null;
  ratePercentage: number | null;
  source: string | null;
  priceSet: PriceSet | null;
  channelLiable: boolean | null;
  title: string | null;
}
interface PriceSet {
  shopMoney: {
    amount: string | null;
    currencyCode: string | null;
  } | null;
}
interface PaymentTerms {
  dueInDays: number | null;
  paymentTermsName: string | null;
  paymentTermsType: string | null;
  overdue: boolean | null;
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
