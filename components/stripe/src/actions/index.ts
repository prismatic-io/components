import accounts from "./accounts";
import balanceTransactions from "./balanceTransactions";
import cards from "./cards";
import charges from "./charges";
import checkoutSessions from "./checkoutSessions";
import customers from "./customers";
import disputes from "./disputes";
import invoices from "./invoices";
import misc from "./misc";
import paymentIntents from "./paymentIntents";
import prices from "./prices";
import products from "./products";
import subscriptions from "./subscriptions";
import webhooks from "./webhooks";

export default {
  ...accounts,
  ...balanceTransactions,
  ...cards,
  ...charges,
  ...checkoutSessions,
  ...customers,
  ...disputes,
  ...invoices,
  ...misc,
  ...paymentIntents,
  ...prices,
  ...products,
  ...subscriptions,
  ...webhooks,
};
