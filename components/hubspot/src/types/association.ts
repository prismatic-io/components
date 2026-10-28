export type AssociationCategory =
  | "HUBSPOT_DEFINED"
  | "INTEGRATOR_DEFINED"
  | "USER_DEFINED"
  | "WORK";
export interface AssociationTypeDefinition {
  category: AssociationCategory;
  typeId: number;
  label?: string | null;
}
export interface AssociationSpec {
  associationCategory: AssociationCategory;
  associationTypeId: number;
}
export interface AssociationTarget {
  toObjectId: string;
  associationTypes?: AssociationTypeDefinition[];
}
