import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import {
  createBrand,
  createBrandImage,
  deleteBrand,
  deleteBrandImage,
  getBrand,
  listBrands,
  updateBrand,
} from "./actions/brands";
import { getCatalogSummaryAction } from "./actions/catalog";
import {
  createCategory,
  createCategoryImage,
  deleteCategories,
  deleteCategoryImage,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./actions/categories";
import {
  createCategoryTree,
  deleteCategoriesTree,
  deleteCategoryTrees,
  getAllCategoriesSimple,
  getAllCategoryTrees,
  getCategoryTree,
  updateCategories,
  upsertCategoryTrees,
} from "./actions/categoryTrees";
import {
  createCustomField,
  deleteCustomField,
  getProductCustomFields,
  updateCustomField,
} from "./actions/customFields";
import { rawRequest } from "./actions/misc";
import {
  createProductImageAction,
  deleteProductImageAction,
  getAllProductImages,
  getProductImage,
  updateProductImageAction,
} from "./actions/productImages";
import {
  createModifierImageAction,
  createProductModifierAction,
  deleteProductModifierAction,
  getAllProductModifiersAction,
  getModifierAction,
  updateProductModifierAction,
} from "./actions/productModifiers";
import {
  createProductVariantAction,
  createVariantImageAction,
  deleteProductVariantAction,
  getAllProductVariantsAction,
  getProductVariantAction,
  updateProductVariantAction,
} from "./actions/productVariants";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  updateProductsBatch,
} from "./actions/products";
import {
  createWebhookAction,
  deleteInstancedWebhooksAction,
  deleteWebhookAction,
  getWebhooksAction,
  updateWebhookAction,
} from "./actions/webhooks";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "bigcommerce",
  documentationUrl: "https://prismatic.io/docs/components/bigcommerce/",
  public: true,
  display: {
    label: "BigCommerce",
    description:
      "Manage products, brands, categories, and more on the BigCommerce ecommerce platform.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions: {
    listBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    createBrandImage,
    deleteBrandImage,
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategories,
    createCategoryImage,
    deleteCategoryImage,
    getAllCategoryTrees,
    getCategoryTree,
    upsertCategoryTrees,
    deleteCategoryTrees,
    getAllCategoriesSimple,
    createCategoryTree,
    updateCategories,
    deleteCategoriesTree,
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductsBatch,
    getProductCustomFields,
    createCustomField,
    updateCustomField,
    deleteCustomField,
    getAllProductImages,
    getProductImage,
    createProductImageAction,
    updateProductImageAction,
    deleteProductImageAction,
    getCatalogSummaryAction,
    getAllProductModifiersAction,
    getModifierAction,
    createProductModifierAction,
    updateProductModifierAction,
    deleteProductModifierAction,
    createModifierImageAction,
    getAllProductVariantsAction,
    getProductVariantAction,
    createProductVariantAction,
    updateProductVariantAction,
    deleteProductVariantAction,
    createVariantImageAction,
    getWebhooksAction,
    createWebhookAction,
    updateWebhookAction,
    deleteWebhookAction,
    deleteInstancedWebhooksAction,
    rawRequest,
  },
  triggers,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
