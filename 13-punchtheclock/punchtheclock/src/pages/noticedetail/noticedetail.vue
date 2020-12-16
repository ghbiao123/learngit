<template>
  <div id="app" :style="{minHeight: screeHeight+'px'}">
    <head-nav title="公告详情" bgColor="#fff" titleColor="#333" :isBack="true"></head-nav>

    <div class="content" :key="index">
      <div class="cell-item">
        {{detail.name}}
      </div>
      <div class="cell-cont" v-html="detail.textcontent"></div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      detail: "",
      screeHeight: window.innerHeight
    }
  },
  
  mounted(){
    let that = this;
    let data = {};
    console.log(this.$route);
    data.text_id = this.$route.params.id;

    this.$ajax.post("/api/users/getHuodongDetail", data).then(res=>{
      console.log(res);
      this.detail = res.data.data;
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
      font-size: 16px;
      .cell-item{
        display: flex;
        justify-content: center;
        width: 670/@rem;
        height: 80/@rem;
        font-size: 30/@rem;
        font-weight: bold;
        line-height: 80/@rem;
        border-bottom: 1/@rem solid #f5f5f5;
      }
      .cell-cont{
        padding-top: 20px;
        // font-size: 26/@rem;
        // color: #666;
        // line-height: 54/@rem;
      }
    }

  }
</style>