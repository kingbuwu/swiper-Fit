// component/swiperFit/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listimg: {
      type: null
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    configimg: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0
  },
  ready: function() {
    this.initData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //格式化数组
    initData: function() {
      if (!this.data.listimg && this.data.listimg.length == 0){
        console.log("没有图片")
         return;
      }
      let list = this.data.listimg;
      let newList = [];
      for (let i = 0; i < list.length; i++) {
        let h = {};
        h.showImg = list[i];
        newList.push(h);
      }
      this.getDownLoadimg(newList);
    },

    //获取图片真实宽高
    getDownLoadimg: function(list) {
      let that = this;
      let f = 0;
      for (let h = 0; h < list.length; h++) {
        wx.getImageInfo({
          src: list[h].showImg,
          success: function(res) {
            list[h].width = res.width;
            list[h].height = res.height;
          },
          fail: function(err) {
            console.log("错误")
            console.log(err)
          },
          complete: function(res) {
            f++
            if (f == list.length) {
              console.log('执行完毕');
              that.getImgMax(list)
            } else {
              console.log("继续");
            }
          }
        })
      }
    },

    //计算高度比求最大高度值
    getImgMax: function(list) {
      let heightArr = [];
      for (let g = 0; g < list.length; g++) {
        //获取图片真实宽度  
        var imgwidth = list[g].width,
          imgheight = list[g].height,
          //宽高比  
          ratio = imgwidth / imgheight;
        //计算的高度值  
        var viewHeight = 750 / ratio;
        var imgheight = viewHeight
        heightArr.push(imgheight)
        list[g].imgheight = imgheight;
      }
      for (let t = 0; t < list.length; t++) {
        var maxN = this.checkMax(heightArr)
        list[t].maxHeight = maxN;
      }
      console.log(list)
      this.setData({
        configimg: list
      })
    },

    //判断最大值
    checkMax: function(heightArr) {
      let maxN = Math.max.apply(null, heightArr);
      return maxN;
    },

    swiperchange: function(e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
  }
})