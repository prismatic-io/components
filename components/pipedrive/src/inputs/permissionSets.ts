import {
  connectionInput,
  offsetPagination,
  permissionSetIdInput,
} from "./common";
export const getPermissionSetsInputs = {
  connection: connectionInput,
};
export const getPermissionSetInputs = {
  connection: connectionInput,
  id: permissionSetIdInput,
};
export const getPermissionSetAssignmentsInputs = {
  connection: connectionInput,
  id: permissionSetIdInput,
  pagination: offsetPagination,
};
