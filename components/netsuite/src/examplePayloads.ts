










export const baseCustomerPayload = {
  entityid: "CUST-001",
  companyname: "Acme Corporation",
  subsidiary: { id: "1" },
  email: "contact@acmecorp.example.com",
  phone: "555-0123",
  isperson: false,
  salesRep: { id: "1047" },
  terms: { id: "5" },
  custentity_customer_type: { id: "3" },
  billaddress: {
    addr1: "123 Main Street",
    addr2: "Suite 400",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "US",
  },
  shipaddress: {
    addr1: "123 Main Street",
    addr2: "Suite 400",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "US",
  },
};

export const baseContactPayload = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  phone: "555-0123",
  mobilephone: "555-0456",
  title: "Procurement Manager",
  company: { id: "456" },
  subsidiary: { id: "1" },
  isPrivate: false,
};

export const baseVendorPayload = {
  entityid: "VEND-001",
  companyname: "Supply Co LLC",
  subsidiary: { id: "1" },
  email: "ap@supplyco.example.com",
  phone: "555-7890",
  terms: { id: "2" },
  category: { id: "1" },
  billaddress: {
    addr1: "456 Commerce Way",
    city: "Austin",
    state: "TX",
    zip: "78701",
    country: "US",
  },
};

export const baseSalesOrderPayload = {
  entity: { id: "456" },
  trandate: "2024-10-20",
  subsidiary: { id: "1" },
  currency: { id: "1" },
  location: { id: "1" },
  terms: { id: "5" },
  memo: "Sample sales order for Q4 products",
  itemList: {
    item: [
      {
        item: { id: "123" },
        quantity: 2,
        rate: 150.0,
        amount: 300.0,
        taxcode: { id: "5" },
      },
      {
        item: { id: "124" },
        quantity: 1,
        rate: 250.0,
        amount: 250.0,
        taxcode: { id: "5" },
      },
    ],
  },
};

export const baseInvoicePayload = {
  entity: { id: "456" },
  trandate: "2024-10-20",
  tranid: "INV-2024-001",
  subsidiary: { id: "1" },
  currency: { id: "1" },
  terms: { id: "5" },
  duedate: "2024-11-19",
  memo: "Invoice for October services",
  itemList: {
    item: [
      {
        item: { id: "789" },
        quantity: 10,
        rate: 50.0,
        amount: 500.0,
        description: "Professional Services - Consulting",
        taxcode: { id: "5" },
      },
    ],
  },
};

export const baseInventoryItemPayload = {
  itemid: "ITEM-001",
  displayname: "Widget Pro 2000",
  itemtype: "InvtPart",
  subsidiary: { id: "1" },
  assetaccount: { id: "120" },
  incomeaccount: { id: "400" },
  cogsaccount: { id: "500" },
  taxschedule: { id: "1" },
  purchaseprice: 25.0,
  cost: 25.0,
  price: 50.0,
  isinactive: false,
  tracklandedcost: false,
};

export const baseEmployeePayload = {
  entityid: "EMP-001",
  firstname: "Jane",
  lastname: "Smith",
  email: "jane.smith@acmecorp.example.com",
  phone: "555-1111",
  hiredate: "2024-01-15",
  subsidiary: { id: "1" },
  department: { id: "10" },
  location: { id: "1" },
  supervisor: { id: "1047" },
  title: "Senior Software Engineer",
};

export const baseJournalEntryPayload = {
  trandate: "2024-10-20",
  subsidiary: { id: "1" },
  currency: { id: "1" },
  memo: "Monthly accrual entry",
  lineList: {
    line: [
      {
        account: { id: "200" },
        debit: 1000.0,
        department: { id: "10" },
        memo: "Accrued expense",
      },
      {
        account: { id: "400" },
        credit: 1000.0,
        department: { id: "10" },
        memo: "Revenue recognition",
      },
    ],
  },
};





export const createCustomerExamplePayload = {
  data: {
    data: {
      id: "12345",
      entityid: "CUST-001",
      companyname: "Acme Corporation",
      subsidiary: { id: "1", refName: "Parent Company" },
      email: "contact@acmecorp.example.com",
      phone: "555-0123",
      isperson: false,
      salesRep: { id: "1047", refName: "John Sales" },
      terms: { id: "5", refName: "Net 30" },
      custentity_customer_type: { id: "3", refName: "Enterprise" },
      billaddress: {
        addr1: "123 Main Street",
        addr2: "Suite 400",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "US",
      },
      shipaddress: {
        addr1: "123 Main Street",
        addr2: "Suite 400",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "US",
      },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      recordType: "customer",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/customer/12345",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/customer/12345",
    } as Record<string, string>,
  },
};

export const getCustomerExamplePayload = createCustomerExamplePayload;

export const updateCustomerExamplePayload = {
  data: {
    data: {
      id: "12345",
      entityid: "CUST-001",
      companyname: "Acme Corporation Inc.",
      subsidiary: { id: "1", refName: "Parent Company" },
      email: "info@acmecorp.example.com",
      phone: "555-0123",
      isperson: false,
      salesRep: { id: "1047", refName: "John Sales" },
      terms: { id: "5", refName: "Net 30" },
      custentity_customer_type: { id: "3", refName: "Enterprise" },
      billaddress: {
        addr1: "123 Main Street",
        addr2: "Suite 400",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "US",
      },
      shipaddress: {
        addr1: "123 Main Street",
        addr2: "Suite 400",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "US",
      },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T16:45:00Z",
      recordType: "customer",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/customer/12345",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/customer/12345",
    } as Record<string, string>,
  },
};

export const listCustomersExamplePayload = {
  data: {
    data: {
      count: 2,
      hasMore: true,
      items: [
        {
          id: "12345",
          entityid: "CUST-001",
          companyname: "Acme Corporation",
          email: "contact@acmecorp.example.com",
          subsidiary: { id: "1", refName: "Parent Company" },
          links: [
            {
              rel: "self",
              href: "/services/rest/record/v1/customer/12345",
            },
          ],
        },
        {
          id: "12346",
          entityid: "CUST-002",
          companyname: "Global Industries Ltd",
          email: "contact@globalindustries.example.com",
          subsidiary: { id: "1", refName: "Parent Company" },
          links: [
            {
              rel: "self",
              href: "/services/rest/record/v1/customer/12346",
            },
          ],
        },
      ],
      links: [
        {
          rel: "next",
          href: "/services/rest/record/v1/customer?limit=2&offset=2",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

export const deleteCustomerExamplePayload = {
  data: {
    data: {
      status: "success",
      message: "Record deleted successfully",
      id: "12345",
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

export const createContactExamplePayload = {
  data: {
    data: {
      id: "67890",
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      phone: "555-0123",
      mobilephone: "555-0456",
      title: "Procurement Manager",
      company: { id: "456", refName: "Acme Corporation" },
      subsidiary: { id: "1", refName: "Parent Company" },
      isPrivate: false,
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/contact/67890",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/contact/67890",
    } as Record<string, string>,
  },
};

export const getContactExamplePayload = createContactExamplePayload;

export const createVendorExamplePayload = {
  data: {
    data: {
      id: "54321",
      entityid: "VEND-001",
      companyname: "Supply Co LLC",
      subsidiary: { id: "1", refName: "Parent Company" },
      email: "ap@supplyco.example.com",
      phone: "555-7890",
      terms: { id: "2", refName: "Net 15" },
      category: { id: "1", refName: "Office Supplies" },
      billaddress: {
        addr1: "456 Commerce Way",
        city: "Austin",
        state: "TX",
        zip: "78701",
        country: "US",
      },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/vendor/54321",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/vendor/54321",
    } as Record<string, string>,
  },
};

export const getVendorExamplePayload = createVendorExamplePayload;

export const createSalesOrderExamplePayload = {
  data: {
    data: {
      id: "98765",
      tranid: "SO-2024-001",
      entity: { id: "456", refName: "Acme Corporation" },
      trandate: "2024-10-20",
      subsidiary: { id: "1", refName: "Parent Company" },
      currency: { id: "1", refName: "USA" },
      location: { id: "1", refName: "Main Warehouse" },
      terms: { id: "5", refName: "Net 30" },
      memo: "Sample sales order for Q4 products",
      status: "Pending Approval",
      total: 550.0,
      itemList: {
        item: [
          {
            line: 1,
            item: { id: "123", refName: "Widget Pro" },
            quantity: 2,
            rate: 150.0,
            amount: 300.0,
            taxcode: { id: "5", refName: "CA Sales Tax" },
          },
          {
            line: 2,
            item: { id: "124", refName: "Gadget Elite" },
            quantity: 1,
            rate: 250.0,
            amount: 250.0,
            taxcode: { id: "5", refName: "CA Sales Tax" },
          },
        ],
      },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/salesorder/98765",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/salesorder/98765",
    } as Record<string, string>,
  },
};

export const getSalesOrderExamplePayload = createSalesOrderExamplePayload;

export const createInvoiceExamplePayload = {
  data: {
    data: {
      id: "11111",
      tranid: "INV-2024-001",
      entity: { id: "456", refName: "Acme Corporation" },
      trandate: "2024-10-20",
      subsidiary: { id: "1", refName: "Parent Company" },
      currency: { id: "1", refName: "USA" },
      terms: { id: "5", refName: "Net 30" },
      duedate: "2024-11-19",
      memo: "Invoice for October services",
      status: "Open",
      total: 500.0,
      amountpaid: 0.0,
      amountremaining: 500.0,
      itemList: {
        item: [
          {
            line: 1,
            item: { id: "789", refName: "Consulting Services" },
            quantity: 10,
            rate: 50.0,
            amount: 500.0,
            description: "Professional Services - Consulting",
            taxcode: { id: "5", refName: "CA Sales Tax" },
          },
        ],
      },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/invoice/11111",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/invoice/11111",
    } as Record<string, string>,
  },
};

export const getInvoiceExamplePayload = createInvoiceExamplePayload;

export const createInventoryItemExamplePayload = {
  data: {
    data: {
      id: "22222",
      itemid: "ITEM-001",
      displayname: "Widget Pro 2000",
      itemtype: "InvtPart",
      subsidiary: { id: "1", refName: "Parent Company" },
      assetaccount: { id: "120", refName: "Inventory Asset" },
      incomeaccount: { id: "400", refName: "Product Revenue" },
      cogsaccount: { id: "500", refName: "Cost of Goods Sold" },
      taxschedule: { id: "1", refName: "Standard Tax" },
      purchaseprice: 25.0,
      cost: 25.0,
      price: 50.0,
      isinactive: false,
      tracklandedcost: false,
      quantityavailable: 150,
      quantityonhand: 200,
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/inventoryitem/22222",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/inventoryitem/22222",
    } as Record<string, string>,
  },
};

export const getInventoryItemExamplePayload = createInventoryItemExamplePayload;

export const createEmployeeExamplePayload = {
  data: {
    data: {
      id: "33333",
      entityid: "EMP-001",
      firstname: "Jane",
      lastname: "Smith",
      email: "jane.smith@acmecorp.example.com",
      phone: "555-1111",
      hiredate: "2024-01-15",
      subsidiary: { id: "1", refName: "Parent Company" },
      department: { id: "10", refName: "Engineering" },
      location: { id: "1", refName: "San Francisco Office" },
      supervisor: { id: "1047", refName: "John Manager" },
      title: "Senior Software Engineer",
      isinactive: false,
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/employee/33333",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/employee/33333",
    } as Record<string, string>,
  },
};

export const getEmployeeExamplePayload = createEmployeeExamplePayload;

export const createJournalEntryExamplePayload = {
  data: {
    data: {
      id: "44444",
      tranid: "JE-2024-001",
      trandate: "2024-10-20",
      subsidiary: { id: "1", refName: "Parent Company" },
      currency: { id: "1", refName: "USA" },
      memo: "Monthly accrual entry",
      approved: false,
      lineList: {
        line: [
          {
            line: 1,
            account: { id: "200", refName: "Accrued Expenses" },
            debit: 1000.0,
            department: { id: "10", refName: "Engineering" },
            memo: "Accrued expense",
          },
          {
            line: 2,
            account: { id: "400", refName: "Revenue" },
            credit: 1000.0,
            department: { id: "10", refName: "Engineering" },
            memo: "Revenue recognition",
          },
        ],
      },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/journalentry/44444",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/journalentry/44444",
    } as Record<string, string>,
  },
};

export const getJournalEntryExamplePayload = createJournalEntryExamplePayload;





export const suiteQLQueryCustomersExamplePayload = {
  data: {
    data: {
      count: 2,
      hasMore: false,
      items: [
        {
          id: "12345",
          entityid: "CUST-001",
          companyname: "Acme Corporation",
          email: "contact@acmecorp.example.com",
          datecreated: "2024-10-20",
        },
        {
          id: "12346",
          entityid: "CUST-002",
          companyname: "Global Industries Ltd",
          email: "contact@globalindustries.example.com",
          datecreated: "2024-10-15",
        },
      ],
      links: [
        {
          rel: "self",
          href: "/services/rest/query/v1/suiteql",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

export const suiteQLQueryInvoicesExamplePayload = {
  data: {
    data: {
      count: 3,
      hasMore: false,
      items: [
        {
          id: "11111",
          tranid: "INV-2024-001",
          trandate: "2024-10-20",
          entity: "Acme Corporation",
          total: 500.0,
          status: "Open",
        },
        {
          id: "11112",
          tranid: "INV-2024-002",
          trandate: "2024-10-18",
          entity: "Global Industries Ltd",
          total: 1250.0,
          status: "Paid In Full",
        },
        {
          id: "11113",
          tranid: "INV-2024-003",
          trandate: "2024-10-15",
          entity: "Tech Solutions Inc",
          total: 750.0,
          status: "Open",
        },
      ],
      links: [
        {
          rel: "self",
          href: "/services/rest/query/v1/suiteql",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

export const suiteQLQueryInventoryExamplePayload = {
  data: {
    data: {
      count: 2,
      hasMore: false,
      items: [
        {
          id: "22222",
          itemid: "ITEM-001",
          displayname: "Widget Pro 2000",
          quantityavailable: 150,
          quantityonhand: 200,
          cost: 25.0,
        },
        {
          id: "22223",
          itemid: "ITEM-002",
          displayname: "Gadget Elite 3000",
          quantityavailable: 75,
          quantityonhand: 100,
          cost: 40.0,
        },
      ],
      links: [
        {
          rel: "self",
          href: "/services/rest/query/v1/suiteql",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};





export const rawRequestGETExamplePayload = {
  data: {
    data: {
      id: "12345",
      entityid: "CUST-001",
      companyname: "Acme Corporation",
      email: "contact@acmecorp.example.com",
      subsidiary: { id: "1", refName: "Parent Company" },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/customer/12345",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

export const rawRequestPOSTExamplePayload = {
  data: {
    data: {
      id: "12347",
      entityid: "CUST-003",
      companyname: "New Customer via Raw Request",
      email: "new@customer.example.com",
      subsidiary: { id: "1", refName: "Parent Company" },
      datecreated: "2024-10-20T16:00:00Z",
      lastmodified: "2024-10-20T16:00:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/customer/12347",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/customer/12347",
    } as Record<string, string>,
  },
};

export const rawRequestPATCHExamplePayload = {
  data: {
    data: {
      id: "12345",
      entityid: "CUST-001",
      companyname: "Acme Corporation - Updated",
      email: "updated@acmecorp.example.com",
      subsidiary: { id: "1", refName: "Parent Company" },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T16:15:00Z",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/customer/12345",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/customer/12345",
    } as Record<string, string>,
  },
};

export const rawRequestDELETEExamplePayload = {
  data: {
    data: {
      status: "success",
      message: "Record deleted successfully",
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};





export const exampleSuiteQLQueries = {
  listCustomers:
    "SELECT id, entityid, companyname, email FROM customer WHERE isinactive = 'F' ORDER BY datecreated DESC LIMIT 100",
  listInvoices:
    "SELECT id, tranid, trandate, entity, total, status FROM transaction WHERE recordtype = 'invoice' AND trandate >= '2024-01-01' ORDER BY trandate DESC LIMIT 100",
  listInventory:
    "SELECT id, itemid, displayname, quantityavailable, quantityonhand, cost FROM inventoryitem WHERE isinactive = 'F' ORDER BY itemid LIMIT 100",
  listEmployees:
    "SELECT id, entityid, firstname, lastname, email, hiredate FROM employee WHERE isinactive = 'F' ORDER BY hiredate DESC LIMIT 100",
  customersWithBalance:
    "SELECT c.id, c.entityid, c.companyname, c.balance FROM customer c WHERE c.balance > 0 ORDER BY c.balance DESC LIMIT 50",
  recentTransactions:
    "SELECT t.id, t.tranid, t.trandate, t.recordtype, t.entity, t.total FROM transaction t WHERE t.trandate >= CURRENT_DATE - 30 ORDER BY t.trandate DESC LIMIT 100",
};
