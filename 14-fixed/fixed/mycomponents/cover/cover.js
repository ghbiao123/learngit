let util = require("../../utils/util");
Component({
  properties: {
    userInfo: {
      type: Object,
      value: {},
      observer(newVal, oldVal) {
        if (newVal && newVal.renzhenglist == 1) {
          this.setData({
            show: false
          });
        }else{
          this.setData({
            show: true
          });
        }
      }
    }
  },
  data: {
    show: true
  },
  created() {},
  methods: {
    check() {
      this.init();
    },
    init() {
      let that = this;
      let userInfo = that.data.userInfo;
      if(!userInfo.id){
        return util.showError("请您先登录", function () {
          wx.navigateTo({
            url: '/pages/login/login',
          });
        });
      }
      util.post("/api/wxlogin/getUserData", {
        users_id: userInfo.id
      }).then(res=>{
        let userInfo = res.data;
        if (userInfo.renzhenglist == 0) {
          util.showError("请您先认证", function () {
            wx.navigateTo({
              url: '/pages/personalverify/personalverify',
            });
          });
        }
        if (userInfo.renzhenglist == 1) {
          that.setData({
            show: false
          });
        }

        wx.setStorage({
          data: userInfo,
          key: 'userinfo',
        });

      });
      

    }
  }
});