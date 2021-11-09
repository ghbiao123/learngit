// pages/ipt/ipt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrRadio: ['外卖', '家政', '中介', '装修', '维修', '访客', '送货', '物业', '看房', ],
    selected: 0,
    arrAddress: [
      ['1栋', '2栋', '3栋', '4栋', '5栋', '6栋', ],
      ['1单元','2单元','3单元','4单元','5单元','6单元',],
      ['101', '102', '103', '104', '105', '106', ]
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 到访房号
  addressChange(e){
    let { value: arrIdx } = e.detail
    let { arrAddress } = this.data
    let address = arrAddress.map((item, idx) => item[arrIdx[idx]]).join('-')
    this.setData({
      address
    })
  },
  // 访客类型
  onChange(e) {
    let selected = e.currentTarget.dataset.id
    this.setData({
      selected
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})