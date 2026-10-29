import assets from "./assets";
import configurationItems from "./configurationItems";
import problemNote from "./problemNotes";
import problem from "./problems";
import problemTask from "./problemTasks";
import products from "./products";
import productTypes from "./productTypes";
import rawRequest from "./rawRequest";
import requests from "./requests";
import requestTasks from "./requestTasks";

export default {
  ...assets,
  ...configurationItems,
  ...products,
  ...productTypes,
  ...problem,
  ...problemNote,
  ...problemTask,
  ...requests,
  ...requestTasks,
  rawRequest,
};
