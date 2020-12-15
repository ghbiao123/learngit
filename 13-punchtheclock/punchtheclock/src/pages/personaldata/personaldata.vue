<template>
  <div id="app" :style="{height: screeHeight+'px'}">
    <head-nav title="个人资料" bgColor="#fff" titleColor="#333" :isBack="true"></head-nav>

    <div class="content">
      <div class="list">
        <div class="name">姓名</div>
        <div class="value">{{userInfo.name}}</div>
      </div>
      <div class="list" v-show="userInfo.juese==1">
        <div class="name">ERP编号</div>
        <div class="value">{{userInfo.erpnum}}</div>
      </div>
      <div class="list">
        <div class="name">单位</div>
        <div class="value">{{userInfo.danwei}}</div>
      </div>
      <div class="list">
        <div class="name">职务</div>
        <div class="value">{{userInfo.zhiwu}}</div>
      </div>
      <div class="list">
        <div class="name">性别</div>
        <div class="value">{{userInfo.sex}}</div>
      </div>
      <div class="list">
        <div class="name">出生日期（{{userInfo.rili == 1 ? "公历" : "农历"}}）</div>
        <div class="value">{{userInfo.birthday}}</div>
      </div>
      <div class="list">
        <div class="name">运动爱好</div>
        <div class="value">{{userInfo.hobby}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      userInfo:{},
      screeHeight: window.innerHeight
    }
  },
  mounted(){
    let that = this;
    let data = {};
    data.users_id = localStorage.getItem("uid");
    // data.token = localStorage.getItem("token");
    this.$ajax.post("/api/users/getMyData", data).then(res=>{
      console.log(res);
      this.userInfo = res.data.data;
    });
  },
  methods: {}
}
</script>

<style lang='less' scoped>
  @rem: 750/10rem;
  #app{
    background-color: #f5f5f5;
    color: #333;
    .content{
      margin-top: 20/@rem;
      width: 710/@rem;
      padding: 0 20/@rem;
      background-color: #fff;
      .list{
        display: flex;
        justify-content: space-between;
        line-height: 90/@rem;
        height: 90/@rem;
        border-bottom: 1/@rem solid #f5f5f5;
        font-size: 28/@rem;
        .name{
          color: #666666;
        }
        .value{
          max-width: 580/@rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333;
        }
      }
    }
  }
</style>