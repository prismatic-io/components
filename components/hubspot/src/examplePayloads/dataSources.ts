export const getObjectSelectionExamplePayload = {
  result: [
    {
      object: { key: "equipment items", label: "Equipment Items" },
      fields: [
        { key: "inventory_number", label: "Inventory Number" },
        { key: "purchase_date", label: "Purchase Date" },
      ],
    },
    {
      object: { key: "contacts", label: "Contacts" },
      fields: [
        { key: "email", label: "Email" },
        { key: "lifecyclestage", label: "Lifecycle Stage" },
      ],
    },
  ],
};

export const selectAssociationTypeExamplePayload = {
  result: [
    { label: "Decision Maker", key: "8" },
    { label: "Type 279", key: "279" },
  ],
};

export const selectCompanyExamplePayload = {
  result: [
    { label: "Acme Corporation", key: "98765432101" },
    { label: "TechStart Industries", key: "98765432103" },
  ],
};

export const selectContactExamplePayload = {
  result: [
    { label: "John Doe (john.doe@example.com)", key: "65059681027" },
    { label: "Jane Smith (jane.smith@example.com)", key: "65059681029" },
  ],
};

export const selectCustomObjectExamplePayload = {
  result: [
    { label: "Equipment", key: "2-116144016" },
    { label: "Service Contract", key: "2-117255127" },
  ],
};

export const selectObjectTypeExamplePayload = {
  result: [
    { label: "Contacts", key: "0-1" },
    { label: "Companies", key: "0-2" },
    { label: "Deals", key: "0-3" },
    { label: "Equipment", key: "2-116144016" },
  ],
};

export const selectDealExamplePayload = {
  result: [
    { label: "Q1 2024 Enterprise Contract", key: "87654321098" },
    { label: "Software License Renewal", key: "87654321101" },
  ],
};

export const selectEngagementExamplePayload = {
  result: [
    { label: "Follow up call (Tasks)", key: "47231018154" },
    { label: "Send proposal (Tasks)", key: "47231018317" },
  ],
};

export const selectImportExamplePayload = {
  result: [
    { label: "Import 9876543", key: "9876543" },
    { label: "Import 9876544", key: "9876544" },
  ],
};

export const selectLineItemExamplePayload = {
  result: [
    {
      label: "Professional Services Package (SKU: PS-PKG-001)",
      key: "54321098765",
    },
    {
      label: "1 Year Implementation Consultation (SKU: IMPL-CONSULT-12M)",
      key: "54321098767",
    },
  ],
};

export const selectProductExamplePayload = {
  result: [
    {
      label: "Enterprise Software License $25000.00 (SKU: ENT-SW-001)",
      key: "76543210987",
    },
    {
      label:
        "Professional Services - Implementation $8500.00 (SKU: PS-IMP-002)",
      key: "76543210989",
    },
  ],
};

export const selectPropertyExamplePayload = {
  result: [
    { label: "Email (email)", key: "email" },
    { label: "Lifecycle Stage (lifecyclestage)", key: "lifecyclestage" },
  ],
};

export const selectWebhookExamplePayload = {
  result: [
    { label: "contact.propertyChange (lifecyclestage)", key: "98765432" },
    { label: "contact.propertyChange (email)", key: "98765434" },
  ],
};
