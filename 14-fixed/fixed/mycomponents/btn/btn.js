Component({
  behaviors: ['wx://form-field'],
  properties: {
    type: {
      type: String,
      value: "normal"
    },
    formType: {
      type: String,
      value: ""
    }
  },
  methods: {
    tap(){
      this.triggerEvent("getTap")
    }
  }
});