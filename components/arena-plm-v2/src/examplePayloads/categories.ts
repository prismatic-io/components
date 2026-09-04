import type {
  AttributeDefinitionFullRepResultRep,
  CategoryAttributeDefinitionResultRep,
  CategoryFullResultRep,
  UserCompactVo,
} from "../types";
const sampleUser: UserCompactVo = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
export const listBomAttributesExamplePayload: {
  data: AttributeDefinitionFullRepResultRep;
} = {
  data: {
    results: [
      {
        guid: "1BA22BA33BA44BA55BA66BA7",
        active: true,
        apiName: "refDes",
        name: "Reference Designator",
        creatable: true,
        custom: false,
        editable: true,
        fieldType: "SINGLE_LINE_TEXT",
        required: false,
        searchable: true,
        maxLength: 255,
      },
      {
        guid: "2BA33BA44BA55BA66BA77BA8",
        active: true,
        apiName: "quantity",
        name: "Quantity",
        creatable: true,
        custom: false,
        editable: true,
        fieldType: "POSITIVE_INTEGER",
        required: true,
        searchable: false,
      },
    ],
    count: 2,
  },
};
export const listCategoriesExamplePayload: {
  data: CategoryFullResultRep;
} = {
  data: {
    results: [
      {
        guid: "3CA44CA55CA66CA77CA88CA9",
        activated: true,
        assignable: true,
        creationDateTime: "2026-02-01T09:00:00Z",
        creator: sampleUser,
        description: "Electromechanical assemblies and subassemblies.",
        level: 1,
        name: "Assemblies",
        path: "Items/Assemblies",
        structural: false,
        systemDefined: false,
        numberFormat: {
          guid: "4NF55NF66NF77NF88NF99NF0",
          fields: [{ guid: "5FD66FD77FD88FD99FD00FD1", value: "ASM" }],
        },
      },
      {
        guid: "6CB77CB88CB99CB00CB11CB2",
        activated: true,
        assignable: false,
        creationDateTime: "2026-02-01T09:05:00Z",
        creator: sampleUser,
        level: 0,
        name: "Items",
        path: "Items",
        structural: true,
        systemDefined: true,
      },
    ],
    count: 2,
  },
};
export const listCategoryAttributesExamplePayload: {
  data: CategoryAttributeDefinitionResultRep;
} = {
  data: {
    results: [
      {
        guid: "7AT88AT99AT00AT11AT22AT3",
        active: true,
        apiName: "material",
        name: "Material",
        fieldType: "FIXED_DROP_DOWN",
        required: false,
        editable: true,
        custom: true,
        description: "Primary material of the component.",
        possibleValues: ["Aluminum", "Steel", "ABS Plastic"],
        multiSelect: false,
      },
      {
        guid: "8AT99AT00AT11AT22AT33AT4",
        active: true,
        apiName: "unitCost",
        name: "Unit Cost",
        fieldType: "COST",
        required: false,
        editable: true,
        custom: true,
        description: "Cost per unit.",
        currency: "USD",
        decimalPlaces: 2,
      },
    ],
    count: 2,
  },
};
