export const navigations = [
  {
    name: "Product",
    icon: "shopping_basket",
    path: "/product/list",
  },
  {
    name: "Product Cost List",
    icon: "format_list_bulleted",
    path: "/product-cost/list",
  },
  {
    name: "Product Category",
    icon: "category",
    path: "/product-category/list",
  },
  {
    name: "Supplier",
    icon: "group_work",
    path: "/supplier/list",
  },
  {
    name: "Parts",
    icon: "inbox",
    path: "/parts/list",
  },
  {
    name: "Settings",
    icon: "dashboard",
    children: [
      {
        name: "Product Variations",
        iconText: "V",
        path: "/product-variation/list",
      },
      {
        name: "Parts UM",
        iconText: "U",
        path: "/parts-um/list",
      },
      {
        name: "Parts Type",
        iconText: "T",
        path: "/parts-type/list",
      },
      {
        name: "Supplier Type",
        iconText: "T",
        path: "/supplier-type/list",
      },
      {
        name: "Freight",
        iconText: "F",
        path: "/freight/list",
      },
      {
        name: "Storage",
        iconText: "S",
        path: "/storage/list",
      },
      {
        name: "Fullfillment",
        iconText: "F",
        path: "/fullfillment/list",
      },
      {
        name: "Misc",
        iconText: "M",
        path: "/misc/list",
      },
      {
        name: "Users",
        iconText: "U",
        path: "/users/list",
      },
    ]
  },

];
