




















export const listModelsExamplePayload = {
  data: [
    {
      id: 87,
      name: "Bank Accounts",
      model: "res.partner.bank",
      state: "base",
      modules: "account, base, l10n_us",
      display_name: "Bank Accounts",
    },
    {
      id: 85,
      name: "Industry",
      model: "res.partner.industry",
      state: "base",
      modules: "base",
      display_name: "Industry",
    },
  ],
};

export const listModelFieldsExamplePayload = {
  data: {
    is_seo_optimized: {
      type: "boolean",
      change_default: false,
      company_dependent: false,
      depends: [],
      manual: false,
      readonly: true,
      required: false,
      searchable: false,
      sortable: false,
      store: false,
      string: "SEO optimized",
      name: "is_seo_optimized",
    },
    website_meta_title: {
      type: "char",
      change_default: false,
      company_dependent: false,
      depends: [],
      manual: false,
      readonly: false,
      required: false,
      searchable: true,
      sortable: true,
      store: true,
      string: "Website meta title",
      translate: true,
      trim: true,
      name: "website_meta_title",
    },
  },
};
