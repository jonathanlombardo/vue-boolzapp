const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      // ...
    };
  },

  // ...

  methods: {
    // ...
  },

  // ...

  mounted() {
    console.log("app mounted");
  },
});

app.mount("#app");
