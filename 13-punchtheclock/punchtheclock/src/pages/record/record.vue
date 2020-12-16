<template>
  <div id="app" :style="{minHeight: screeHeight+'px'}">
    <head-nav title="活动记录" bgColor="#fff" titleColor="#333" :isBack="true"></head-nav>

    <div class="content" v-for="(item, index) in list" :key="index">
      <div class="cell-item">
        <div>{{item.date}}</div>
        <div>用时：{{item.total}}分钟</div>
      </div>
      <div class="cell-cont">
        <div>开始时间：{{item.starttime}}</div>
        <div>结束时间：{{item.endtime}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      screeHeight: window.innerHeight,
      list: []
    }
  },
  mounted(){
    let that = this;
    let data = {};
    data.users_id = localStorage.getItem("uid");
    // data.token = localStorage.getItem("token");
    this.$ajax.post("/api/users/getjilu", data).then(res=>{
      console.log(res);
      this.list = res.data.data.map(v=>{
        v.date = new Date(v.starttime *1000).toLocaleDateString();
        let startTime = new Date(v.starttime *1000);
        v.starttime = `${startTime.getHours().toString().padStart(2, "0")}:${startTime.getMinutes().toString().padStart(2, "0")}`;
        let endTime = new Date(v.endtime *1000);
        v.endtime = `${endTime.getHours().toString().padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`;
        return v;
      });
    });
  },
  methods: {}
}
</script>

<style lang='less' scoped>
  @rem: 750/10rem;
  #app{
    color: #333;
    background-color: #f5f5f5;
    .content{
      margin: 20/@rem auto 0;
      padding: 20/@rem;
      width: 670/@rem;
      background-color: #fff;
      border-radius: 20/@rem;
      .cell-item{
        display: flex;
        justify-content: space-between;
        width: 670/@rem;
        height: 80/@rem;
        font-size: 30/@rem;
        font-weight: bold;
        line-height: 80/@rem;
        border-bottom: 1/@rem solid #f5f5f5;
      }
      .cell-cont{
        font-size: 26/@rem;
        color: #666;
        line-height: 54/@rem;
      }
    }

  }
</style>