export interface CustomField {
  id: string;
  name: string;
  type_config?: {
    options: {
      id: string;
      name: string;
    }[];
  };
}
export interface Task {
  id: string;
  name: string;
}
export interface Calendar {
  id: string;
  name: string;
  type?: string;
}
interface NamedResource {
  id: string;
  name: string;
}
export interface GetAuthorizedTeamsResponse {
  teams: NamedResource[];
}
export interface GetSpacesResponse {
  spaces: NamedResource[];
}
export interface GetFoldersResponse {
  folders: NamedResource[];
}
export interface GetListsResponse {
  lists: NamedResource[];
}
export interface GetAccessibleCustomFieldsResponse {
  fields: CustomField[];
}
export interface GetTasksResponse {
  tasks: Task[];
}
export interface GetSpaceViewsResponse {
  views: Calendar[];
}
