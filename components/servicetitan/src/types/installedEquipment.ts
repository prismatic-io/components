export interface InstalledEquipment {
  id: number;
  equipmentId: number;
  locationId: number;
  customerId: number;
  invoiceItemId: number;
  name: string;
  installedOn: string;
  createdOn: string;
  modifiedOn: string;
  serialNumber: string;
  memo: string;
  manufacturer: string;
  model: string;
  cost: number;
  manufacturerWarrantyStart: string;
  manufacturerWarrantyEnd: string;
  serviceProviderWarrantyStart: string;
  serviceProviderWarrantyEnd: string;
  tags: Tag[];
}
interface Tag {
  id: number;
  ownerId: number;
  typeId: number;
  typeName: string;
  memo: string;
  color: string;
  textColor: string;
  code: string;
}
