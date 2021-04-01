async function calculateHeight(){

    let up = await new Promise(resolve=>{
      let query = wx.createSelectorQuery();
      query.select(".head").boundingClientRect();
      query.exec(res=>{
        resolve(res[0].height);
      });
    });
    let down = await new Promise(resolve=>{
      let query = wx.createSelectorQuery();
      query.select(".button").boundingClientRect();
      query.exec(res=>{
        resolve(res[0].height);
      });
    });
    let system = await new Promise(resolve=>{
      wx.getSystemInfo({
        success: (result) => {
          resolve(result.windowHeight);
        },
      });
    });
    let height = (system - up - down) * 2;
    return height;
}

module.exports = {
  calculateHeight
}