var app = getApp()
Page({
  data:{
    activeIndex:0,
    ulInfo:[
        {
            type:'mr',
            typecontent:'tuijian',
            text:'推荐',
            imgSrc:'',
            active:'active'
        },
        {
            type: 'mr',
            typecontent: '2',
            text: '最新',
            imgSrc: '',
            active: ''
        },
        {
            type: 'mr',
            typecontent: '',
            text: '默认',
            imgSrc: '',
            active: ''
        },
        {
            type: '',
            typecontent: '',
            text: '筛选',
            imgSrc: '/images/loudou.png',
            active: ''
        }
    ],
    postData : {
        mr: '',
        grade: '',
        xueke: '',
        head: 0,
        foot: 10,
        newdata: '',
        pricestart: 0,
        priceend: ''
    },
    getData:[],
    isCanScrool:true,
    noHas:false
  },
  // 选择事件
  choose:function(e){
      var dataset = e.currentTarget.dataset;
      if (dataset.type==="mr"){
        var newPostData = this.data.postData;
        newPostData.mr = dataset.typecontent
        newPostData.head = 0;
        newPostData.foot = 10;
        this.setData({
            activeIndex: dataset.index,
            postData: newPostData
        });
        this.getData(1)
      }else{
          wx.navigateTo({
              url: '../searchBox/searchBox'
          })
      }
  },
  onLoad:function(options){
      var newPostData = this.data.postData;
      newPostData.head = 0;
      newPostData.foot = 10;
      var now = Object.assign(newPostData,options);
      this.getData(0);      
  },
  getData(isClear){
      var that = this;
      wx.showLoading({
          title: '加载中',
      });
      wx.request({
          url: 'https://m.yimishuyuan.com/wx/class_data',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: that.data.postData,
          method: "POST",
          success: function (response) {
              wx.hideLoading()
              var data = JSON.parse(response.data.slice(2, response.data.length - 2));
              var mydata = data.Body;
              var mowdata;
              if(isClear){
                  mowdata = mydata;
              }else{
                  var olddata = that.data.getData
                  mowdata = olddata.concat(mydata);
              }
              that.setData({
                  getData: mowdata
              })
              if(data.number<that.data.postData.foot){
                  that.setData({
                      isCanScrool: false,
                      noHas:true
                  })
                  return 
              }
          },
          error:function(){
              wx.showLoading({
                  title: '网络错误',
                  duration:2000
              });
          }
      });
  },
  onReachBottom(){
      if (this.data.isCanScrool){
        var newPostData = this.data.postData;
        var nowHeade = newPostData.foot+1;
        var nowFoot = nowHeade + 10;
        newPostData.head = nowHeade
        newPostData.foot = nowFoot
        this.setData({
            postData: newPostData
        })
        this.getData(0);
      }
  }
}) 

