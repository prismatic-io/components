import bill from "./bill";
import customer from "./customer";
import invoice from "./invoice";
import misc from "./misc";
import vendor from "./vendor";

export default { ...customer, ...invoice, ...vendor, ...bill, ...misc };
