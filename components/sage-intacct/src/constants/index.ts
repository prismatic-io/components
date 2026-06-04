export const API_URL = "https://api.intacct.com/ia/xml/xmlgw.phtml";

export const DEFAULT_CREATED_FIELD = "WHENCREATED";

export const RAW_REQUEST_EXAMPLE = `<query>
<object>CONTACT</object>
<select>
    <field>RECORDNO</field>
    <field>CONTACTNAME</field>
</select>
</query>`;

export const ALL_DELETE_OBJECTS_MODEL = [
  {
    label: "AP Account Label",
    value: "APACCOUNTLABEL",
  },
  {
    label: "AP Adjustment",
    value: "APADJUSTMENT",
  },
  {
    label: "AP Payment",
    value: "APPYMT",
  },
  {
    label: "Bill",
    value: "APBILL",
  },
  { label: "Vendor", value: "VENDOR" },
  { label: "AR Account Label", value: "ARACCOUNTLABEL" },
  { label: "AR Adjustment", value: "ARADJUSTMENT" },
  { label: "AR Advance", value: "ARADVANCE" },
  { label: "AR Payment", value: "ARPYMT" },
  { label: "Customer", value: "CUSTOMER" },
  { label: "Dunning Level Definition", value: "DUNNINGDEFINITION" },
  { label: "Invoice", value: "ARINVOICE" },
  { label: "Bank Feed", value: "BANKACCTTXNFEED" },
  { label: "Checking Account", value: "BANKACCTRECON" },
  { label: "Class", value: "CLASS" },
  { label: "Contact", value: "CONTACT" },
  { label: "Department", value: "DEPARTMENT" },
  {
    label: "Inter-Entity Transaction Configuration Account Default",
    value: "ENTITYACCTDEFAULT",
  },
  {
    label: "Inter-Entity Transaction Configuration Account Override",
    value: "ENTITYACCTOVERRIDE",
  },
  { label: "Location", value: "LOCATION" },
  { label: "User", value: "USERINFO" },
  { label: "Consolidation Book", value: "GCBOOK" },
  { label: "Consolidation Elimination Account", value: "GCBOOKELIMACCOUNT" },
  { label: "Consolidation Entity", value: "GCBOOKENTITY" },
  { label: "Consolidation Journal", value: "GCBOOKADJJOURNAL" },
  { label: "Consolidation Override Account", value: "GCBOOKACCTRATETYPE" },
  { label: "Ownership Structure", value: "GCOWNERSHIPSTRUCTURE" },
  { label: "Accumulation Type", value: "ACCUMULATIONTYPE" },
  { label: "AP Retainage Release", value: "APRETAINAGERELEASE" },
  { label: "AR Retainage Release", value: "ARRETAINAGERELEASE" },
  { label: "Change Request Status", value: "CHANGEREQUESTSTATUS" },
  { label: "Change Request Type", value: "CHANGEREQUESTTYPE" },
  { label: "Change Request", value: "CHANGEREQUEST" },
  { label: "Cost Type", value: "COSTTYPE" },
  { label: "Employee Position", value: "EMPLOYEEPOSITION" },
  { label: "Labor Class", value: "LABORCLASS" },
  { label: "Labor Shift", value: "LABORSHIFT" },
  { label: "Labor Union", value: "LABORUNION" },
  { label: "Payroll Report Check", value: "PAYROLLREPORTCHECK" },
  { label: "Payroll Report Timecard", value: "PAYROLLREPORTTIMECARD" },
  {
    label: "Payroll Report Gross Pay Object",
    value: "PAYROLLREPORTGROSSPAY",
  },
  { label: "Payroll Report Tax Setup", value: "PAYROLLREPORTTAXSETUP" },
  { label: "Payroll Report Tax Object", value: "PAYROLLREPORTTAX" },
  { label: "Payroll Report Pay Modifier", value: "PAYROLLREPORTPAYMODIFIER" },
  { label: "Payroll Report PTO Activity", value: "PAYROLLREPORTPTOACTIVITY" },
  { label: "Project Change Order", value: "PROJECTCHANGEORDER" },
  { label: "Project Contract Type", value: "PROJECTCONTRACTTYPE" },
  { label: "Project Contract", value: "PROJECTCONTRACT" },
  { label: "Project Contract Line", value: "PROJECTCONTRACT" },
  { label: "Project Contract Line Entry", value: "PROJECTCONTRACTLINEENTRY" },
  { label: "Project Estimate Type", value: "PJESTIMATETYPE" },
  { label: "Project Estimate", value: "PJESTIMATE" },
  { label: "Project Estimate Entry", value: "PJESTIMATEENTRY" },
  { label: "Rate Table", value: "RATETABLE" },
  { label: "Standard Cost Type", value: "STANDARDCOSTTYPE" },
  { label: "Standard Task", value: "STANDARDTASK" },
  { label: "Billing Price List", value: "CONTRACTPRICELIST" },
  { label: "Billing Price List Entry", value: "CONTRACTITEMPRICELIST" },
  { label: "Billing Template", value: "CONTRACTBILLINGTEMPLATE" },
  { label: "Expense Template", value: "CONTRACTEXPENSETEMPLATE" },
  { label: "Contract Expense", value: "CONTRACTEXPENSE" },
  { label: "Contract Invoice Policy", value: "GENINVOICEPOLICY" },
  { label: "Contract Line", value: "CONTRACTDETAIL" },
  { label: "Contract Line Expense", value: "CONTRACTEXPENSE" },
  { label: "Revenue Template", value: "CONTRACTREVENUETEMPLATE" },
  { label: "Contract Type", value: "CONTRACTTYPE" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Usage Data", value: "CONTRACTUSAGE" },
  { label: "Employee", value: "EMPLOYEE" },
  { label: "Expense Adjustment", value: "EXPENSEADJUSTMENTS" },
  { label: "Expense Report", value: "EEXPENSES" },
  { label: "Expense Type", value: "EEACCOUNTLABEL" },
  { label: "Account Allocation Group", value: "GLACCTALLOCATIONGRP" },
  { label: "Account Allocation Definition", value: "GLACCTALLOCATION" },
  { label: "Account Group Purpose", value: "GLACCTGRPPURPOSE" },
  { label: "Account Group", value: "GLACCTGRP" },
  { label: "Account", value: "GLACCOUNT" },
  { label: "Budget", value: "GLBUDGETHEADER" },
  { label: "Journal Entry", value: "GLBATCH" },
  { label: "Reporting Period", value: "REPORTINGPERIOD" },
  { label: "Statistical Account", value: "STATACCOUNT" },
  { label: "Statistical Journal Entry", value: "GLBATCH" },
  { label: "Transaction Allocation", value: "ALLOCATION" },
  { label: "Bin Face", value: "BINFACE" },
  { label: "Bin Size", value: "BINSIZE" },
  { label: "Bin", value: "BIN" },
  { label: "Cost of Goods Sold Adjustment", value: "COGSCLOSEDJE" },
  { label: "Cycle Count", value: "ICCYCLECOUNT" },
  { label: "Cycle Count Line", value: "ICCYCLECOUNTENTRY" },
  { label: "Inventory Transaction", value: "INVDOCUMENT" },
  { label: "Item Cross Reference", value: "ITEMCROSSREF" },
  { label: "Item", value: "ITEM" },
  { label: "Warehouse Transfer", value: "ICTRANSFER" },
  { label: "Warehouse", value: "WAREHOUSE" },
  { label: "Zone", value: "ZONE" },
  { label: "Observed Percent Completed Entry", value: "OBSPCTCOMPLETED" },
  { label: "Project", value: "PROJECT" },
  { label: "Observed Percent Completed Entry", value: "OBSPCTCOMPLETED" },
  { label: "Task", value: "TASK" },
  { label: "Timesheet", value: "TIMESHEET" },
  { label: "Purchasing Transaction", value: "PODOCUMENT" },
  { label: "Vendor Compliance Definition", value: "COMPLIANCEDEFINITION" },
  { label: "Vendor Compliance Record", value: "compliancerecord" },
  { label: "Vendor Compliance Type", value: "COMPLIANCETYPE" },
].sort((a, b) => a.label.localeCompare(b.label));




export const POLL_RESOURCE_CONFIG: Record<
  string,
  {
    objectName: string;
    timestampField: string;
    createdField: string;
    label: string;
  }
> = {
  vendors: {
    objectName: "VENDOR",
    timestampField: "WHENMODIFIED",
    createdField: "WHENCREATED",
    label: "Vendors",
  },
  customers: {
    objectName: "CUSTOMER",
    timestampField: "WHENMODIFIED",
    createdField: "WHENCREATED",
    label: "Customers",
  },
  bills: {
    objectName: "APBILL",
    timestampField: "WHENMODIFIED",
    createdField: "WHENCREATED",
    label: "Bills (AP)",
  },
  invoices: {
    objectName: "ARINVOICE",
    timestampField: "WHENMODIFIED",
    createdField: "WHENCREATED",
    label: "Invoices (AR)",
  },
  contacts: {
    objectName: "CONTACT",
    timestampField: "WHENMODIFIED",
    createdField: "WHENCREATED",
    label: "Contacts",
  },
  employees: {
    objectName: "EMPLOYEE",
    timestampField: "WHENMODIFIED",
    createdField: "WHENCREATED",
    label: "Employees",
  },
  projects: {
    objectName: "PROJECT",
    timestampField: "WHENMODIFIED",
    createdField: "WHENCREATED",
    label: "Projects",
  },
  arPayments: {
    objectName: "ARPYMT",
    timestampField: "WHENMODIFIED",
    createdField: "WHENCREATED",
    label: "AR Payments",
  },
};

export const TO_BE_CREATED_TEXT = "for the to-be-created object.";

export const TO_BE_UPDATED_TEXT = "for the to-be-updated object.";

export const CREATE_PROJECT_ADDITIONAL_FIELDS = {
  customerId: "cust001",
  projectManagerEmployeeId: "emp123",
  externalUserId: "ext456",
  salesContactEmployeeId: "sales789",
  referenceNo: "ref987",
  userRestrictions: "None",
  transactionRules: ["Rule1", "Rule2"],
  primaryContactName: "John Doe",
  billToContactName: "Jane Smith",
  shipToContactName: "Bob Brown",
  paymentTerms: "Net 30",
  billingType: "Time and Materials",
  beginDate: "2023-01-01T00:00:00.000Z",
  endDate: "2023-12-31T23:59:59.999Z",
  departmentId: "dept001",
  locationId: "loc001",
  classId: "class001",
  attachmentsId: "att001",
  billableEmployeeExpense: true,
  billableApPurchasing: true,
  currency: "USD",
  salesOrderNo: "SO12345",
  purchaseOrderNo: "PO54321",
  purchaseOrderAmount: "50000",
  purchaseQuoteNo: "PQ12345",
  contractAmount: "100000",
  laborPricingOption: "Standard",
  laborPricingDefaultRate: "150",
  expensePricingOption: "Standard",
  expensePricingDefaultRate: "50",
  apPurchasingPricingOption: "Standard",
  apPurchasingPricingDefaultRate: "30",
  budgetedBillingAmount: "120000",
  budgetedCost: "90000",
  budgetedDuration: "12 months",
  glBudgetId: "gl12345",
  invoiceMessage: "Thank you for your business",
  invoiceCurrency: "USD",
  customFields: [
    ["customField1", "value1"],
    ["customField2", 42],
  ],
};
