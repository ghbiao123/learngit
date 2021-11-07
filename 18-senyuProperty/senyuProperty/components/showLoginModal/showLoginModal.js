Component({
  properties: {
    type: {
      type: String,
      value: 'getPhoneNumber', // getUesrInfo
    },
    visible: {
      type: Boolean,
      value: false
    },
  },
  methods: {
    ontap(e) {
      let { type } = e.currentTarget.dataset
      this.triggerEvent('ontap', {
        type
      })
      this.setData({
        visible: false
      })
    }
  }
})