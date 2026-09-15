interface Tag {
  id: number;
  ownerId: number;
  typeId: number;
  typeName: string | null;
  memo: string | null;
  color: string | null;
  textColor: string | null;
  code: string | null;
}
export interface InstalledEquipment {
  id: number;
  equipmentId: number | null;
  locationId: number;
  customerId: number;
  invoiceItemId: number | null;
  name: string;
  installedOn: string | null;
  createdOn: string;
  modifiedOn: string;
  serialNumber: string;
  memo: string;
  manufacturer: string;
  model: string;
  cost: number;
  manufacturerWarrantyStart: string | null;
  manufacturerWarrantyEnd: string | null;
  serviceProviderWarrantyStart: string | null;
  serviceProviderWarrantyEnd: string | null;
  tags: Tag[] | null;
}
