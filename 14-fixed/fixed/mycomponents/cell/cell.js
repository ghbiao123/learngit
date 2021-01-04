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
      value: ''
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
      console.log("没有链接")
      if(!url) return;
      console.log("已跳转链接")
      // wx.navigateTo({
      //   url,
      // });
    }
  }
});