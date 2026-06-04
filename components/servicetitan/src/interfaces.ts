export interface Customer {
  id: number;
  active: boolean;
  name: string;
  type: string;
  address: Address;
  customFields: CustomField[];
  balance: number;
  tagTypeIds: number[];
  doNotMail: boolean;
  doNotService: boolean;
  createdOn: string;
  createdById: number;
  modifiedOn: string;
  mergedToId: number;
  externalData: ExternalData[];
}

export interface Booking {
  id: number;
  source: string;
  createdOn: string;
  name: string;
  address: Address;
  customerType: string;
  start: string;
  summary: string;
  campaignId: number;
  businessUnitId: number;
  isFirstTimeClient: boolean;
  uploadedImages: string[];
  isSendConfirmationEmail: boolean;
  status: string;
  dismissingReasonId: number;
  jobId: number;
  externalId: string;
  priority: string;
  jobTypeId: number;
  bookingProviderId: number;
  modifiedOn: string;
}

export interface Job {
  id: number;
  jobNumber: string;
  projectId: number;
  customerId: number;
  locationId: number;
  jobStatus: string;
  completedOn: string;
  businessUnitId: number;
  jobTypeId: number;
  priority: string;
  campaignId: number;
  summary: string;
  customFields: CustomField[];
  appointmentCount: number;
  firstAppointmentId: number;
  lastAppointmentId: number;
  recallForId: number;
  warrantyId: number;
  jobGeneratedLeadSource: JobGeneratedLeadSource;
  noCharge: boolean;
  notificationsEnabled: boolean;
  createdOn: string;
  createdById: number;
  modifiedOn: string;
  tagTypeIds: number[];
  leadCallId: number;
  bookingId: number;
  soldById: number;
  externalData: ExternalData[];
  customerPo: string;
}

export interface Appointment {
  id: number;
  jobId: number;
  appointmentNumber: string;
  start: string;
  end: string;
  arrivalWindowStart: string;
  arrivalWindowEnd: string;
  status: Status;
  specialInstructions: string;
  createdOn: string;
  modifiedOn: string;
  customerId: number;
  unused: boolean;
}

export interface Project {
  id: number;
  number: string;
  name: string;
  summary: string;
  status: string;
  statusId: number;
  subStatus: string;
  subStatusId: number;
  customerId: number;
  locationId: number;
  projectManagerIds: number[];
  businessUnitIds: number[];
  startDate: string;
  targetCompletionDate: string;
  actualCompletionDate: string;
  modifiedOn: string;
  createdOn: string;
  customFields: CustomField[];
  externalData: ExternalData[];
  jobIds: number[];
}

export interface InstalledEquipment {
  id: number;
  equipmentId: number;
  locationId: number;
  customerId: number;
  invoiceItemId: number;
  name: string;
  installedOn: string;
  createdOn: string;
  modifiedOn: string;
  serialNumber: string;
  memo: string;
  manufacturer: string;
  model: string;
  cost: number;
  manufacturerWarrantyStart: string;
  manufacturerWarrantyEnd: string;
  serviceProviderWarrantyStart: string;
  serviceProviderWarrantyEnd: string;
  tags: Tag[];
}

export interface Location {
  id: number;
  customerId: number;
  active: boolean;
  name: string;
  address: Address;
  customFields: CustomField[];
  createdOn: string;
  createdById: number;
  modifiedOn: string;
  mergedToId: number;
  zoneId: number;
  tagTypeIds: number[];
  externalData: ExternalData[];
  taxZoneId: number;
}

export interface Technician {
  id: number;
  userId: number;
  name: string;
  roleIds: number[];
  businessUnitId: number;
  mainZoneId: number;
  zoneIds: number[];
  createdOn: string;
  modifiedOn: string;
  email: string;
  phoneNumber: string;
  loginName: string;
  home: Address;
  dailyGoal: number;
  isManagedTech: boolean;
  customFields: CustomField[];
  active: boolean;
  aadUserId: string;
  burdenRate: number;
  team: string;
  jobFilter: string;
}

export interface Invoice {
  id: number;
  syncStatus: string;
  summary: string;
  referenceNumber: string;
  invoiceDate: string;
  dueDate: string;
  subTotal: string;
  salesTax: string;
  salesTaxCode: SalesTaxCode;
  total: string;
  balance: string;
  invoiceType: AssignedTo;
  customer: AssignedTo;
  customerAddress: Address;
  location: AssignedTo;
  locationAddress: Address;
  businessUnit: AssignedTo;
  termName: string;
  createdBy: string;
  batch: Batch;
  depositedOn: string;
  createdOn: string;
  modifiedOn: string;
  adjustmentToId: number;
  job: InvoiceJob;
  projectId: number;
  royalty: Royalty;
  employeeInfo: EmployeeInfo;
  commissionEligibilityDate: string;
  sentStatus: string;
  reviewStatus: string;
  assignedTo: AssignedTo;
  items: Item[];
  customFields: CustomField[];
}

export interface Payment {
  id: number;
  syncStatus: string;
  referenceNumber: string;
  date: string;
  type: string;
  typeId: string;
  total: string;
  unappliedAmount: string;
  memo: string;
  customer: BusinessUnit;
  businessUnit: BusinessUnit;
  batch: Batch;
  createdBy: string;
  generalLedgerAccount: GeneralLedgerAccount;
  appliedTo: AppliedTo[];
  customFields: CustomField[];
  authCode: string;
  checkNumber: string;
  modifiedOn: string;
  createdOn: string;
}

export interface JobCancel {
  id: number;
  name: string;
  active: boolean;
  createdOn: string;
  modifiedOn: string;
}

export interface BusinessUnits {
  id: number;
  active: boolean;
  name: string;
  officialName: string;
  email: string;
  currency: string;
  phoneNumber: string;
  invoiceHeader: string;
  invoiceMessage: string;
  defaultTaxRate: number;
  authorizationParagraph: string;
  acknowledgementParagraph: string;
  address: Address;
  materialSku: string;
  quickbooksClass: string;
  accountCode: string;
  franchiseId: string;
  conceptCode: string;
  corporateContractNumber: string;
  tenant: Tenant;
  createdOn: string;
  modifiedOn: string;
  externalData: ExternalData[];
}

export interface UserRoles {
  id: number;
  active: boolean;
  name: string;
  createdOn: string;
  employeeType: string;
}
export interface AppointmentAssignment {
  id: number;
  technicianId: number;
  technicianName: string;
  assignedById: number;
  assignedOn: string;
  status: string;
  isPaused: boolean;
  jobId: number;
  appointmentId: number;
}

export interface ContactCustomer {
  id: number;
  type: string;
  value: string;
  memo: string;
  modifiedOn: string;
  phoneSettings: PhoneSettings;
}

export interface PhoneSettings {
  phoneNumber: string;
  doNotText: boolean;
}

interface Address {
  street: string;
  unit: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface CustomField {
  typeId: number;
  name: string;
  value: string;
}

interface ExternalData {
  key: string;
  value: string;
}

interface JobGeneratedLeadSource {
  jobId: number;
  employeeId: number;
}

type Status =
  | "Scheduled"
  | "Dispatched"
  | "Working"
  | "Hold"
  | "Done"
  | "Canceled";

interface Tag {
  id: number;
  ownerId: number;
  typeId: number;
  typeName: string;
  memo: string;
  color: string;
  textColor: string;
  code: string;
}

interface AssignedTo {
  id: number;
  name: string;
}

interface Batch {
  id: number;
  number: string;
  name: string;
}

interface EmployeeInfo {
  id: number;
  name: string;
  modifiedOn: string;
}

interface Item {
  id: number;
  description: string;
  quantity: string;
  cost: string;
  totalCost: string;
  inventoryLocation: string;
  price: string;
  type: string;
  skuName: string;
  skuId: number;
  total: string;
  inventory: boolean;
  taxable: boolean;
  generalLedgerAccount: Account;
  costOfSaleAccount: Account;
  assetAccount: Account;
  membershipTypeId: number;
  itemGroup: ItemGroup;
  displayName: string;
  soldHours: number;
  modifiedOn: string;
  serviceDate: string;
  order: number;
  businessUnit: AssignedTo;
}

interface Account {
  id: number;
  name: string;
  number: string;
  type: string;
  detailType: string;
}

interface ItemGroup {
  rootId: number;
  name: string;
}

interface InvoiceJob {
  id: number;
  number: string;
  type: string;
}

interface Royalty {
  status: string;
  date: string;
  sentOn: string;
  memo: string;
}

interface SalesTaxCode {
  id: number;
  name: string;
  taxRate: number;
}

export interface ListGeneric<T> {
  page: number;
  pageSize: number;
  hasMore: boolean;
  totalCount: number;
  data: T[];
}

export interface AppliedTo {
  appliedId: number;
  appliedTo: number;
  appliedAmount: string;
  appliedOn: string;
  appliedBy: string;
  appliedToReferenceNumber: string;
}

export interface BusinessUnit {
  id: number;
  name: string;
}

export interface GeneralLedgerAccount {
  id: number;
  name: string;
  number: string;
  type: string;
  detailType: string;
}

export interface Tenant {
  id: number;
  name: string;
  accountCode: string;
  franchiseId: string;
  conceptCode: string;
  modifiedOn: string;
}
