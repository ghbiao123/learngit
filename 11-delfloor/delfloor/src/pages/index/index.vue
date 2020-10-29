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
          <el-select v-model="proid" placeholder="请选择">
            <el-option
              v-for="val in moduleList"
              :key="val.id"
              :label="val.name"
              :value="val.id"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div class="submit">
      <button @click="submit" class="button-clear btn-big">免费抢先预约</button>
    </div>

    <div class="case" v-for="(item, index) in list" :key="index">
      <div class="title">
        <button class="button-clear btn-small">{{ item.name }}</button>
      </div>
      <div class="cont" v-if="item.id != 3">
        <div
          class="cont-item"
          @click="previewImage(itm.image)"
          v-for="(itm, idx) in item.prolist"
          :key="idx"
        >
          <project-view
            size="big"
            :src="itm.image"
            :text="itm.name"
          ></project-view>
        </div>
      </div>

      <div class="cont" v-if="item.id == 3">
        <div
          class="cont-item"
          @click="previewImage(itm.image)"
          v-for="(itm, idx) in item.prolist"
          :key="idx"
        >
          <div v-if="idx <= 2">
            <project-view
              size="small"
              :src="itm.image"
              :text="itm.name"
            ></project-view>
          </div>
          <div v-else-if="idx > 2 && idx <= 4">
            <project-view
              size="big"
              :src="itm.image"
              :text="itm.name"
            ></project-view>
          </div>
          <div v-else>
            <project-view
              size="small"
              :src="itm.image"
              :text="itm.name"
            ></project-view>
          </div>
        </div>
      </div>
    </div>

    <!-- 说明 -->
    <div class="explain">
      <div class="tit">说明</div>
      <div class="dashed">
        <div class="triangle triangle-l"></div>
        <div class="triangle triangle-r"></div>
      </div>
      <div class="explain-cont">
        <div class="cont-item" v-for="(item, index) in explain" :key="index">
          <div class="item-order">{{ index + 1 }}</div>
          <div class="item-text">{{ item }}</div>
        </div>
      </div>
    </div>

    <!-- 展示框组件 -->
    <!-- <viewer :images="arrShowImage">
      <img
        v-for="(item, index) in arrShowImage"
        :key="index"
        :src="item"
        alt="#"
      />
    </viewer> -->

    <!-- <el-button :plain="true"></el-button> -->
  </div>
</template>

<script>
import region from "../../assets/region.json";
import stieRoot from "../../../config/program.config";
export default {
  data() {
    return {
      // 以上为测试数据
      name: "",
      phone: "",
      arrProvence: [],
      provence: "",
      city: "",
      country: "",
      proid: "",
      showPreview: true,
      arrShowImage: [],
      explain: [
        "因地址问题或其他原因导致我司无法提供对应的测量服务，我司不承担任何相应责任！",
        "门店工作人员预约上门前会与您确定是否超出服务范围",
        "测量不收费，但若超出最近门店服务范围而产生的“路程费”我司及门店不承担。",
        "如在上门测量过程中出现任何疑问，可直接在微信后台咨询人工客服。",
      ],
      list: [],
      moduleList: [],
    };
  },
  created() {
    // 省份数据
    this.arrProvence = region["0"];
    this.$ajax.post("/api/index/getMainInfo").then((res) => {
      console.log(res.data);
      this.list = res.data.data.plistshow.map((v) => {
        v.prolist.map((v) => {
          v.image = `${stieRoot.rootSite}${v.image}`;
          return v;
        });
        return v;
      });
      this.moduleList = res.data.data.plist;
    });
  },
  methods: {
    // 展示图片
    previewImage(data) {
      console.log(data);
      this.showPreview = true;
      this.arrShowImage = [data];
    },
    // 提交表单
    submit() {
      let that = this;
      // let address = `${region[0][this.provence]},${region[`0,${this.provence}`][this.city]},${region[`0,${this.provence},${this.city}`][this.country]}`;
      let needData = {
        name: this.name,
        mobile: this.phone,
        province: this.provence,
        city: this.city,
        region: this.country,
        proid: this.proid,
      };
      for (let key in needData) {
        if (key == "mobile") {
          let reg = new RegExp(/^1[3-9]\d{9}$/);
          if (!reg.test(needData[key])) {
            return this.$message({
              message: "您的手机号有误",
              type: "warning",
            });
          }
        }
        if (!needData[key]) {
          return this.$message({
            message: "请您完善信息后再提交",
            type: "warning",
          });
        }
      }
      let data = {
        name: this.name,
        mobile: this.phone,
        province: region[0][this.provence],
        city: region[`0,${this.provence}`][this.city],
        region: region[`0,${this.provence},${this.city}`][this.country],
        proid: this.proid,
      };
      console.log(data);

      this.$ajax.post("/api/index/userEnroll", data).then((res) => {
        let ret = res.data;
        console.log(ret);

        if (ret.code == 0) {
          that.$message({
            message: ret.msg,
            type: "success",
          });

          // 清空数据
          this.name = "";
          this.phone = "";
          this.provence = "";
          this.city = "";
          this.country = "";
          this.proid = "";
        } else {
          that.$message({
            message: ret.msg,
            type: "warning",
          });
        }

        // this.country = ''
      });
    },
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
  padding-bottom: 150 / @rem;
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
  .submit {
    padding: 45 / @rem 0 100 / @rem;
  }
  .case {
    padding: 5 / @rem 0 80 / @rem;
    width: 630 / @rem;
    margin: 0 auto;
    .title {
      padding-bottom: 36 / @rem;
    }
    .cont {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .cont-item {
        padding-bottom: 25 / @rem;
      }
    }
  }

  .explain {
    padding: 40 / @rem 0 60 / @rem;
    margin: 0 auto;
    width: 680 / @rem;
    background-color: #fff;
    .tit {
      font-size: 30 / @rem;
      color: #777777;
      text-align: center;
      line-height: 1.5;
    }
    .dashed {
      position: relative;
      margin: 20 / @rem auto;
      width: 620 / @rem;
      height: 0;
      border-top: 2 / @rem dashed #cacaca;
      .triangle {
        position: absolute;
        top: -14 / @rem;
        width: 0;
        height: 0;
        border-top: 15 / @rem solid rgba(0, 0, 0, 0);
        border-bottom: 15 / @rem solid rgba(0, 0, 0, 0);
      }
      .triangle-l {
        border-left: 15 / @rem solid #e80013;
        left: -30 / @rem;
      }
      .triangle-r {
        border-right: 15 / @rem solid #e80013;
        right: -30 / @rem;
      }
    }
    .explain-cont {
      width: 610 / @rem;
      margin: 0 auto;
      .cont-item {
        display: flex;
        line-height: 40 / @rem;
        .item-order {
          margin: 5 / @rem;
          width: 30 / @rem;
          height: 30 / @rem;
          line-height: 30 / @rem;
          font-size: 22 / @rem;
          text-align: center;
          border-radius: 50%;
          color: #fff;
          background-color: #e4ab72;
          overflow: hidden;
        }
        .item-text {
          width: 565 / @rem;
          padding-left: 10 / @rem;
          font-size: 24 / @rem;
          color: #777777;
        }
      }
    }
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
    height: 64 / @rem;
    line-height: 64 / @rem;
    font-size: 30 / @rem;
    border-radius: 20 / @rem;
    color: #fff;
    background-color: #e4ab72;
    border-color: #e4ab72;
    box-shadow: 2 / @rem 8 / @rem rgba(0, 0, 0, 0.3);
  }
  .button-clear:hover {
    background-color: #da9572;
    border-color: #da9572;
  }
  .btn-big {
    width: 440 / @rem;
  }
  .btn-small {
    width: 360 / @rem;
  }
}
</style>