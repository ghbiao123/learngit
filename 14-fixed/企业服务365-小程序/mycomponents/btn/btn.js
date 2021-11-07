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
    },
    url: {
      type: String,
      value: ""
    }
  },
  methods: {
    tap(){
      let url = this.data.url;
      if(url){
        wx.navigateTo({
          url,
        });
      }
      this.triggerEvent("getTap")
    }
  }
});