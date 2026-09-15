import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  createInstalledEquipmentExamplePayload,
  createJobExamplePayload,
  createTechnicianExamplePayload,
  getCustomerExamplePayload,
  getJobExamplePayload,
  updateCustomerExamplePayload,
  updateInstalledEquipmentExamplePayload,
  updatePaymentExamplePayload,
  updateTechnicianExamplePayload,
} from "../examplePayloads";
import { api, connection, prefix } from "../testHelpers";
import { deleteAppointment } from "./appointments/deleteAppointment";
import { getCustomer } from "./customers/getCustomer";
import { updateCustomer } from "./customers/updateCustomer";
import { createInstalledEquipment } from "./installedEquipment/createInstalledEquipment";
import { updateInstalledEquipment } from "./installedEquipment/updateInstalledEquipment";
import { createInvoices } from "./invoices/createInvoices";
import { updateInvoice } from "./invoices/updateInvoice";
import { updateInvoiceItems } from "./invoices/updateInvoiceItems";
import { cancelJob } from "./jobs/cancelJob";
import { createJob } from "./jobs/createJob";
import { getJob } from "./jobs/getJob";
import { updatePayment } from "./payments/updatePayment";
import { createTechnician } from "./technician/createTechnician";
import { updateTechnician } from "./technician/updateTechnician";
afterEach(() => nock.cleanAll());
describe("getCustomer (GET by id)", () => {
  test("returns the record the API sent, untouched", async () => {
    api()
      .get(`${prefix("crm")}/customers/12345`)
      .reply(200, getCustomerExamplePayload.data);
    const { result } = await invoke(getCustomer, {
      connection,
      customerId: 12345,
    });
    expect(result.data).toEqual(getCustomerExamplePayload.data);
  });
  test("surfaces a failing lookup", async () => {
    api()
      .get(`${prefix("crm")}/customers/12345`)
      .reply(404, {
        title: "Not Found",
      });
    await expect(
      invoke(getCustomer, { connection, customerId: 12345 }),
    ).rejects.toThrow();
  });
});
describe("getJob (GET by id with query params)", () => {
  test("forwards externalDataApplicationGuid as a query parameter", async () => {
    const guid = "6b29fc40-ca47-1067-b31d-00dd010662da";
    api()
      .get(`${prefix("jpm")}/jobs/24815`)
      .query({ externalDataApplicationGuid: guid })
      .reply(200, getJobExamplePayload.data);
    const { result } = await invoke(getJob, {
      connection,
      jobId: 24815,
      externalDataApplicationGuid: guid,
    });
    expect(result.data).toEqual(getJobExamplePayload.data);
  });
  test("surfaces a failing lookup", async () => {
    api()
      .get(`${prefix("jpm")}/jobs/24815`)
      .query(true)
      .reply(403, {
        title: "Forbidden",
      });
    await expect(
      invoke(getJob, {
        connection,
        jobId: 24815,
        externalDataApplicationGuid: "6B29FC40-CA47-1067-B31D-00DD010662DA",
      }),
    ).rejects.toThrow();
  });
});
describe("createJob (POST with a flat body)", () => {
  const params = {
    connection,
    customerId: 12345,
    locationId: 67890,
    businessUnitId: "11",
    jobTypeId: "22",
    priority: "Normal",
    campaignId: "33",
    appointments: [{ start: "2026-08-20T15:00:00Z" }],
    jobGeneratedLeadSource: undefined,
    projectId: undefined,
    summary: "Annual maintenance",
    customFields: [{ typeId: 1, value: "abc" }],
    tagTypeIds: [7],
    externalData: undefined,
    invoiceSignatureIsRequired: true,
    customerPo: "PO-1",
  };
  test("posts every input through to the body and returns the response", async () => {
    api()
      .post(`${prefix("jpm")}/jobs`, {
        customerId: 12345,
        locationId: 67890,
        appointments: [{ start: "2026-08-20T15:00:00Z" }],
        businessUnitId: "11",
        campaignId: "33",
        customFields: [{ typeId: 1, value: "abc" }],
        customerPo: "PO-1",
        invoiceSignatureIsRequired: true,
        jobTypeId: "22",
        priority: "Normal",
        summary: "Annual maintenance",
        tagTypeIds: [7],
      })
      .reply(200, createJobExamplePayload.data);
    const { result } = await invoke(createJob, params);
    expect(result.data).toEqual(createJobExamplePayload.data);
  });
  test("surfaces a rejected creation", async () => {
    api()
      .post(`${prefix("jpm")}/jobs`)
      .reply(422, { title: "Invalid" });
    await expect(invoke(createJob, params)).rejects.toThrow();
  });
});
describe("createInvoices (POST, Royalty Details flattening)", () => {
  const params = {
    connection,
    adjustmentToId: 900,
    number: "INV-1",
    typeId: 4,
    summary: "Adjustment",
    royaltyDetails: {
      royaltyStatus: "Pending",
      royaltyDate: "2026-08-19",
      royaltySentOn: "2026-08-20",
      royaltyMemo: "Q3 royalty",
    },
    invoicedOn: "2026-08-19T00:00:00Z",
    subtotal: 100,
    tax: 8.25,
    exportId: "EXP-1",
    reviewStatus: "NeedsReview",
    assignedToId: 55,
    items: [{ skuId: 1, quantity: 2 }],
  };
  test("flattens Royalty Details into four top-level royalty keys", async () => {
    api()
      .post(`${prefix("accounting")}/invoices`, {
        adjustmentToId: 900,
        number: "INV-1",
        typeId: 4,
        invoicedOn: "2026-08-19T00:00:00Z",
        subtotal: 100,
        tax: 8.25,
        summary: "Adjustment",
        royaltyStatus: "Pending",
        royaltyDate: "2026-08-19",
        royaltySentOn: "2026-08-20",
        royaltyMemo: "Q3 royalty",
        exportId: "EXP-1",
        reviewStatus: "NeedsReview",
        assignedToId: 55,
        items: [{ skuId: 1, quantity: 2 }],
      })
      .reply(200, JSON.stringify(12345), {
        "content-type": "application/json",
      });
    const { result } = await invoke(createInvoices, params);
    expect(result.data).toBe(12345);
  });
  test("surfaces a rejected creation", async () => {
    api()
      .post(`${prefix("accounting")}/invoices`)
      .reply(400, {
        title: "Bad Request",
      });
    await expect(invoke(createInvoices, params)).rejects.toThrow();
  });
});
describe("createInstalledEquipment (POST, Warranty Dates flattening)", () => {
  test("flattens Warranty Dates into four top-level warranty keys", async () => {
    api()
      .post(`${prefix("equipmentsystems")}/installed-equipment`, {
        attachments: [{ path: "a.csv" }],
        cost: 250,
        customFields: [{ typeId: 1, value: "abc" }],
        installedOn: "2026-08-01T00:00:00Z",
        locationId: 67890,
        manufacturer: "Acme",
        manufacturerWarrantyEnd: "2031-08-01",
        manufacturerWarrantyStart: "2026-08-01",
        memo: "Rooftop unit",
        model: "AC-9000",
        name: "Rooftop AC",
        serialNumber: "SN-1",
        serviceProviderWarrantyEnd: "2028-08-01",
        serviceProviderWarrantyStart: "2026-08-01",
        tagTypeIds: [7],
      })
      .reply(200, createInstalledEquipmentExamplePayload.data);
    const { result } = await invoke(createInstalledEquipment, {
      connection,
      locationId: 67890,
      name: "Rooftop AC",
      installedOn: "2026-08-01T00:00:00Z",
      serialNumber: "SN-1",
      memo: "Rooftop unit",
      manufacturer: "Acme",
      model: "AC-9000",
      cost: 250,
      warrantyDates: {
        manufacturerWarrantyStart: "2026-08-01",
        manufacturerWarrantyEnd: "2031-08-01",
        serviceProviderWarrantyStart: "2026-08-01",
        serviceProviderWarrantyEnd: "2028-08-01",
      },
      customFields: [{ typeId: 1, value: "abc" }],
      attachments: [{ path: "a.csv" }],
      tagTypeIds: [7],
    });
    expect(result.data).toEqual(createInstalledEquipmentExamplePayload.data);
  });
});
describe("createTechnician (POST, Additional Fields flattening)", () => {
  test("flattens Additional Fields into six top-level keys", async () => {
    api()
      .post(`${prefix("settings")}/technicians`, {
        aadUserId: "aad-1",
        accountCreationMethod: "Login",
        bio: "20 years in HVAC",
        burdenRate: 42,
        businessUnitId: "11",
        customFields: [{ typeId: 1, value: "abc" }],
        dailyGoal: 5,
        email: "tech@example.com",
        home: { street: "1 Main St" },
        jobFilter: "All",
        jobHistoryDateFilter: "Last30Days",
        licenseType: "Standard",
        login: "tech1",
        memo: "New hire",
        name: "Alex Tech",
        password: "s3cret",
        phoneNumber: "5125550100",
        positions: ["Installer"],
        roleId: 3,
        team: "North",
      })
      .reply(200, createTechnicianExamplePayload.data);
    const { result } = await invoke(createTechnician, {
      connection,
      name: "Alex Tech",
      accountCreationMethod: "Login",
      roleId: 3,
      positions: ["Installer"],
      licenseType: "Standard",
      phoneNumber: "5125550100",
      email: "tech@example.com",
      login: "tech1",
      password: "s3cret",
      businessUnitId: "11",
      aadUserId: "aad-1",
      memo: "New hire",
      additionalFields: {
        team: "North",
        dailyGoal: 5,
        burdenRate: 42,
        bio: "20 years in HVAC",
        jobFilter: "All",
        jobHistoryDateFilter: "Last30Days",
      },
      home: { street: "1 Main St" },
      customFields: [{ typeId: 1, value: "abc" }],
    });
    expect(result.data).toEqual(createTechnicianExamplePayload.data);
  });
});
describe("updateCustomer (PATCH with a flat body)", () => {
  const params = {
    connection,
    customerId: 12345,
    name: "Acme Plumbing",
    type: "Commercial",
    address: { street: "1 Main St" },
    customFields: [{ typeId: 1, value: "abc" }],
    externalData: undefined,
    doNotMail: false,
    doNotService: false,
    active: true,
    tagTypeIds: [7],
  };
  test("puts the id in the path and never in the body", async () => {
    api()
      .patch(`${prefix("crm")}/customers/12345`, {
        active: true,
        address: { street: "1 Main St" },
        customFields: [{ typeId: 1, value: "abc" }],
        doNotMail: false,
        doNotService: false,
        name: "Acme Plumbing",
        tagTypeIds: [7],
        type: "Commercial",
      })
      .reply(200, updateCustomerExamplePayload.data);
    const { result } = await invoke(updateCustomer, params);
    expect(result.data).toEqual(updateCustomerExamplePayload.data);
  });
  test("surfaces a rejected update", async () => {
    api()
      .patch(`${prefix("crm")}/customers/12345`)
      .reply(409, {
        title: "Conflict",
      });
    await expect(invoke(updateCustomer, params)).rejects.toThrow();
  });
});
describe("updateInvoiceItems (PATCH, nine Additional Fields keys)", () => {
  test("flattens all nine Additional Fields keys and repeats invoiceId in the body", async () => {
    api()
      .patch(`${prefix("accounting")}/invoices/500/items`, {
        invoiceId: 500,
        description: "Filter replacement",
        quantity: 2,
        skuId: 88,
        skuName: "FILTER-20",
        technicianId: 99,
        unitPrice: 19.99,
        cost: 10.5,
        isAddOn: true,
        signature: "sig-1",
        technicianAcknowledgementSignature: "sig-2",
        installedOn: "2026-08-19T00:00:00Z",
        inventoryWarehouseName: "Main",
        skipUpdatingMembershipPrices: false,
        itemGroupName: "Filters",
        itemGroupRootId: 4,
        inventoryLocationId: 5,
        durationBillingId: 6,
        id: 7,
      })
      .reply(200);
    const { result } = await invoke(updateInvoiceItems, {
      connection,
      invoiceId: 500,
      description: "Filter replacement",
      quantity: 2,
      skuId: 88,
      skuName: "FILTER-20",
      technicianId: 99,
      additionalFields: {
        unitPrice: 19.99,
        cost: 10.5,
        isAddOn: true,
        signature: "sig-1",
        technicianAcknowledgementSignature: "sig-2",
        installedOn: "2026-08-19T00:00:00Z",
        inventoryWarehouseName: "Main",
        skipUpdatingMembershipPrices: false,
        itemGroupName: "Filters",
      },
      itemGroupRootId: 4,
      inventoryLocationId: 5,
      durationBillingId: 6,
      id: 7,
    });
    expect(result.data).toBe("");
  });
});
describe("updateInstalledEquipment (PATCH, Warranty Dates flattening)", () => {
  test("flattens Warranty Dates and puts the id in the path", async () => {
    api()
      .patch(`${prefix("equipmentsystems")}/installed-equipment/777`, {
        attachments: [{ path: "a.csv" }],
        cost: 250,
        customFields: [{ typeId: 1, value: "abc" }],
        installedOn: "2026-08-01T00:00:00Z",
        manufacturer: "Acme",
        manufacturerWarrantyEnd: "2031-08-01",
        manufacturerWarrantyStart: "2026-08-01",
        memo: "Rooftop unit",
        model: "AC-9000",
        name: "Rooftop AC",
        serialNumber: "SN-1",
        serviceProviderWarrantyEnd: "2028-08-01",
        serviceProviderWarrantyStart: "2026-08-01",
        tagTypeIds: [7],
      })
      .reply(200, updateInstalledEquipmentExamplePayload.data);
    const { result } = await invoke(updateInstalledEquipment, {
      connection,
      installedEquipmentId: "777",
      name: "Rooftop AC",
      installedOn: "2026-08-01T00:00:00Z",
      serialNumber: "SN-1",
      memo: "Rooftop unit",
      manufacturer: "Acme",
      model: "AC-9000",
      cost: 250,
      warrantyDates: {
        manufacturerWarrantyStart: "2026-08-01",
        manufacturerWarrantyEnd: "2031-08-01",
        serviceProviderWarrantyStart: "2026-08-01",
        serviceProviderWarrantyEnd: "2028-08-01",
      },
      customFields: [{ typeId: 1, value: "abc" }],
      attachments: [{ path: "a.csv" }],
      tagTypeIds: [7],
    });
    expect(result.data).toEqual(updateInstalledEquipmentExamplePayload.data);
  });
});
describe("updateInvoice (PATCH, Royalty Details flattening)", () => {
  test("flattens Royalty Details and omits invoiceId from the body", async () => {
    api()
      .patch(`${prefix("accounting")}/invoices/500`, {
        number: "INV-1",
        typeId: 4,
        invoicedOn: "2026-08-19T00:00:00Z",
        subtotal: 100,
        tax: 8.25,
        summary: "Adjustment",
        royaltyStatus: "Pending",
        royaltyDate: "2026-08-19",
        royaltySentOn: "2026-08-20",
        royaltyMemo: "Q3 royalty",
        exportId: "EXP-1",
        reviewStatus: "NeedsReview",
        assignedToId: 55,
        items: [{ skuId: 1, quantity: 2 }],
        payments: [{ id: 9 }],
      })
      .reply(200);
    const { result } = await invoke(updateInvoice, {
      connection,
      invoiceId: 500,
      number: "INV-1",
      typeId: 4,
      summary: "Adjustment",
      royaltyDetails: {
        royaltyStatus: "Pending",
        royaltyDate: "2026-08-19",
        royaltySentOn: "2026-08-20",
        royaltyMemo: "Q3 royalty",
      },
      invoicedOn: "2026-08-19T00:00:00Z",
      subtotal: 100,
      tax: 8.25,
      exportId: "EXP-1",
      reviewStatus: "NeedsReview",
      assignedToId: 55,
      items: [{ skuId: 1, quantity: 2 }],
      payments: [{ id: 9 }],
    });
    expect(result.data).toBe("");
  });
});
describe("updateTechnician (PATCH, Additional Fields flattening)", () => {
  test("flattens Additional Fields into six top-level keys", async () => {
    api()
      .patch(`${prefix("settings")}/technicians/321`, {
        aadUserId: "aad-1",
        bio: "20 years in HVAC",
        burdenRate: 42,
        businessUnitId: "11",
        customFields: [{ typeId: 1, value: "abc" }],
        dailyGoal: 5,
        email: "tech@example.com",
        home: { street: "1 Main St" },
        jobFilter: "All",
        jobHistoryDateFilter: "Last30Days",
        licenseType: "Standard",
        login: "tech1",
        memo: "New hire",
        name: "Alex Tech",
        phoneNumber: "5125550100",
        positions: ["Installer"],
        roleId: 3,
        team: "North",
      })
      .reply(200, updateTechnicianExamplePayload.data);
    const { result } = await invoke(updateTechnician, {
      connection,
      technicianId: 321,
      name: "Alex Tech",
      phoneNumber: "5125550100",
      email: "tech@example.com",
      login: "tech1",
      businessUnitId: "11",
      roleId: 3,
      positions: ["Installer"],
      aadUserId: "aad-1",
      licenseType: "Standard",
      memo: "New hire",
      additionalFields: {
        team: "North",
        dailyGoal: 5,
        burdenRate: 42,
        bio: "20 years in HVAC",
        jobFilter: "All",
        jobHistoryDateFilter: "Last30Days",
      },
      home: { street: "1 Main St" },
      customFields: [{ typeId: 1, value: "abc" }],
    });
    expect(result.data).toEqual(updateTechnicianExamplePayload.data);
  });
});
describe("updatePayment (blank optionals omitted, not sent as empty)", () => {
  test("omits all eight `|| undefined` fields when the user left them blank", async () => {
    let sentBody: unknown;
    api()
      .patch(`${prefix("accounting")}/payments/808`, (body) => {
        sentBody = body;
        return true;
      })
      .reply(200, updatePaymentExamplePayload.data);
    const { result } = await invoke(updatePayment, {
      connection,
      paymentId: "808",
      authCode: "",
      checkNumber: "",
      exportId: "",
      memo: "",
      paidOn: "",
      splits: undefined as unknown as object,
      status: "",
      typeId: 0,
    });
    expect(sentBody).toEqual({});
    expect(result.data).toEqual(updatePaymentExamplePayload.data);
  });
});
describe("deleteAppointment (DELETE)", () => {
  test("deletes by id and returns the empty body the API sends", async () => {
    api()
      .delete(`${prefix("jpm")}/appointments/4242`)
      .reply(200);
    const { result } = await invoke(deleteAppointment, {
      connection,
      appointmentId: "4242",
    });
    expect(result.data).toBe("");
  });
  test("surfaces a failed delete", async () => {
    api()
      .delete(`${prefix("jpm")}/appointments/4242`)
      .reply(404, {
        title: "Not Found",
      });
    await expect(
      invoke(deleteAppointment, { connection, appointmentId: "4242" }),
    ).rejects.toThrow();
  });
});
describe("cancelJob (PUT command endpoint)", () => {
  test("PUTs the cancel command with a memo and reason", async () => {
    api()
      .put(`${prefix("jpm")}/jobs/24815/cancel`, {
        memo: "Customer rescheduled",
        reasonId: 12,
      })
      .reply(200);
    const { result } = await invoke(cancelJob, {
      connection,
      jobId: 24815,
      memo: "Customer rescheduled",
      reasonId: 12,
    });
    expect(result.data).toBe("");
  });
  test("surfaces a rejected cancellation", async () => {
    api()
      .put(`${prefix("jpm")}/jobs/24815/cancel`)
      .reply(400, {
        title: "Job already cancelled",
      });
    await expect(
      invoke(cancelJob, {
        connection,
        jobId: 24815,
        memo: "Customer rescheduled",
        reasonId: 12,
      }),
    ).rejects.toThrow();
  });
});
