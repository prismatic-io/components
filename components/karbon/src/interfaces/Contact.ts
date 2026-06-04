export interface Contact {
  "@odata.type": "#KarbonService.ContactSummaryDTO";
  ContactKey: string;
  FullName: string;
  PreferredName: string;
  Salutation: string;
  ClientOwner: string;
  ClientManager: string;
  Address: string;
  EmailAddress: string | null;
  PhoneNumber: string;
  RoleOrTitle: string;
  UserDefinedIdentifier: string;
  LastModifiedDateTime: string;
}
