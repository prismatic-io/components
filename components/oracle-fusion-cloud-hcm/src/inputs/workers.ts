import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanString } from "../util/transforms";
import {
  connection,
  effectiveDate,
  expand,
  fetchAll,
  includeMetadataLinks,
  pagination,
  personId,
} from "./common";
const NameType = input({
  label: "Name Type",
  type: "string",
  required: false,
  default: "GLOBAL",
  comments:
    "The type of name (e.g. GLOBAL). Required by Oracle when creating a worker name.",
  placeholder: "Enter name type",
  example: "GLOBAL",
  clean: cleanString,
});
const LastName = input({
  label: "Last Name",
  type: "string",
  required: false,
  comments:
    "The worker's last name. Required by Oracle when creating a worker.",
  placeholder: "Enter last name",
  example: "Smith",
  clean: cleanString,
});
const LegislationCode = input({
  label: "Legislation Code",
  type: "string",
  required: false,
  comments:
    "The legislation (country) code the name applies to (e.g. US). Required by Oracle when creating a worker.",
  placeholder: "Enter legislation code",
  example: "US",
  clean: cleanString,
});
const FirstName = input({
  label: "First Name",
  type: "string",
  required: false,
  comments: "The worker's first name.",
  placeholder: "Enter first name",
  example: "Jane",
  clean: cleanString,
});
const MiddleNames = input({
  label: "Middle Names",
  type: "string",
  required: false,
  comments: "The worker's middle name(s).",
  placeholder: "Enter middle names",
  example: "Marie",
  clean: cleanString,
});
const Title = input({
  label: "Title",
  type: "string",
  required: false,
  comments: "The worker's title (e.g. Ms., Dr.).",
  placeholder: "Enter title",
  example: "Ms.",
  clean: cleanString,
});
const PersonNumber = input({
  label: "Person Number",
  type: "string",
  required: false,
  comments:
    "The business key for the worker. Leave blank to let Oracle auto-generate it.",
  placeholder: "Enter person number",
  example: "100000012345678",
  clean: cleanString,
});
const ApplicantNumber = input({
  label: "Applicant Number",
  type: "string",
  required: false,
  comments: "The applicant number for the worker.",
  placeholder: "Enter applicant number",
  example: "955160008186257",
  clean: cleanString,
});
const DateOfBirth = input({
  label: "Date of Birth",
  type: "string",
  required: false,
  comments: "The worker's date of birth, in YYYY-MM-DD format.",
  placeholder: "Enter date of birth (YYYY-MM-DD)",
  example: "1990-01-15",
  clean: cleanString,
});
const DateOfDeath = input({
  label: "Date of Death",
  type: "string",
  required: false,
  comments: "The worker's date of death, in YYYY-MM-DD format.",
  placeholder: "Enter date of death (YYYY-MM-DD)",
  example: "2024-01-15",
  clean: cleanString,
});
const CountryOfBirth = input({
  label: "Country of Birth",
  type: "string",
  required: false,
  comments: "The country where the worker was born.",
  placeholder: "Enter country of birth",
  example: "US",
  clean: cleanString,
});
const RegionOfBirth = input({
  label: "Region of Birth",
  type: "string",
  required: false,
  comments: "The region where the worker was born.",
  placeholder: "Enter region of birth",
  example: "California",
  clean: cleanString,
});
const TownOfBirth = input({
  label: "Town of Birth",
  type: "string",
  required: false,
  comments: "The town where the worker was born.",
  placeholder: "Enter town of birth",
  example: "San Francisco",
  clean: cleanString,
});
const BloodType = input({
  label: "Blood Type",
  type: "string",
  required: false,
  comments: "The worker's blood type.",
  placeholder: "Enter blood type",
  example: "A+",
  clean: cleanString,
});
const CorrespondenceLanguage = input({
  label: "Correspondence Language",
  type: "string",
  required: false,
  comments: "The worker's preferred correspondence language.",
  placeholder: "Enter correspondence language",
  example: "en",
  clean: cleanString,
});
const workerInfo = structuredObjectInput({
  label: "Worker Information",
  required: false,
  comments: "Biographical details for the worker.",
  inputs: {
    DateOfBirth,
    DateOfDeath,
    CountryOfBirth,
    RegionOfBirth,
    TownOfBirth,
    BloodType,
    CorrespondenceLanguage,
  },
});
const AddressLine1 = input({
  label: "Street Address",
  type: "string",
  required: false,
  comments: "The first line of the worker's address.",
  placeholder: "Enter street address",
  example: "123 Main St",
  clean: cleanString,
});
const AddressLine2 = input({
  label: "Street Address Line 2",
  type: "string",
  required: false,
  comments: "The second line of the worker's address.",
  placeholder: "Enter street address line 2",
  example: "Suite 400",
  clean: cleanString,
});
const TownOrCity = input({
  label: "City",
  type: "string",
  required: false,
  comments: "The city of the worker's address.",
  placeholder: "Enter city",
  example: "San Francisco",
  clean: cleanString,
});
const Region1 = input({
  label: "State/Province",
  type: "string",
  required: false,
  comments: "The state or region of the worker's address.",
  placeholder: "Enter state or region",
  example: "CA",
  clean: cleanString,
});
const PostalCode = input({
  label: "Zip/Postal Code",
  type: "string",
  required: false,
  comments: "The postal code of the worker's address.",
  placeholder: "Enter zip or postal code",
  example: "94105",
  clean: cleanString,
});
const Country = input({
  label: "Country",
  type: "string",
  required: false,
  comments: "The country code of the worker's address.",
  placeholder: "Enter country code",
  example: "US",
  clean: cleanString,
});
const addresses = structuredObjectInput({
  label: "Addresses",
  collection: "valuelist",
  required: false,
  comments: "The worker's mailing address(es). Add a row per address.",
  inputs: {
    AddressLine1,
    AddressLine2,
    TownOrCity,
    Region1,
    PostalCode,
    Country,
  },
});
const EmailType = input({
  label: "Email Type",
  type: "string",
  required: false,
  comments:
    "The type of email (e.g. W1 for work). Required by Oracle when adding an email.",
  placeholder: "Enter email type",
  example: "W1",
  clean: cleanString,
});
const EmailAddress = input({
  label: "Email Address",
  type: "string",
  required: false,
  comments: "The email address. Required by Oracle when adding an email.",
  placeholder: "Enter email address",
  example: "jane.smith@example.com",
  clean: cleanString,
});
const EmailPrimaryFlag = input({
  label: "Is Primary",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, marks this as the worker's primary email.",
  clean: util.types.toBool,
});
const emails = structuredObjectInput({
  label: "Emails",
  collection: "valuelist",
  required: false,
  comments: "The worker's email address(es). Add a row per email.",
  inputs: {
    EmailType,
    EmailAddress,
    PrimaryFlag: EmailPrimaryFlag,
  },
});
const PhoneType = input({
  label: "Phone Type",
  type: "string",
  required: false,
  comments:
    "The type of phone (e.g. W1 for work). Required by Oracle when adding a phone.",
  placeholder: "Enter phone type",
  example: "W1",
  clean: cleanString,
});
const PhoneNumber = input({
  label: "Phone Number",
  type: "string",
  required: false,
  comments: "The phone number. Required by Oracle when adding a phone.",
  placeholder: "Enter phone number",
  example: "555-0100",
  clean: cleanString,
});
const CountryCodeNumber = input({
  label: "Country Code",
  type: "string",
  required: false,
  comments: "The country dialing code for the phone.",
  placeholder: "Enter country code",
  example: "1",
  clean: cleanString,
});
const AreaCode = input({
  label: "Area Code",
  type: "string",
  required: false,
  comments: "The area code for the phone.",
  placeholder: "Enter area code",
  example: "415",
  clean: cleanString,
});
const Extension = input({
  label: "Extension",
  type: "string",
  required: false,
  comments: "The phone extension.",
  placeholder: "Enter extension",
  example: "1234",
  clean: cleanString,
});
const phones = structuredObjectInput({
  label: "Phones",
  collection: "valuelist",
  required: false,
  comments: "The worker's phone number(s). Add a row per phone.",
  inputs: {
    PhoneType,
    PhoneNumber,
    CountryCodeNumber,
    AreaCode,
    Extension,
  },
});
const NationalIdentifierType = input({
  label: "National Identifier Type",
  type: "string",
  required: false,
  comments:
    "The type of national identifier (e.g. SSN). Required by Oracle when adding a national identifier.",
  placeholder: "Enter national identifier type",
  example: "SSN",
  clean: cleanString,
});
const NationalIdentifierNumber = input({
  label: "National Identifier Number",
  type: "string",
  required: false,
  comments:
    "The national identifier number. Required by Oracle when adding a national identifier.",
  placeholder: "Enter national identifier number",
  example: "555-55-5555",
  clean: cleanString,
});
const NationalIdentifierLegislationCode = input({
  label: "Legislation Code",
  type: "string",
  required: false,
  comments:
    "The legislation (country) code the identifier applies to. Required by Oracle when adding a national identifier.",
  placeholder: "Enter legislation code",
  example: "US",
  clean: cleanString,
});
const nationalIdentifiers = structuredObjectInput({
  label: "National Identifiers",
  collection: "valuelist",
  required: false,
  comments: "The worker's national identifier(s). Add a row per identifier.",
  inputs: {
    NationalIdentifierType,
    NationalIdentifierNumber,
    LegislationCode: NationalIdentifierLegislationCode,
  },
});
const LegalEntityId = input({
  label: "Legal Entity ID",
  type: "string",
  required: false,
  comments:
    "The legal entity (employer) the worker belongs to. Required to create a worker.",
  placeholder: "Enter legal entity ID",
  example: "300100000000001",
  clean: cleanString,
});
const StartDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  comments:
    "The worker's start date, in YYYY-MM-DD format. Required to create a worker.",
  placeholder: "Enter start date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: cleanString,
});
const WorkerType = input({
  label: "Worker Type",
  type: "string",
  required: false,
  comments:
    "The worker type. Required to create a worker. Oracle's standard codes are E (Employee), C (Contingent Worker), P (Pending Worker), and N (Nonworker); valid values are defined in the Oracle HCM tenant's lookup.",
  placeholder: "Enter worker type",
  example: "E",
  clean: cleanString,
});
const LegalEmployerName = input({
  label: "Legal Employer Name",
  type: "string",
  required: false,
  comments: "The name of the legal employer the worker is employed by.",
  placeholder: "Enter legal employer name",
  example: "Acme Corporation",
  clean: cleanString,
});
const WorkerNumber = input({
  label: "Worker Number",
  type: "string",
  required: false,
  comments: "The worker number. Leave blank to let Oracle auto-generate it.",
  placeholder: "Enter worker number",
  example: "100000012345678",
  clean: cleanString,
});
const WorkRelationshipPrimaryFlag = input({
  label: "Is Primary",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, marks this as the worker's primary work relationship.",
  clean: util.types.toBool,
});
const EnterpriseSeniorityDate = input({
  label: "Enterprise Seniority Date",
  type: "string",
  required: false,
  comments: "The enterprise seniority date, in YYYY-MM-DD format.",
  placeholder: "Enter enterprise seniority date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: cleanString,
});
const LegalEmployerSeniorityDate = input({
  label: "Legal Employer Seniority Date",
  type: "string",
  required: false,
  comments: "The legal employer seniority date, in YYYY-MM-DD format.",
  placeholder: "Enter legal employer seniority date (YYYY-MM-DD)",
  example: "2024-01-01",
  clean: cleanString,
});
const ProjectedTerminationDate = input({
  label: "Projected Termination Date",
  type: "string",
  required: false,
  comments: "The projected termination date, in YYYY-MM-DD format.",
  placeholder: "Enter projected termination date (YYYY-MM-DD)",
  example: "2025-12-31",
  clean: cleanString,
});
const workRelationshipChildren = {
  LegalEntityId,
  StartDate,
  WorkerType,
  LegalEmployerName,
  WorkerNumber,
  PrimaryFlag: WorkRelationshipPrimaryFlag,
  EnterpriseSeniorityDate,
  LegalEmployerSeniorityDate,
  ProjectedTerminationDate,
};
const createWorkRelationships = structuredObjectInput({
  label: "Work Relationships",
  collection: "valuelist",
  required: false,
  comments:
    "The worker's work relationship(s) with a legal employer. Add a row per relationship.",
  inputs: {
    ...workRelationshipChildren,
    LegalEntityId: { ...LegalEntityId, required: true },
    StartDate: { ...StartDate, required: true },
    WorkerType: { ...WorkerType, required: true },
  },
});
const updateWorkRelationships = structuredObjectInput({
  label: "Work Relationships",
  collection: "valuelist",
  required: false,
  comments:
    "The worker's work relationship(s) with a legal employer. Add a row per relationship.",
  inputs: workRelationshipChildren,
});
const workerPersonId = { ...personId, dataSource: "selectPersonId" };
export const createWorkerInputs = {
  connection,
  NameType: { ...NameType, required: true },
  LegislationCode: { ...LegislationCode, required: true },
  LastName: { ...LastName, required: true },
  FirstName,
  MiddleNames,
  Title,
  PersonNumber,
  ApplicantNumber,
  workerInfo,
  addresses,
  phones,
  emails,
  nationalIdentifiers,
  workRelationships: createWorkRelationships,
};
export const getPublicWorkerInputs = {
  connection,
  personId,
  expand,
  includeMetadataLinks,
};
export const listPublicWorkersInputs = {
  connection,
  fetchAll,
  pagination,
  effectiveDate,
  expand,
  includeMetadataLinks,
};
export const getWorkerInputs = {
  connection,
  personId: workerPersonId,
  expand,
  includeMetadataLinks,
};
export const listWorkersInputs = {
  connection,
  fetchAll,
  pagination,
  effectiveDate,
  expand,
  includeMetadataLinks,
};
export const updateWorkerInputs = {
  connection,
  personId: workerPersonId,
  NameType,
  LegislationCode,
  FirstName,
  LastName,
  MiddleNames,
  Title,
  PersonNumber,
  ApplicantNumber,
  workerInfo,
  addresses,
  phones,
  emails,
  nationalIdentifiers,
  workRelationships: updateWorkRelationships,
};
