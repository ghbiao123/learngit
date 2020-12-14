<template>
  <div id="app" :style="{height: screeHeight+'px'}">
    <head-nav title="修改密码" bgColor="#fff" titleColor="#333" :isBack="true"></head-nav>

    <div class="content">
      <div class="list">
        <div class="name">原密码</div>
        <mt-field placeholder="请输入原密码" v-model="username"></mt-field>
      </div>
       <div class="list">
        <div class="name">新密码</div>
        <mt-field placeholder="请输入新密码" v-model="username"></mt-field>
      </div>
       <div class="list">
        <div class="name">确认新密码</div>
        <mt-field placeholder="请再次输入新密码" v-model="username"></mt-field>
      </div>
    </div>

    <div class="m-t">
      <my-btn title="确认修改"></my-btn>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      username:"",
      screeHeight: window.innerHeight
    }
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