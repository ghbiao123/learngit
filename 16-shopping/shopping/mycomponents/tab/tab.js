Component({
  data: {
    selected: 0,
  },
  properties: {
    title: {
      type: Array,
      value: []
    },
    selected: {
      type: Number,
      value: 0
    }
  },
  methods: {
    getSelected(e){
      let selected = e.currentTarget.dataset.idx;
      let id = e.currentTarget.dataset.id;
      this.setData({
        selected
      });
      this.triggerEvent('getSelected', {
        selected,
        id,
      });
    },

  }
});