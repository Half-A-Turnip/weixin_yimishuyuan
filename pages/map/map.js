Page({
  data: {
    latitude: null,
    longitude: null,
    markers: [{
      iconPath: "../../images/location.png",
      id: 0,
      latitude: null,
      longitude: null,
      width: 30,
      height: 30,
      callout:{
        content:'',
        color:'#fff',
        fontSize:'20rpx',
        borderRadius:5,
        bgColor:'#32b16c',
        padding:5,
        display:'BYCLICK'
      }
    }]
  },
  markertap(e) {
    if(!wx.canIUse('map.bindcallouttap')){
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onLoad(option){
    if(!option){
      wx.navigateBack({
        delta: 1
      });
    }
    let point = option.point.split(",");
    let markers = this.data.markers;
    markers[0].latitude = point[1];
    markers[0].longitude = point[0];
    markers[0].callout.content = `${option.title}<br>${option.name}`;
    wx.setNavigationBarTitle({
      title: `地图-${option.title}`
    });
    this.setData({
      markers: markers,
      latitude: point[1],
      longitude: point[0]
    });
  }
})