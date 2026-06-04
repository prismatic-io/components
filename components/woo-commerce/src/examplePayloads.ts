











export const listProductsExamplePayload = {
  data: {
    data: [
      {
        id: 794,
        name: "Premium Quality",
        slug: "premium-quality-19",
        permalink: "https://example.com/product/premium-quality-19/",
        date_created: "2017-03-23T17:01:14",
        date_created_gmt: "2017-03-23T20:01:14",
        date_modified: "2017-03-23T17:01:14",
        date_modified_gmt: "2017-03-23T20:01:14",
        type: "simple",
        status: "publish",
        featured: false,
        catalog_visibility: "visible",
        description: "",
        short_description: "",
        sku: "",
        price: "21.99",
        regular_price: "21.99",
        sale_price: "",
        on_sale: false,
        purchasable: true,
        total_sales: 0,
        virtual: false,
        downloadable: false,
        downloads: [],
        tax_status: "taxable",
        manage_stock: false,
        stock_quantity: null,
        stock_status: "instock",
        categories: [
          {
            id: 9,
            name: "Clothing",
            slug: "clothing",
          },
        ],
        images: [
          {
            id: 792,
            date_created: "2017-03-23T14:01:13",
            date_created_gmt: "2017-03-23T20:01:13",
            date_modified: "2017-03-23T14:01:13",
            date_modified_gmt: "2017-03-23T20:01:13",
            src: "https://example.com/wp-content/uploads/2017/03/T_2_front-4.jpg",
            name: "",
            alt: "",
          },
        ],
        attributes: [],
        meta_data: [],
      },
    ],
    // biome-ignore lint/suspicious/noExplicitAny: AxiosResponseHeaders is broader than this specific shape
    headers: {
      server: "nginx",
      "x-wp-total": 2,
      "x-wp-totalpages": 2,
      link: '<https://example.com/wp-json/wc/v3/products?per_page=1&page=2>; rel="next"',
    } as any,
  },
};






export const listOrdersExamplePayload = {
  data: {
    data: [
      {
        id: 727,
        parent_id: 0,
        number: "727",
        order_key: "wc_order_58d2d042d1d",
        created_via: "rest-api",
        version: "3.0.0",
        status: "processing",
        currency: "USD",
        date_created: "2017-03-22T16:28:02",
        date_created_gmt: "2017-03-22T19:28:02",
        date_modified: "2017-03-22T16:28:08",
        date_modified_gmt: "2017-03-22T19:28:08",
        discount_total: "0.00",
        discount_tax: "0.00",
        shipping_total: "10.00",
        shipping_tax: "0.00",
        cart_tax: "1.35",
        total: "29.35",
        total_tax: "1.35",
        prices_include_tax: false,
        customer_id: 0,
        customer_note: "",
        billing: {
          first_name: "John",
          last_name: "Doe",
          company: "",
          address_1: "969 Market",
          address_2: "",
          city: "San Francisco",
          state: "CA",
          postcode: "94103",
          country: "US",
          email: "john.doe@example.com",
          phone: "(555) 555-5555",
        },
        shipping: {
          first_name: "John",
          last_name: "Doe",
          company: "",
          address_1: "969 Market",
          address_2: "",
          city: "San Francisco",
          state: "CA",
          postcode: "94103",
          country: "US",
        },
        payment_method: "bacs",
        payment_method_title: "Direct Bank Transfer",
        line_items: [
          {
            id: 315,
            name: "Woo Single #1",
            product_id: 93,
            variation_id: 0,
            quantity: 2,
            tax_class: "",
            subtotal: "6.00",
            total: "6.00",
            total_tax: "0.45",
            sku: "",
            price: 3,
          },
        ],
        shipping_lines: [
          {
            id: 317,
            method_title: "Flat Rate",
            method_id: "flat_rate",
            total: "10.00",
            total_tax: "0.00",
          },
        ],
        fee_lines: [],
        coupon_lines: [],
        refunds: [],
        meta_data: [],
      },
    ],
    // biome-ignore lint/suspicious/noExplicitAny: AxiosResponseHeaders is broader than this specific shape
    headers: {
      server: "nginx",
      "x-wp-total": 2,
      "x-wp-totalpages": 2,
      link: '<https://example.com/wp-json/wc/v3/orders?per_page=1&page=2>; rel="next"',
    } as any,
  },
};






export const listCustomersExamplePayload = {
  data: {
    data: [
      {
        id: 25,
        date_created: "2017-03-21T16:09:28",
        date_created_gmt: "2017-03-21T19:09:28",
        date_modified: "2017-03-21T16:09:30",
        date_modified_gmt: "2017-03-21T19:09:30",
        email: "john.doe@example.com",
        first_name: "John",
        last_name: "Doe",
        role: "customer",
        username: "john.doe",
        billing: {
          first_name: "John",
          last_name: "Doe",
          company: "",
          address_1: "969 Market",
          address_2: "",
          city: "San Francisco",
          state: "CA",
          postcode: "94103",
          country: "US",
          email: "john.doe@example.com",
          phone: "(555) 555-5555",
        },
        shipping: {
          first_name: "John",
          last_name: "Doe",
          company: "",
          address_1: "969 Market",
          address_2: "",
          city: "San Francisco",
          state: "CA",
          postcode: "94103",
          country: "US",
        },
        is_paying_customer: false,
        avatar_url:
          "https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96",
        meta_data: [],
      },
    ],
    // biome-ignore lint/suspicious/noExplicitAny: AxiosResponseHeaders is broader than this specific shape
    headers: {
      server: "nginx",
      "x-wp-total": 2,
      "x-wp-totalpages": 2,
      link: '<https://example.com/wp-json/wc/v3/customers?per_page=1&page=2>; rel="next"',
    } as any,
  },
};
