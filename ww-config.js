export default {
  editor: {
    label: {
      en: "My Element",
    },
  },
  properties: {
    id: {
      label: {
        en: "Id",
      },
      type: "Text",
      required: true,
    },
    numberOfColumns: {
      label: {
        en: "Number of Columns",
      },
      type: "Number",
      defaultValue: 2,
    },
    isLogScale: {
      label: {
        en: "Display on logarithmic",
      },
      type: "boolean",
      defaultValue: false,
    },
    logFactor: {
      label: {
        en: "log factor",
      },
      type: "Number",
      defaultValue: 2,
    },
    data: {
      label: {
        en: "Data",
      },
      type: "Array",
      options: {
        item: {
          type: "Object",
          label: {
            en: "item",
          },
          options: {
            text: {
              type: "Text",
              label: {
                en: "text",
              },
            },
            value: {
              type: "Number",
              label: {
                en: "value",
              },
            },
          },
        },
      },
      defaultValue: [],
      bindable: true,
    },
  },
};
