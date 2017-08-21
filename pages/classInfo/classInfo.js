//classInfo.js
Page({
  data: {
      showSpanS:{
          activeIndex:0,
          spans:[
              '课程简介','主讲教师','课程目录'
          ]
      },
      hasFixed:false,
      firstTo:true,
      firstFrom:true,
      postData: {
          mr: '',
          grade: '',
          xueke: '',
          head: 0,
          foot: 10,
          newdata: '',
          pricestart: 0,
          priceend: ''
      },
      Body:{},
      getData:[],
      mulu:[]
  },
  checkSpan: function(e){
      let newshowSpanS = this.data.showSpanS
      newshowSpanS.activeIndex = e.target.dataset.index
      this.setData({
          showSpanS: newshowSpanS
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//不适用es6是由于this 的指向
    wx.showLoading({
        title: '加载中',
    });
    var that = this;
    if(!options.id){
        options.id=160;
    }
    console.log(options.id)
    wx.request({
        // 
        url: 'https://m.yimishuyuan.com/info/classinfo?id=' + options.id, //仅为示例，并非真实的接口地址
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: that.data.postData,
        method: "POST",
        success: (response) =>{
            var data = JSON.parse(response.data.slice(2, response.data.length - 2));
            that.setData({
                Body: data.Body[0],
                getData: data.info,
                mulu: data.others
            })
            wx.hideLoading()
        },
        error:(err)=>{
            console.log(err);
        }
    });
  },
  onPageScroll:function(e){
      var that = this;
      wx.createSelectorQuery().selectAll('#img').boundingClientRect(function (rects) {
          var has = false;
          let height = rects[0].height;
          let hasTop = Math.abs(rects[0].top)
          wx.createSelectorQuery().select('#showSpanBox').fields({
              dataset: true,
          }, function (res) {
              has = res.dataset.has
              if (height > hasTop) {
                  if (!has) {
                      return
                  }
                  that.setData({
                      hasFixed: false
                  })
              } else {
                  if (has) {
                      return
                  }
                  that.setData({
                      hasFixed: true
                  })
              }
          }).exec()
      }).exec()
  }
})