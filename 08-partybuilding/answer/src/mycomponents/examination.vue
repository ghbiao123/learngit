<template>
  <div id="app">
    <head-nav title="答题"></head-nav>
    <div class="content">
      <div class="cont">
        <div class="question">
          <div class="num">第一题</div>
          <div class="title">{{appData.name}}Who was it ______ put so many large stones on the road?</div>
          <div
            class="list"
            v-for="(value, key) in appData.order"
            @click="checkAnswer(key)"
            :key="key"
          >
            <div v-if="appData.state[key]=='normal'" class="radio">{{key}}</div>
            <div v-if="appData.state[key]=='success'" class="radio radio-s">
              <img src="../../static/images/success.png" alt />
            </div>
            <div v-if="appData.state[key]=='error'" class="radio radio-s">
              <img src="../../static/images/error.png" alt />
            </div>
            <div
              :class="appData.state[key]=='success'? 'label succ': appData.state[key]=='error'? 'label err':'label'"
            >{{value}}</div>
          </div>
        </div>
      </div>

      <div class="btn-box">
        <button class="btn" @click="prevQuestion">上一题</button>
        <button v-if="true" @click="nextQuestion" class="btn">下一题</button>
        <button v-if="false" class="btn sub">交卷</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: [
        {
          name: "第一题",
          answer: "A",
          order: {
            A: "optionsA",
            B: "optionsB",
            C: "optionsC",
            D: "optionsD",
          },
        },
        {
          name: "第二题",
          answer: "B",
          order: {
            A: "optionsA",
            B: "optionsB",
            C: "optionsC",
            D: "optionsD",
          },
        },
        {
          name: "第三题",
          answer: "C",
          order: {
            A: "optionsA",
            B: "optionsB",
            C: "optionsC",
            D: "optionsD",
          },
        },
      ],
      appData: {},
      idx:0
    };
  },
  created() {
    this.test = this.test.map((v) => {
      let state = {};

      for (let k in v.order) {
        state[k] = "normal";
      }
      v.state = state;
      return v;
    });

    this.appData = this.test[this.idx];
    this.appData = Object.assign({}, this.appData);
  },
  methods: {
    checkAnswer(userAnswer) {
      if (userAnswer == this.appData.answer) {
        this.appData.state[userAnswer] = "success";
      } else {
        this.appData.state[userAnswer] = "error";
      }
    },
    nextQuestion(){
      this.idx++;
      this.idx = Math.min(this.idx, this.test.length-1);
      this.appData = Object.assign({}, this.test[this.idx]);
    },
    prevQuestion(){
      this.idx--;
      this.idx = Math.max(this.idx, 0);
      this.appData = Object.assign({}, this.test[this.idx]);
    }
  },
};
</script>

<style lang='less' scoped>
@rem: 750/10rem;

.content {
  overflow: hidden;
  background-color: #f5f5f5;
  height: 100%;
}
.cont {
  margin-top: 20 / @rem;
  width: 10rem;
  height: auto;
  .question {
    width: 750 / @rem;
    padding: 20 / @rem;
    background-color: #fff;
    font-size: 28 / @rem;
    .num {
      font-weight: bold;
    }
    .title {
      padding: 10 / @rem 0;
      line-height: 1.5;
    }
    .list {
      display: flex;
      height: 90 / @rem;
      line-height: 90 / @rem;
      .radio {
        margin: 21 / @rem 0 0 20 / @rem;
        width: 48 / @rem;
        height: 48 / @rem;
        line-height: 44 / @rem;
        text-align: center;
        font-size: 28 / @rem;
        border: 1 / @rem solid #707070;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 48 / @rem;
          height: 48 / @rem;
        }
      }
      .radio-s {
        border: none;
      }
      .label {
        text-indent: 40 / @rem;
      }
      .err {
        color: #ea4e48;
      }
      .succ {
        color: #afe865;
      }
    }
  }
}
.btn-box {
  display: flex;
  justify-content: space-between;
  padding: 20 / @rem;
  width: 750 / @rem;
  .btn {
    width: 250 / @rem;
    height: 80 / @rem;
    color: #fff;
    background-color: #6248ea;
    border-radius: 10 / @rem;
  }
  .sub {
    color: #000;
    background-color: #ffd735;
  }
}
</style>