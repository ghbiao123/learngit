<template>
  <div id="app" :style="{height: screeHeight+'px'}">
    <head-nav title="个人中心" bgColor="#FA2D2D" titleColor="#fff" :isBack="true"></head-nav>
    
    <div class="head-bg"></div>

    <div class="userinfo">
      <div class="info">
        <div class="name">吴彦祖</div>
        <div class="birth">吴彦祖</div>
      </div>

      <router-link :to="{name: 'personaldata'}">
        <div class="to-personal">
          <img src="../../../static/images/gerenziliao.png" class="to-personal-img" alt="#">
          <div class="to-personal-text">个人资料</div>
        </div>
      </router-link>
    </div>

   <div class="content">
      <div class="cell-item">
        <mt-cell title="活动公告" :to="{name:'record'}" is-link>
          <img slot="icon" src="../../../static/images/huodonggonggao.png" width="16" height="16">
        </mt-cell>
      </div>
      <div class="cell-item">
        <mt-cell title="修改密码" :to="{name:'changepassword'}" is-link>
          <img slot="icon" src="../../../static/images/xiugaimima.png" width="16" height="16">
        </mt-cell>
      </div>
      <div class="cell-item">
        <mt-cell title="活动记录" :to="{name:'record'}" is-link>
          <img slot="icon" src="../../../static/images/huodongjilu.png" width="16" height="16">
        </mt-cell>
      </div>
   </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      screeHeight: window.innerHeight
    }
  },
  methods: {}
}
</script>

<style lang='less' scoped>
  @rem: 750/10rem;
  #app{
    color: #333333;
    background-color: #ffffff;
    .head-bg{
      width: 100%;
      height: 160/@rem;
      border-radius: 0 0 50% 50%;
      background-color: #FA2D2D;
    }
    .userinfo{
      display: flex;
      align-items: center;
      padding: 20/@rem;
      margin: -80/@rem auto 0;
      width: 670/@rem;
      height: 120/@rem;
      background-color: #ffffff;
      border-radius: 20/@rem;
      box-shadow: 0 0 10/@rem rgba(0, 0, 0, 0.4);
      .info{
        line-height: 60/@rem;
        width: 500/@rem;
        .name{
          font-size: 32/@rem;
          font-weight: bold;
        }
        .birth{
          font-size: 28/@rem;
        }
      }
      .to-personal{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 144/@rem;
        height: 44/@rem;
        border-radius: 22/@rem;
        border: 2/@rem solid #707070;
        overflow: hidden;
        .to-personal-img{
          width: 25/@rem;
          height: 25/@rem;
        }
        .to-personal-text{
          padding-left: 5/@rem;
          font-size: 20/@rem;
        }
      }
    }

    .content{
      margin: 30/@rem auto 0;
      width: 670/@rem;
    }
    .cell-item{
      width: 670/@rem;
      height: 100/@rem;
      border-bottom: 1/@rem solid #f5f5f5;
    }
  }
</style>