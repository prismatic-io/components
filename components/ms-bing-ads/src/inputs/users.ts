import { input, util } from "@prismatic-io/spectral";
import { cleanModelValue, cleanStringArray } from "../util";
import { connectionInput, customerIdInput } from "./common";

const accountIdsInput = input({
  label: "Account ID",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An array of identifiers of the accounts that the user can manage. To specify that the user can manage all current and future accounts of the customer to which the user belongs, set to NULL.",
  clean: cleanStringArray,
});

const emailInput = input({
  label: "Email",
  placeholder: "Enter email address",
  type: "string",
  required: true,
  comments:
    "The email address corresponding to the user's Microsoft account. The address can contain a maximum of 100 characters.",
  example: "john.doe@example.com",
  clean: util.types.toString,
});

const firstNameInput = input({
  label: "First Name",
  placeholder: "Enter first name",
  type: "string",
  required: true,
  comments:
    "The first name of the user. The first name is limited to 40 characters.",
  example: "John",
  clean: util.types.toString,
});

const lastNameInput = input({
  label: "Last Name",
  placeholder: "Enter last name",
  type: "string",
  required: true,
  comments:
    "The last name of the user. The last name is limited to 40 characters.",
  example: "Doe",
  clean: util.types.toString,
});

const lcidModel = [
  { label: "Arabic Algeria", value: "ArabicAlgeria" },
  { label: "Arabic Bahrain", value: "ArabicBahrain" },
  { label: "Arabic Egypt", value: "ArabicEgypt" },
  { label: "Arabic Iraq", value: "ArabicIraq" },
  { label: "Arabic Jordan", value: "ArabicJordan" },
  { label: "Arabic Kuwait", value: "ArabicKuwait" },
  { label: "Arabic Lebanon", value: "ArabicLebanon" },
  { label: "Arabic Libya", value: "ArabicLibya" },
  { label: "Arabic Morocco", value: "ArabicMorocco" },
  { label: "Arabic Oman", value: "ArabicOman" },
  { label: "Arabic Qatar", value: "ArabicQatar" },
  { label: "Arabic SaudiArabia", value: "ArabicSaudiArabia" },
  { label: "Arabic Tunisia", value: "ArabicTunisia" },
  { label: "Arabic UnitedArabEmirates", value: "ArabicUnitedArabEmirates" },
  { label: "Arabic Yemen", value: "ArabicYemen" },
  { label: "Chinese Hong Kong", value: "ChineseHongKong" },
  { label: "Chinese Taiwan", value: "ChineseTaiwan" },
  { label: "Danish Denmark", value: "DanishDenmark" },
  { label: "Dutch Netherlands", value: "DutchNetherlands" },
  { label: "English Australia", value: "EnglishAustralia" },
  { label: "English Canada", value: "EnglishCanada" },
  { label: "English India", value: "EnglishIndia" },
  { label: "English Indonesia", value: "EnglishIndonesia" },
  { label: "English Ireland", value: "EnglishIreland" },
  { label: "English Malaysia", value: "EnglishMalaysia" },
  { label: "English NewZealand", value: "EnglishNewZealand" },
  { label: "English Philippines", value: "EnglishPhilippines" },
  { label: "English Singapore", value: "EnglishSingapore" },
  { label: "English Thailand", value: "EnglishThailand" },
  { label: "English UK", value: "EnglishUK" },
  { label: "English US", value: "EnglishUS" },
  { label: "English Vietnam", value: "EnglishVietnam" },
  { label: "Finnish Finland", value: "FinnishFinland" },
  { label: "French Canada", value: "FrenchCanada" },
  { label: "French France", value: "FrenchFrance" },
  { label: "German Austria", value: "GermanAustria" },
  { label: "German Germany", value: "GermanGermany" },
  { label: "German Switzerland", value: "GermanSwitzerland" },
  { label: "Hebrew Israel", value: "HebrewIsrael" },
  { label: "Italian Italy", value: "ItalianItaly" },
  { label: "Japanese Japan", value: "JapaneseJapan" },
  { label: "Korean Korea", value: "KoreanKorea" },
  { label: "Norwegian Norway", value: "NorwegianNorway" },
  { label: "Portuguese Brazil", value: "PortugueseBrazil" },
  { label: "Russian Russia", value: "RussianRussia" },
  { label: "Spanish Argentina", value: "SpanishArgentina" },
  { label: "Spanish Chile", value: "SpanishChile" },
  { label: "Spanish Colombia", value: "SpanishColombia" },
  { label: "Spanish Mexico", value: "SpanishMexico" },
  { label: "Spanish Peru", value: "SpanishPeru" },
  { label: "Spanish Spain", value: "SpanishSpain" },
  { label: "Spanish Venezuela", value: "SpanishVenezuela" },
  { label: "Swedish Sweden", value: "SwedishSweden" },
];

const lcidInput = input({
  label: "LCID",
  type: "string",
  required: true,
  default: "EnglishUS",
  comments:
    "The locale to use when sending correspondence to the user by email or postal mail.",
  model: lcidModel,
  clean: cleanModelValue(lcidModel, "lcid", { allowEmpty: true }),
});

const roleIdModel = [
  { label: "Advertiser Campaign Manager", value: "16" },
  { label: "Aggregator", value: "33" },
  { label: "Super Admin", value: "41" },
  { label: "Viewer", value: "100" },
  { label: "Standard User", value: "203" },
];

const roleIdInput = input({
  label: "Role ID",
  comments: "The role that the user has for each customer or list of accounts.",
  type: "string",
  model: roleIdModel,
  required: true,
  clean: cleanModelValue(roleIdModel, "role id", { allowEmpty: true }),
});

export const sendUserInvitationInputs = {
  accountIds: accountIdsInput,
  connection: connectionInput,
  customerId: {
    ...customerIdInput,
    required: true,
    comments:
      "The identifier of the customer this user is invited to manage. The AccountIds element determines which customer accounts the user can manage.",
  },
  email: emailInput,
  firstName: firstNameInput,
  lastName: lastNameInput,
  lcid: lcidInput,
  roleId: roleIdInput,
};
