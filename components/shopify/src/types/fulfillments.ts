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
export interface FulfillmentOrder {
  id: string | null;
  orderId: string | null;
  requestStatus: string | null;
  status: string | null;
  supportedActions: SupportedAction[] | null;
  destination: Destination | null;
  lineItems: FulfillmentOrderLineItems | null;
  internationalDuties: InternationalDuties | null;
  fulfillAt: string | null;
  fulfillBy: string | null;
  fulfillmentHolds: FulfillmentHold[] | null;
  createdAt: string | null;
  updatedAt: string | null;
  deliveryMethod: DeliveryMethod | null;
  assignedLocation: AssignedLocation | null;
  merchantRequests: MerchantRequests | null;
}
interface SupportedAction {
  action: string | null;
}
interface Destination {
  id: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  company: string | null;
  countryCode: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  province: string | null;
  zip: string | null;
}
interface FulfillmentOrderLineItems {
  nodes: FulfillmentOrderLineItemNode[] | null;
}
interface FulfillmentOrderLineItemNode {
  id: string | null;
  totalQuantity: number | null;
  lineItem: FulfillmentOrderLineItem | null;
  inventoryItemId: string | null;
  variant: FulfillmentOrderVariant | null;
}
interface FulfillmentOrderLineItem {
  id: string | null;
}
interface FulfillmentOrderVariant {
  id: string | null;
}
interface InternationalDuties {
  incoterm: string | null;
}
interface FulfillmentHold {
  id: string | null;
  reason: string | null;
  reasonNotes: string | null;
  displayReason: string | null;
  heldByRequestingApp: boolean | null;
}
interface DeliveryMethod {
  id: string | null;
  methodType: string | null;
  serviceCode: string | null;
  presentedName: string | null;
  brandedPromise: BrandedPromise | null;
  sourceReference: string | null;
  maxDeliveryDateTime: string | null;
  minDeliveryDateTime: string | null;
  additionalInformation: AdditionalInformation | null;
}
interface BrandedPromise {
  name: string | null;
  handle: string | null;
}
interface AdditionalInformation {
  instructions: string | null;
  phone: string | null;
}
interface AssignedLocation {
  address1: string | null;
  address2: string | null;
  city: string | null;
  countryCode: string | null;
  location: FulfillmentOrderLocation | null;
  name: string | null;
  phone: string | null;
  province: string | null;
  zip: string | null;
}
interface FulfillmentOrderLocation {
  id: string | null;
}
interface MerchantRequests {
  nodes: MerchantRequestNode[] | null;
}
interface MerchantRequestNode {
  message: string | null;
  requestOptions: string | null;
  kind: string | null;
}
