interface Money {
  amount: string | null;
  currencyCode: string | null;
}

interface MoneySet {
  shopMoney: Money | null;
  presentmentMoney: Money | null;
}

interface TaxLine {
  rate: number | null;
  title: string | null;
  priceSet: MoneySet | null;
  channelLiable: boolean | null;
}

interface Duty {
  id: string | null;
  price: MoneySet | null;
  taxLines: TaxLine[] | null;
}

interface DiscountAllocation {
  allocatedAmountSet: MoneySet | null;
  discountApplication: {
    index: number | null;
  } | null;
}

interface Variant {
  title: string | null;
  id: string | null;
  price: string | null;
  product: {
    id: string | null;
  } | null;
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

interface FulfillmentLineItem {
  id: string | null;
  lineItem: LineItem | null;
}

interface Address {
  address1: string | null;
  address2: string | null;
  city: string | null;
  zip: string | null;
  countryCode: string | null;
  provinceCode: string | null;
}

interface TrackingInfo {
  company: string | null;
  number: string | null;
  url: string | null;
}

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

interface FulfillmentOrderLineItemNode {
  id: string | null;
  totalQuantity: number | null;
  lineItem: {
    id: string | null;
  } | null;
  inventoryItemId: string | null;
  variant: {
    id: string | null;
  } | null;
}

interface FulfillmentHold {
  id: string | null;
  reason: string | null;
  reasonNotes: string | null;
  displayReason: string | null;
  heldByRequestingApp: boolean | null;
}

interface BrandedPromise {
  name: string | null;
  handle: string | null;
}

interface AdditionalInformation {
  instructions: string | null;
  phone: string | null;
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

interface AssignedLocation {
  address1: string | null;
  address2: string | null;
  city: string | null;
  countryCode: string | null;
  location: {
    id: string | null;
  } | null;
  name: string | null;
  phone: string | null;
  province: string | null;
  zip: string | null;
}

interface MerchantRequestNode {
  message: string | null;
  requestOptions: string | null;
  kind: string | null;
}

export interface FulfillmentOrder {
  id: string | null;
  orderId: string | null;
  requestStatus: string | null;
  status: string | null;
  supportedActions:
    | {
        action: string | null;
      }[]
    | null;
  destination: Destination | null;
  lineItems: {
    nodes: FulfillmentOrderLineItemNode[] | null;
  } | null;
  internationalDuties: {
    incoterm: string | null;
  } | null;
  fulfillAt: string | null;
  fulfillBy: string | null;
  fulfillmentHolds: FulfillmentHold[] | null;
  createdAt: string | null;
  updatedAt: string | null;
  deliveryMethod: DeliveryMethod | null;
  assignedLocation: AssignedLocation | null;
  merchantRequests: {
    nodes: MerchantRequestNode[] | null;
  } | null;
}

interface RestFulfillmentOriginAddress {
  address1: string | null;
  address2: string | null;
  city: string | null;
  zip: string | null;
  country_code: string | null;
  province_code: string | null;
}

interface RestFulfillmentLineItemDutyTaxLine {
  rate: number | null;
  title: string | null;
  price_set: {
    shop_money: { amount: string | null; currency_code: string | null } | null;
    presentment_money: {
      amount: string | null;
      currency_code: string | null;
    } | null;
  } | null;
  channel_liable: boolean | null;
}

interface RestFulfillmentLineItem {
  id: number | null;
  variant_id: number | null;
  title: string | null;
  quantity: number | null;
  sku: string | null;
  variant_title: string | null;
  vendor: string | null;
  product_id: string | null;
  requires_shipping: boolean | null;
  taxable: boolean | null;
  gift_card: boolean | null;
  name: string | null;
  price: Money | null;
  total_discount: Money | null;
  fulfillment_status: string | null;
  price_set: {
    shop_money: { amount: string | null; currency_code: string | null } | null;
    presentment_money: {
      amount: string | null;
      currency_code: string | null;
    } | null;
  } | null;
  total_discount_set: {
    shop_money: { amount: string | null; currency_code: string | null } | null;
    presentment_money: {
      amount: string | null;
      currency_code: string | null;
    } | null;
  } | null;
  discount_allocations: {
    amount: string | null;
    discount_application_index: number | null;
    amount_set: {
      shop_money: {
        amount: string | null;
        currency_code: string | null;
      } | null;
      presentment_money: {
        amount: string | null;
        currency_code: string | null;
      } | null;
    } | null;
  }[];
  duties: {
    id: number | null;
    price: {
      shop_money: {
        amount: string | null;
        currency_code: string | null;
      } | null;
    } | null;
    tax_lines: RestFulfillmentLineItemDutyTaxLine[];
  }[];
  admin_graphql_api_id: string | null;
}

export interface RestFulfillment {
  id: number | null;
  order_id: number | null;
  status: string | null;
  created_at: string | null;
  service: string | null;
  updated_at: string | null;
  tracking_company: string | null;
  location_id: number | null;
  origin_address: RestFulfillmentOriginAddress | null;
  line_items: RestFulfillmentLineItem[];
  tracking_number: string | null;
  tracking_numbers: (string | null)[];
  tracking_url: string | null;
  tracking_urls: (string | null)[];
  name: string | null;
  admin_graphql_api_id: string | null;
}

interface RestFulfillmentOrderDestination {
  id: number | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  company: string | null;
  country: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  province: string | null;
  zip: string | null;
}

interface RestFulfillmentOrderLineItem {
  id: number | null;
  quantity: number | null;
  line_item_id: number | null;
  inventory_item_id: number | null;
  variant_id: number | null;
}

interface RestFulfillmentOrderFulfillmentHold {
  reason: string | null;
  reasonNotes: string | null;
  displayReason: string | null;
  id: number | null;
  heldByRequestingApp: boolean | null;
}

interface RestFulfillmentOrderDeliveryMethod {
  id: number | null;
  method_type: string | null;
  min_delivery_date_time: string | null;
  max_delivery_date_time: string | null;
  additional_information: {
    instructions: string | null;
    phone: string | null;
  } | null;
  service_code: string | null;
  source_reference: string | null;
  branded_promise: { name: string | null; handle: string | null } | null;
  presented_name: string | null;
}

interface RestFulfillmentOrderAssignedLocation {
  address1: string | null;
  address2: string | null;
  city: string | null;
  country_code: string | null;
  location_id: number | null;
  name: string | null;
  phone: string | null;
  province: string | null;
  zip: string | null;
}

export interface RestFulfillmentOrder {
  id: number | null;
  order_id: number | null;
  request_status: string | null;
  status: string | null;
  supported_actions: (string | null)[];
  destination: RestFulfillmentOrderDestination | null;
  line_items: RestFulfillmentOrderLineItem[];
  international_duties: string | null;
  fulfill_at: string | null;
  fulfill_by: string | null;
  fulfillment_holds: RestFulfillmentOrderFulfillmentHold[];
  created_at: string | null;
  updated_at: string | null;
  delivery_method: RestFulfillmentOrderDeliveryMethod | null;
  assigned_location: RestFulfillmentOrderAssignedLocation | null;
  merchant_requests: {
    message: string | null;
    request_options: string | null;
    kind: string | null;
  }[];
}
