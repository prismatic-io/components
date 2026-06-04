import type { TriggerPayload } from "@prismatic-io/spectral";

export const createProductsExamplePayload = {
  data: {
    id: 0,
    sku: "string",
    name: "string",
    attribute_set_id: 0,
    price: 0,
    status: 0,
    visibility: 0,
    type_id: "string",
    created_at: "string",
    updated_at: "string",
    weight: 0,
    extension_attributes: {
      website_ids: [0],
      category_links: [
        {
          position: 0,
          category_id: "string",
          extension_attributes: {},
        },
      ],
      discounts: [
        {
          discount_data: {
            amount: 0,
            base_amount: 0,
            original_amount: 0,
            base_original_amount: 0,
          },
          rule_label: "string",
          rule_id: 0,
        },
      ],
      bundle_product_options: [
        {
          option_id: 0,
          title: "string",
          required: true,
          type: "string",
          position: 0,
          sku: "string",
          product_links: [
            {
              id: "string",
              sku: "string",
              option_id: 0,
              qty: 0,
              position: 0,
              is_default: true,
              price: 0,
              price_type: 0,
              can_change_quantity: 0,
              extension_attributes: {},
            },
          ],
          extension_attributes: {},
        },
      ],
      stock_item: {
        item_id: 0,
        product_id: 0,
        stock_id: 0,
        qty: 0,
        is_in_stock: true,
        is_qty_decimal: true,
        show_default_notification_message: true,
        use_config_min_qty: true,
        min_qty: 0,
        use_config_min_sale_qty: 0,
        min_sale_qty: 0,
        use_config_max_sale_qty: true,
        max_sale_qty: 0,
        use_config_backorders: true,
        backorders: 0,
        use_config_notify_stock_qty: true,
        notify_stock_qty: 0,
        use_config_qty_increments: true,
        qty_increments: 0,
        use_config_enable_qty_inc: true,
        enable_qty_increments: true,
        use_config_manage_stock: true,
        manage_stock: true,
        low_stock_date: "string",
        is_decimal_divided: true,
        stock_status_changed_auto: 0,
        extension_attributes: {},
      },
      downloadable_product_links: [
        {
          id: 0,
          title: "string",
          sort_order: 0,
          is_shareable: 0,
          price: 0,
          number_of_downloads: 0,
          link_type: "string",
          link_file: "string",
          link_file_content: {
            file_data: "string",
            name: "string",
            extension_attributes: {},
          },
          link_url: "string",
          sample_type: "string",
          sample_file: "string",
          sample_file_content: {
            file_data: "string",
            name: "string",
            extension_attributes: {},
          },
          sample_url: "string",
          extension_attributes: {},
        },
      ],
      downloadable_product_samples: [
        {
          id: 0,
          title: "string",
          sort_order: 0,
          sample_type: "string",
          sample_file: "string",
          sample_file_content: {
            file_data: "string",
            name: "string",
            extension_attributes: {},
          },
          sample_url: "string",
          extension_attributes: {},
        },
      ],
      giftcard_amounts: [
        {
          attribute_id: 0,
          website_id: 0,
          value: 0,
          website_value: 0,
          extension_attributes: {},
        },
      ],
      configurable_product_options: [
        {
          id: 0,
          attribute_id: "string",
          label: "string",
          position: 0,
          is_use_default: true,
          values: [
            {
              value_index: 0,
              extension_attributes: {},
            },
          ],
          extension_attributes: {},
          product_id: 0,
        },
      ],
      configurable_product_links: [0],
    },
    product_links: [
      {
        sku: "string",
        link_type: "string",
        linked_product_sku: "string",
        linked_product_type: "string",
        position: 0,
        extension_attributes: {
          qty: 0,
        },
      },
    ],
    options: [
      {
        product_sku: "string",
        option_id: 0,
        title: "string",
        type: "string",
        sort_order: 0,
        is_require: true,
        price: 0,
        price_type: "string",
        sku: "string",
        file_extension: "string",
        max_characters: 0,
        image_size_x: 0,
        image_size_y: 0,
        values: [
          {
            title: "string",
            sort_order: 0,
            price: 0,
            price_type: "string",
            sku: "string",
            option_type_id: 0,
          },
        ],
        extension_attributes: {},
      },
    ],
    media_gallery_entries: [
      {
        id: 0,
        media_type: "string",
        label: "string",
        position: 0,
        disabled: true,
        types: ["string"],
        file: "string",
        content: {
          base64_encoded_data: "string",
          type: "string",
          name: "string",
        },
        extension_attributes: {
          video_content: {
            media_type: "string",
            video_provider: "string",
            video_url: "string",
            video_title: "string",
            video_description: "string",
            video_metadata: "string",
          },
        },
      },
    ],
    tier_prices: [
      {
        customer_group_id: 0,
        qty: 0,
        value: 0,
        extension_attributes: {
          percentage_value: 0,
          website_id: 0,
        },
      },
    ],
    custom_attributes: [
      {
        attribute_code: "string",
        value: "string",
      },
    ],
  },
};

export const listProductsExamplePayload = {
  data: {
    items: [
      {
        id: 0,
        sku: "string",
        name: "string",
        attribute_set_id: 0,
        price: 0,
        status: 0,
        visibility: 0,
        type_id: "string",
        created_at: "string",
        updated_at: "string",
        weight: 0,
        extension_attributes: {
          website_ids: [0],
          category_links: [
            {
              position: 0,
              category_id: "string",
              extension_attributes: {},
            },
          ],
          discounts: [
            {
              discount_data: {
                amount: 0,
                base_amount: 0,
                original_amount: 0,
                base_original_amount: 0,
              },
              rule_label: "string",
              rule_id: 0,
            },
          ],
          bundle_product_options: [
            {
              option_id: 0,
              title: "string",
              required: true,
              type: "string",
              position: 0,
              sku: "string",
              product_links: [
                {
                  id: null,
                  sku: null,
                  option_id: null,
                  qty: null,
                  position: null,
                  is_default: null,
                  price: null,
                  price_type: null,
                  can_change_quantity: null,
                  extension_attributes: null,
                },
              ],
              extension_attributes: {},
            },
          ],
          stock_item: {
            item_id: 0,
            product_id: 0,
            stock_id: 0,
            qty: 0,
            is_in_stock: true,
            is_qty_decimal: true,
            show_default_notification_message: true,
            use_config_min_qty: true,
            min_qty: 0,
            use_config_min_sale_qty: 0,
            min_sale_qty: 0,
            use_config_max_sale_qty: true,
            max_sale_qty: 0,
            use_config_backorders: true,
            backorders: 0,
            use_config_notify_stock_qty: true,
            notify_stock_qty: 0,
            use_config_qty_increments: true,
            qty_increments: 0,
            use_config_enable_qty_inc: true,
            enable_qty_increments: true,
            use_config_manage_stock: true,
            manage_stock: true,
            low_stock_date: "string",
            is_decimal_divided: true,
            stock_status_changed_auto: 0,
            extension_attributes: {},
          },
          downloadable_product_links: [
            {
              id: 0,
              title: "string",
              sort_order: 0,
              is_shareable: 0,
              price: 0,
              number_of_downloads: 0,
              link_type: "string",
              link_file: "string",
              link_file_content: {
                file_data: "string",
                name: "string",
                extension_attributes: {},
              },
              link_url: "string",
              sample_type: "string",
              sample_file: "string",
              sample_file_content: {
                file_data: "string",
                name: "string",
                extension_attributes: {},
              },
              sample_url: "string",
              extension_attributes: {},
            },
          ],
          downloadable_product_samples: [
            {
              id: 0,
              title: "string",
              sort_order: 0,
              sample_type: "string",
              sample_file: "string",
              sample_file_content: {
                file_data: "string",
                name: "string",
                extension_attributes: {},
              },
              sample_url: "string",
              extension_attributes: {},
            },
          ],
          giftcard_amounts: [
            {
              attribute_id: 0,
              website_id: 0,
              value: 0,
              website_value: 0,
              extension_attributes: {},
            },
          ],
          configurable_product_options: [
            {
              id: 0,
              attribute_id: "string",
              label: "string",
              position: 0,
              is_use_default: true,
              values: [
                {
                  value_index: null,
                  extension_attributes: null,
                },
              ],
              extension_attributes: {},
              product_id: 0,
            },
          ],
          configurable_product_links: [0],
        },
        product_links: [
          {
            sku: "string",
            link_type: "string",
            linked_product_sku: "string",
            linked_product_type: "string",
            position: 0,
            extension_attributes: {
              qty: 0,
            },
          },
        ],
        options: [
          {
            product_sku: "string",
            option_id: 0,
            title: "string",
            type: "string",
            sort_order: 0,
            is_require: true,
            price: 0,
            price_type: "string",
            sku: "string",
            file_extension: "string",
            max_characters: 0,
            image_size_x: 0,
            image_size_y: 0,
            values: [
              {
                title: "string",
                sort_order: 0,
                price: 0,
                price_type: "string",
                sku: "string",
                option_type_id: 0,
              },
            ],
            extension_attributes: {},
          },
        ],
        media_gallery_entries: [
          {
            id: 0,
            media_type: "string",
            label: "string",
            position: 0,
            disabled: true,
            types: ["string"],
            file: "string",
            content: {
              base64_encoded_data: "string",
              type: "string",
              name: "string",
            },
            extension_attributes: {
              video_content: {
                media_type: "string",
                video_provider: "string",
                video_url: "string",
                video_title: "string",
                video_description: "string",
                video_metadata: "string",
              },
            },
          },
        ],
        tier_prices: [
          {
            customer_group_id: 0,
            qty: 0,
            value: 0,
            extension_attributes: {
              percentage_value: 0,
              website_id: 0,
            },
          },
        ],
        custom_attributes: [
          {
            attribute_code: "string",
            value: "string",
          },
        ],
      },
    ],
    search_criteria: {
      filter_groups: [
        {
          filters: [
            {
              field: "string",
              value: "string",
              condition_type: "string",
            },
          ],
        },
      ],
      sort_orders: [
        {
          field: "string",
          direction: "string",
        },
      ],
      page_size: 0,
      current_page: 0,
    },
    total_count: 0,
  },
};

export const listProductAttributesExamplePayload = {
  data: {
    items: [
      {
        extension_attributes: {
          is_pagebuilder_enabled: true,
        },
        is_wysiwyg_enabled: true,
        is_html_allowed_on_front: true,
        used_for_sort_by: true,
        is_filterable: true,
        is_filterable_in_search: true,
        is_used_in_grid: true,
        is_visible_in_grid: true,
        is_filterable_in_grid: true,
        position: 0,
        apply_to: ["string"],
        is_searchable: "string",
        is_visible_in_advanced_search: "string",
        is_comparable: "string",
        is_used_for_promo_rules: "string",
        is_visible_on_front: "string",
        used_in_product_listing: "string",
        is_visible: true,
        scope: "string",
        attribute_id: 0,
        attribute_code: "string",
        frontend_input: "string",
        entity_type_id: "string",
        is_required: true,
        options: [
          {
            label: "string",
            value: "string",
            sort_order: 0,
            is_default: true,
            store_labels: [
              {
                store_id: 0,
                label: "string",
              },
            ],
          },
        ],
        is_user_defined: true,
        default_frontend_label: "string",
        frontend_labels: [
          {
            store_id: 0,
            label: "string",
          },
        ],
        note: "string",
        backend_type: "string",
        backend_model: "string",
        source_model: "string",
        default_value: "string",
        is_unique: "string",
        frontend_class: "string",
        validation_rules: [
          {
            key: "string",
            value: "string",
          },
        ],
        custom_attributes: [
          {
            attribute_code: "string",
            value: "string",
          },
        ],
      },
    ],
    search_criteria: {
      filter_groups: [
        {
          filters: [
            {
              field: "string",
              value: "string",
              condition_type: "string",
            },
          ],
        },
      ],
      sort_orders: [
        {
          field: "string",
          direction: "string",
        },
      ],
      page_size: 0,
      current_page: 0,
    },
    total_count: 0,
  },
};

export const createProductAttributesExamplePayload = {
  data: {
    extension_attributes: {
      is_pagebuilder_enabled: true,
    },
    is_wysiwyg_enabled: true,
    is_html_allowed_on_front: true,
    used_for_sort_by: true,
    is_filterable: true,
    is_filterable_in_search: true,
    is_used_in_grid: true,
    is_visible_in_grid: true,
    is_filterable_in_grid: true,
    position: 0,
    apply_to: ["string"],
    is_searchable: "string",
    is_visible_in_advanced_search: "string",
    is_comparable: "string",
    is_used_for_promo_rules: "string",
    is_visible_on_front: "string",
    used_in_product_listing: "string",
    is_visible: true,
    scope: "string",
    attribute_id: 0,
    attribute_code: "string",
    frontend_input: "string",
    entity_type_id: "string",
    is_required: true,
    options: [
      {
        label: "string",
        value: "string",
        sort_order: 0,
        is_default: true,
        store_labels: [
          {
            store_id: 0,
            label: "string",
          },
        ],
      },
    ],
    is_user_defined: true,
    default_frontend_label: "string",
    frontend_labels: [
      {
        store_id: 0,
        label: "string",
      },
    ],
    note: "string",
    backend_type: "string",
    backend_model: "string",
    source_model: "string",
    default_value: "string",
    is_unique: "string",
    frontend_class: "string",
    validation_rules: [
      {
        key: "string",
        value: "string",
      },
    ],
    custom_attributes: [
      {
        attribute_code: "string",
        value: "string",
      },
    ],
  },
};

export const createProductOptionsExamplePayload = {
  data: {
    product_sku: "string",
    option_id: 0,
    title: "string",
    type: "string",
    sort_order: 0,
    is_require: true,
    price: 0,
    price_type: "string",
    sku: "string",
    file_extension: "string",
    max_characters: 0,
    image_size_x: 0,
    image_size_y: 0,
    values: [
      {
        title: "string",
        sort_order: 0,
        price: 0,
        price_type: "string",
        sku: "string",
        option_type_id: 0,
      },
    ],
    extension_attributes: {},
  },
};

export const listProductOptionTypesExamplePayload = {
  data: [
    {
      label: "string",
      code: "string",
      group: "string",
      extension_attributes: {},
    },
  ],
};

export const listProductTypesExamplePayload = {
  data: [
    {
      name: "string",
      label: "string",
      extension_attributes: {},
    },
  ],
};

export const listOrdersExamplePayload = {
  data: {
    items: [],
    search_criteria: {
      filter_groups: [
        {
          filters: [
            {
              field: "string",
              value: "string",
              condition_type: "string",
            },
          ],
        },
      ],
      sort_orders: [
        {
          field: "string",
          direction: "string",
        },
      ],
      page_size: 0,
      current_page: 0,
    },
    total_count: 0,
  },
};

export const cancelOrderExampleResponse = {
  data: true,
};

export const createCustomerExampleResponse = {
  data: {
    id: 0,
    group_id: 0,
    default_billing: "string",
    default_shipping: "string",
    confirmation: "string",
    created_at: "string",
    updated_at: "string",
    created_in: "string",
    dob: "string",
    email: "string",
    firstname: "string",
    lastname: "string",
    middlename: "string",
    prefix: "string",
    suffix: "string",
    gender: 0,
    store_id: 0,
    taxvat: "string",
    website_id: 0,
    addresses: [
      {
        id: 0,
        customer_id: 0,
        region: {
          region_code: "string",
          region: "string",
          region_id: 0,
          extension_attributes: {},
        },
        region_id: 0,
        country_id: "string",
        street: ["string"],
        company: "string",
        telephone: "string",
        fax: "string",
        postcode: "string",
        city: "string",
        firstname: "string",
        lastname: "string",
        middlename: "string",
        prefix: "string",
        suffix: "string",
        vat_id: "string",
        default_shipping: true,
        default_billing: true,
        extension_attributes: {},
        custom_attributes: [
          {
            attribute_code: "string",
            value: "string",
          },
        ],
      },
    ],
    disable_auto_group_change: 0,
    extension_attributes: {
      company_attributes: {
        customer_id: 0,
        company_id: 0,
        job_title: "string",
        status: 0,
        telephone: "string",
        extension_attributes: {},
      },
      assistance_allowed: 0,
      is_subscribed: true,
    },
    custom_attributes: [
      {
        attribute_code: "string",
        value: "string",
      },
    ],
  },
};

export const getCustomerExampleResponse = {
  data: {
    id: 0,
    group_id: 0,
    default_billing: "string",
    default_shipping: "string",
    confirmation: "string",
    created_at: "string",
    updated_at: "string",
    created_in: "string",
    dob: "string",
    email: "string",
    firstname: "string",
    lastname: "string",
    middlename: "string",
    prefix: "string",
    suffix: "string",
    gender: 0,
    store_id: 0,
    taxvat: "string",
    website_id: 0,
    addresses: [
      {
        id: 0,
        customer_id: 0,
        region: {
          region_code: "string",
          region: "string",
          region_id: 0,
          extension_attributes: {},
        },
        region_id: 0,
        country_id: "string",
        street: ["string"],
        company: "string",
        telephone: "string",
        fax: "string",
        postcode: "string",
        city: "string",
        firstname: "string",
        lastname: "string",
        middlename: "string",
        prefix: "string",
        suffix: "string",
        vat_id: "string",
        default_shipping: true,
        default_billing: true,
        extension_attributes: {},
        custom_attributes: [
          {
            attribute_code: "string",
            value: "string",
          },
        ],
      },
    ],
    disable_auto_group_change: 0,
    extension_attributes: {
      company_attributes: {
        customer_id: 0,
        company_id: 0,
        job_title: "string",
        status: 0,
        telephone: "string",
        extension_attributes: {},
      },
      assistance_allowed: 0,
      is_subscribed: true,
    },
    custom_attributes: [
      {
        attribute_code: "string",
        value: "string",
      },
    ],
  },
};

export const updateCustomerExampleResponse = {
  data: {
    id: 0,
    group_id: 0,
    default_billing: "string",
    default_shipping: "string",
    confirmation: "string",
    created_at: "string",
    updated_at: "string",
    created_in: "string",
    dob: "string",
    email: "string",
    firstname: "string",
    lastname: "string",
    middlename: "string",
    prefix: "string",
    suffix: "string",
    gender: 0,
    store_id: 0,
    taxvat: "string",
    website_id: 0,
    addresses: [
      {
        id: 0,
        customer_id: 0,
        region: {
          region_code: "string",
          region: "string",
          region_id: 0,
          extension_attributes: {},
        },
        region_id: 0,
        country_id: "string",
        street: ["string"],
        company: "string",
        telephone: "string",
        fax: "string",
        postcode: "string",
        city: "string",
        firstname: "string",
        lastname: "string",
        middlename: "string",
        prefix: "string",
        suffix: "string",
        vat_id: "string",
        default_shipping: true,
        default_billing: true,
        extension_attributes: {},
        custom_attributes: [
          {
            attribute_code: "string",
            value: "string",
          },
        ],
      },
    ],
    disable_auto_group_change: 0,
    extension_attributes: {
      company_attributes: {
        customer_id: 0,
        company_id: 0,
        job_title: "string",
        status: 0,
        telephone: "string",
        extension_attributes: {},
      },
      assistance_allowed: 0,
      is_subscribed: true,
    },
    custom_attributes: [
      {
        attribute_code: "string",
        value: "string",
      },
    ],
  },
};

export const deleteCustomerExampleResponse = {
  data: true,
};

export const searchCustomersExampleResponse = {
  data: {
    items: [
      {
        id: 0,
        group_id: 0,
        default_billing: "string",
        default_shipping: "string",
        confirmation: "string",
        created_at: "string",
        updated_at: "string",
        created_in: "string",
        dob: "string",
        email: "string",
        firstname: "string",
        lastname: "string",
        middlename: "string",
        prefix: "string",
        suffix: "string",
        gender: 0,
        store_id: 0,
        taxvat: "string",
        website_id: 0,
        addresses: [
          {
            id: 0,
            customer_id: 0,
            region: {
              region_code: "string",
              region: "string",
              region_id: 0,
              extension_attributes: {},
            },
            region_id: 0,
            country_id: "string",
            street: ["string"],
            company: "string",
            telephone: "string",
            fax: "string",
            postcode: "string",
            city: "string",
            firstname: "string",
            lastname: "string",
            middlename: "string",
            prefix: "string",
            suffix: "string",
            vat_id: "string",
            default_shipping: true,
            default_billing: true,
            extension_attributes: {},
            custom_attributes: [
              {
                attribute_code: "string",
                value: "string",
              },
            ],
          },
        ],
        disable_auto_group_change: 0,
        extension_attributes: {
          company_attributes: {
            customer_id: 0,
            company_id: 0,
            job_title: "string",
            status: 0,
            telephone: "string",
            extension_attributes: {},
          },
          assistance_allowed: 0,
          is_subscribed: true,
        },
        custom_attributes: [
          {
            attribute_code: "string",
            value: "string",
          },
        ],
      },
    ],
    search_criteria: {
      filter_groups: [
        {
          filters: [
            {
              field: "string",
              value: "string",
              condition_type: "string",
            },
          ],
        },
      ],
      sort_orders: [
        {
          field: "string",
          direction: "string",
        },
      ],
      page_size: 0,
      current_page: 0,
    },
    total_count: 0,
  },
};

export const listTransactionsExampleResponse = {
  data: {
    items: [
      {
        transaction_id: 0,
        parent_id: 0,
        order_id: 0,
        payment_id: 0,
        txn_id: "string",
        parent_txn_id: "string",
        txn_type: "string",
        is_closed: 0,
        additional_information: ["string"],
        created_at: "string",
        child_transactions: [{}],
        extension_attributes: {},
      },
    ],
    search_criteria: {
      filter_groups: [
        {
          filters: [
            {
              field: "string",
              value: "string",
              condition_type: "string",
            },
          ],
        },
      ],
      sort_orders: [
        {
          field: "string",
          direction: "string",
        },
      ],
      page_size: 0,
      current_page: 0,
    },
    total_count: 0,
  },
};

export const getTransactionExampleResponse = {
  data: {
    transaction_id: 0,
    parent_id: 0,
    order_id: 0,
    payment_id: 0,
    txn_id: "string",
    parent_txn_id: "string",
    txn_type: "string",
    is_closed: 0,
    additional_information: ["string"],
    created_at: "string",
    child_transactions: [{}],
    extension_attributes: {},
  },
};
















export const pollChangesExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            entity_id: 1042,
            increment_id: "000000142",
            status: "pending",
            state: "new",
            customer_email: "jane.doe@example.com",
            customer_firstname: "Jane",
            customer_lastname: "Doe",
            grand_total: 199.5,
            base_grand_total: 199.5,
            order_currency_code: "USD",
            created_at: "2026-05-26 14:30:00",
            updated_at: "2026-05-26 14:30:00",
          },
        ],
        updated: [
          {
            entity_id: 980,
            increment_id: "000000087",
            status: "complete",
            state: "complete",
            customer_email: "john.smith@example.com",
            customer_firstname: "John",
            customer_lastname: "Smith",
            grand_total: 75.25,
            base_grand_total: 75.25,
            order_currency_code: "USD",
            created_at: "2026-04-12 09:00:00",
            updated_at: "2026-05-26 15:45:00",
          },
        ],
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
