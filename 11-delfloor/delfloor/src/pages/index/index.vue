<template>
  <div id="app">
    <div class="banner">
      <img src="../../../static/images/banner_up.jpg" alt="" />
      <img src="../../../static/images/banner_down.png" alt="" />
    </div>

    <div class="form">
      <div class="form-item">
        <div class="name">姓名：</div>
        <div class="cont">
          <el-input v-model="name" placeholder="请输入您的姓名"></el-input>
        </div>
      </div>

      <div class="form-item">
        <div class="name">手机：</div>
        <div class="cont">
          <el-input
            v-model="phone"
            type="number"
            placeholder="请输入您的手机号码"
          ></el-input>
        </div>
      </div>

      <div class="form-item">
        <div class="name">地址：</div>
        <div class="cont">
          <el-select v-model="provence" placeholder="省份">
            <el-option
              v-for="(val, key) in arrProvence"
              :key="key"
              :label="val"
              :value="key"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="form-item">
        <div class="name"></div>
        <div class="cont">
          <el-select v-model="city" placeholder="城市">
            <el-option
              v-for="(val, key) in getArrCity"
              :key="key"
              :label="val"
              :value="key"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="form-item">
        <div class="name"></div>
        <div class="cont">
          <el-select v-model="country" placeholder="区域">
            <el-option
              v-for="(val, key) in getCountry"
              :key="key"
              :label="val"
              :value="key"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="form-item">
        <div class="name">样板选择：</div>
        <div class="cont">
          <el-select v-model="country" placeholder="请选择">
            <el-option
              v-for="(val, key) in getCountry"
              :key="key"
              :label="val"
              :value="key"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div class="submit">
      <button class="button-clear btn-big">免费抢先预约</button>
    </div>

      <button class="button-clear btn-small">实木复合地板</button>

    <!-- 地板样式展示 -->
    <div @click="log">
      <project-view size="big" src="../../static/images/test1.png" text="这是一段文字，这是一段文字"></project-view>
    </div>
    <project-view size="small" src="../../static/images/test1.png" text="这是一段文字，这是一段文字"></project-view>


      <viewer v-if="false" :images="images">
        <img v-for="(item, index) in images" :key="index" :src="item" alt="#">
      </viewer>

  </div>
</template>

<script>
import region from "../../assets/region.json";
export default {
  data() {
    return {
      //
      images:['../../../static/images/test1.png', '../../../static/images/test2.png'],
      // 以上为测试数据
      name: "",
      phone: "",
      arrProvence: [],
      provence: "",
      city: "",
      country: "",
    };
  },
  created() {
    // 省份数据
    this.arrProvence = region["0"];
  },
  methods: {
    log(){
      console.log('a');
    }
  },
  // 计算属性
  computed: {
    // 筛选当前省份的城市
    getArrCity() {
      return region[`0,${this.provence}`];
    },
    getCountry() {
      return region[`0,${this.provence},${this.city}`];
    },
  },
};
</script>

<style lang='less' scoped>
@rem:750 /10rem;
#app {
  padding-bottom: 40 / @rem;
  overflow: hidden;
  background-color: #e60315;
  background-image: linear-gradient(
    to right,
    #e60315 0%,
    #fb293a 50%,
    #e60315 100%
  );
  background-repeat: repeat-y;
  .banner {
    img {
      width: 750 / @rem;
    }
  }
  .form {
    margin: 55 / @rem auto 0;
    padding: 20 / @rem 0 40 / @rem;
    width: 670 / @rem;
    background-color: #fff;
    border: 10 / @rem solid #e4ab72;
    border-radius: 10 / @rem;
    .form-item {
      display: flex;
      margin-top: 20 / @rem;
      .name {
        width: 180 / @rem;
        height: 80 / @rem;
        line-height: 80 / @rem;
        text-align: center;
        font-size: 15px;
      }
      .cont {
        display: flex;
        align-items: center;
        font-size: 0;
        width: 470 / @rem;
        height: 82 / @rem;
        overflow: hidden;
      }
      .cont > .el-select {
        width: 470 / @rem;
      }
    }
  }
  .submit{
    padding: 45/@rem 0 100/@rem;
  }

  // 按钮样式
  .button-clear {
    display: block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0 auto;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    height: 64/@rem;
    line-height: 64/@rem;
    font-size: 30/@rem;
    border-radius: 20/@rem;
    color: #fff;
    background-color: #e4ab72;
    border-color: #e4ab72;
    box-shadow: 2 / @rem 8 / @rem rgba(0, 0, 0, .3);
  }
  .button-clear:hover{
    background-color: #da9572;
    border-color: #da9572;
  }
  .btn-big{
    width: 440/@rem;
  }
  .btn-small{
    width: 360/@rem;
  }
}
</style>