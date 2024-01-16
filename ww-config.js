export default {
  editor: {
    label: {
      en: "My Element",
    },
  },
  properties: {
    graphName: {
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
        max: 10,
        defaultValue: 2,
      },
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
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: 0.5,
      },
    },
    minRadius: {
      label: {
        en: "Minimum bubble radius",
      },
      type: "Number",
      options: {
        min: 5,
        max: 100,
        step: 5,
      },
      required: false,
    },
    maxRadius: {
      label: {
        en: "Maximum bubble radius",
      },
      type: "Number",
      options: {
        min: 50,
        max: 1000,
        step: 10,
      },
      required: false,
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
