import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import {
  createProductCategory,
  deleteProductCategory,
  getProductCategory,
  listProductCategories,
} from "./actions/categories";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  listCustomers,
  updateCustomer,
} from "./actions/customers";
import {
  createOrder,
  deleteOrder,
  getOrder,
  listOrders,
} from "./actions/orders";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "./actions/products";
import { rawRequest } from "./actions/rawRequest";
import {
  createRefund,
  deleteRefund,
  getRefund,
  listRefunds,
} from "./actions/refunds";
import {
  getCouponTotalsReport,
  getCustomerTotalsReport,
  getOrderTotalsReport,
  getProductTotalsReport,
  getReviewTotalsReport,
  getSalesReport,
  getTopSellersReport,
  listReports,
} from "./actions/reports";
import connections from "./connections";
import dataSources from "./datasources";
import triggers from "./triggers";

export default component({
  key: "woo-commerce",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/woo-commerce/",
  display: {
    label: "WooCommerce",
    category: "Application Connectors",
    description:
      "Easily manage your customers, orders, and products in your WooCommerce platform",
    iconPath: "icon.png",
  },
  actions: {
    listCustomers,
    createCustomer,
    deleteCustomer,
    getCustomer,
    updateCustomer,
    rawRequest,
    createProduct,
    deleteProduct,
    getProduct,
    listProducts,
    updateProduct,
    getCouponTotalsReport,
    getCustomerTotalsReport,
    getOrderTotalsReport,
    getProductTotalsReport,
    getReviewTotalsReport,
    getSalesReport,
    getTopSellersReport,
    listReports,
    deleteOrder,
    getOrder,
    listOrders,
    getRefund,
    listRefunds,
    createOrder,
    createProductCategory,
    deleteProductCategory,
    getProductCategory,
    listProductCategories,
    createRefund,
    deleteRefund,
  },
  dataSources,
  triggers,
  hooks: { error: handleErrors },
  connections,
});
