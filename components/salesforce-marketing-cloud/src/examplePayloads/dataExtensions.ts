import type { PaginatedResponse } from "../types";

export const upsertRowExamplePayload = {
  data: [
    {
      keys: {
        key: "425",
      },
      values: {
        name: "Example Name",
      },
    },
  ],
};

export const asyncUpsertRowsExamplePayload = {
  data: {
    requestId: "3ba0103a-fd9b-438a-8568-88c5720d77f4",
    resultMessages: [],
  },
};

export const listDataExtensionsExamplePayload: { data: PaginatedResponse } = {
  data: {
    count: 1,
    page: 1,
    pageSize: 25,
    links: {},
    items: [
      {
        id: "36e73253-16a9-ee11-ac6c-0abc489251b9",
        name: "facb9d48d7c44486a7b0715ef0b2f7a2",
        key: "facb9d48d7c44486a7b0715ef0b2f7a2",
        description: "",
        isActive: true,
        isSendable: true,
        sendableCustomObjectField: "SubscriberKey",
        sendableSubscriberField: "_SubscriberKey",
        isTestable: true,
        categoryId: 152631,
        ownerId: 712000003,
        isObjectDeletable: true,
        isFieldAdditionAllowed: true,
        isFieldModificationAllowed: true,
        createdDate: "2024-01-01T20:26:31.07",
        createdById: 712000003,
        createdByName: "TestUser",
        modifiedDate: "2024-01-01T20:26:31.07",
        modifiedById: 712000003,
        modifiedByName: "TestUser",
        ownerName: "TestUser",
        partnerApiObjectTypeId: 310,
        partnerApiObjectTypeName: "DataExtension",
        rowCount: 100000,
        dataRetentionProperties: {
          isDeleteAtEndOfRetentionPeriod: false,
          isRowBasedRetention: false,
          isResetRetentionPeriodOnImport: false,
        },
        fieldCount: 5,
      },
    ],
  },
};

export const createDataExtensionExamplePayload = {
  data: {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Customer_Data",
    key: "customer-data-key",
    description: "",
    isActive: true,
    isSendable: false,
    isTestable: true,
    fieldCount: 3,
  },
};

export const getDataExtensionFieldsExamplePayload = {
  data: {
    id: "f9e59b85-f353-ee11-ba4e-d4f5ef3d54c9",
    fields: [
      {
        name: "MemberId",
        id: "fd526c4d-d5c5-4601-9849-53839857960c",
        type: "Number",
        maskType: "None",
        storageType: "Plain",
        description: "",
        ordinal: 0,
        isNullable: false,
        isPrimaryKey: true,
        isTemplateField: false,
        isInheritable: false,
        isOverridable: false,
        isHidden: false,
        isReadOnly: false,
        mustOverride: false,
      },
    ],
    fieldCount: 1,
  },
};
