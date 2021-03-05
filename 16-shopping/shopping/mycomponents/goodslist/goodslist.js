Component({
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  methods: {
    getGoodsDetail(e){
      let id = e.currentTarget.dataset.id;
      console.log(id);
    }
  }
});