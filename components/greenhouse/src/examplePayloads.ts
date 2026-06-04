











import type { TriggerPayload } from "@prismatic-io/spectral";












export const deleteApplicationExamplePayload = {
  data: {
    message: "Application 29622362 has been deleted.",
  },
};






export const editApplicationExamplePayload = {
  data: {
    id: 69306314,
    candidate_id: 57683957,
    prospect: false,
    applied_at: "2017-09-29T12:56:05.244Z",
    rejected_at: null,
    last_activity_at: "2017-09-29T13:00:28.038Z",
    location: {
      address: "New York, New York, USA",
    },
    source: {
      id: 2,
      public_name: "Jobs page on your website",
    },
    credited_to: {
      id: 4080,
      first_name: "Kate",
      last_name: "Austen",
      name: "Kate Austen",
      employee_id: "12345",
    },
    rejection_reason: null,
    rejection_details: null,
    jobs: [
      {
        id: 107761,
        name: "UX Designer - Boston",
      },
    ],
    job_post_id: 123,
    status: "active",
    current_stage: {
      id: 767358,
      name: "Application Review",
    },
    answers: [
      {
        question: "How did you hear about this job?",
        answer: "Online Research",
      },
      {
        question: "Website",
        answer: "mytestwebsite.com",
      },
    ],
    prospective_office: null,
    prospective_department: null,
    prospect_detail: {
      prospect_pool: null,
      prospect_stage: null,
      prospect_owner: null,
    },
    custom_fields: {
      application_custom_test: "Option 1",
    },
    keyed_custom_fields: {
      application_custom_test: {
        name: "Application Custom Test",
        type: "single_select",
        value: "Option 1",
      },
    },
    attachments: [
      {
        filename: "John_Locke_Offer_Packet_09_27_2017.pdf",
        url: "https://prod-heroku.s3.amazonaws.com/...",
        type: "offer_packet",
        created_at: "2020-09-27T18:45:27.137Z",
      },
    ],
  },
};






export const getApplicationExamplePayload = {
  data: {
    id: 69306314,
    candidate_id: 57683957,
    prospect: false,
    applied_at: "2017-09-29T12:56:05.244Z",
    rejected_at: null,
    last_activity_at: "2017-09-29T13:00:28.038Z",
    location: {
      address: "New York, New York, USA",
    },
    source: {
      id: 2,
      public_name: "Jobs page on your website",
    },
    credited_to: {
      id: 4080,
      first_name: "Kate",
      last_name: "Austen",
      name: "Kate Austen",
      employee_id: "12345",
    },
    rejection_reason: null,
    rejection_details: null,
    jobs: [
      {
        id: 107761,
        name: "UX Designer - Boston",
      },
    ],
    job_post_id: 123,
    status: "active",
    current_stage: {
      id: 767358,
      name: "Application Review",
    },
    answers: [
      {
        question: "How did you hear about this job?",
        answer: "Online Research",
      },
      {
        question: "Website",
        answer: "mytestwebsite.com",
      },
    ],
    prospective_office: null,
    prospective_department: null,
    prospect_detail: {
      prospect_pool: null,
      prospect_stage: null,
      prospect_owner: null,
    },
    custom_fields: {
      application_custom_test: "Option 1",
    },
    keyed_custom_fields: {
      application_custom_test: {
        name: "Application Custom Test",
        type: "single_select",
        value: "Option 1",
      },
    },
    attachments: [
      {
        filename: "John_Locke_Offer_Packet_09_27_2017.pdf",
        url: "https://prod-heroku.s3.amazonaws.com/...",
        type: "offer_packet",
        created_at: "2020-09-27T18:45:27.137Z",
      },
    ],
  },
};






export const listApplicationsExamplePayload = {
  data: [
    {
      id: 69306314,
      candidate_id: 57683957,
      prospect: false,
      applied_at: "2017-09-29T12:56:05.244Z",
      rejected_at: null,
      last_activity_at: "2017-09-29T13:00:28.038Z",
      location: {
        address: "New York, New York, USA",
      },
      source: {
        id: 2,
        public_name: "Jobs page on your website",
      },
      credited_to: {
        id: 4080,
        first_name: "Kate",
        last_name: "Austen",
        name: "Kate Austen",
        employee_id: "12345",
      },
      rejection_reason: null,
      rejection_details: null,
      jobs: [
        {
          id: 107761,
          name: "UX Designer - Boston",
        },
      ],
      job_post_id: 123,
      status: "active",
      current_stage: {
        id: 767358,
        name: "Application Review",
      },
      answers: [
        {
          question: "How did you hear about this job?",
          answer: "Online Research",
        },
        {
          question: "Website",
          answer: "mytestwebsite.com",
        },
      ],
      prospective_office: null,
      prospective_department: null,
      prospect_detail: {
        prospect_pool: null,
        prospect_stage: null,
        prospect_owner: null,
      },
      custom_fields: {
        application_custom_test: "Option 1",
      },
      keyed_custom_fields: {
        application_custom_test: {
          name: "Application Custom Test",
          type: "single_select",
          value: "Option 1",
        },
      },
      attachments: [
        {
          filename: "John_Locke_Offer_Packet_09_27_2017.pdf",
          url: "https://prod-heroku.s3.amazonaws.com/...",
          type: "offer_packet",
          created_at: "2020-09-27T18:45:27.137Z",
        },
      ],
    },
    {
      id: 69306509,
      candidate_id: 57683957,
      prospect: true,
      applied_at: "2017-09-29T13:00:04.058Z",
      rejected_at: null,
      last_activity_at: "2017-09-29T13:08:19.111Z",
      location: null,
      source: {
        id: 100674,
        public_name: "Campus Job Fair",
      },
      credited_to: {
        id: 566819,
        first_name: "Bob",
        last_name: "Smith",
        name: "Bob Smith",
        employee_id: "ABC12345",
      },
      rejection_reason: null,
      rejection_details: null,
      jobs: [
        {
          id: 224587,
          name: "Product Manager ",
        },
        {
          id: 109322,
          name: "Web Developer ",
        },
      ],
      job_post_id: null,
      status: "hired",
      current_stage: null,
      answers: [
        {
          question: "How did you hear about this job?",
          answer: "Online Research",
        },
        {
          question: "Website",
          answer: "mytestwebsite.com",
        },
      ],
      prospective_office: {
        primary_contact_user_id: null,
        parent_id: null,
        name: "New York",
        location: {
          name: "New York, NY",
        },
        id: 59213,
        external_id: null,
        child_ids: [],
      },
      prospective_department: {
        parent_id: null,
        name: "Marketing",
        id: 9024,
        external_id: null,
        child_ids: [],
      },
      prospect_detail: {
        prospect_pool: {
          id: 227,
          name: "Opted In: In-Person Event",
        },
        prospect_stage: {
          id: 826,
          name: "In Discussion",
        },
        prospect_owner: {
          id: 92120,
          name: "Greenhouse Admin",
        },
      },
      custom_fields: {
        application_custom_test: "Option 1",
      },
      keyed_custom_fields: {
        application_custom_test: {
          name: "Application Custom Test",
          type: "single_select",
          value: "Option 1",
        },
      },
      attachments: [
        {
          filename: "Jack_Smith_Offer_Packet_09_27_2020.pdf",
          url: "https://prod-heroku.s3.amazonaws.com/...",
          type: "offer_packet",
          created_at: "2020-09-27T18:45:27.137Z",
        },
      ],
    },
  ],
};








export const createCandidateExamplePayload = {
  data: {
    first_name: "John",
    last_name: "Locke",
    company: "The Tustin Box Company",
    title: "Man of Mystery",
    is_private: false,
    phone_numbers: [
      {
        value: "555-1212",
        type: "mobile",
      },
    ],
    addresses: [
      {
        value: "123 Fake St.",
        type: "home",
      },
    ],
    email_addresses: [
      {
        value: "john.locke+work@example.com",
        type: "work",
      },
      {
        value: "john.locke@example.com",
        type: "personal",
      },
    ],
    website_addresses: [
      {
        value: "johnlocke.example.com",
        type: "personal",
      },
    ],
    social_media_addresses: [
      {
        value: "linkedin.example.com/john.locke",
      },
      {
        value: "@johnlocke",
      },
    ],
    educations: [
      {
        school_id: 459,
        discipline_id: 940,
        degree_id: 1230,
        start_date: "2001-09-15T00:00:00.000Z",
        end_date: "2004-05-15T00:00:00.000Z",
      },
    ],
    employments: [
      {
        company_name: "Greenhouse",
        title: "Engineer",
        start_date: "2012-08-15T00:00:00.000Z",
        end_date: "2016-05-15T00:00:00.000Z",
      },
    ],
    tags: ["Walkabout", "Orientation"],
    applications: [
      {
        job_id: 215725,
      },
      {
        job_id: 185289,
      },
    ],
  },
};






export const deleteCandidateExamplePayload = {
  data: {
    message: "Person 29622362 has been deleted.",
  },
};






export const editCandidateExamplePayload = {
  data: {
    first_name: "John",
    last_name: "Locke",
    company: "The Tustin Box Company",
    title: "Man of Mystery",
    is_private: false,
    phone_numbers: [
      {
        value: "555-1212",
        type: "mobile",
      },
    ],
    addresses: [
      {
        value: "123 Fake St.",
        type: "home",
      },
    ],
    email_addresses: [
      {
        value: "john.locke+work@example.com",
        type: "work",
      },
      {
        value: "john.locke@example.com",
        type: "personal",
      },
    ],
    website_addresses: [
      {
        value: "johnlocke.example.com",
        type: "personal",
      },
    ],
    social_media_addresses: [
      {
        value: "linkedin.example.com/john.locke",
      },
      {
        value: "@johnlocke",
      },
    ],
    educations: [
      {
        school_id: 459,
        discipline_id: 940,
        degree_id: 1230,
        start_date: "2001-09-15T00:00:00.000Z",
        end_date: "2004-05-15T00:00:00.000Z",
      },
    ],
    employments: [
      {
        company_name: "Greenhouse",
        title: "Engineer",
        start_date: "2012-08-15T00:00:00.000Z",
        end_date: "2016-05-15T00:00:00.000Z",
      },
    ],
    tags: ["Walkabout", "Orientation"],
    applications: [
      {
        job_id: 215725,
      },
      {
        job_id: 185289,
      },
    ],
  },
};






export const getCandidateExamplePayload = {
  data: {
    id: 53883394,
    first_name: "John",
    last_name: "Locke",
    company: "The Tustin Box Company",
    title: "Man of Mystery",
    created_at: "2017-08-15T03:31:46.591Z",
    updated_at: "2017-09-28T12:29:30.497Z",
    last_activity: "2017-09-28T12:29:30.481Z",
    is_private: false,
    photo_url: null,
    attachments: [
      {
        filename: "John_Locke_Offer_Packet_09_27_2017.pdf",
        url: "https://prod-heroku.s3.amazonaws.com/...",
        type: "offer_packet",
        created_at: "2020-09-27T18:45:27.137Z",
      },
    ],
    application_ids: [69102626, 65153308],
    phone_numbers: [
      {
        value: "555-555-5555",
        type: "mobile",
      },
    ],
    addresses: [
      {
        value: "123 City Street\nNew York, Ny 10001",
        type: "home",
      },
    ],
    email_addresses: [
      {
        value: "test@work.com",
        type: "work",
      },
      {
        value: "test@example.com",
        type: "personal",
      },
    ],
    website_addresses: [
      {
        value: "mysite.com",
        type: "personal",
      },
    ],
    social_media_addresses: [
      {
        value: "twitter.com/test",
      },
    ],
    recruiter: {
      id: 92120,
      first_name: "Greenhouse",
      last_name: "Admin",
      name: "Greenhouse Admin",
      employee_id: "67890",
    },
    coordinator: {
      id: 453636,
      first_name: "Jane",
      last_name: "Smith",
      name: "Jane Smith",
      employee_id: "12345",
    },
    can_email: true,
    tags: ["Python", "Ruby"],
    applications: [
      {
        id: 69102626,
        candidate_id: 53883394,
        prospect: false,
        applied_at: "2017-09-27T12:03:02.728Z",
        rejected_at: "2017-09-27T12:11:40.877Z",
        last_activity_at: "2017-09-28T12:29:30.481Z",
        location: {
          address: "New York, New York, USA",
        },
        source: {
          id: 16,
          public_name: "LinkedIn (Prospecting)",
        },
        credited_to: {
          id: 165372,
          first_name: "Joel",
          last_name: "Job Admin",
          name: "Joel Job Admin",
          employee_id: null,
        },
        rejection_reason: {
          id: 9504,
          name: "Hired another candidate",
          type: {
            id: 1,
            name: "We rejected them",
          },
        },
        rejection_details: {
          custom_fields: {
            custom_rejection_question_field: null,
          },
          keyed_custom_fields: {
            custom_rejection_question_field: {
              name: "Custom Rejection Question Field",
              type: "short_text",
              value: null,
            },
          },
        },
        jobs: [
          {
            id: 149995,
            name: "DevOps Engineer",
          },
        ],
        job_post_id: 123,
        status: "rejected",
        current_stage: {
          id: 1073533,
          name: "Take Home Test",
        },
        answers: [
          {
            question: "How did you hear about this job?",
            answer: "A friend",
          },
          {
            question: "Website",
            answer: "https://example.com",
          },
          {
            question: "LinkedIn Profile",
            answer: "https://linkedin.com/example",
          },
        ],
        prospective_office: null,
        prospective_department: null,
        prospect_detail: {
          prospect_pool: null,
          prospect_stage: null,
          prospect_owner: null,
        },
        attachments: [
          {
            filename: "John_Locke_Offer_Packet_09_27_2017.pdf",
            url: "https://prod-heroku.s3.amazonaws.com/...",
            type: "offer_packet",
            created_at: "2020-09-27T18:45:27.137Z",
          },
        ],
      },
      {
        id: 65153308,
        candidate_id: 53883394,
        prospect: false,
        applied_at: "2017-08-15T03:31:46.637Z",
        rejected_at: null,
        last_activity_at: "2017-09-28T12:29:30.481Z",
        location: {
          address: "New York, New York, United States",
        },
        source: {
          id: 12,
          public_name: "Meetups",
        },
        credited_to: {
          id: 566819,
          first_name: "Bob",
          last_name: "Smith",
          name: "Bob Smith",
          employee_id: null,
        },
        rejection_reason: null,
        rejection_details: null,
        jobs: [
          {
            id: 299100,
            name: "Data Scientist - BK",
          },
        ],
        job_post_id: 456,
        status: "active",
        current_stage: {
          id: 2966800,
          name: "Face to Face",
        },
        answers: [],
        prospective_office: null,
        prospective_department: null,
        prospect_detail: {
          prospect_pool: null,
          prospect_stage: null,
          prospect_owner: null,
        },
        attachments: [],
      },
    ],
    educations: [
      {
        id: 561227,
        school_name: "University of Michigan - Ann Arbor",
        degree: "Bachelor's Degree",
        discipline: "Computer Science",
        start_date: "2012-08-15T00:00:00.000Z",
        end_date: "2016-05-15T00:00:00.000Z",
      },
    ],
    employments: [
      {
        id: 8485064,
        company_name: "Greenhouse",
        title: "Engineer",
        start_date: "2012-08-15T00:00:00.000Z",
        end_date: "2016-05-15T00:00:00.000Z",
      },
    ],
    linked_user_ids: [989604],
    custom_fields: {
      desired_salary: "1000000000",
      work_remotely: true,
      graduation_year: "2018",
    },
    keyed_custom_fields: {
      desired_salary: {
        name: "Desired Salary",
        type: "short_text",
        value: "1000000000",
      },
      work_remotely: {
        name: "Work Remotely",
        type: "boolean",
        value: true,
      },
      graduation_year_1: {
        name: "Graduation Year",
        type: "single_select",
        value: "2018",
      },
    },
  },
};






export const listCandidatesExamplePayload = {
  data: [
    {
      id: 53883394,
      first_name: "John",
      last_name: "Locke",
      company: "The Tustin Box Company",
      title: "Man of Mystery",
      created_at: "2017-08-15T03:31:46.591Z",
      updated_at: "2017-09-28T12:29:30.497Z",
      last_activity: "2017-09-28T12:29:30.481Z",
      is_private: false,
      photo_url: null,
      attachments: [
        {
          filename: "John_Locke_Offer_Packet_09_27_2017.pdf",
          url: "https://prod-heroku.s3.amazonaws.com/...",
          type: "offer_packet",
          created_at: "2020-09-27T18:45:27.137Z",
        },
      ],
      application_ids: [69103370, 65153308],
      phone_numbers: [
        {
          value: "555-555-5555",
          type: "mobile",
        },
      ],
      addresses: [
        {
          value: "123 City Street\nNew York, Ny 10001",
          type: "home",
        },
      ],
      email_addresses: [
        {
          value: "test@work.com",
          type: "work",
        },
      ],
      website_addresses: [
        {
          value: "mysite.com",
          type: "personal",
        },
      ],
      social_media_addresses: [],
      recruiter: {
        id: 92120,
        first_name: "Greenhouse",
        last_name: "Admin",
        name: "Greenhouse Admin",
        employee_id: null,
      },
      coordinator: null,
      can_email: true,
      tags: ["Python", "Ruby"],
      applications: [
        {
          id: 69103370,
          candidate_id: 53883394,
          prospect: true,
          applied_at: "2017-09-27T12:21:37.234Z",
          rejected_at: null,
          last_activity_at: "2017-09-28T12:29:30.481Z",
          location: {
            address: "New York, New York, USA",
          },
          source: {
            id: 16,
            public_name: "LinkedIn (Prospecting)",
          },
          credited_to: {
            id: 92120,
            first_name: "Greenhouse",
            last_name: "Admin",
            name: "Greenhouse Admin",
            employee_id: null,
          },
          rejection_reason: null,
          rejection_details: null,
          jobs: [
            {
              id: 87752,
              name: "Full Stack Engineer",
            },
          ],
          job_post_id: 123,
          status: "active",
          current_stage: null,
          answers: [],
          prospective_office: null,
          prospective_department: null,
          prospect_detail: {
            prospect_pool: {
              id: 224,
              name: "Cold Outreach: Sourced",
            },
            prospect_stage: {
              id: 817,
              name: "Contacted",
            },
            prospect_owner: {
              id: 92120,
              name: "Greenhouse Admin",
            },
          },
          attachments: [
            {
              filename: "John_Locke_Offer_Packet_09_27_2017.pdf",
              url: "https://prod-heroku.s3.amazonaws.com/...",
              type: "offer_packet",
              created_at: "2020-09-27T18:45:27.137Z",
            },
          ],
        },
        {
          id: 65153308,
          candidate_id: 53883394,
          prospect: false,
          applied_at: "2017-08-15T03:31:46.637Z",
          rejected_at: null,
          last_activity_at: "2017-09-28T12:29:30.481Z",
          location: null,
          source: {
            id: 12,
            public_name: "Meetups",
          },
          credited_to: {
            id: 566819,
            first_name: "Bob",
            last_name: "Smith",
            name: "Bob Smith",
            employee_id: null,
          },
          rejection_reason: null,
          rejection_details: null,
          jobs: [
            {
              id: 299100,
              name: "Data Scientist - BK",
            },
          ],
          status: "active",
          current_stage: {
            id: 2966800,
            name: "Face to Face",
          },
          answers: [],
          prospective_office: null,
          prospective_department: null,
          prospect_detail: {
            prospect_pool: null,
            prospect_stage: null,
            prospect_owner: null,
          },
          attachments: [],
        },
      ],
      educations: [
        {
          id: 561227,
          school_name: "University of Michigan - Ann Arbor",
          degree: "Bachelor's Degree",
          discipline: "Computer Science",
          start_date: "2012-08-15T00:00:00.000Z",
          end_date: "2016-05-15T00:00:00.000Z",
        },
      ],
      employments: [
        {
          id: 8485064,
          company_name: "Greenhouse",
          title: "Engineer",
          start_date: "2012-08-15T00:00:00.000Z",
          end_date: "2016-05-15T00:00:00.000Z",
        },
      ],
      linked_user_ids: [989604],
      custom_fields: {
        desired_salary: "1000000000",
        work_remotely: true,
        graduation_year: "2018",
      },
      keyed_custom_fields: {
        desired_salary: {
          name: "Desired Salary",
          type: "short_text",
          value: "1000000000",
        },
        work_remotely: {
          name: "Work Remotely",
          type: "boolean",
          value: true,
        },
        graduation_year_1: {
          name: "Graduation Year",
          type: "single_select",
          value: "2018",
        },
      },
    },
  ],
};








export const createJobExamplePayload = {
  data: {
    id: 112746,
    name: "Internal Name That Appears On Hiring Plans",
    requisition_id: "abc-123",
    notes: "Looking for the best!",
    confidential: false,
    status: "open",
    is_template: false,
    copied_from_id: 12345,
    created_at: "2015-09-10T19:01:46.078Z",
    opened_at: "2015-09-10T19:01:46.078Z",
    updated_at: "2015-09-10T19:01:46.078Z",
    closed_at: null,
    departments: [
      {
        id: 123,
        name: "Guideshops",
        parent_id: null,
        child_ids: [52461, 34065, 25908],
        external_id: "EXTERNAL_ID_1234",
      },
    ],
    offices: [
      {
        id: 234,
        name: "San Diego",
        location: {
          name: "San Diego, CA, United States",
        },
        primary_contact_user_id: 25463,
        parent_id: 50850,
        child_ids: [24719],
        external_id: "abc13425",
      },
      {
        id: 345,
        name: "New York",
        location: {
          name: "New York, NY, United States",
        },
        parent_id: null,
        child_ids: [],
        external_id: "13432",
      },
    ],
    hiring_team: {
      hiring_managers: [
        {
          id: 84275,
          first_name: "Kaylee",
          last_name: "Prime",
          name: "Kaylee Prime",
          employee_id: "13636",
        },
        {
          id: 169779,
          first_name: "Hank",
          last_name: "Hollandaise",
          name: "Hank Hollandaise",
          employee_id: "34537",
        },
      ],
      recruiters: [
        {
          id: 81111,
          first_name: "Samuel",
          last_name: "Skateboard",
          name: "Samuel Skateboard",
          employee_id: "34531",
          responsible: false,
        },
        {
          id: 153448,
          first_name: "Stegosaurus",
          last_name: "Heels",
          name: "Stegosaurus Heels",
          employee_id: "45748",
          responsible: true,
        },
      ],
      coordinators: [
        {
          id: 122635,
          first_name: "Teddy",
          last_name: "Pizzazz",
          name: "Teddy Pizzazz",
          employee_id: "47327",
          responsible: true,
        },
        {
          id: 177046,
          first_name: "Mirandella",
          last_name: "Lager",
          name: "Mirandella Lager",
          employee_id: "43626",
          responsible: false,
        },
      ],
      sourcers: [
        {
          id: 122635,
          first_name: "Teddy",
          last_name: "Pizzazz",
          name: "Teddy Pizzazz",
          employee_id: "47327",
        },
      ],
    },
    openings: [
      {
        id: 123,
        opening_id: "3-1",
        status: "open",
        opened_at: "2015-11-20T23:14:14.736Z",
        closed_at: "2017-11-20T23:14:14.736Z",
        application_id: 45678,
        close_reason: {
          id: 678,
          name: "Hired - Backfill",
        },
      },
      {
        id: 124,
        opening_id: "3-2",
        status: "open",
        opened_at: "2015-11-20T23:14:14.739Z",
        closed_at: null,
        application_id: null,
        close_reason: null,
      },
      {
        id: 125,
        opening_id: null,
        status: "open",
        opened_at: "2016-02-03T20:00:00.000Z",
        closed_at: null,
        application_id: null,
      },
      {
        id: 126,
        opening_id: "2-4",
        status: "closed",
        opened_at: "2016-02-03T16:38:46.985Z",
        closed_at: "2016-02-03T16:39:09.811Z",
        application_id: 1232,
        close_reason: {
          id: 689,
          name: "Hired",
        },
      },
    ],
  },
};






export const editJobExamplePayload = {
  data: {
    id: 6404,
    name: "New job name",
    requisition_id: "1",
    notes: "Here are some notes",
    confidential: false,
    status: "closed",
    created_at: "2013-12-10T14:42:58Z",
    opened_at: "2013-12-11T14:42:58Z",
    closed_at: "2013-12-12T14:42:58Z",
    updated_at: "2013-12-12T14:42:58Z",
    is_template: false,
    copied_from_id: 2345,
    departments: [
      {
        id: 74,
        name: "Second-Level department",
        parent_id: 25908,
        child_ids: [14510],
        external_id: "dept-1",
      },
    ],
    offices: [
      {
        id: 1556,
        name: "San Francisco",
        location: {
          name: "San Francisco, United States",
        },
        primary_contact_user_id: 150893,
        parent_id: 50849,
        child_ids: [50852, 50891],
        external_id: "office-1",
      },
    ],
    custom_fields: {
      employment_type: "Full-Time",
      maximum_budget: "$81.5k",
      salary_range: {
        min_value: 70000,
        max_value: 90000,
        unit: "USD",
      },
    },
    keyed_custom_fields: {
      employment_type: {
        name: "Time type",
        type: "single_select",
        value: "Full-Time",
      },
      budget: {
        name: "Maximum Budget",
        type: "short_text",
        value: "Full-Time",
      },
      salary_range: {
        name: "Salary Range",
        type: "currency_range",
        value: {
          min_value: 70000,
          max_value: 90000,
          unit: "USD",
        },
      },
    },
    hiring_team: {
      hiring_managers: [
        {
          id: 84275,
          first_name: "Kaylee",
          last_name: "Prime",
          name: "Kaylee Prime",
          employee_id: "13636",
        },
        {
          id: 169779,
          first_name: "Hank",
          last_name: "Hollandaise",
          name: "Hank Hollandaise",
          employee_id: "34537",
        },
      ],
      recruiters: [
        {
          id: 81111,
          first_name: "Samuel",
          last_name: "Skateboard",
          name: "Samuel Skateboard",
          employee_id: "34531",
          responsible: false,
        },
        {
          id: 153448,
          first_name: "Stegosaurus",
          last_name: "Heels",
          name: "Stegosaurus Heels",
          employee_id: "45748",
          responsible: true,
        },
      ],
      coordinators: [
        {
          id: 122635,
          first_name: "Teddy",
          last_name: "Pizzazz",
          name: "Teddy Pizzazz",
          employee_id: "47327",
          responsible: true,
        },
        {
          id: 177046,
          first_name: "Mirandella",
          last_name: "Lager",
          name: "Mirandella Lager",
          employee_id: "43626",
          responsible: false,
        },
      ],
      sourcers: [
        {
          id: 122635,
          first_name: "Teddy",
          last_name: "Pizzazz",
          name: "Teddy Pizzazz",
          employee_id: "47327",
        },
      ],
    },
    openings: [
      {
        id: 123,
        opening_id: "3-1",
        status: "open",
        opened_at: "2015-11-20T23:14:14.736Z",
        closed_at: "2017-11-20T23:14:14.736Z",
        application_id: 45678,
        close_reason: {
          id: 678,
          name: "Hired - Backfill",
        },
        custom_fields: {
          employment_type: "Full-Time",
          maximum_budget: "$81.5k",
        },
        keyed_custom_fields: {
          employment_type: {
            name: "Time type",
            type: "single_select",
            value: "Full-Time",
          },
          budget: {
            name: "Maximum Budget",
            type: "short_text",
            value: "$81.5k",
          },
        },
      },
      {
        id: 124,
        opening_id: "3-2",
        status: "open",
        opened_at: "2015-11-20T23:14:14.739Z",
        closed_at: null,
        application_id: null,
        close_reason: null,
        custom_fields: {
          employment_type: "Full-Time",
          maximum_budget: "$81.5k",
        },
        keyed_custom_fields: {
          employment_type: {
            name: "Time type",
            type: "single_select",
            value: "Full-Time",
          },
          budget: {
            name: "Maximum Budget",
            type: "short_text",
            value: "$81.5k",
          },
        },
      },
      {
        id: 125,
        opening_id: null,
        status: "open",
        opened_at: "2016-02-03T20:00:00.000Z",
        closed_at: null,
        application_id: null,
        custom_fields: {
          employment_type: "Full-Time",
          maximum_budget: "$81.5k",
        },
        keyed_custom_fields: {
          employment_type: {
            name: "Time type",
            type: "single_select",
            value: "Full-Time",
          },
          budget: {
            name: "Maximum Budget",
            type: "short_text",
            value: "$81.5k",
          },
        },
      },
      {
        id: 126,
        opening_id: "2-4",
        status: "closed",
        opened_at: "2016-02-03T16:38:46.985Z",
        closed_at: "2016-02-03T16:39:09.811Z",
        application_id: 1232,
        close_reason: {
          id: 689,
          name: "Hired",
        },
        custom_fields: {
          employment_type: "Full-Time",
          maximum_budget: "$81.5k",
        },
        keyed_custom_fields: {
          employment_type: {
            name: "Time type",
            type: "single_select",
            value: "Full-Time",
          },
          budget: {
            name: "Maximum Budget",
            type: "short_text",
            value: "$81.5k",
          },
        },
      },
    ],
  },
};






export const getJobExamplePayload = {
  data: {
    id: 6404,
    name: "Archaeologist",
    requisition_id: "abc123",
    notes: "<p>Resistance to electro-magnetic radiation a plus!</p>",
    confidential: false,
    status: "closed",
    created_at: "2013-12-10T14:42:58Z",
    opened_at: "2013-12-11T14:42:58Z",
    closed_at: "2013-12-12T14:42:58Z",
    updated_at: "2013-12-12T14:42:58Z",
    is_template: false,
    copied_from_id: 2345,
    departments: [
      {
        id: 25907,
        name: "Second-Level department",
        parent_id: 25908,
        child_ids: [14510],
        external_id: "12345",
      },
    ],
    offices: [
      {
        id: 47012,
        name: "New York",
        location: {
          name: "New York, United States",
        },
        primary_contact_user_id: 150893,
        parent_id: 50849,
        child_ids: [50852, 50891],
        external_id: "15679",
      },
    ],
    custom_fields: {
      employment_type: "Full-Time",
      maximum_budget: "$81.5k",
      salary_range: {
        min_value: 70000,
        max_value: 90000,
        unit: "USD",
      },
    },
    keyed_custom_fields: {
      employment_type: {
        name: "Time type",
        type: "single_select",
        value: "Full-Time",
      },
      budget: {
        name: "Maximum Budget",
        type: "short_text",
        value: "Full-Time",
      },
      salary_range: {
        name: "Salary Range",
        type: "currency_range",
        value: {
          min_value: 70000,
          max_value: 90000,
          unit: "USD",
        },
      },
    },
    hiring_team: {
      hiring_managers: [
        {
          id: 84275,
          first_name: "Kaylee",
          last_name: "Prime",
          name: "Kaylee Prime",
          employee_id: "13636",
        },
        {
          id: 169779,
          first_name: "Hank",
          last_name: "Hollandaise",
          name: "Hank Hollandaise",
          employee_id: "34537",
        },
      ],
      recruiters: [
        {
          id: 81111,
          first_name: "Samuel",
          last_name: "Skateboard",
          name: "Samuel Skateboard",
          employee_id: "34531",
          responsible: false,
        },
        {
          id: 153448,
          first_name: "Stegosaurus",
          last_name: "Heels",
          name: "Stegosaurus Heels",
          employee_id: "45748",
          responsible: true,
        },
      ],
      coordinators: [
        {
          id: 122635,
          first_name: "Teddy",
          last_name: "Pizzazz",
          name: "Teddy Pizzazz",
          employee_id: "47327",
          responsible: true,
        },
        {
          id: 177046,
          first_name: "Mirandella",
          last_name: "Lager",
          name: "Mirandella Lager",
          employee_id: "43626",
          responsible: false,
        },
      ],
      sourcers: [
        {
          id: 122635,
          first_name: "Teddy",
          last_name: "Pizzazz",
          name: "Teddy Pizzazz",
          employee_id: "47327",
        },
      ],
    },
    openings: [
      {
        id: 123,
        opening_id: "3-1",
        status: "open",
        opened_at: "2015-11-20T23:14:14.736Z",
        closed_at: "2017-11-20T23:14:14.736Z",
        application_id: 45678,
        close_reason: {
          id: 678,
          name: "Hired - Backfill",
        },
      },
      {
        id: 124,
        opening_id: "3-2",
        status: "open",
        opened_at: "2015-11-20T23:14:14.739Z",
        closed_at: null,
        application_id: null,
        close_reason: null,
      },
      {
        id: 125,
        opening_id: null,
        status: "open",
        opened_at: "2016-02-03T20:00:00.000Z",
        closed_at: null,
        application_id: null,
      },
      {
        id: 126,
        opening_id: "2-4",
        status: "closed",
        opened_at: "2016-02-03T16:38:46.985Z",
        closed_at: "2016-02-03T16:39:09.811Z",
        application_id: 1232,
        close_reason: {
          id: 689,
          name: "Hired",
        },
      },
    ],
  },
};






export const listJobsExamplePayload = {
  data: [
    {
      id: 6404,
      name: "Archaeologist",
      requisition_id: "abc123",
      notes: "<p>Resistance to electro-magnetic radiation a plus!</p>",
      confidential: false,
      status: "closed",
      created_at: "2013-12-10T14:42:58Z",
      opened_at: "2013-12-11T14:42:58Z",
      closed_at: "2013-12-12T14:42:58Z",
      updated_at: "2013-12-12T14:42:58Z",
      is_template: false,
      copied_from_id: 2345,
      departments: [
        {
          id: 25907,
          name: "Second-Level department",
          parent_id: 25908,
          child_ids: [14510],
          external_id: "12345",
        },
      ],
      offices: [
        {
          id: 47012,
          name: "New York",
          location: {
            name: "New York, United States",
          },
          primary_contact_user_id: 150893,
          parent_id: 50849,
          child_ids: [50852, 50891],
          external_id: "15679",
        },
      ],
      custom_fields: {
        employment_type: "Full-Time",
        maximum_budget: "$81.5k",
        salary_range: {
          min_value: 70000,
          max_value: 90000,
          unit: "USD",
        },
      },
      keyed_custom_fields: {
        employment_type: {
          name: "Time type",
          type: "single_select",
          value: "Full-Time",
        },
        budget: {
          name: "Maximum Budget",
          type: "short_text",
          value: "Full-Time",
        },
        salary_range: {
          name: "Salary Range",
          type: "currency_range",
          value: {
            min_value: 70000,
            max_value: 90000,
            unit: "USD",
          },
        },
      },
      hiring_team: {
        hiring_managers: [
          {
            id: 84275,
            first_name: "Kaylee",
            last_name: "Prime",
            name: "Kaylee Prime",
            employee_id: "13636",
          },
          {
            id: 169779,
            first_name: "Hank",
            last_name: "Hollandaise",
            name: "Hank Hollandaise",
            employee_id: "34537",
          },
        ],
        recruiters: [
          {
            id: 81111,
            first_name: "Samuel",
            last_name: "Skateboard",
            name: "Samuel Skateboard",
            employee_id: "34531",
            responsible: false,
          },
          {
            id: 153448,
            first_name: "Stegosaurus",
            last_name: "Heels",
            name: "Stegosaurus Heels",
            employee_id: "45748",
            responsible: true,
          },
        ],
        coordinators: [
          {
            id: 122635,
            first_name: "Teddy",
            last_name: "Pizzazz",
            name: "Teddy Pizzazz",
            employee_id: "47327",
            responsible: true,
          },
          {
            id: 177046,
            first_name: "Mirandella",
            last_name: "Lager",
            name: "Mirandella Lager",
            employee_id: "43626",
            responsible: false,
          },
        ],
        sourcers: [
          {
            id: 122635,
            first_name: "Teddy",
            last_name: "Pizzazz",
            name: "Teddy Pizzazz",
            employee_id: "47327",
          },
        ],
      },
      openings: [
        {
          id: 123,
          opening_id: "3-1",
          status: "open",
          opened_at: "2015-11-20T23:14:14.736Z",
          closed_at: "2017-11-20T23:14:14.736Z",
          application_id: 45678,
          close_reason: {
            id: 678,
            name: "Hired - Backfill",
          },
        },
        {
          id: 124,
          opening_id: "3-2",
          status: "open",
          opened_at: "2015-11-20T23:14:14.739Z",
          closed_at: null,
          application_id: null,
          close_reason: null,
        },
        {
          id: 125,
          opening_id: null,
          status: "open",
          opened_at: "2016-02-03T20:00:00.000Z",
          closed_at: null,
          application_id: null,
        },
        {
          id: 126,
          opening_id: "2-4",
          status: "closed",
          opened_at: "2016-02-03T16:38:46.985Z",
          closed_at: "2016-02-03T16:39:09.811Z",
          application_id: 1232,
          close_reason: {
            id: 689,
            name: "Hired",
          },
        },
      ],
    },
  ],
};








export const enableUserExamplePayload = {
  data: {
    id: 253528,
    name: "Bob Smith",
    first_name: "Bob",
    last_name: "Smith",
    primary_email_address: "bob@email.org",
    updated_at: "2017-03-23T18:58:27.796Z",
    created_at: "2016-04-28T15:28:16.440Z",
    disabled: false,
    site_admin: false,
    emails: ["bob@email.org"],
    employee_id: "221",
    linked_candidate_ids: [123, 654],
    offices: [
      {
        id: 47013,
        name: "San Francisco",
        location: {
          name: "San Francisco, California",
        },
        primary_contact_user_id: 150894,
        parent_id: 50850,
        parent_office_external_id: "14680",
        child_ids: [50852, 50891],
        child_office_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
    departments: [
      {
        id: 25907,
        name: "Marketing",
        parent_id: 25908,
        parent_department_external_id: "13473",
        child_ids: [50852, 50891],
        child_department_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
    custom_fields: {
      equipment: "Laptop",
      shirt_size: "M",
      hiring_specialties: ["Engineers", "Executives"],
      trained_for_interviews: true,
      recruiting_partner: {
        name: "Johnny Recruiter",
        email: "johnny@example.com",
        user_id: 4000000000,
      },
    },
    keyed_custom_fields: {
      equipment: {
        name: "Equipment",
        type: "short_text",
        value: "Laptop",
      },
      shirt_size: {
        name: "Shirt Size",
        type: "single_select",
        value: "M",
      },
      hiring_specialties: {
        name: "Hiring Specialties",
        type: "multi_select",
        value: ["Engineers", "Executives"],
      },
      trained_for_interviews: {
        name: "Trained for interviews",
        type: "boolean",
        value: true,
      },
      recruiting_partner: {
        name: "Recruiting Partner",
        type: "user",
        value: {
          name: "Johnny Recruiter",
          email: "johnny@example.com",
          user_id: 4000000000,
        },
      },
    },
  },
};






export const getUserExamplePayload = {
  data: {
    id: 112,
    name: "Juliet Burke",
    first_name: "Juliet",
    last_name: "Burke",
    primary_email_address: "juliet.burke@example.com",
    updated_at: "2016-11-17T16:13:48.888Z",
    created_at: "2015-11-18T22:26:32.243Z",
    disabled: false,
    site_admin: true,
    emails: ["juliet.burke@example.com", "other.woman@example.com"],
    employee_id: "221",
    linked_candidate_ids: [123, 654],
    offices: [
      {
        id: 47012,
        name: "New York",
        location: {
          name: "New York, United States",
        },
        primary_contact_user_id: 150893,
        parent_id: 50849,
        parent_office_external_id: "14679",
        child_ids: [50852, 50891],
        child_office_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
    departments: [
      {
        id: 25907,
        name: "Research & Development",
        parent_id: 25908,
        parent_department_external_id: "13473",
        child_ids: [50852, 50891],
        child_department_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
  },
};






export const listUsersExamplePayload = {
  data: [
    {
      id: 112,
      name: "Juliet Burke",
      first_name: "Juliet",
      last_name: "Burke",
      primary_email_address: "juliet.burke@example.com",
      updated_at: "2016-11-17T16:13:48.888Z",
      created_at: "2015-11-18T22:26:32.243Z",
      disabled: false,
      site_admin: true,
      emails: ["juliet.burke@example.com", "other.woman@example.com"],
      employee_id: "221",
      linked_candidate_ids: [123, 654],
      offices: [
        {
          id: 47012,
          name: "New York",
          location: {
            name: "New York, United States",
          },
          primary_contact_user_id: 150893,
          parent_id: 50849,
          parent_office_external_id: "14679",
          child_ids: [50852, 50891],
          child_office_external_ids: ["13473", "123473"],
          external_id: "15679",
        },
      ],
      departments: [
        {
          id: 25907,
          name: "Research & Development",
          parent_id: 25908,
          parent_department_external_id: "13473",
          child_ids: [50852, 50891],
          child_department_external_ids: ["13473", "123473"],
          external_id: "15679",
        },
      ],
    },
    {
      id: 712,
      name: "John Doe",
      first_name: "John",
      last_name: "Doe",
      primary_email_address: "john.doe@example.com",
      updated_at: "2016-11-03T18:05:47.361Z",
      created_at: "2015-11-18T22:27:11.111Z",
      disabled: false,
      site_admin: true,
      emails: ["john.doe@example.com"],
      employee_id: "700",
      linked_candidate_ids: [789, 1022],
      offices: [
        {
          id: 47013,
          name: "San Francisco",
          location: {
            name: "San Francisco, California",
          },
          primary_contact_user_id: 150894,
          parent_id: 50850,
          parent_office_external_id: "14680",
          child_ids: [50852, 50891],
          child_office_external_ids: ["13473", "123473"],
          external_id: "15679",
        },
      ],
      departments: [
        {
          id: 25907,
          name: "Marketing",
          parent_id: 25908,
          parent_department_external_id: "13473",
          child_ids: [50852, 50891],
          child_department_external_ids: ["13473", "123473"],
          external_id: "15679",
        },
      ],
    },
  ],
};






export const createUserExamplePayload = {
  data: {
    id: 253528,
    name: "Bob Smith",
    first_name: "Bob",
    last_name: "Smith",
    primary_email_address: "bob@email.org",
    updated_at: "2017-03-23T18:58:27.796Z",
    created_at: "2016-04-28T15:28:16.440Z",
    disabled: false,
    site_admin: false,
    emails: ["bob@email.org"],
    employee_id: "221",
    linked_candidate_ids: [],
    offices: [
      {
        id: 47013,
        name: "San Francisco",
        location: {
          name: "San Francisco, California",
        },
        primary_contact_user_id: 150894,
        parent_id: 50850,
        parent_office_external_id: "14680",
        child_ids: [50852, 50891],
        child_office_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
    departments: [
      {
        id: 25907,
        name: "Marketing",
        parent_id: 25908,
        parent_department_external_id: "13473",
        child_ids: [50852, 50891],
        child_department_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
    custom_fields: {
      equipment: "Laptop",
      shirt_size: "M",
    },
    keyed_custom_fields: {
      equipment: {
        name: "Equipment",
        type: "short_text",
        value: "Laptop",
      },
      shirt_size: {
        name: "Shirt Size",
        type: "single_select",
        value: "M",
      },
    },
  },
};






export const editUserExamplePayload = {
  data: {
    id: 253528,
    name: "Bob Smith",
    first_name: "Bob",
    last_name: "Smith",
    primary_email_address: "bob@email.org",
    updated_at: "2017-03-23T18:58:27.796Z",
    created_at: "2016-04-28T15:28:16.440Z",
    disabled: false,
    site_admin: false,
    emails: ["bob@email.org"],
    employee_id: "221",
    linked_candidate_ids: [123, 654],
    offices: [
      {
        id: 47013,
        name: "San Francisco",
        location: {
          name: "San Francisco, California",
        },
        primary_contact_user_id: 150894,
        parent_id: 50850,
        parent_office_external_id: "14680",
        child_ids: [50852, 50891],
        child_office_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
    departments: [
      {
        id: 25907,
        name: "Marketing",
        parent_id: 25908,
        parent_department_external_id: "13473",
        child_ids: [50852, 50891],
        child_department_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
    custom_fields: {
      equipment: "Laptop",
      shirt_size: "M",
    },
    keyed_custom_fields: {
      equipment: {
        name: "Equipment",
        type: "short_text",
        value: "Laptop",
      },
      shirt_size: {
        name: "Shirt Size",
        type: "single_select",
        value: "M",
      },
    },
  },
};






export const disableUserExamplePayload = {
  data: {
    id: 253528,
    name: "Bob Smith",
    first_name: "Bob",
    last_name: "Smith",
    primary_email_address: "bob@email.org",
    updated_at: "2017-03-23T18:58:27.796Z",
    created_at: "2016-04-28T15:28:16.440Z",
    disabled: true,
    site_admin: false,
    emails: ["bob@email.org"],
    employee_id: "221",
    linked_candidate_ids: [123, 654],
    offices: [
      {
        id: 47013,
        name: "San Francisco",
        location: {
          name: "San Francisco, California",
        },
        primary_contact_user_id: 150894,
        parent_id: 50850,
        parent_office_external_id: "14680",
        child_ids: [50852, 50891],
        child_office_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
    departments: [
      {
        id: 25907,
        name: "Marketing",
        parent_id: 25908,
        parent_department_external_id: "13473",
        child_ids: [50852, 50891],
        child_department_external_ids: ["13473", "123473"],
        external_id: "15679",
      },
    ],
  },
};












export const rawRequestExamplePayload = {
  data: [
    {
      id: 6404,
      name: "Archaeologist",
      requisition_id: "abc123",
      status: "closed",
      created_at: "2013-12-10T14:42:58Z",
      opened_at: "2013-12-11T14:42:58Z",
      closed_at: "2013-12-12T14:42:58Z",
      updated_at: "2013-12-12T14:42:58Z",
    },
  ],
};













export const webhookExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "Greenhouse-Event-ID": "3ce5180d-9119-4ddc-9ef6-21edb6e76f8a",
      Signature: "sha256 EXAMPLE_BASE64_SIGNATURE",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        action: "candidate_hired",
        payload: {
          application: {
            id: 69306314,
            candidate_id: 57683957,
            applied_at: "2017-09-29T12:56:05.244Z",
            status: "hired",
            jobs: [
              {
                id: 107761,
                name: "UX Designer - Boston",
              },
            ],
            current_stage: {
              id: 767358,
              name: "Hired",
            },
          },
          candidate: {
            id: 57683957,
            first_name: "John",
            last_name: "Locke",
            company: "The Tustin Box Company",
            title: "Man of Mystery",
          },
        },
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Webhook Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  response: {
    statusCode: 200,
    contentType: "application/json",
    body: JSON.stringify({
      action: "candidate_hired",
      payload: {
        application: { id: 69306314 },
        candidate: { id: 57683957 },
      },
    }),
  },
};








export const pollChangesTriggerExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            id: 69306314,
            candidate_id: 57683957,
            prospect: false,
            applied_at: "2026-05-20T14:00:00.000Z",
            rejected_at: null,
            last_activity_at: "2026-05-20T14:00:00.000Z",
            location: { address: "New York, New York, USA" },
            source: { id: 2, public_name: "Jobs page on your website" },
            credited_to: {
              id: 4080,
              first_name: "Kate",
              last_name: "Austen",
              name: "Kate Austen",
              employee_id: "12345",
            },
            rejection_reason: null,
            rejection_details: null,
            jobs: [{ id: 107761, name: "UX Designer - Boston" }],
            job_post_id: 123,
            status: "active",
            current_stage: { id: 767358, name: "Application Review" },
            attachments: [],
          },
        ],
        updated: [
          {
            id: 69306509,
            candidate_id: 57683957,
            prospect: false,
            applied_at: "2026-05-12T09:00:00.000Z",
            rejected_at: null,
            last_activity_at: "2026-05-20T13:15:00.000Z",
            location: null,
            source: { id: 100674, public_name: "Campus Job Fair" },
            credited_to: {
              id: 566819,
              first_name: "Bob",
              last_name: "Smith",
              name: "Bob Smith",
              employee_id: "ABC12345",
            },
            rejection_reason: null,
            rejection_details: null,
            jobs: [{ id: 224587, name: "Product Manager" }],
            job_post_id: null,
            status: "active",
            current_stage: { id: 826, name: "In Discussion" },
            attachments: [],
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false as boolean | undefined,
};
