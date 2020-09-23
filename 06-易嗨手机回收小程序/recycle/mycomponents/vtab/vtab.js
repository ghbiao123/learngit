Component({
  data:{
    content:[0,1,2,3,4,5,6],
    selected: 0
  },
  properties:{
    vtab:{
      type:Array,
      value:[],
      observer(newVal){
        this.setData({
          vtab:newVal
        });
      }
    },
    vtabContent: {
      type: Object,
      value: {},
      observer(newVal){
        this.setData({
          vtabContent: newVal
        });
      }
    }
  },
  methods:{
    getSelected(e){
      let selected = e.currentTarget.dataset.index;
      let id = e.currentTarget.dataset.id;
      this.triggerEvent('vtabTitleId', id);
      this.setData({
        selected
      });
    }
  }
});