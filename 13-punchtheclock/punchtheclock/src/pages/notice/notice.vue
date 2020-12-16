<template>
  <div id="app" :style="{minHeight: screeHeight+'px'}">
    <head-nav title="活动公告" bgColor="#fff" titleColor="#333" :isBack="true"></head-nav>

    <div class="content" v-for="(item, index) in list" :key="index">
      <router-link :to="{name: 'noticedetail', params: {id: item.id}}">
        <div class="cell-item">
          {{index+1}}.{{item.name}}
        </div>
      </router-link>
      <!-- <div class="cell-cont">
        <div>开始时间：10:00</div>
        <div>结束时间：12:00</div>
      </div> -->
    </div>
    <div class="content" v-if="list.length == 0">
      暂无数据
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      list: [],
      screeHeight: window.innerHeight
    }
  },
  mounted(){
    let that = this;
    let data = {};
    data.users_id = localStorage.getItem("uid");
    // data.token = localStorage.getItem("token");
    this.$ajax.post("/api/users/getHuodong").then(res=>{
      console.log(res);
      this.list = res.data.data;
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
      font-size: 30/@rem;
      text-align: center;
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