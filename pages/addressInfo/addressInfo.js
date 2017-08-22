// pages/addressInfo/addressInfo.js
let utils = require('../../utils/utils.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        mydata:{},
        hasHeight:null
    },
    imageLoad: function (e) {
      this.setData({ hasHeight: e.detail.height })
    },
    call(e){
      wx.makePhoneCall({
        phoneNumber: e.currentTarget.dataset.phone
      })
    },
    goMap(e){
      wx.navigateTo({
        url: `../map/map?${utils.objToString(e.currentTarget.dataset)}` 
      })
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        });
        let that = this;
        if (!options.id) {
            options.id = 6;
        }
        wx.request({
          url: 'https://m.yimishuyuan.com/info/addressinfo?id=' + options.id,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: that.data.postData,
          method: "POST",
          success: (response) => {
            let data = JSON.parse(response.data.slice(2, response.data.length - 2));
            let body = data.body.replace(/[&nbsp;\s]*<[^>]+>[&nbsp;\s]*/g, '').split('。'); 
            let imgs = data.img.split(',');
            that.setData({
              add:data.add,
              body: body,
              mark: data.mark,
              tel:data.tel,
              title: data.title,
              imgs:imgs
            });
            wx.hideLoading()
          },
          error: (err) => {
            console.log(err);
          }
        });
    },
})