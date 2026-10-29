import { component } from "@prismatic-io/spectral";
import getListsInfo from "./actions/lists/getListsInfo";
import deleteList from "./actions/lists/deleteList";
import listCampaigns from "./actions/campaigns/listCampaigns";
import sendCampaign from "./actions/campaigns/sendCampaign";
import updateList from "./actions/lists/updateList";
import getList from "./actions/lists/getList";
import addList from "./actions/lists/addList";
import listStores from "./actions/e-commerce/listStores";
import getStore from "./actions/e-commerce/getStore";
import ping from "./actions/ping";
import addCustomer from "./actions/e-commerce/customers/addCustomer";
import deleteCustomer from "./actions/e-commerce/customers/deleteCustomer";
import listCustomers from "./actions/e-commerce/customers/listCustomers";
import updateCustomer from "./actions/e-commerce/customers/updateCustomer";
import deleteProduct from "./actions/e-commerce/products/deleteProduct";
import listProducts from "./actions/e-commerce/products/listProduct";
import getProductInfo from "./actions/e-commerce/products/getProductInfo";
import deleteOrder from "./actions/e-commerce/orders/deleteOrder";
import getOrderInfo from "./actions/e-commerce/orders/getOrderInfo";
import listAccountOrders from "./actions/e-commerce/orders/listAccountOrders";
import listOrders from "./actions/e-commerce/orders/listOrders";
import deleteOrderLineItem from "./actions/e-commerce/orderLines/deleteOrderLineItem";
import getOrderLineItem from "./actions/e-commerce/orderLines/getOrderLineItem";
import listOrderLineItems from "./actions/e-commerce/orderLines/listOrderLineItems";
import deleteCart from "./actions/e-commerce/carts/deleteCart";
import getCart from "./actions/e-commerce/carts/getCart";
import listCarts from "./actions/e-commerce/carts/listCarts";
import deleteCartLineItem from "./actions/e-commerce/cartLines/deleteCartLineItem";
import getCartLineItem from "./actions/e-commerce/cartLines/getCartLineItem";
import listCartLineItem from "./actions/e-commerce/cartLines/listCartLineItem";
import addMember from "./actions/lists/members/addMember";
import archiveMember from "./actions/lists/members/archiveMember";
import deleteMember from "./actions/lists/members/deleteMember";
import getMember from "./actions/lists/members/getMember";
import listMembers from "./actions/lists/members/listMembers";
import updateMember from "./actions/lists/members/updateMember";
import getCustomerInfo from "./actions/e-commerce/customers/getCustomerInfo";
import rawRequest from "./actions/rawRequest";
import webhookActions from "./actions/webhooks";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "mailchimp",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/mailchimp/",
  display: {
    category: "Application Connectors",
    label: "Mailchimp",
    description: "Interact with email campaign lists and e-commerce resources.",
    iconPath: "icon.png",
  },
  actions: {
    ping,
    listCampaigns,
    sendCampaign,
    getMember,
    deleteMember,
    updateMember,
    archiveMember,
    listMembers,
    addMember,
    deleteList,
    getListsInfo,
    addList,
    getList,
    updateList,
    listStores,
    getProductInfo,
    getStore,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    listCustomers,
    getCustomerInfo,
    listProducts,
    deleteProduct,
    listOrders,
    deleteOrder,
    getOrderInfo,
    listAccountOrders,
    deleteOrderLineItem,
    getOrderLineItem,
    listOrderLineItems,
    deleteCart,
    listCarts,
    getCart,
    deleteCartLineItem,
    getCartLineItem,
    listCartLineItem,
    rawRequest,
    ...webhookActions,
  },
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
