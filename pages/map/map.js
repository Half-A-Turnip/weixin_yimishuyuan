// map.js
Page({
  data: {
    latitude: 0,
    longitude: 0,
    markers: [{
      iconPath: "../../images/location.png",//显示图标
      id: 0,//标记点id
      latitude: 120.254856,//纬度
      longitude: 30.050868,//经度
      width: 30,//图标宽度
      height: 30,//图标高度
      callout:{
        content:'某某书院',
        color:'#fff',
        fontSize:'20rpx',
        borderRadius:5,
        bgColor:'#32b16c',
        padding:5,
        display:'ALWAYS'
      }
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  onLoad(option){
    let point = option.point.split(",");
    let markers = this.data.markers;
    markers[0].latitude = point[0];
    markers[0].longitude = point[1];
    markers[0].callout.content = option.name;
    console.log(this.data);
    // this.setData({
    //   markers: markers,
    //   latitude: point[0],
    //   longitude: point[1]
    // })
  }
})