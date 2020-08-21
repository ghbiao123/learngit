let App = getApp();

/*
  返回当天日期
  eq： {
    date: 2019/11/12,
    time: 15:13:44,
    day: 星期一
  }
*/
function getToday(){
  let arrDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  let date = arguments[0] ? new Date(...arguments) : new Date(),
  y = date.getFullYear(),
  m = date.getMonth() + 1,
  d = date.getDate(),
  hour = date.getHours(),
  minutes = date.getMinutes(),
  seconds = date.getSeconds(),
  day = date.getDay();
  function addZero(e){
    return e<10? "0"+e : e+"";
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

function getRandomString(e){
  let len = e || 10;
  let str = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let length = str.length;
  let res = [];
  for(let i=0;i<len;i++){
    res.push(str.charAt(Math.floor(Math.random() * length)));
  }
  return res;
}

// 把图片转为base64格式

function getImageToBase64(path){
  return new Promise((resolve, reject)=>{
    wx.getFileSystemManager().readFile({
      filePath: path,
      encoding: 'base64',
      success: (res)=>{
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
function getToPersent(num){
  let p = (num * 100).toFixed(2);
  return p + "%";
}
// 百分数转小数
// 12.34% => 0.1234
function getToPoint(num){
  let n = num.replace(/\%/g, "");
  return n/100;
}

module.exports = {
  getToday,
  getRandomString,
  getImageToBase64,
  getToPersent,
  getToPoint
}