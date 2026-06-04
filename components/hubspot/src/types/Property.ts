export interface Property {
  id: string;
  name: string;
  label: string;
  type: string;
  fieldType: string;
  description: string;
  groupName: string;
  options: {
    label: string;
    value: string;
  }[];
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}
