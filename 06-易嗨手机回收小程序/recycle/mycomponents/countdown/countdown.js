Component({
  properties:{
    time:{
      type: Number,
      value:0,
      observer(newVal){
        let Time = parseInt((new Date(newVal*1000) - new Date()) / 1000);
        console.log(Time)
        let timeArr = [];
        let d = Time / 60 / 60 / 24;
        console.log(d);
      }
    }
  }
});