<template>
  <div id="app" :style="{minHeight: screeHeight+'px'}">
    <head-nav title="修改密码" bgColor="#fff" titleColor="#333" :isBack="true"></head-nav>

    <div class="content">
      <div class="list">
        <div class="name">原密码</div>
        <mt-field placeholder="请输入原密码" type="password" v-model="reqData.old_password"></mt-field>
      </div>
       <div class="list">
        <div class="name">新密码</div>
        <mt-field placeholder="请输入新密码" type="password" v-model="reqData.new_password"></mt-field>
      </div>
       <div class="list">
        <div class="name">确认新密码</div>
        <mt-field placeholder="请再次输入新密码" type="password" v-model="oldAgain"></mt-field>
      </div>
    </div>

    <div class="m-t" @click="confirm">
      <my-btn title="确认修改"></my-btn>
    </div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      //
      oldAgain:"",
      screeHeight: window.innerHeight,
      reqData: {
        token: "",
        users_id: "",
        old_password: "",
        new_password: "",
      }
    }
  },
  methods: {
    confirm(){
      if(this.reqData.new_password != this.oldAgain){
        Toast("新密码不一致");
        return;
      }
      let that = this;
      this.reqData.users_id = localStorage.getItem("uid");
      // this.reqData.token = localStorage.getItem("token");
      this.$ajax.post("/api/users/updatePassword", this.reqData).then(res=>{
       if(res.data.code == 2001){
          setTimeout(()=>{
            this.$router.go(-1);
          }, 3000);
        }
        Toast(res.data.msg);
      });
    }
  }
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
          color: #333;
        }
        
      }
    }
    /deep/ .mint-field-core{
      text-align: right;
    }
    .m-t{
      margin-top: 50/@rem;
    }
  }
</style>