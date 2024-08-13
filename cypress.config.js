const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/nike_offer/',
    testIsolation: false
  },
  viewportHeight: 834,
  viewportWidth: 1382,
});
