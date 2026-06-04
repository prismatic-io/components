import { type Address } from "./Address";
import { type ContactGroup } from "./ContactGroup";
import { type ContactPerson } from "./ContactPerson";
import { type Phone } from "./Phone";

export interface Contact {
  ContactID: string;
  ContactStatus: string;
  Name: string;
  Addresses: Address[];
  Phones: Phone[];
  UpdatedDateUTC: string;
  ContactGroups: ContactGroup[];
  IsSupplier: boolean;
  IsCustomer: boolean;
  ContactPersons: ContactPerson[];
  HasAttachments: boolean;
  HasValidationErrors: boolean;
}
