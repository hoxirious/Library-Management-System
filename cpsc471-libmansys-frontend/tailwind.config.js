function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }

    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        skin: {
          fill: withOpacity("--fill"),
          danger: withOpacity("--danger"),
          success: withOpacity("--success"),
          warning: withOpacity("--warning"),
          info: withOpacity("--info"),
          default: withOpacity("--default"),
          exquisite: withOpacity("--exquisite"),
          disabled: withOpacity("--disabled"),
          primary: withOpacity("--text-primary"),
          secondary: withOpacity("--text-secondary"),
          base: withOpacity("--text-base"),
          inverted: withOpacity("--text-inverted"),
        },
      },
      backgroundColor: {
        skin: {
          default: withOpacity("--background"),
          top: withOpacity("--background-top"),
          "overflow-menu": withOpacity("--background-overflow-menu"),
          active: withOpacity("--background-active"),
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
