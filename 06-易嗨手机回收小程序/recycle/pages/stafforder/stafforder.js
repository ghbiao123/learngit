// pages/stafforder/stafforder.js
let that;
import util from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonePhoto: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this

  },
  chooseIdcard() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: async function(res) {
        let idcardSrc = res.tempFilePaths[0];

        try {
          const invokeRes = await wx.serviceMarket.invokeService({
            service: 'wx79ac3de8be320b71',
            api: 'OcrAllInOne',
            data: {
              // 用 CDN 方法标记要上传并转换成 HTTP URL 的文件
              img_url:idcardSrc,
              data_type: 3,
              ocr_type: 1
            },
          })
    
          console.log('invokeService success', invokeRes)
          // wx.showModal({
          //   title: 'success',
          //   content: JSON.stringify(invokeRes),
          // })
        } catch (err) {
          console.error('invokeService fail', err)
          // wx.showModal({
          //   title: 'fail',
          //   content: err,
          // })
        }

        return;

        wx.serviceMarket.invokeService({
          service: 'wx79ac3de8be320b71', // '固定为服务商OCR的appid，非小程序appid',
          api: 'OcrAllInOne',
          data: {
            img_url: idcardSrc,
            data_type: 3,
            ocr_type: 1,
          },
        }).then(res => {
          console.log('invokeService success', res)
          // wx.showModal({
          //   title: 'cost',
          //   content: (Date.now() - d) + '',
          // })
        }).catch(err => {
          console.error('invokeService fail', err)
          // wx.showModal({
          //   title: 'fail',
          //   content: err + '',
          // })
        });
      
        that.setData({
          idcardSrc
        });
      }
    });
  },
  // 选择手机图片
  getPhoto(e){
    wx.chooseImage({
      count: 4,
      success(res){
        console.log(res);
        // 所选图片数组
        let arr = res.tempFilePaths;
        let phonePhoto = that.data.phonePhoto;
        phonePhoto.push(...arr);
        arr.forEach(V=>{
          // upload
        });
        that.setData({
          phonePhoto
        });
      }
    });
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