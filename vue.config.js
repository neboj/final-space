module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                    @import "@/assets/sass/base/_variables.scss";
                    @import "@/assets/sass/base/_font.scss";
                `,
      },
    },
  },
};
