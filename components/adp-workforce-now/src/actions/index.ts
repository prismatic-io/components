import applicantOnboard from "./applicantOnboard";
import company from "./company";

import misc from "./misc";
import paymentDistribution from "./paymentDistribution";
import personalContact from "./personalContact";
import workers from "./workers";

export default {
  ...applicantOnboard,
  ...company,
  
  ...misc,
  ...paymentDistribution,
  ...personalContact,
  ...workers,
};
