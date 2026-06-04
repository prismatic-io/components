import { connection } from "../common";
import {
  cfAllUsers,
  cfAssets,
  cfDateOfJoining,
  cfDepartment,
  cfEmployeeName,
  cfHierarchy,
  cfJobTitle,
  cfLocation,
  cfVerified,
  onboardingAdditionalFields,
} from "./common";

export const createOnboardingRequestInputs = {
  connection,
  cfEmployeeName,
  cfJobTitle,
  cfDateOfJoining,
  cfAllUsers,
  cfDepartment,
  cfAssets,
  cfLocation,
  cfHierarchy,
  cfVerified,
  onboardingAdditionalFields,
};
