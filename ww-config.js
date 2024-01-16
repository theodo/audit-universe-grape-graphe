export default {
  editor: {
    label: {
      en: "My Element",
    },
  },
  properties: {
    name: {
      label: {
        en: "Name",
      },
      type: "Text",
      required: true,
    },
    numberOfColumns: {
      label: {
        en: "Number of Columns",
      },
      type: "Number",
      options: {
        min: 1,
        max: 20,
      },
      defaultValue: 2,
    },
    isLogScale: {
      label: {
        en: "Display on logarithmic",
      },
      type: "OnOff",
      defaultValue: false,
    },
    logFactor: {
      label: {
        en: "log factor",
      },
      type: "Number",
      options: {
        min: 1,
        max: 10,
      },
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
