//#region src/types/models.d.ts
interface Worker {
  PersonId: number;
  PersonNumber: string;
  DisplayName: string | null;
  FirstName: string | null;
  LastName: string;
  FullName: string | null;
  WorkEmail: string | null;
  CreationDate: string | null;
  LastUpdateDate: string | null;
}
interface WorkerRecord {
  PersonId: number;
  PersonNumber: string | null;
  DisplayName: string | null;
  FullName: string | null;
  DateOfBirth: string | null;
  CreationDate: string | null;
  LastUpdateDate: string | null;
  workersUniqID: string;
}
interface Assignment {
  AssignmentId: number;
  AssignmentName: string | null;
  AssignmentNumber: string | null;
  DepartmentName: string;
  GradeCode: string;
  GradeName: string;
  JobCode: string | null;
  JobName: string | null;
  LegalEmployerName: string;
  LocationCode: string;
  LocationName: string;
  ManagerName: string | null;
  PositionCode: string;
  PositionName: string;
  PrimaryAssignmentFlag: boolean;
  StartDate: string;
  WorkerType: string | null;
  FullPartTime: string | null;
}
interface Department {
  OrganizationId: number;
  Name: string | null;
  OrganizationCode: string | null;
  Status: string | null;
  EffectiveStartDate: string | null;
  EffectiveEndDate: string | null;
  LastUpdateDate: string | null;
}
interface Job {
  JobId: number;
  JobCode: string | null;
  Name: string;
  SetId: number;
  ActiveStatus: string | null;
  JobFamilyId: number | null;
  EffectiveStartDate: string | null;
  EffectiveEndDate: string | null;
  LastUpdateDate: string | null;
}
interface LocationAddress {
  Country: string | null;
  AddressUsageType: string | null;
  AddressLine1: string | null;
  TownOrCity: string | null;
  Region1: string | null;
  PostalCode: string | null;
  EffectiveStartDate: string | null;
  EffectiveEndDate: string | null;
}
interface Location {
  LocationId: number;
  LocationCode: string;
  LocationName: string;
  SetId: number;
  SetCode: string;
  SetName: string;
  ActiveStatus: string | null;
  Description: string | null;
  EffectiveStartDate: string;
  EffectiveEndDate: string;
  LastUpdateDate: string | null;
  addresses?: LocationAddress[];
}
interface Position {
  PositionId: number;
  Name: string;
  PositionCode: string | null;
  BusinessUnitId: number;
  DepartmentId: number;
  JobId: number;
  LocationId: number | null;
  ActiveStatus: string | null;
  EffectiveStartDate: string;
  EffectiveEndDate: string;
}
interface Grade {
  GradeId: number;
  GradeCode: string | null;
  GradeName: string | null;
  SetId: number | null;
  ActiveStatus: string | null;
  EffectiveStartDate: string | null;
  EffectiveEndDate: string | null;
}
interface Absence {
  personAbsenceEntryId: number;
  personId: number;
  absenceTypeId: number;
  absenceType: string | null;
  legalEntityId: number;
  absenceStatusCd: string | null;
  approvalStatusCd: string | null;
  startDate: string | null;
  endDate: string | null;
  duration: number | null;
  unitOfMeasure: string | null;
  assignmentId: number | null;
}
//#endregion
//#region src/types/responses.d.ts
interface OracleHcmListResponse<T> {
  items: T[];
  count: number;
  hasMore: boolean;
  limit: number;
  offset: number;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "oracle-fusion-cloud-hcm";
  documentationUrl: "https://prismatic.io/docs/components/oracle-fusion-cloud-hcm/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    listPublicWorkers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<Worker>;
    }>;
    getPublicWorker: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      personId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Worker;
    }>;
    listWorkers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<WorkerRecord>;
    }>;
    getWorker: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      personId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WorkerRecord;
    }>;
    createWorker: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      NameType: {
        required: boolean;
        label: string;
        type: "string";
        default: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      LegislationCode: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      LastName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      FirstName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      MiddleNames: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      Title: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      PersonNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      ApplicantNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      workerInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          DateOfBirth: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          DateOfDeath: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          CountryOfBirth: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          RegionOfBirth: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          TownOfBirth: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          BloodType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          CorrespondenceLanguage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      addresses: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          AddressLine1: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          AddressLine2: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          TownOrCity: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Region1: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PostalCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Country: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      phones: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          PhoneType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PhoneNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          CountryCodeNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          AreaCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Extension: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      emails: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          EmailType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          EmailAddress: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PrimaryFlag: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      nationalIdentifiers: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          NationalIdentifierType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          NationalIdentifierNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          LegislationCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workRelationships: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          LegalEntityId: {
            required: true;
            label: string;
            type: "string";
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          StartDate: {
            required: true;
            label: string;
            type: "string";
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          WorkerType: {
            required: true;
            label: string;
            type: "string";
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          LegalEmployerName: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          WorkerNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PrimaryFlag: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          EnterpriseSeniorityDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          LegalEmployerSeniorityDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          ProjectedTerminationDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WorkerRecord;
    }>;
    updateWorker: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      personId: {
        dataSource: string;
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      NameType: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      LegislationCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      FirstName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      LastName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      MiddleNames: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      Title: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      PersonNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      ApplicantNumber: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      workerInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          DateOfBirth: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          DateOfDeath: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          CountryOfBirth: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          RegionOfBirth: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          TownOfBirth: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          BloodType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          CorrespondenceLanguage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      addresses: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          AddressLine1: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          AddressLine2: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          TownOrCity: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Region1: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PostalCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Country: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      phones: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          PhoneType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PhoneNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          CountryCodeNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          AreaCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Extension: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      emails: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          EmailType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          EmailAddress: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PrimaryFlag: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
      nationalIdentifiers: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          NationalIdentifierType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          NationalIdentifierNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          LegislationCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      workRelationships: {
        label: string;
        collection: "valuelist";
        required: boolean;
        comments: string;
        inputs: {
          LegalEntityId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          StartDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          WorkerType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          LegalEmployerName: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          WorkerNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PrimaryFlag: {
            label: string;
            type: "boolean";
            required: false;
            default: string;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          EnterpriseSeniorityDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          LegalEmployerSeniorityDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          ProjectedTerminationDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: WorkerRecord;
    }>;
    listPositions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<Position>;
    }>;
    getPosition: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      positionId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Position;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listLocations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<Location>;
    }>;
    getLocation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      locationId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Location;
    }>;
    createLocation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      LocationCode: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      LocationName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      EffectiveStartDate: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      EffectiveEndDate: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      SetCode: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      SetId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      Description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      EmailAddress: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      primaryAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          AddressLine1: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          TownOrCity: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Region1: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PostalCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Country: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          AddressUsageType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          EffectiveStartDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          EffectiveEndDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          LocAddressUsageId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Location;
    }>;
    updateLocation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      LocationCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      LocationName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      EffectiveStartDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      EffectiveEndDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      SetCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      SetId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      Description: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      EmailAddress: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      primaryAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          AddressLine1: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          TownOrCity: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Region1: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          PostalCode: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          Country: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          AddressUsageType: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          EffectiveStartDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          EffectiveEndDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          LocAddressUsageId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Location;
    }>;
    deleteLocation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
    listJobs: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<Job>;
    }>;
    getJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      jobId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Job;
    }>;
    listGrades: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<Grade>;
    }>;
    getGrade: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      gradeId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Grade;
    }>;
    listDepartments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<Department>;
    }>;
    getDepartment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      departmentId: {
        label: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Department;
    }>;
    listAssignments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      personId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<Assignment>;
    }>;
    getAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      personId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      assignmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Assignment;
    }>;
    listAbsences: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      personId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: OracleHcmListResponse<Absence>;
    }>;
    getAbsence: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      absenceEntryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeMetadataLinks: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Absence;
    }>;
    createAbsence: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      personId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      absenceTypeId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      legalEntityId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      absenceDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          endDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          duration: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          unitOfMeasure: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          absenceReason: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          absenceStatusCd: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          comments: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Absence;
    }>;
    updateAbsence: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      absenceEntryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
      personId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      absenceTypeId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      legalEntityId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      absenceDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          startDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          endDate: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          duration: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          unitOfMeasure: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          absenceReason: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          absenceStatusCd: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          comments: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Absence;
    }>;
    deleteAbsence: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      absenceEntryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        id: string;
        status: string;
      };
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2ClientCredentials";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
      clientId: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
      clientSecret: {
        label: string;
        type: "password";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: false;
        shown: boolean;
        default: string;
        comments: string;
        placeholder: string;
        example: string;
      };
      serverUrl: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
    };
  }, "oauth2ClientCredentials"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "basicAuth";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      serverUrl: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
      username: {
        label: string;
        type: "string";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
        example: string;
      };
      password: {
        label: string;
        type: "password";
        required: true;
        shown: boolean;
        comments: string;
        placeholder: string;
      };
    };
  }, "basicAuth">)[];
  dataSources: {
    selectJob: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDepartment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLocation: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectGrade: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPosition: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPersonId: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      usePublicWorkers: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      effectiveDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      feedName: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    pollRecordsTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;