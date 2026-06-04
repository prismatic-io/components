export interface Model {
  id: string;
  object: string;
  owned_by: string;
}

export interface ListModelsResponse {
  data: Model[];
  object: string;
}
