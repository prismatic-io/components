import type {
  ChangeQualityAssociationVoResultRep,
  FileAssociationVo,
  FileAssociationVoResultRep,
  FileDetailVo,
  QualityAssociationVo,
  QueryResultRepSupplierFullVo,
  QueryResultRepSupplierItemFullVo,
  SupplierAddressCompactVo,
  SupplierAddressCompactVoResultRep,
  SupplierApprovalStatusResultRep,
  SupplierFullVo,
  SupplierItemComplianceVoResultRep,
  SupplierItemFileVo,
  SupplierItemFileVoResultRep,
  SupplierItemFullVo,
  SupplierPhoneNumberVo,
  SupplierPhoneNumberVoResultRep,
  UserCompactVo,
} from "../types";
const sampleUser: UserCompactVo = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
const sampleFileDetail: FileDetailVo = {
  guid: "7GG88HH99II00JJ11KK22LL3",
  name: "supplier-datasheet.pdf",
  number: "FILE-000913",
  title: "Component Datasheet Rev A",
  description: "Manufacturer datasheet for the supplied capacitor.",
  edition: "A",
  format: "PDF",
  mimeType: "application/pdf",
  size: 198432,
  storageMethodName: "FILE",
  category: { guid: "0FF11GG22HH33II44JJ55KK6", name: "Datasheets" },
  author: { fullName: "Jordan Rivera" },
  creationDateTime: "2026-03-10T09:15:00Z",
  lastModifiedDateTime: "2026-03-12T16:42:00Z",
  latest: true,
  private: false,
};
const sampleSupplierFull: SupplierFullVo = {
  guid: "ABC123DEF456GHI789JKL012",
  name: "Acme Electronics Supply",
  supplierId: "SUP-000145",
  url: {
    api: "https://api.arenasolutions.com/v1/suppliers/ABC123DEF456GHI789JKL012",
    app: "https://app.bom.com/suppliers/ABC123DEF456GHI789JKL012",
  },
  additionalAttributes: [
    { guid: "accountManager", value: "Priya Nadar" },
    { guid: "preferredCurrency", value: "USD" },
  ],
  creationDateTime: "2026-03-14T10:00:00Z",
  modificationDateTime: "2026-03-18T14:30:00Z",
  creator: sampleUser,
  modifyUser: sampleUser,
};
const sampleSupplierItemFull: SupplierItemFullVo = {
  guid: "MNO345PQR678STU901VWX234",
  number: "SUP-ITEM-002210",
  name: "Ceramic Capacitor 10uF 25V",
  description: "Off-the-shelf ceramic capacitor supplied by Acme Electronics.",
  uom: "EA",
  offTheShelf: true,
  type: "Purchased",
  procurementType: "OTS",
  creationDateTime: "2026-03-15T08:20:00Z",
  creator: sampleUser,
  supplier: {
    guid: "ABC123DEF456GHI789JKL012",
    name: "Acme Electronics Supply",
  },
  additionalAttributes: [
    {
      guid: "3RR44SS55TT66UU77VV88WW9",
      name: "Lead Time (days)",
      value: 21,
      apiName: "leadTimeDays",
      fieldType: "NUMBER",
      multiSelect: false,
    },
  ],
};
const sampleSupplierAddress: SupplierAddressCompactVo = {
  primary: true,
  address: {
    guid: "ADR567GHI890JKL123MNO456",
    label: "Headquarters",
    address1: "1200 Industrial Parkway",
    address2: "Suite 400",
    city: "San Jose",
    state: "CA",
    province: "",
    postalCode: "95112",
    country: "United States",
  },
};
const sampleSupplierPhoneNumber: SupplierPhoneNumberVo = {
  guid: "PHN789JKL012MNO345PQR678",
  label: "Main",
  number: "+1 408-555-0142",
  extension: "204",
  comment: "Primary sales contact line.",
};
const sampleItemSourcing = {
  guid: "SRC901VWX234YZA567BCD890",
  amlRank: 1,
  amlSplit: 100,
  approved: true,
  makeItem: false,
  notes: "Preferred manufacturer for this component.",
  mfrItem: {
    guid: "MFR234YZA567BCD890EFG123",
    number: "MFR-CAP-10UF-25V",
    name: "GRM188R61E106MA73D",
  },
  vendorItem: {
    guid: "MNO345PQR678STU901VWX234",
    number: "SUP-ITEM-002210",
    name: "Ceramic Capacitor 10uF 25V",
  },
  vendorItemConversionFactor: 1,
};
export const createSupplierExamplePayload: {
  data: SupplierFullVo;
} = {
  data: sampleSupplierFull,
};
export const getSupplierByGuidExamplePayload: {
  data: SupplierFullVo;
} = {
  data: sampleSupplierFull,
};
export const listSuppliersExamplePayload: {
  data: QueryResultRepSupplierFullVo;
} = {
  data: {
    results: [
      sampleSupplierFull,
      {
        guid: "DEF456GHI789JKL012MNO345",
        name: "Globex Components",
        supplierId: "SUP-000146",
        url: {
          api: "https://api.arenasolutions.com/v1/suppliers/DEF456GHI789JKL012MNO345",
          app: "https://app.bom.com/suppliers/DEF456GHI789JKL012MNO345",
        },
        creationDateTime: "2026-03-16T13:45:00Z",
        modificationDateTime: "2026-03-16T13:45:00Z",
        creator: sampleUser,
        modifyUser: sampleUser,
      },
    ],
    count: 2,
  },
};
export const updateSupplierExamplePayload: {
  data: SupplierFullVo;
} = {
  data: {
    ...sampleSupplierFull,
    name: "Acme Electronics Supply (Global)",
    modificationDateTime: "2026-03-20T09:00:00Z",
  },
};
export const deleteSupplierExamplePayload = {
  data: {
    success: true,
    message: "Supplier deleted successfully",
    supplierGuid: "ABC123DEF456GHI789JKL012",
  },
};
export const listSupplierApprovalStatusesExamplePayload: {
  data: SupplierApprovalStatusResultRep;
} = {
  data: {
    results: [
      {
        guid: "APS012MNO345PQR678STU901",
        name: "Approved",
        type: "APPROVED",
        description: "Supplier has passed qualification.",
        used: true,
        active: true,
        custom: false,
        color: "#2E7D32",
      },
      {
        guid: "APS123NOP456QRS789TUV012",
        name: "Pending Review",
        type: "PENDING",
        description: "Supplier qualification in progress.",
        used: true,
        active: true,
        custom: false,
        color: "#F9A825",
      },
    ],
    count: 2,
  },
};
export const createSupplierAddressExamplePayload: {
  data: SupplierAddressCompactVo;
} = {
  data: sampleSupplierAddress,
};
export const updateSupplierAddressExamplePayload: {
  data: SupplierAddressCompactVo;
} = {
  data: {
    ...sampleSupplierAddress,
    address: {
      ...sampleSupplierAddress.address,
      address1: "1500 Innovation Drive",
    },
  },
};
export const listSupplierAddressesExamplePayload: {
  data: SupplierAddressCompactVoResultRep;
} = {
  data: {
    results: [
      sampleSupplierAddress,
      {
        primary: false,
        address: {
          guid: "ADR678HIJ901KLM234NOP567",
          label: "Shipping",
          address1: "88 Distribution Way",
          city: "Reno",
          state: "NV",
          postalCode: "89501",
          country: "United States",
        },
      },
    ],
    count: 2,
  },
};
export const deleteSupplierAddressExamplePayload = {
  data: {
    success: true,
    message: "Supplier address deleted successfully",
    supplierGuid: "ABC123DEF456GHI789JKL012",
    addressGuid: "ADR567GHI890JKL123MNO456",
  },
};
export const createSupplierPhoneNumberExamplePayload: {
  data: SupplierPhoneNumberVo;
} = {
  data: sampleSupplierPhoneNumber,
};
export const updateSupplierPhoneNumberExamplePayload: {
  data: SupplierPhoneNumberVo;
} = {
  data: {
    ...sampleSupplierPhoneNumber,
    number: "+1 408-555-0199",
    comment: "Updated after-hours support line.",
  },
};
export const listSupplierPhoneNumbersExamplePayload: {
  data: SupplierPhoneNumberVoResultRep;
} = {
  data: {
    results: [
      sampleSupplierPhoneNumber,
      {
        guid: "PHN890KLM123NOP456QRS789",
        label: "Fax",
        number: "+1 408-555-0177",
        comment: "Purchasing fax line.",
      },
    ],
    count: 2,
  },
};
export const deleteSupplierPhoneNumberExamplePayload = {
  data: {
    success: true,
    message: "Supplier phone number deleted successfully",
    supplierGuid: "ABC123DEF456GHI789JKL012",
    phoneNumberGuid: "PHN789JKL012MNO345PQR678",
  },
};
export const createSupplierFileAssociationExamplePayload: {
  data: FileAssociationVo;
} = {
  data: {
    guid: "SFA234NOP567QRS890TUV123",
    file: sampleFileDetail,
  },
};
export const updateSupplierFileAssociationExamplePayload: {
  data: FileAssociationVo;
} = {
  data: {
    guid: "SFA234NOP567QRS890TUV123",
    file: {
      ...sampleFileDetail,
      title: "Component Datasheet Rev B",
      edition: "B",
    },
  },
};
export const listSupplierFileAssociationsExamplePayload: {
  data: FileAssociationVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "SFA234NOP567QRS890TUV123",
        file: sampleFileDetail,
      },
    ],
    count: 1,
  },
};
export const deleteSupplierFileAssociationExamplePayload = {
  data: {
    success: true,
    message: "Supplier file association deleted successfully",
    supplierGuid: "ABC123DEF456GHI789JKL012",
    supplierFileAssociationGuid: "SFA234NOP567QRS890TUV123",
  },
};
export const getSupplierQualityProcessAssociationExamplePayload: {
  data: QualityAssociationVo;
} = {
  data: {
    guid: "SQA345OPQ678RST901UVW234",
    associationType: "SUPPLIER",
    qualityProcess: {
      guid: "QPR456PQR789STU012VWX345",
      number: "CAPA-000078",
      name: "Corrective Action - Solder Defects",
      status: "OPEN",
    },
  },
};
export const listSupplierQualityProcessAssociationsExamplePayload: {
  data: ChangeQualityAssociationVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "SQA345OPQ678RST901UVW234",
        associationType: "SUPPLIER",
        qualityProcess: {
          guid: "QPR456PQR789STU012VWX345",
          number: "CAPA-000078",
          name: "Corrective Action - Solder Defects",
          status: "OPEN",
        },
      },
    ],
    count: 1,
  },
};
export const createSupplierItemExamplePayload: {
  data: SupplierItemFullVo;
} = {
  data: sampleSupplierItemFull,
};
export const getSupplierItemByGuidExamplePayload: {
  data: SupplierItemFullVo;
} = {
  data: sampleSupplierItemFull,
};
export const listSupplierItemsExamplePayload: {
  data: QueryResultRepSupplierItemFullVo;
} = {
  data: {
    results: [
      sampleSupplierItemFull,
      {
        guid: "PQR678STU901VWX234YZA567",
        number: "SUP-ITEM-002211",
        name: "Resistor 4.7k 0.25W",
        description: "Off-the-shelf resistor supplied by Acme Electronics.",
        uom: "EA",
        offTheShelf: true,
        type: "Purchased",
        procurementType: "OTS",
        creationDateTime: "2026-03-16T09:10:00Z",
        creator: sampleUser,
        supplier: {
          guid: "ABC123DEF456GHI789JKL012",
          name: "Acme Electronics Supply",
        },
      },
    ],
    count: 2,
  },
};
export const updateSupplierItemExamplePayload: {
  data: SupplierItemFullVo;
} = {
  data: {
    ...sampleSupplierItemFull,
    name: "Ceramic Capacitor 10uF 25V X7R",
    description: "Updated specification to X7R dielectric.",
  },
};
export const deleteSupplierItemExamplePayload = {
  data: {
    success: true,
    message:
      "Supplier item with GUID MNO345PQR678STU901VWX234 has been successfully deleted",
    guid: "MNO345PQR678STU901VWX234",
  },
};
export const listSupplierItemComplianceExamplePayload: {
  data: SupplierItemComplianceVoResultRep;
} = {
  data: {
    results: [
      {
        guid: "CMP567RST890UVW123XYZ456",
        requirement: {
          guid: "REQ678STU901VWX234YZA567",
          name: "RoHS",
        },
        status: "COMPLIANT",
        notes: "RoHS certificate on file, valid through 2027.",
      },
    ],
    count: 1,
  },
};
export const listSupplierItemRequirementsExamplePayload = {
  data: {
    results: [
      {
        guid: "REQ678STU901VWX234YZA567",
        name: "RoHS",
        description: "Restriction of Hazardous Substances compliance.",
      },
      {
        guid: "REQ789TUV012WXY345ZAB678",
        name: "REACH",
        description: "Registration, Evaluation, Authorisation of Chemicals.",
      },
    ],
    count: 2,
  },
};
const sampleSupplierItemFile: SupplierItemFileVo = {
  guid: "SIF890UVW123XYZ456ABC789",
  name: "capacitor-datasheet.pdf",
  title: "Capacitor Datasheet",
  description: "Manufacturer datasheet for the ceramic capacitor.",
  size: 198432,
  mimeType: "application/pdf",
  storageMethod: 1,
  storageMethodName: "FILE",
  primary: true,
  creationDateTime: "2026-03-15T08:25:00Z",
  lastModifiedDateTime: "2026-03-15T08:25:00Z",
};
export const createSupplierItemFileExamplePayload: {
  data: SupplierItemFileVo;
} = {
  data: sampleSupplierItemFile,
};
export const listSupplierItemFilesExamplePayload: {
  data: SupplierItemFileVoResultRep;
} = {
  data: {
    results: [sampleSupplierItemFile],
    count: 1,
  },
};
export const getSupplierItemFileContentExamplePayload = {
  data: Buffer.from("sample binary file content"),
  contentType: "application/pdf",
};
export const listSupplierItemSourcingExamplePayload = {
  data: {
    results: [sampleItemSourcing],
    count: 1,
  },
};
export const createSourcingRelationshipExamplePayload = {
  data: sampleItemSourcing,
};
export const listSourcingRelationshipsExamplePayload = {
  data: {
    results: [
      sampleItemSourcing,
      {
        ...sampleItemSourcing,
        guid: "SRC012WXY345ZAB678CDE901",
        amlRank: 2,
        amlSplit: 0,
        approved: false,
        notes: "Alternate manufacturer pending qualification.",
      },
    ],
    count: 2,
  },
};
export const updateSourcingRelationshipExamplePayload = {
  data: {
    ...sampleItemSourcing,
    amlRank: 2,
    amlSplit: 50,
    notes: "Rank adjusted after dual-sourcing decision.",
  },
};
export const deleteSourcingRelationshipExamplePayload = {
  data: {
    success: true,
    itemGuid: "STU901VWX234YZA567BCD890",
    sourcingRelationshipGuid: "SRC901VWX234YZA567BCD890",
    message: "Sourcing relationship deleted successfully",
    statusCode: 204,
  },
};
