Component({
  options:{
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    hover: {
      type: Boolean,
      value: false
    },
    icon: {
      type: String,
      value: ''
    },
    link: {
      type: String,
      value: 'none'
    },
    title: {
      type: String,
      value: ''
    },
    cont: {
      type: String,
      value: ''
    },
    footer: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    navigateTo(){
      let url = this.data.link;
      if(url == 'none') return;
      wx.navigateTo({
        url,
      });
    }
  }
});