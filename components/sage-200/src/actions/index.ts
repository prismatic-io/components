import customer from "./customer";
import customerContact from "./customerContact";
import customerDeliveryAddress from "./customerDeliveryAddress";
import customerPriceBand from "./customerPriceBand";
import misc from "./misc";
import priceBand from "./priceBand";
import pricingSourceType from "./pricingSourceType";
import pricingType from "./pricingType";
import product from "./product";
import productGroups from "./productGroups";
import productPriceViews from "./productPriceViews";
import salesInvoice from "./salesInvoice";
import salesOrder from "./salesOrder";
import taxCode from "./taxCode";

export default {
  ...customer,
  ...customerDeliveryAddress,
  ...customerContact,
  ...product,
  ...productGroups,
  ...customerPriceBand,
  ...priceBand,
  ...misc,
  ...salesOrder,
  ...taxCode,
  ...salesInvoice,
  ...productPriceViews,
  ...pricingSourceType,
  ...pricingType,
};
