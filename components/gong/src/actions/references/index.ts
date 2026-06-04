import { deleteEmailAddressAndAssociatedElements } from "./deleteEmailAddressAndAssociatedElements";
import { deletePhoneNumberAndAssociatedElements } from "./deletePhoneNumberAndAssociatedElements";
import { getLogsDataByTypeAndTimeRange } from "./getLogsData";
import { listReferencesToAnEmailAddress } from "./listReferencesToAnEmailAddress";
import { listReferencesToAPhoneNumber } from "./listReferencesToAPhoneNumber";

export default {
  getLogsDataByTypeAndTimeRange,
  listReferencesToAPhoneNumber,
  listReferencesToAnEmailAddress,
  deleteEmailAddressAndAssociatedElements,
  deletePhoneNumberAndAssociatedElements,
};
