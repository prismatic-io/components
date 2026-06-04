










export const createEmployeeExamplePayload = {
  data: {
    fullName: "Jane Olivia Smith",
    displayName: "Jane Smith",
    creationDateTime: "2026-03-15T14:22:08.451239",
    work: {
      shortStartDate: "03/15",
      startDate: "03/15/2026",
      manager: "Michael Chen",
      tenureDuration: "0 years, 0 months and 12 days",
      durationOfEmployment: "0 years, 0 months and 12 days",
      reportsToIdInCompany: "215",
      employeeIdInCompany: "487",
      reportsTo: "Michael Chen",
      tenureDurationYears: "0.033",
      department: "Engineering",
      siteID: "1028",
      tenureYears: "0",
      isManager: "No",
      title: "Software Engineer",
      site: "New York Office",
      originalStartDate: "03/15/2026",
      activeEffectiveDate: "03/15/2026",
      secondLevelManager: "Sarah Williams",
      daysOfPreviousService: "0",
      yearsOfService: "0.033",
    },
    avatarUrl: "https://images.hibob.com/avatars/default-f-01.png",
    secondName: "Olivia",
    about: {
      foodPreferences: "Vegetarian",
      superpowers: "problem-solving,collaboration",
      hobbies: "Hiking,Photography,Cooking",
      about: "Passionate software engineer with 5 years of experience.",
      avatar: "https://images.hibob.com/avatars/default-f-01.png",
    },
    companyId: "784521",
    email: "jane.smith@acmecorp.com",
    surname: "Smith",
    coverImageUrl: "https://images.hibob.com/covers/default-cover-01.png",
    id: "2849571038274619283",
    firstName: "Jane",
  },
};






export const searchEmployeeExamplePayload = {
  data: {
    employees: [
      {
        fullName: "Jane Olivia Smith",
        displayName: "Jane Smith",
        creationDateTime: "2024-03-27T09:12:21.680867",
        work: {
          shortStartDate: "01/05",
          startDate: "01/05/2015",
          manager: "Michael Chen",
          tenureDuration: "9 years, 1 month and 26 days",
          durationOfEmployment: "9 years, 1 month and 26 days",
          reportsToIdInCompany: "30",
          employeeIdInCompany: "40",
          reportsTo: "Michael Chen",
          tenureDurationYears: "9.155",
          department: "Client Services",
          siteId: "1028",
          tenureYears: "9",
          isManager: "No",
          title: "Account Manager",
          site: "New York Office",
          originalStartDate: "01/05/2015",
          activeEffectiveDate: "01/05/2015",
          secondLevelManager: "Sarah Williams",
          daysOfPreviousService: "0",
          yearsOfService: "9.155",
        },
        avatarUrl: "https://images.hibob.com/avatars/default-f-01.png",
        secondName: "Olivia",
        about: {
          foodPreferences: "Vegetarian",
          superpowers: "pitching,copywriting",
          hobbies: "Rugby,Cycling,Running",
          about: "Experienced account manager focused on client success.",
          avatar: "https://images.hibob.com/avatars/default-f-01.png",
        },
        companyId: "636192",
        email: "jane.smith@acmecorp.com",
        surname: "Smith",
        coverImageUrl: "https://images.hibob.com/covers/default-cover-01.png",
        id: "3332883884017713938",
        firstName: "Jane",
      },
    ],
  },
};






export const readEmployeeFieldsExamplePayload = {
  data: {
    employees: [
      {
        fullName: "Andrew James Tullin",
        displayName: "Andrew Tullin",
        creationDateTime: "2024-03-27T09:12:21.680867",
        work: {
          shortStartDate: "01/05",
          startDate: "01/05/2015",
          manager: "Lisa Park",
          tenureDuration: "9 years, 1 month and 26 days",
          durationOfEmployment: "9 years, 1 month and 26 days",
          reportsToIdInCompany: "30",
          employeeIdInCompany: "40",
          reportsTo: "Lisa Park",
          tenureDurationYears: "9.155",
          department: "Client Services",
          siteId: "1028",
          tenureYears: "9",
          isManager: "No",
          title: "Account Manager",
          site: "London Office",
          originalStartDate: "01/05/2015",
          activeEffectiveDate: "01/05/2015",
          secondLevelManager: "David Morales",
          daysOfPreviousService: "0",
          yearsOfService: "9.155",
        },
        avatarUrl: "https://images.hibob.com/avatars/default-m-01.png",
        secondName: "James",
        about: {
          foodPreferences: "",
          superpowers: "pitching,copywriting",
          hobbies: "Rugby,Cycling,Running",
          about: "Account manager with a passion for client relationships.",
          avatar: "https://images.hibob.com/avatars/default-m-01.png",
        },
        companyId: "636192",
        email: "andrew.tullin@acmecorp.com",
        surname: "Tullin",
        coverImageUrl: "https://images.hibob.com/covers/default-cover-01.png",
        id: "3332883884017713938",
        firstName: "Andrew",
      },
    ],
  },
};






export const downloadEmployeeDocumentsExamplePayload = {
  data: {
    documents: [
      {
        documentName: "Employment_Agreement_2024.pdf",
        downloadLink:
          "https://api.hibob.com/v1/docs/download/abc123def456-7890-abcd-ef1234567890",
      },
    ],
  },
};






export const uploadFileFromUrlExamplePayload = {
  data: {
    id: 48291,
    employeeId: "3332883884017713938",
    uploadedById: "2849571038274619283",
    name: "Performance_Review_Q1_2026.pdf",
    creationDate: "2026-03-15T10:30:00.000Z",
    status: "active",
    tags: ["performance-review", "2026-Q1"],
    folderId: 1045,
    mimeType: "application/pdf",
    fileId: 93847,
    documentName: "Performance_Review_Q1_2026.pdf",
    owner: {
      id: "3332883884017713938",
    },
    actionRequestDate: "2026-03-15T10:30:00.000Z",
    actionCompleteDate: "2026-03-15T10:30:02.000Z",
  },
};






export const uploadFileToFolderExamplePayload = {
  data: {
    id: 48292,
  },
};






export const deleteFileFromFolderExamplePayload = {
  data: {
    success: true,
    message: "Document doc_123 deleted successfully",
  },
};






export const listOpenTasksExamplePayload = {
  data: {
    tasks: [
      {
        id: 58291,
        owner: {
          id: "2849571038274619283",
          firstName: "Michael",
          surname: "Chen",
          email: "michael.chen@acmecorp.com",
          displayName: "Michael Chen",
        },
        title: "Complete onboarding checklist for new hire",
        requestedFor: {
          id: "3332883884017713938",
          firstName: "Jane",
          surname: "Smith",
          email: "jane.smith@acmecorp.com",
          displayName: "Jane Smith",
        },
        due: "2026-04-01",
        linkInBob: "https://app.hibob.com/tasks/58291",
        set: "Onboarding",
        workflow: "New Employee Onboarding",
        ordinalInWorkflow: 1,
        description: "Complete all required onboarding tasks for the new hire.",
        status: "Open",
        completionDate: null,
        employeeGroupId: 3021,
        companyId: 784521,
      },
    ],
  },
};






export const getEmployeeTasksExamplePayload = {
  data: {
    tasks: [
      {
        id: 58291,
        owner: {
          id: "2849571038274619283",
          firstName: "Michael",
          surname: "Chen",
          email: "michael.chen@acmecorp.com",
          displayName: "Michael Chen",
        },
        title: "Complete onboarding checklist for new hire",
        requestedFor: {
          id: "3332883884017713938",
          firstName: "Jane",
          surname: "Smith",
          email: "jane.smith@acmecorp.com",
          displayName: "Jane Smith",
        },
        due: "2026-04-01",
        linkInBob: "https://app.hibob.com/tasks/58291",
        set: "Onboarding",
        workflow: "New Employee Onboarding",
        ordinalInWorkflow: 1,
        description: "Complete all required onboarding tasks for the new hire.",
        status: "Open",
        completionDate: null,
        employeeGroupId: 3021,
        companyId: 784521,
      },
    ],
  },
};






export const completeTaskExamplePayload = {
  data: {
    toDosUpdated: 1,
  },
};






export const getCompanyListExamplePayload = {
  data: {
    name: "Department",
    items: [
      {
        id: 102938,
        value: "Engineering",
        name: "Engineering",
        archived: false,
        children: [
          {
            id: 102939,
            value: "Frontend",
            name: "Frontend",
            archived: false,
            children: [
              {
                id: 102940,
                value: "React Team",
                name: "React Team",
                archived: false,
              },
            ],
          },
        ],
      },
    ],
  },
};






export const listCompanyListsExamplePayload = {
  data: [
    {
      name: "Department",
      items: [
        {
          id: 102938,
          value: "Engineering",
          name: "Engineering",
          archived: false,
          children: [
            {
              id: 102939,
              value: "Frontend",
              name: "Frontend",
              archived: false,
              children: [
                {
                  id: 102940,
                  value: "React Team",
                  name: "React Team",
                  archived: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};






export const updateFieldExamplePayload = {
  data: {
    success: true,
    message: "Field updated successfully",
  },
};










export const createCustomTableEntryExamplePayload = {
  data: {
    id: "entry_a1b2c3d4e5",
    employeeId: "3332883884017713938",
    customTableId: "category_1710000000__table_1710000001",
    data: {
      "Certification Name": "AWS Solutions Architect",
      "Issuing Organization": "Amazon Web Services",
      "Issue Date": "2023-01-15",
      "Expiration Date": "2026-01-15",
    },
    createdAt: "2026-03-15T10:00:00.000Z",
    updatedAt: "2026-03-15T10:00:00.000Z",
  },
};










export const addListItemExamplePayload = {
  data: {
    id: "102941",
  },
};






export const updateListItemExamplePayload = {
  data: {
    success: true,
    message: "List item updated successfully",
  },
};






export const updateCustomTableEntryExamplePayload = {
  data: {
    success: true,
    message: "Custom table entry updated successfully",
  },
};










export const getCustomTableMetadataExamplePayload = {
  data: {
    id: "category_1710000000__table_1710000001",
    category: "employment",
    name: "Certifications",
    description: "Tracks employee professional certifications.",
    columns: [
      {
        id: "column_cert_name",
        name: "Certification Name",
        description: "The name of the professional certification.",
        mandatory: true,
        type: "text",
        typeData: {
          listId: null,
        },
      },
    ],
  },
};






export const deleteCustomTableEntryExamplePayload = {
  data: {
    success: true,
    message: "Custom table entry entry_a1b2c3d4e5 deleted successfully",
  },
};






export const deleteFieldExamplePayload = {
  data: {
    success: true,
    message: "Field custom_field_123 deleted successfully",
  },
};










export const createNewFieldExamplePayload = {
  data: {
    id: "root.custom.custom_field_certification_level",
  },
};






export const deleteListItemExamplePayload = {
  data: {
    success: true,
    message: "List item item_123 deleted successfully",
  },
};










export const listEmployeeFieldsExamplePayload = {
  data: [
    {
      id: "root.work.department",
      categoryId: "root.work",
      categoryDisplayName: "Work",
      category: "work",
      name: "Department",
      description: "The employee's department within the organization.",
      jsonPath: "/work/department",
      type: "list",
      typeData: {
        listId: "department",
      },
      historical: false,
    },
  ],
};






export const listFoldersExamplePayload = {
  data: [
    {
      id: {
        value: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      },
      name: {
        value: "Shared Documents",
      },
      folderType: {
        value: "shared",
      },
    },
  ],
};






export const revokeEmployeeAccessExamplePayload = {
  data: {
    success: true,
    message: "Employee access revoked successfully",
  },
};






export const terminateEmployeeExamplePayload = {
  data: {
    success: true,
    message: "Employee terminated successfully",
  },
};






export const updateEmployeeExamplePayload = {
  data: {
    success: true,
    message: "Employee updated successfully",
  },
};






export const updateEmployeeEmailExamplePayload = {
  data: {
    success: true,
    message: "Employee email updated successfully",
  },
};
