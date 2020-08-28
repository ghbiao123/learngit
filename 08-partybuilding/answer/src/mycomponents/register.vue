<template>
  <div id="app">
    <head-nav :hideGoBack="true" :title="pageData.title"></head-nav>
    <div class="nav-title">
      <div class="title">崖州区实用英语云课堂</div>
      <div class="tip">学好外语ABC,建设海南FTP</div>
    </div>

    <div class="form">
      <div class="name">账号/手机号</div>
      <div class="input">
        <mt-field placeholder="请输入账号" v-model="value"></mt-field>
      </div>
      <div class="name">密码</div>
      <div class="input">
        <mt-field placeholder="请输入密码" type="password" v-model="value"></mt-field>
      </div>

      <div v-if="pageData.type=='register'">
        <div class="name">姓名</div>
        <div class="input">
          <mt-field placeholder="请输入姓名" v-model="value"></mt-field>
        </div>
        <div class="name">部门</div>
        <div class="input">
          <mt-field placeholder="请输入部门" v-model="value"></mt-field>
        </div>
      </div>

    </div>
    <div class="btn-box" v-if="pageData.type=='login'">
      <button @click="getRequest" data-type="login" class="button select">登录</button>
      <button class="button blur" data-page='register' @click="changePage">立即注册</button>
    </div>
    <div class="btn-box" v-if="pageData.type=='register'">
      <button @click="getRequest" data-type="login" class="button select">注册</button>
      <button class="button blur" data-page='login' @click="changePage">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     pageData:{
       title: '登录',
       type: 'login'
     },
     value: ''
    };
  },
  methods: {
    getRequest(e){
      let type = e.target.dataset.type;
      
      
    },
    changePage(e){
      let page = e.target.dataset.page;
      if(page == 'register'){
        this.pageData.title = '注册';
      }else if(page == 'login'){
        this.pageData.title = '登录';
      }
      this.pageData.type = page;
    }
  },
};
</script>

<style lang='less' scoped>
@rem: 750/10rem;
#app {
  .nav-title {
    padding: 50 / @rem 50 / @rem 20 / @rem;
    line-height: 1.5;
    .title {
      font-size: 36 / @rem;
      font-weight: bold;
    }
    .tip {
      font-size: 28 / @rem;
      color: #999999;
    }
  }
  .form {
    padding: 0 50 / @rem;
    .name {
      padding: 30 / @rem 0 0;
      font-size: 32 / @rem;
      font-weight: bold;
    }
    .input {
      border-bottom: 1 / @rem solid #f5f5f5;
    }
  }
  .btn-box {
    padding-top: 30 / @rem;
    text-align: center;
    .button {
      margin-top: 10 / @rem;
      width: 630 / @rem;
      height: 90 / @rem;
      border: none;
      outline: none;
      border-radius: 20 / @rem;
    }
    .select {
      background-color: #6248ea;
      color: #fff;
    }
    .blur {
      color: #6248ea;
      background-color: #fff;
    }
  }
}
</style>