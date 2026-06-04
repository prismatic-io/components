import organizationDataSources from "./organization";
import contactDataSources from "./contact";
import invoiceDataSources from "./invoice";
import userDataSources from "./user";
import workItemDataSources from "./workItem";

export default { ...organizationDataSources, ...contactDataSources, ...invoiceDataSources, ...userDataSources, ...workItemDataSources };
