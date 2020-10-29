<template>
  <div class="app" :class="size == 'big' ? 'big' : 'small'">
    <!-- <div class="image" :style="{backgroundImage: `url(${src})`}"></div> -->
    <div class="image" v-viewer>
      <img class="img" v-lazy="src" alt="#">
    </div>
    <div class="text">{{text}}</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      images:[]
    }
  },
  created(){
    
  },
  props: ['size', 'src', 'text'],
  methods: {},
  mounted(){
    this.images.push(this.src);
  }
}
</script>

<style lang='less' scoped>
  @rem:750/10rem;
  .app{
    height: 240/@rem;
    box-shadow: 0 8/@rem rgba(0, 0, 0, 0.3);
    .viewer-footer{
      display: none;
    }
    .image{
      width: 100%;
      height: 195/@rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      background-color: #f5f5f5;
      .img{
        width: 100%;
        height: 100%;
      }
    }
    .text{
      width: 100%;
      height: 45/@rem;
      font-size: 20/@rem;
      line-height: 45/@rem;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      background: #e4ab72;
    }
  }
  .big{
    width: 300/@rem;
  }
  .small{
    width: 195/@rem;
  }

</style>