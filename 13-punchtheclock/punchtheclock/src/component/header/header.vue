<template>
  <div class="app">
    <mt-header :style="{backgroundColor: bgColor, color: titleColor}" :title="title">
      <mt-button v-if="isBack" slot="left" icon="back" @click="goBack"></mt-button>
      <mt-button v-if="false" slot="right" icon="more"></mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    isBack: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: "#fff"
    },
    titleColor: {
      type: String,
      default: "#333"
    },
  },
  data() {
    return {
      //
    }
  },
  methods: {
    goBack(){
      if(!this.isBack) return;
      this.$router.go(-1);
    }
  }
}
</script>

<style lang='less' scoped>
  @rem: 750/10rem;
</style>