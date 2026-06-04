






export const crmGetRecordExamplePayload = {
  data: {
    data: [
      {
        id: "5394166000000379001",
        Owner: {
          name: "Patricia Boyle",
          id: "5394166000000235011",
          email: "patricia.boyle@example.com",
        },
        Email: "john.doe@example.com",
        $currency_symbol: "$",
        $field_states: null,
        Other_Phone: null,
        Mailing_State: "California",
        Other_State: null,
        Other_Country: null,
        Last_Activity_Time: "2024-01-15T14:22:10-08:00",
        Department: "Sales",
        $state: "save",
        $process_flow: false,
        Assistant: null,
        Mailing_Country: "United States",
        $locked_for_me: false,
        $approved: true,
        Reporting_To: null,
        $approval: {
          delegate: false,
          approve: false,
          reject: false,
          resubmit: false,
        },
        Other_City: null,
        Created_Time: "2024-01-15T10:30:00-08:00",
        $editable: true,
        Home_Phone: null,
        Created_By: {
          name: "Patricia Boyle",
          id: "5394166000000235011",
          email: "patricia.boyle@example.com",
        },
        $zia_owner_assignment: "owner_recommendation_unavailable",
        Secondary_Email: null,
        Description: "Key contact for enterprise account",
        Vendor_Name: null,
        Mailing_Zip: "94105",
        $review_process: null,
        Twitter: null,
        Other_Zip: null,
        Mailing_Street: "123 Market Street",
        Salutation: "Mr.",
        First_Name: "John",
        Full_Name: "John Doe",
        Asst_Phone: null,
        Record_Image: null,
        Modified_By: {
          name: "Patricia Boyle",
          id: "5394166000000235011",
          email: "patricia.boyle@example.com",
        },
        $review: null,
        Phone: "+1-415-555-0123",
        Account_Name: {
          name: "Acme Corporation",
          id: "5394166000000378001",
        },
        Email_Opt_Out: false,
        Modified_Time: "2024-01-15T14:22:10-08:00",
        Date_of_Birth: null,
        Mailing_City: "San Francisco",
        Unsubscribed_Mode: null,
        Unsubscribed_Time: null,
        Title: "Senior Account Executive",
        Other_Street: null,
        Mobile: "+1-415-555-0124",
        $orchestration: false,
        Last_Name: "Doe",
        $in_merge: false,
        $approval_state: "approved",
      },
    ],
    info: {
      per_page: 200,
      count: 1,
      page: 1,
      more_records: false,
    },
  },
};






export const crmGetRecordsExamplePayload = {
  data: {
    data: [
      {
        id: "5394166000000379001",
        Owner: {
          name: "Patricia Boyle",
          id: "5394166000000235011",
          email: "patricia.boyle@example.com",
        },
        Email: "john.doe@example.com",
        First_Name: "John",
        Last_Name: "Doe",
        Full_Name: "John Doe",
        Phone: "+1-415-555-0123",
        Mobile: "+1-415-555-0124",
        Created_Time: "2024-01-15T10:30:00-08:00",
        Modified_Time: "2024-01-15T14:22:10-08:00",
        $approval_state: "approved",
      },
      {
        id: "5394166000000379002",
        Owner: {
          name: "Patricia Boyle",
          id: "5394166000000235011",
          email: "patricia.boyle@example.com",
        },
        Email: "jane.smith@example.com",
        First_Name: "Jane",
        Last_Name: "Smith",
        Full_Name: "Jane Smith",
        Phone: "+1-415-555-0125",
        Mobile: "+1-415-555-0126",
        Created_Time: "2024-01-14T09:15:00-08:00",
        Modified_Time: "2024-01-15T11:45:30-08:00",
        $approval_state: "approved",
      },
    ],
    info: {
      per_page: 200,
      count: 2,
      page: 1,
      more_records: false,
    },
  },
};





export const crmCreateRecordExamplePayload = {
  data: {
    data: [
      {
        code: "SUCCESS",
        details: {
          Modified_Time: "2024-01-15T10:30:00-08:00",
          Modified_By: {
            name: "Patricia Boyle",
            id: "5394166000000235011",
          },
          Created_Time: "2024-01-15T10:30:00-08:00",
          id: "5394166000000379001",
          Created_By: {
            name: "Patricia Boyle",
            id: "5394166000000235011",
          },
          $approval_state: "approved",
        },
        message: "record added",
        status: "success",
      },
    ],
  },
};





export const crmUpdateRecordExamplePayload = {
  data: {
    data: [
      {
        code: "SUCCESS",
        details: {
          Modified_Time: "2024-01-15T14:22:10-08:00",
          Modified_By: {
            name: "Patricia Boyle",
            id: "5394166000000235011",
          },
          Created_Time: "2024-01-15T10:30:00-08:00",
          id: "5394166000000379001",
          Created_By: {
            name: "Patricia Boyle",
            id: "5394166000000235011",
          },
        },
        message: "record updated",
        status: "success",
      },
    ],
  },
};





export const crmRemoveRecordExamplePayload = {
  data: {
    data: [
      {
        code: "SUCCESS",
        details: {
          id: "5394166000000379001",
        },
        message: "record deleted",
        status: "success",
      },
    ],
  },
};





export const crmRunQueryExamplePayload = {
  data: {
    data: [
      {
        Last_Name: "Doe",
        Email: "john.doe@example.com",
        id: "5394166000000379001",
      },
      {
        Last_Name: "Smith",
        Email: "jane.smith@example.com",
        id: "5394166000000379002",
      },
    ],
    info: {
      count: 2,
      more_records: false,
    },
  },
};





export const crmAddAttachmentExamplePayload = {
  data: {
    data: [
      {
        code: "SUCCESS",
        details: {
          Modified_Time: "2024-01-15T10:30:00-08:00",
          Modified_By: {
            name: "Patricia Boyle",
            id: "5394166000000235011",
          },
          Created_Time: "2024-01-15T10:30:00-08:00",
          id: "5394166000000527036",
          Created_By: {
            name: "Patricia Boyle",
            id: "5394166000000235011",
          },
        },
        message: "attachment uploaded successfully",
        status: "success",
      },
    ],
  },
};





export const crmRawRequestExamplePayload = {
  data: {
    data: [
      {
        id: "5394166000000379001",
        Last_Name: "Doe",
        First_Name: "John",
        Email: "john.doe@example.com",
        Created_Time: "2024-01-15T10:30:00-08:00",
        Modified_Time: "2024-01-15T14:22:10-08:00",
      },
    ],
    info: {
      per_page: 200,
      count: 1,
      page: 1,
      more_records: false,
    },
  },
};
