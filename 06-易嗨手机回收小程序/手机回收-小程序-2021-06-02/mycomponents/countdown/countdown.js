Component({
  properties: {
    time: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.countDown(newVal);
      }
    }
  },
  methods: {
    countDown(newVal) {
      
      let that = this;
      let timer;
      const unit = ['天', '时', '分', '秒'];

      clearInterval(timer);
      timer = setInterval(function () {
        let time = new Date(newVal * 1000) - new Date();
        if(time<0){
          clearInterval(timer);
          return
        }
        let arrTime = [];
        let day = Math.floor(time / 1000 / 60 / 60 / 24);
        let hour = Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let minute = Math.floor(time % (1000 * 60 * 60) / (1000 * 60));
        let second = Math.floor(time % (1000 * 60) / (1000));
        let timeSource = [day, hour, minute, second];
        timeSource.forEach((v, i) => {
          let t = v.toString().padStart(2, '0').split('');
          if (t.length > 2) {
            t = ["9", "9"];
          }
          arrTime.push(...t, unit[i]);
        });
        that.setData({
          arrTime
        });
      }, 250);
    }
  }
});