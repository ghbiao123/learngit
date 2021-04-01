Component({
  properties: {
    type: {
      type: String,
      value: "normal"
    }
  },
  methods: {
    tap(){
      this.triggerEvent("getTap")
    }
  }
});