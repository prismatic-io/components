export interface FulfillmentOrder {
  id: string | null;
  orderId: string | null;
  requestStatus: string | null;
  status: string | null;
  supportedActions: SupportedAction[] | null;
  destination: Destination | null;
  lineItems: LineItems | null;
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

interface LineItems {
  nodes: LineItemNode[] | null;
}

interface LineItemNode {
  id: string | null;
  totalQuantity: number | null;
  lineItem: LineItem | null;
  inventoryItemId: string | null;
  variant: Variant | null;
}

interface LineItem {
  id: string | null;
}

interface Variant {
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
  location: Location | null;
  name: string | null;
  phone: string | null;
  province: string | null;
  zip: string | null;
}

interface Location {
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
