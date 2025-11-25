const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "yg22sw",
    
    e2e: {
      setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
