







export const booksGetRecordExamplePayload = {
  data: {
    code: 0,
    message: "success",
    contact: {
      contact_id: "5394166000000379001",
      contact_name: "Acme Corporation",
      company_name: "Acme Corporation",
      contact_type: "customer",
      customer_sub_type: "business",
      credit_limit: 50000,
      status: "active",
      payment_terms: 30,
      payment_terms_label: "Net 30",
      currency_id: "5394166000000000097",
      currency_code: "USD",
      currency_symbol: "$",
      outstanding_receivable_amount: 15000.0,
      outstanding_receivable_amount_bcy: 15000.0,
      unused_credits_receivable_amount: 0,
      unused_credits_receivable_amount_bcy: 0,
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@acme.example.com",
      phone: "+1-415-555-0123",
      mobile: "+1-415-555-0124",
      website: "https://www.acme.example.com",
      is_portal_enabled: false,
      is_taxable: true,
      tax_id: "5394166000000000500",
      tax_name: "Sales Tax",
      tax_percentage: 8.25,
      tax_exemption_id: null,
      tax_exemption_code: null,
      place_of_contact: "San Francisco",
      gst_no: null,
      gst_treatment: "business_none",
      billing_address: {
        address: "123 Market Street",
        street2: "Suite 400",
        city: "San Francisco",
        state: "California",
        state_code: "CA",
        zip: "94105",
        country: "United States",
        country_code: "US",
        fax: null,
      },
      shipping_address: {
        address: "123 Market Street",
        street2: "Suite 400",
        city: "San Francisco",
        state: "California",
        state_code: "CA",
        zip: "94105",
        country: "United States",
        country_code: "US",
        fax: null,
      },
      contact_persons: [
        {
          contact_person_id: "5394166000000379010",
          salutation: "Mr.",
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@acme.example.com",
          phone: "+1-415-555-0123",
          mobile: "+1-415-555-0124",
          is_primary_contact: true,
          skype: null,
          designation: "CFO",
          department: "Finance",
          is_added_in_portal: false,
        },
      ],
      default_templates: {
        invoice_template_id: "5394166000000000333",
        invoice_template_name: "Standard",
        estimate_template_id: "5394166000000000334",
        estimate_template_name: "Standard",
        creditnote_template_id: "5394166000000000335",
        creditnote_template_name: "Standard",
        purchaseorder_template_id: "5394166000000000336",
        purchaseorder_template_name: "Standard",
        salesorder_template_id: "5394166000000000337",
        salesorder_template_name: "Standard",
        retainerinvoice_template_id: "5394166000000000338",
        retainerinvoice_template_name: "Standard",
        paymentthankyou_template_id: "5394166000000000339",
        paymentthankyou_template_name: "Standard",
        retainerinvoice_paymentthankyou_template_id: "5394166000000000340",
        retainerinvoice_paymentthankyou_template_name: "Standard",
      },
      custom_fields: [],
      notes: "Premium customer since 2020",
      created_time: "2024-01-15T10:30:00-0800",
      last_modified_time: "2024-01-15T14:22:10-0800",
    },
  },
};







export const booksGetRecordsExamplePayload = {
  data: {
    contacts: [
      {
        contact_id: "5394166000000379001",
        contact_name: "Acme Corporation",
        company_name: "Acme Corporation",
        contact_type: "customer",
        status: "active",
        payment_terms: 30,
        payment_terms_label: "Net 30",
        currency_id: "5394166000000000097",
        currency_code: "USD",
        outstanding_receivable_amount: 15000.0,
        unused_credits_receivable_amount: 0,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@acme.example.com",
        phone: "+1-415-555-0123",
        mobile: "+1-415-555-0124",
        created_time: "2024-01-15T10:30:00-0800",
        last_modified_time: "2024-01-15T14:22:10-0800",
      },
      {
        contact_id: "5394166000000379002",
        contact_name: "TechStart Inc",
        company_name: "TechStart Inc",
        contact_type: "customer",
        status: "active",
        payment_terms: 15,
        payment_terms_label: "Net 15",
        currency_id: "5394166000000000097",
        currency_code: "USD",
        outstanding_receivable_amount: 7500.0,
        unused_credits_receivable_amount: 500.0,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@techstart.example.com",
        phone: "+1-415-555-0125",
        mobile: "+1-415-555-0126",
        created_time: "2024-01-14T09:15:00-0800",
        last_modified_time: "2024-01-15T11:45:30-0800",
      },
    ],
    page_context: {
      page: 1,
      per_page: 200,
      has_more_page: false,
      report_name: "Contacts",
    },
  },
};





export const booksCreateRecordExamplePayload = {
  data: {
    code: 0,
    message: "The contact has been created.",
    contact: {
      contact_id: "5394166000000379001",
      contact_name: "Acme Corporation",
      company_name: "Acme Corporation",
      contact_type: "customer",
      customer_sub_type: "business",
      status: "active",
      payment_terms: 30,
      payment_terms_label: "Net 30",
      currency_id: "5394166000000000097",
      currency_code: "USD",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@acme.example.com",
      phone: "+1-415-555-0123",
      billing_address: {
        address: "123 Market Street",
        city: "San Francisco",
        state: "California",
        zip: "94105",
        country: "United States",
      },
      created_time: "2024-01-15T10:30:00-0800",
      last_modified_time: "2024-01-15T10:30:00-0800",
    },
  },
};





export const booksUpdateRecordExamplePayload = {
  data: {
    code: 0,
    message: "The contact details have been updated.",
    contact: {
      contact_id: "5394166000000379001",
      contact_name: "Acme Corporation",
      company_name: "Acme Corporation",
      contact_type: "customer",
      customer_sub_type: "business",
      status: "active",
      payment_terms: 45,
      payment_terms_label: "Net 45",
      currency_id: "5394166000000000097",
      currency_code: "USD",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@acme.example.com",
      phone: "+1-415-555-0123",
      billing_address: {
        address: "456 Mission Street",
        city: "San Francisco",
        state: "California",
        zip: "94105",
        country: "United States",
      },
      created_time: "2024-01-15T10:30:00-0800",
      last_modified_time: "2024-01-15T14:22:10-0800",
    },
  },
};





export const booksRemoveRecordExamplePayload = {
  data: {
    code: 0,
    message: "The contact has been deleted.",
  },
};





export const booksRawRequestExamplePayload = {
  data: {
    code: 0,
    message: "success",
    contacts: [
      {
        contact_id: "5394166000000379001",
        contact_name: "Acme Corporation",
        company_name: "Acme Corporation",
        contact_type: "customer",
        status: "active",
        email: "john.doe@acme.example.com",
        phone: "+1-415-555-0123",
        created_time: "2024-01-15T10:30:00-0800",
        last_modified_time: "2024-01-15T14:22:10-0800",
      },
    ],
    page_context: {
      page: 1,
      per_page: 200,
      has_more_page: false,
      report_name: "Contacts",
    },
  },
};
