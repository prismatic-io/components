export interface CustomObjectSchema {
  objectTypeId?: string;
  name?: string;
  labels?: {
    singular?: string;
    plural?: string;
  };
}
