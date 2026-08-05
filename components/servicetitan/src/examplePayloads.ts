const createPaymentPayload = {
  id: 0,
  typeId: 0,
  active: true,
  memo: "string",
  paidOn: "string",
  authCode: "string",
  checkNumber: "string",
  exportId: "string",
  transactionStatus: {},
  status: {},
  splits: [
    {
      invoiceId: 0,
      amount: 0,
    },
  ],
};
export const createPaymentExamplePayload = { data: createPaymentPayload };
export const listPaymentsExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [
      {
        id: 0,
        syncStatus: "string",
        referenceNumber: "string",
        date: "string",
        type: "string",
        typeId: "string",
        total: "string",
        unappliedAmount: "string",
        memo: "string",
        customer: {
          id: 0,
          name: "string",
        },
        businessUnit: {
          id: 0,
          name: "string",
        },
        batch: {
          id: 0,
          number: "string",
          name: "string",
        },
        createdBy: "string",
        generalLedgerAccount: {
          id: 0,
          name: "string",
          number: "string",
          type: "string",
          detailType: "string",
        },
        appliedTo: [
          {
            appliedId: 0,
            appliedTo: 0,
            appliedAmount: "string",
            appliedOn: "string",
            appliedBy: "string",
            appliedToReferenceNumber: "string",
          },
        ],
        customFields: [
          {
            name: "string",
            value: "string",
          },
        ],
        authCode: "string",
        checkNumber: "string",
        modifiedOn: "string",
        createdOn: "string",
      },
    ],
  },
};
const getInvoicePayload = {
  id: 0,
  syncStatus: "string",
  summary: "string",
  referenceNumber: "string",
  invoiceDate: "string",
  dueDate: "string",
  subTotal: "string",
  salesTax: "string",
  salesTaxCode: {
    id: 0,
    name: "string",
    taxRate: 0,
  },
  total: "string",
  balance: "string",
  invoiceType: {
    id: 0,
    name: "string",
  },
  customer: {
    id: 0,
    name: "string",
  },
  customerAddress: {
    street: "string",
    unit: "string",
    city: "string",
    state: "string",
    zip: "string",
    country: "string",
  },
  location: {
    id: 0,
    name: "string",
  },
  locationAddress: {
    street: "string",
    unit: "string",
    city: "string",
    state: "string",
    zip: "string",
    country: "string",
  },
  businessUnit: {
    id: 0,
    name: "string",
  },
  termName: "string",
  createdBy: "string",
  batch: {
    id: 0,
    number: "string",
    name: "string",
  },
  depositedOn: "string",
  createdOn: "string",
  modifiedOn: "string",
  adjustmentToId: 0,
  job: {
    id: 0,
    number: "string",
    type: "string",
  },
  projectId: 0,
  royalty: {
    status: "string",
    date: "string",
    sentOn: "string",
    memo: "string",
  },
  employeeInfo: {
    id: 0,
    name: "string",
    modifiedOn: "string",
  },
  commissionEligibilityDate: "string",
  sentStatus: "NotSent",
  reviewStatus: "NeedsReview",
  assignedTo: {
    id: 0,
    name: "string",
  },
  items: [
    {
      id: 0,
      description: "string",
      quantity: "string",
      cost: "string",
      totalCost: "string",
      inventoryLocation: "string",
      price: "string",
      type: "Service",
      skuName: "string",
      skuId: 0,
      total: "string",
      inventory: true,
      taxable: true,
      generalLedgerAccount: {
        id: 0,
        name: "string",
        number: "string",
        type: "string",
        detailType: "string",
      },
      costOfSaleAccount: {
        id: 0,
        name: "string",
        number: "string",
        type: "string",
        detailType: "string",
      },
      assetAccount: {
        id: 0,
        name: "string",
        number: "string",
        type: "string",
        detailType: "string",
      },
      membershipTypeId: 0,
      itemGroup: {
        rootId: 0,
        name: "string",
      },
      displayName: "string",
      soldHours: 0,
      modifiedOn: "string",
      serviceDate: "string",
      order: 0,
      businessUnit: {
        id: 0,
        name: "string",
      },
    },
  ],
  customFields: [
    {
      name: "string",
      value: "string",
    },
  ],
};
export const listInvoicesExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [getInvoicePayload, getInvoicePayload],
  },
};
const createBookingPayload = {
  id: 0,
  source: "string",
  createdOn: "string",
  name: "string",
  address: {
    street: "string",
    unit: "string",
    city: "string",
    state: "string",
    zip: "string",
    country: "string",
  },
  customerType: {},
  start: "string",
  summary: "string",
  campaignId: 0,
  businessUnitId: 0,
  isFirstTimeClient: true,
  uploadedImages: ["string"],
  isSendConfirmationEmail: true,
  status: {},
  dismissingReasonId: 0,
  jobId: 0,
  externalId: "string",
  priority: {},
  jobTypeId: 0,
  bookingProviderId: 0,
  modifiedOn: "string",
};
export const createBookingExamplePayload = { data: createBookingPayload };
export const listBookingByProviderExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [createBookingPayload, createBookingPayload],
  },
};
const createCustomerPayload = {
  id: 0,
  active: true,
  name: "string",
  type: {},
  address: {
    street: "string",
    unit: "string",
    city: "string",
    state: "string",
    zip: "string",
    country: "string",
    latitude: 0,
    longitude: 0,
  },
  customFields: [
    {
      typeId: 0,
      name: "string",
      value: "string",
    },
  ],
  balance: 0,
  tagTypeIds: [0],
  doNotMail: true,
  doNotService: true,
  createdOn: "string",
  createdById: 0,
  modifiedOn: "string",
  mergedToId: 0,
  externalData: [
    {
      key: "string",
      value: "string",
    },
  ],
  locations: [
    {
      taxZoneId: 0,
      id: 0,
      customerId: 0,
      active: true,
      name: "string",
      address: {
        street: "string",
        unit: "string",
        city: "string",
        state: "string",
        zip: "string",
        country: "string",
        latitude: 0,
        longitude: 0,
      },
      customFields: [
        {
          typeId: 0,
          name: "string",
          value: "string",
        },
      ],
      createdOn: "string",
      createdById: 0,
      modifiedOn: "string",
      mergedToId: 0,
      zoneId: 0,
      tagTypeIds: [0],
      externalData: [
        {
          key: "string",
          value: "string",
        },
      ],
      contacts: [
        {
          id: 0,
          type: {},
          value: "string",
          memo: "string",
        },
      ],
    },
  ],
  contacts: [
    {
      id: 0,
      type: {},
      value: "string",
      memo: "string",
    },
  ],
};
export const createCustomerExamplePayload = { data: createCustomerPayload };
const getCustomerPayload = {
  id: 0,
  active: true,
  name: "string",
  type: {},
  address: {
    street: "string",
    unit: "string",
    city: "string",
    state: "string",
    zip: "string",
    country: "string",
    latitude: 0,
    longitude: 0,
  },
  customFields: [
    {
      typeId: 0,
      name: "string",
      value: "string",
    },
  ],
  balance: 0,
  tagTypeIds: [0],
  doNotMail: true,
  doNotService: true,
  createdOn: "string",
  createdById: 0,
  modifiedOn: "string",
  mergedToId: 0,
  externalData: [
    {
      key: "string",
      value: "string",
    },
  ],
};
export const getCustomerExamplePayload = { data: getCustomerPayload };
export const listCustomersExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [getCustomerPayload, getCustomerPayload],
  },
};
const createCustomerContactPayload = {
  id: 0,
  type: {},
  value: "string",
  memo: "string",
  modifiedOn: "string",
  phoneSettings: {
    phoneNumber: "string",
    doNotText: true,
  },
};
export const createCustomerContactExamplePayload = {
  data: createCustomerContactPayload,
};
export const listCustomerContactsExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [createCustomerContactPayload, createCustomerContactPayload],
  },
};
const getJobPayload = {
  id: 0,
  jobNumber: "string",
  projectId: 0,
  customerId: 0,
  locationId: 0,
  jobStatus: "string",
  completedOn: "string",
  businessUnitId: 0,
  jobTypeId: 0,
  priority: "string",
  campaignId: 0,
  summary: "string",
  customFields: [
    {
      typeId: 0,
      name: "string",
      value: "string",
    },
  ],
  appointmentCount: 0,
  firstAppointmentId: 0,
  lastAppointmentId: 0,
  recallForId: 0,
  warrantyId: 0,
  jobGeneratedLeadSource: {
    jobId: 0,
    employeeId: 0,
  },
  noCharge: true,
  notificationsEnabled: true,
  createdOn: "string",
  createdById: 0,
  modifiedOn: "string",
  tagTypeIds: [0],
  leadCallId: 0,
  bookingId: 0,
  soldById: 0,
  externalData: [
    {
      key: "string",
      value: "string",
    },
  ],
  customerPo: "string",
};
export const getJobExamplePayload = { data: getJobPayload };
export const listJobsExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [getJobPayload, getJobPayload],
  },
};
export const createJobExamplePayload = getJobExamplePayload;
const getAppointmentPayload = {
  id: 0,
  jobId: 0,
  appointmentNumber: "string",
  start: "string",
  end: "string",
  arrivalWindowStart: "string",
  arrivalWindowEnd: "string",
  status: {},
  specialInstructions: "string",
  createdOn: "string",
  modifiedOn: "string",
  customerId: 0,
  unused: true,
};
export const getAppointmentExamplePayload = { data: getAppointmentPayload };
export const listAppointmentsExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [getAppointmentPayload, getAppointmentPayload],
  },
};
const getProjectPayload = {
  id: 0,
  number: "string",
  name: "string",
  summary: "string",
  status: "string",
  statusId: 0,
  subStatus: "string",
  subStatusId: 0,
  customerId: 0,
  locationId: 0,
  projectManagerIds: [0],
  businessUnitIds: [0],
  startDate: "string",
  targetCompletionDate: "string",
  actualCompletionDate: "string",
  modifiedOn: "string",
  createdOn: "string",
  customFields: [
    {
      typeId: 0,
      name: "string",
      value: "string",
    },
  ],
  externalData: [
    {
      key: "string",
      value: "string",
    },
  ],
  jobIds: [0],
};
export const getProjectExamplePayload = { data: getProjectPayload };
export const listProjectsExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [getProjectPayload, getProjectPayload],
  },
};
const getLocationPayload = {
  id: 0,
  customerId: 0,
  active: true,
  name: "string",
  address: {
    street: "string",
    unit: "string",
    city: "string",
    state: "string",
    zip: "string",
    country: "string",
    latitude: 0,
    longitude: 0,
  },
  customFields: [
    {
      typeId: 0,
      name: "string",
      value: "string",
    },
  ],
  createdOn: "string",
  createdById: 0,
  modifiedOn: "string",
  mergedToId: 0,
  zoneId: 0,
  tagTypeIds: [0],
  externalData: [
    {
      key: "string",
      value: "string",
    },
  ],
  taxZoneId: 0,
};
export const getLocationExamplePayload = { data: getLocationPayload };
export const createLocationExamplePayload = {
  data: {
    ...getLocationPayload,
    contacts: [
      {
        id: 0,
        type: {},
        value: "string",
        memo: "string",
      },
    ],
  },
};
export const listLocationsExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [getLocationPayload, getLocationPayload],
  },
};
const getTechnicianPayload = {
  id: 0,
  userId: 0,
  name: "string",
  roleIds: [0],
  businessUnitId: 0,
  mainZoneId: 0,
  zoneIds: [0],
  createdOn: "string",
  modifiedOn: "string",
  email: "string",
  phoneNumber: "string",
  loginName: "string",
  home: {
    street: "string",
    unit: "string",
    country: "string",
    city: "string",
    state: "string",
    zip: "string",
    streetAddress: "string",
    latitude: 0,
    longitude: 0,
  },
  dailyGoal: 0,
  isManagedTech: true,
  customFields: [
    {
      typeId: 0,
      name: "string",
      value: "string",
    },
  ],
  active: true,
  aadUserId: "string",
  burdenRate: 0,
  team: "string",
  jobFilter: {},
};
export const getTechnicianExamplePayload = { data: getTechnicianPayload };
export const listTechniciansExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [getTechnicianPayload, getTechnicianPayload],
  },
};
export const createTechnicianExamplePayload = {
  data: {
    id: 0,
  },
};
export const getInstalledEquipmentExamplePayload = {
  data: {
    id: 0,
    equipmentId: 0,
    locationId: 0,
    customerId: 0,
    invoiceItemId: 0,
    name: "string",
    installedOn: "string",
    createdOn: "string",
    modifiedOn: "string",
    serialNumber: "string",
    memo: "string",
    manufacturer: "string",
    model: "string",
    cost: 0,
    manufacturerWarrantyStart: "string",
    manufacturerWarrantyEnd: "string",
    serviceProviderWarrantyStart: "string",
    serviceProviderWarrantyEnd: "string",
    tags: [
      {
        id: 0,
        ownerId: 0,
        typeId: 0,
        typeName: "string",
        memo: "string",
        color: "string",
        textColor: "string",
        code: "string",
      },
    ],
    customFields: [
      {
        id: 0,
        typeId: 0,
        name: "string",
        value: "string",
      },
    ],
    attachments: [
      {
        alias: "string",
        fileName: "string",
        type: {},
        url: "string",
      },
    ],
  },
};
export const listInstalledEquipmentExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [
      {
        id: 0,
        equipmentId: 0,
        locationId: 0,
        customerId: 0,
        invoiceItemId: 0,
        name: "string",
        installedOn: "string",
        createdOn: "string",
        modifiedOn: "string",
        serialNumber: "string",
        memo: "string",
        manufacturer: "string",
        model: "string",
        cost: 0,
        manufacturerWarrantyStart: "string",
        manufacturerWarrantyEnd: "string",
        serviceProviderWarrantyStart: "string",
        serviceProviderWarrantyEnd: "string",
        tags: [
          {
            id: 0,
            ownerId: 0,
            typeId: 0,
            typeName: "string",
            memo: "string",
            color: "string",
            textColor: "string",
            code: "string",
          },
        ],
      },
    ],
  },
};
export const createEquipmentExamplePayload = {
  data: {
    id: 0,
    equipmentId: 0,
    locationId: 0,
    customerId: 0,
    invoiceItemId: 0,
    name: "string",
    installedOn: "string",
    createdOn: "string",
    modifiedOn: "string",
    serialNumber: "string",
    memo: "string",
    manufacturer: "string",
    model: "string",
    cost: 0,
    manufacturerWarrantyStart: "string",
    manufacturerWarrantyEnd: "string",
    serviceProviderWarrantyStart: "string",
    serviceProviderWarrantyEnd: "string",
    tags: [
      {
        id: 0,
        ownerId: 0,
        typeId: 0,
        typeName: "string",
        memo: "string",
        color: "string",
        textColor: "string",
        code: "string",
      },
    ],
    customFields: [
      {
        id: 0,
        typeId: 0,
        name: "string",
        value: "string",
      },
    ],
    attachments: [
      {
        alias: "string",
        fileName: "string",
        type: {},
        url: "string",
      },
    ],
  },
};
export const listAppointmentsAssignedExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [
      {
        id: 0,
        technicianId: 0,
        technicianName: "string",
        assignedById: 0,
        assignedOn: "string",
        status: {},
        isPaused: true,
        jobId: 0,
        appointmentId: 0,
      },
    ],
  },
};
export const assignTechniciansExamplePayload = {
  data: {
    id: 0,
    jobId: 0,
    appointmentNumber: "string",
    start: "string",
    end: "string",
    arrivalWindowStart: "string",
    arrivalWindowEnd: "string",
    status: {},
    specialInstructions: "string",
    createdOn: "string",
    modifiedOn: "string",
  },
};
export const listJobCancelReasonsExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [
      {
        id: 0,
        name: "string",
        active: true,
        createdOn: "string",
        modifiedOn: "string",
      },
    ],
  },
};
export const createInstalledEquipmentAttachmentExamplePayload = {
  data: {
    path: "InstalledEquipment/Documents/e2374d0c-16b8-4bb7-b3b5-1bd0ac1df1f4.csv",
  },
};
export const listBusinessUnitsExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [
      {
        id: 0,
        active: true,
        name: "string",
        officialName: "string",
        email: "string",
        currency: "string",
        phoneNumber: "string",
        invoiceHeader: "string",
        invoiceMessage: "string",
        defaultTaxRate: 0,
        authorizationParagraph: "string",
        acknowledgementParagraph: "string",
        address: {
          street: "string",
          unit: "string",
          city: "string",
          state: "string",
          zip: "string",
          country: "string",
        },
        materialSku: "string",
        quickbooksClass: "string",
        accountCode: "string",
        franchiseId: "string",
        conceptCode: "string",
        corporateContractNumber: "string",
        tenant: {
          id: 0,
          name: "string",
          accountCode: "string",
          franchiseId: "string",
          conceptCode: "string",
          modifiedOn: "string",
        },
        createdOn: "string",
        modifiedOn: "string",
        externalData: [
          {
            key: "string",
            value: "string",
          },
        ],
      },
    ],
  },
};
export const listUserRolesExamplePayload = {
  data: {
    page: 0,
    pageSize: 0,
    hasMore: true,
    totalCount: 0,
    data: [
      {
        id: 0,
        active: true,
        name: "string",
        createdOn: "string",
        employeeType: "Employee",
      },
    ],
  },
};
export const listAttachmentExamplePayload = {
  data: Buffer.from("ExampleFile"),
};
export const deleteAppointmentExamplePayload = { data: null };
export const cancelJobExamplePayload = { data: null };
export const deleteInvoiceItemExamplePayload = { data: null };
export const createInvoicesExamplePayload = { data: {} };
export const updateInvoiceExamplePayload = { data: {} };
export const updateInvoiceCustomFieldsExamplePayload = { data: {} };
export const updateInvoiceItemsExamplePayload = { data: {} };
export const updatePaymentCustomFieldsExamplePayload = { data: {} };
export const deleteCustomerContactExamplePayload = { data: null };
export const selectAppointmentExamplePayload = {
  result: [
    {
      key: "1",
      label: "#1 (ID: 1)",
    },
  ],
};
export const selectBookingExamplePayload = {
  result: [
    {
      key: "1",
      label: "Booking 1 (ID: 1)",
    },
    {
      key: "2",
      label: "Booking 2 (ID: 2)",
    },
  ],
};
export const selectCustomersExamplePayload = {
  result: [
    {
      key: "1",
      label: "John Doe (ID: 1)",
    },
    {
      key: "2",
      label: "Jane Doe (ID: 2)",
    },
  ],
};
export const selectInstalledEquipmentExamplePayload = {
  result: [
    {
      key: "1",
      label: "Installed Equipment 1 (ID: 1)",
    },
    {
      key: "2",
      label: "Installed Equipment 2 (ID: 2)",
    },
  ],
};
export const selectInvoiceExamplePayload = {
  result: [
    {
      key: "1",
      label: "#1234",
    },
  ],
};
export const selectJobExamplePayload = {
  result: [
    {
      key: "1",
      label: "#1",
    },
    {
      key: "2",
      label: "#2",
    },
    {
      key: "3",
      label: "#3",
    },
  ],
};
export const selectLocationExamplePayload = {
  result: [
    {
      key: "1",
      label: "Location 1 (ID: 1)",
    },
    {
      key: "2",
      label: "Location 2 (ID: 2)",
    },
    {
      key: "3",
      label: "Location 3 (ID: 3)",
    },
  ],
};
export const selectProjectExamplePayload = {
  result: [
    {
      key: "1",
      label: "Project 1 (ID: 1)",
    },
    {
      key: "2",
      label: "Project 2 (ID: 2)",
    },
  ],
};
export const selectBusinessUnitExamplePayload = {
  result: [
    {
      key: "1",
      label: "Business Unit 1 (ID: 1)",
    },
  ],
};
export const selectUserRoleExamplePayload = {
  result: [
    {
      key: "1",
      label: "Admin (ID: 1)",
    },
  ],
};
export const selectJobCancelReasonExamplePayload = {
  result: [
    {
      key: "1",
      label: "Customer Request (ID: 1)",
    },
  ],
};
export const selectTechnicianExamplePayload = {
  result: [
    {
      key: "1",
      label: "John Doe (ID: 1)",
    },
    {
      key: "2",
      label: "Jane Doe (ID: 2)",
    },
  ],
};
export const selectPaymentExamplePayload = {
  result: [{ label: "#12345 - Check", key: "12345" }],
};
export const selectCustomerContactExamplePayload = {
  result: [{ label: "Phone: 555-1234", key: "12345" }],
};
