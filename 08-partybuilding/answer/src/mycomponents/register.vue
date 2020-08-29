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
        <mt-field placeholder="请输入账号" v-model="formData.phone"></mt-field>
      </div>
      <div class="name">密码</div>
      <div class="input">
        <mt-field placeholder="请输入密码" type="password" v-model="formData.password"></mt-field>
      </div>

      <div v-if="pageData.type=='register'">
        <div class="name">姓名</div>
        <div class="input">
          <mt-field placeholder="请输入姓名" v-model="formData.name"></mt-field>
        </div>
        <div class="name">部门</div>
        <div class="input">
          <mt-field placeholder="请输入部门" v-model="formData.bumen"></mt-field>
        </div>
      </div>

    </div>
    <div class="btn-box" v-if="pageData.type=='login'">
      <button @click="getRequest" data-type="login" class="button select">登录</button>
      <button class="button blur" data-page='register' @click="changePage">立即注册</button>
    </div>
    <div class="btn-box" v-if="pageData.type=='register'">
      <button @click="getRequest" data-type="register" class="button select">注册</button>
      <button class="button blur" data-page='login' @click="changePage">登录</button>
    </div>
  </div>
</template>

<script>
// import func from '../../vue-temp/vue-editor-bridge';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
     pageData:{
       title: '登录',
       type: 'login'
     },
     formData:{
       phone:'',
       password: '',
       name: '',
       bumen: ''
     }
    };
  },
  methods: {
    getRequest(e){
      let that = this;

      let type = e.target.dataset.type;
      console.log(this.formData);

      let needData = {
        phone:'账号/手机号',
        password: '密码',
        name: '姓名',
        bumen: '部门'
      }


      // 验证手机号
      var checkPhone = function (num){
        if(!num) return;
        let reg = /^1[3-9]{1}\d{9}$/g;
        return reg.test(num);
      }


      let url = '';
      let data = {}
      if(type == 'login'){
        // 登录验证
        url = '/api/login/login';
        data.phone = this.formData.phone;
        data.password = this.formData.password;
        
      }else if(type == 'register'){
        // 用户注册
        url = '/api/login/register';
        data = this.formData;
      }

      for(let key in needData){
        if(data.hasOwnProperty(key)&&!data[key]){
          Toast({
            message: needData[key] + '不能为空'
          });
          return 
        }
      }

      this.$ajax.post(url, data).then(res=>{
        
        console.log(res);
        Toast({message: res.data.msg, duration: 2000});

        if(type == 'login'){
          // 登录
          if(res.data.code == 2001){
            // 登录成功，跳转页面，写入storage
            localStorage.setItem('userid', res.data.users_id);
            setTimeout(()=>{
              that.$router.push({name:'index'});
            }, 3000);
          }
          
        }else if(type == 'register'){
          // 用户注册
          if(res.data.code==2001){
            // 注册成功，进行登录
            setTimeout(() => {
              that.pageData.title = '登录';
              that.pageData.type = 'login';
            }, 2000);
          }
          
        }
      });
      
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