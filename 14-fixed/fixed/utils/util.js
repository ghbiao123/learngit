let App = getApp();

import site from "../program.config";

// api根目录
function getSiteRoot() {
  return site.siteroot;
}

// post 请求
function post(url, data = {}) {

  let ROOT_URL = getSiteRoot() + "/index.php";

  let status = 0;

  setTimeout(() => {
    if (status) return;
    wx.showLoading({
      mask: true
    });
  }, 800);

  return new Promise((resolve, reject) => {

    wx.request({
      url: ROOT_URL + url,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: data,
      success(res) {
      
        status = 1;

        if (res.statusCode !== 200) {
          wx.showModal({
            showCancel: false,
            confirmText: "重新加载",
            title: "提示",
            content: "网络异常或加载失败",
            success(res){
              
            }
          });
          return;
        }

        resolve(res.data);

      },
      fail(err) {
        reject(err)
      },
      complete(ret) {
        wx.hideLoading();
      }
    });

  });

}

// 检测登录状态
//  需更改this指向 checkIsLogin.call(this);
function checkIsLogin() {
  let userInfo = wx.getStorageSync('userinfo');
  if (userInfo) {
    this.setData({
      isLogin: true,
      userInfo
    });
    return userInfo;
  } else if (!userInfo) {
    this.setData({
      isLogin: false
    });

    return false;
  }
}

//   显示成功提示框
function showSuccess(msg, callBack) {
  wx.showToast({
    title: msg,
    icon: "none",
    mask: true,
    duration: 2000,
    success() {
      callBack && (setTimeout(() => {
        callBack();
      }, 2000));
    }
  });
}

// 显示失败提示框
function showError(msg, callBack) {
  wx.showModal({
    title: "友情提示",
    content: msg,
    showCancel: false,
    success(res) {
      callBack && callBack();
    }
  });
}

// 小程序主动更新
function updateManager() {

  if (!wx.canIUse('getUpdateManager')) {
    return
  }

  const updateManager = wx.getUpdateManager();

  // 检测是否有版本更新
  updateManager.onCheckForUpdate();

  updateManager.onUpdateReady(() => {
    wx.showModal({
      title: "更新提示",
      content: "新版本已经准备好，即将重启应用",
      showCancel: false,
      success(res) {
        updateManager.applyUpdate();
      }
    });
  });

  updateManager.onUpdateFailed(() => {
    wx.showModal({
      title: '更新提示',
      content: '新版本下载失败',
      showCancel: false
    })
  });
}

// 微信授权登录, 未完成
function getUserInfo(e, callBack) {

  if (e.detail.errMsg !== "getPhoneNumber:ok") {
    wx.showToast({
      title: '登录失败请重试',
      icon: "none"
    });
    return;
  }

  wx.login({
    success(res) {
      let data = {
        code: res.code,
        // userInfo: e.detail.rawData,
        encryptedData: encodeURIComponent(e.detail.encryptedData),
        iv: encodeURIComponent(e.detail.iv),
      }
      post("/api/wxlogin/userlogin", data).then(res => {
        callBack&&callBack(res);
      });
    }
  });


}

// 通过手机号获取验证码  未完成
function getCaptcha(num) {
  // 检测手机号
  if (!(/1[3-9]\d{9}$/.test(num))) {
    wx.showToast({
      title: '手机号有误，请重试！',
      icon: 'none'
    });
    return;
  }

  let data = {
    phone: num
  }
  _post("url", data).then(res => {
    showSuccess(res.msg);
  });
}


/*
  返回当天日期
  eq： {
    date: 2019/11/12,
    time: 15:13:44,
    day: 星期一
  }
*/
function getToday() {
  let arrDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  let date = arguments[0] ? new Date(...arguments) : new Date(),
    y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    hour = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    day = date.getDay();

  function addZero(e) {
    return e < 10 ? "0" + e : e + "";
  }
  return {
    date: `${addZero(y)}/${addZero(m)}/${addZero(d)}`,
    time: `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`,
    day: arrDay[day]
  }
}

/*
 生成随机字符串
  e: 为生成的字符串长度
*/

function getRandomString(e) {
  let len = e || 10;
  let str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let length = str.length;
  let res = [];
  for (let i = 0; i < len; i++) {
    res.push(str.charAt(Math.floor(Math.random() * length)));
  }
  return res;
}

// 把图片转为base64格式
function getImageToBase64(path) {
  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath: path,
      encoding: 'base64',
      success: (res) => {
        let type = path.split(".");
        resolve(`data:image/${type[type.length-1]};base64,${res.data}`);
      }
    });
  });
}

/**
 * 小数转百分数
 * 0.1234 => 12.34%
 */
function getToPersent(num) {
  let p = (num * 100).toFixed(2);
  return p + "%";
}
// 百分数转小数
// 12.34% => 0.1234
function getToPoint(num) {
  let n = num.replace(/\%/g, "");
  return n / 100;
}

// 将图片添加为完整路径
function getImageFullUrl(arr, key){
  if(!arr||arr.length==0){
    return [];
  }
  if(!key){
    // key 不存在
    return getSiteRoot() + arr;
  }else{
    // key 存在
    let newArr = arr.map(v=>{
      v[key] = getSiteRoot() + v[key];
      return v
    });
    return newArr;
  }
}

// 展示图片
function showImage(arr, index){
  wx.previewImage({
    urls: arr,
    current: arr[index]
  });
}


module.exports = {
  getToday, // 获取当前日期，时间，周几
  getRandomString, // 获取特定位的随机字符串
  getImageToBase64, // 图片转base64格式
  getToPersent, // 小数转百分数
  getToPoint, // 百分数转小数
  checkIsLogin, // 检测是否登录
  showSuccess, // 显示成功消息
  showError, // 显示错误消息
  post, // post请求
  getUserInfo, // button触发获取用户信息，code userinfo
  getCaptcha, // 验证手机号并获取验证码
  getSiteRoot, // 获取api接口根
  updateManager, // 小程序主动更新
  getImageFullUrl, // 将图片添加为完整路径
  showImage, // 展示图片
}

