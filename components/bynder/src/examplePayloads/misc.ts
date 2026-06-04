






export const getAccountInformationResponse = {
  availableLanguages: [
    "nl_NL",
    "en_GB",
    "en_US",
    "fr_FR",
    "de_DE",
    "it_IT",
    "es_ES",
    "pl_PL",
  ],
  defaultLanguage: "en_US",
  name: "Bynder",
  timeZone: "Europe/Amsterdam",
  isOpenImageBank: false,
};

export const listBrandsResponse = [
  {
    image:
      "https://d2csxpduxe849s.cloudfront.net/media/example/brands/brand-portal-logo.png",
    name: "Bynder Brand Portal",
    id: "A1B2C3D4-E5F6-7890-A1B2C3D4E5F67890",
    description: "",
    subBrands: [
      {
        id: "B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901",
        description: "",
        name: "Sub Portal One",
        image: "",
      },
      {
        id: "C3D4E5F6-A7B8-9012-C3D4E5F6A7B89012",
        description: "",
        name: "Sub Portal Two",
        image: "",
      },
    ],
  },
  {
    image:
      "https://d2csxpduxe849s.cloudfront.net/media/example/brands/secondary-brand-logo.png",
    name: "Byndy Brand Portal",
    id: "D4E5F6A7-B8C9-0123-D4E5F6A7B8C90123",
    description: "",
    subBrands: [],
  },
];

export const listMetapropertiesResponse = {
  Colours: {
    isMultiselect: 0,
    isMultifilter: 0,
    isRequired: 0,
    isMainfilter: 1,
    isFilterable: 1,
    isApiField: 1,
    isDisplayField: 0,
    isDrilldown: 0,
    isEditable: 1,
    name: "colours",
    label: "Colours",
    zindex: 16,
    id: "A1B2C3D4-E5F6-7890-A1B2C3D4E5F67890",
    type: "sidebar",
    showInListView: 1,
    showInGridView: 0,
    showInDuplicateView: 0,
    useDependencies: 0,
    options: [
      {
        displayLabel: "Yellow",
        date: "February, 15 2017 14:54:58 +0000",
        pregeneratedZipFileSize: 0,
        linkedOptionIds: [],
        isSelectable: 1,
        zindex: 1,
        product_suffix: "",
        name: "yellow",
        id: "B2C3D4E5-F6A7-8901-B2C3D4E5F6A78901",
        active: 1,
        label: "Yellow",
        labels: {
          nl_NL: "Geel",
          en_US: "Yellow",
        },
        descriptions: {},
        description: "",
        hideByDefault: 0,
        image:
          "https://d2csxpduxe849s.cloudfront.net/media/example/metaproperties/yellow-swatch.png",
      },
      {
        displayLabel: "Red",
        date: "February, 15 2017 15:50:55 +0000",
        pregeneratedZipFileSize: 0,
        linkedOptionIds: [],
        isSelectable: 1,
        zindex: 1,
        product_suffix: "",
        name: "red",
        id: "C3D4E5F6-A7B8-9012-C3D4E5F6A7B89012",
        active: 1,
        label: "Red",
        labels: {
          nl_NL: "Rood",
          en_US: "Red",
        },
        descriptions: {},
        description: "",
        hideByDefault: 0,
        image:
          "https://d2csxpduxe849s.cloudfront.net/media/example/metaproperties/red-swatch.png",
      },
    ],
  },
  Bob_button: {
    isMultiselect: 0,
    isMultifilter: 0,
    isRequired: 0,
    isMainfilter: 1,
    isFilterable: 1,
    isApiField: 1,
    isDisplayField: 0,
    isDrilldown: 0,
    isEditable: 1,
    name: "Bob_button",
    label: "Bob_button",
    zindex: 2,
    id: "D4E5F6A7-B8C9-0123-D4E5F6A7B8C90123",
    type: "button",
    showInListView: 1,
    showInGridView: 0,
    showInDuplicateView: 0,
    useDependencies: 0,
    options: [],
  },
};
