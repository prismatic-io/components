export interface Fulfillment {
  id: string | null;
  order: {
    id: string | null;
  } | null;
  status: string | null;
  createdAt: string | null;
  service: {
    type: string | null;
  } | null;
  updatedAt: string | null;
  trackingInfo: TrackingInfo[] | null;
  location: {
    id: string | null;
  } | null;
  originAddress: Address | null;
  fulfillmentLineItems: {
    nodes: FulfillmentLineItem[] | null;
  } | null;
  name: string | null;
}

interface TrackingInfo {
  company: string | null;
  number: string | null;
  url: string | null;
}

interface Address {
  address1: string | null;
  address2: string | null;
  city: string | null;
  zip: string | null;
  countryCode: string | null;
  provinceCode: string | null;
}

interface FulfillmentLineItem {
  id: string | null;
  lineItem: LineItem | null;
}

interface LineItem {
  title: string | null;
  quantity: number | null;
  originalUnitPriceSet: MoneySet | null;
  totalDiscountSet: MoneySet | null;
  discountAllocations: DiscountAllocation[] | null;
  duties: Duty[] | null;
  discountedTotalSet: {
    shopMoney: Money | null;
  } | null;
  fulfillmentStatus: string | null;
  variant: Variant | null;
  requiresShipping: boolean | null;
  vendor: string | null;
  sku: string | null;
  taxable: boolean | null;
  isGiftCard: boolean | null;
  name: string | null;
}

interface MoneySet {
  shopMoney: Money | null;
  presentmentMoney: Money | null;
}

interface Money {
  amount: string | null;
  currencyCode: string | null;
}

interface DiscountAllocation {
  allocatedAmountSet: MoneySet | null;
  discountApplication: {
    index: number | null;
  } | null;
}

interface Duty {
  id: string | null;
  price: MoneySet | null;
  taxLines: TaxLine[] | null;
}

interface TaxLine {
  rate: number | null;
  title: string | null;
  priceSet: MoneySet | null;
  channelLiable: boolean | null;
}

interface Variant {
  title: string | null;
  id: string | null;
  price: string | null;
  product: {
    id: string | null;
  } | null;
}
