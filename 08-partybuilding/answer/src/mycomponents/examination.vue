<template>
  <div id="app">
    <head-nav title="答题"></head-nav>
    <div class="content">
      <div class="cont">
        <div class="question">
          <div class="num">第{{appData.num}}题</div>
          <div class="title">{{appData.name}}</div>
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
        <button v-if="!isLast" @click="nextQuestion" class="btn">下一题</button>
        <button v-if="isLast" @click="submit" class="btn sub">交卷</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      test: [],
      appData: {},
      idx:0,
      isLast:false,
      reqData:{

      }
    };
  },
  created() {

    // 获取试题
    let that = this;
    let subject_id = this.$route.query.id;

    this.$ajax.post('/api/shou_ye/getKecheng', {subject_id}).then(res=>{
      // 最终请求数据
      that.reqData.subject_id = res.data.data.id;
      that.reqData.kecheng_id = res.data.data.kecheng_id;
      // 对数据进行格式化
      let data = res.data.data.data;
      let len = data.length;
      
        data = data.map((v, i)=>{
          let d = {
            num: i+1
          };
          d.name = v['stem'+(i+1)];
          d.answer = v['right_key'+(i+1)];
          d.order = JSON.parse(v['subject'+(i+1)]);
          let state = {};
          for (let k in d.order) {
            state[k] = "normal";
          }
          d.state = state;
          return d;
        });
      
      that.test = [...data];
      that.appData = this.test[this.idx];
      that.appData = Object.assign({}, this.appData);
    });
  },
  mounted(){
    
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
      if(this.appData.state[this.appData.answer] !== 'success'){
        Toast({message: '请选出正确的选项'});
        return;
      }
      this.idx++;
      this.idx = Math.min(this.idx, this.test.length-1);
      if(this.idx == this.test.length-1){
        this.isLast = true;
      }
      this.appData = Object.assign({}, this.test[this.idx]);
    },
    prevQuestion(){
      this.idx--;
      if(this.idx<0){
        Toast({message:'已到第1题'});
      }
      this.isLast = false;
      this.idx = Math.max(this.idx, 0);
      this.appData = Object.assign({}, this.test[this.idx]);
    },
    submit(){
      if(this.appData.state[this.appData.answer] !== 'success'){
        Toast({message: '请选出正确的选项'});
        return;
      }

      let that = this;

      this.reqData.users_id = localStorage.getItem('userid');

      this.$ajax.post('/api/shou_ye/dati', this.reqData).then(res=>{
        

        Toast({message: res.data.msg});

        setTimeout(()=>{
          that.$router.go(-1);
        },3000);

      });

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
    margin: 0 auto;
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
  margin: 0 auto;
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