// address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    showSpan:[
      {
        title:'依米书院',
        open:false
      },
      {
        title: '依米培优',
        open: false
      }
    ],
    activeRole:'all',
    showRole:null,
    showRoleIndex:null,
    showMainBox:null,
    showMainBoxIndex:null
  },
  //选择
  chooseData(e){
    let role = e.target.dataset.role;
    let showSpan = this.data.showSpan;
    showSpan[0].open=false;
    showSpan[1].open=false;
    this.setData({
      isShow:false,
      activeRole: role,
      showMainBoxIndex: this.data.showRoleIndex,
      showSpan: showSpan
    });
  },
  //切换书院培优
  chooseSpan(e){
    let index = e.target.dataset.index;
    let open = e.target.dataset.open;
    //有待优化
    if(index==undefined){
      return
    }
    let showSpan = this.data.showSpan;
    showSpan[index].open = !open;
    if(index==0){
      showSpan[1].open = false;
    }else{
      showSpan[0].open = false;
    }
    let isShow ;
    if (!showSpan[0].open && !showSpan[1].open){
      isShow = false;
    }else{
      isShow = true;
    }
    this.setData({
      showSpan: showSpan,
      isShow: isShow,
      showRoleIndex:index
    });
  },
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '加载中',
      icon:'loading'
    });
    wx.request({
      url: 'https://m.yimishuyuan.com/info/address_data',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "POST",
      success: function (response) {
        wx.hideLoading()
        let data = JSON.parse(response.data.slice(2, response.data.length - 2));
        data.others.unshift({ DataId: "all", DataName:"全部"});
        data.right.unshift({ DataId: "all", DataName:"全部"});
        let showRoleIndex = 0;
        let showMainBoxIndex =0;
        that.setData({
          showRoleIndex: showRoleIndex,
          showRole: [data.others, data.right],
          showMainBoxIndex: showMainBoxIndex,
          showMainBox:[data.Body,data.info]
        });
      },
      error: function () {
        wx.showLoading({
          title: '网络错误',
          duration: 2000
        });
      }
    });
  },
})