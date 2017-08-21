// searchBox.js
Page({
  data: {
      selectBoxGroup:[
          {
              title:'开班日期',
              type:'time', 
              placeholder: '选择开始日期',
              start:'2017-6-20',
              end:'2017-10-20'
          },
          {
              title:'学科',
              type:'xueke',
              activeIndex:0,
              selectSpan:[
                  {
                    text:'全部',
                    typecontent:null
                  },
                  {
                      text: '数学',
                      typecontent: 1002
                  },
                  {
                      text: '科学',
                      typecontent: 1004
                  },
                  {
                      text: '语文',
                      typecontent: 1001
                  },
                  {
                      text: '英语',
                      typecontent: 1003
                  },
                  {
                      text: '物理',
                      typecontent: 1006
                  },
                  {
                      text: '化学',
                      typecontent: 1009
                  },
                  {
                      text: '生物',
                      typecontent: 1005
                  },
                  {
                      text: '历史',
                      typecontent: 1008
                  },
                  {
                      text: '政治',
                      typecontent: 1007
                  },
                  {
                      text: '地理',
                      typecontent: 1010
                  },
              ]
          },
          {
              title: '年级',
              type: 'grade',
              activeIndex:0,
              selectSpan: [
                  {
                      text: '全部',
                      typecontent: null
                  },
                  {
                      text: '幼升小',
                      typecontent: 'X'
                  },
                  {
                      text: '小升初',
                      typecontent: 'C'
                  },
                  {
                      text: '初升高',
                      typecontent: 'G'
                  },
                  {
                      text: '一年级',
                      typecontent: 1
                  },
                  {
                      text: '二年级',
                      typecontent: 2
                  },
                  {
                      text: '三年级',
                      typecontent: 3
                  },
                  {
                      text: '四年级',
                      typecontent: 4
                  },
                  {
                      text: '五年级',
                      typecontent: 5
                  },
                  {
                      text: '六年级',
                      typecontent: 6
                  },
                  {
                      text: '初一',
                      typecontent: 7
                  },
                  {
                      text: '初二',
                      typecontent: 8
                  },
                  {
                      text: '初三',
                      typecontent: 9
                  },
                  {
                      text: '高一',
                      typecontent: 10
                  },
                  {
                      text: '高二',
                      typecontent: 11
                  },
                  {
                      text: '高三',
                      typecontent: 12
                  }
              ]
          },
          {
              title: '价格',
              type: 'price',
              activeIndex:0,
              selectSpan: [
                  {
                      text: '无',
                      pricestart: '0',
                      priceend: ''
                  },
                  {
                      text: '100元以下',
                      pricestart:0,
                      priceend:100
                  },
                  {
                      text: '100-500',
                      pricestart: 100,
                      priceend: 500
                  },
                  {
                      text: '500-1000',
                      pricestart: 500,
                      priceend: 1000
                  },
                  {
                      text: '1000-2000',
                      pricestart: 1000,
                      priceend: 2000
                  },
                  {
                      text: '2000-3500',
                      pricestart: 2000,
                      priceend: 3500
                  },
                  {
                      text: '3500-6000',
                      pricestart:3500,
                      priceend: 6000
                  },
                  {
                      text: '6000以上',
                      pricestart: 6000,
                      priceend: -1
                  }
              ]
          }
      ],
      dataSelect:{
          newdata:'点击确认时间'
      }
  },
  //日期
  bindDateChange:function(e){
    var time = e.detail.value;
    var newDataSelect = this.data.dataSelect;
    newDataSelect.newdata = time;
    this.setData({
        dataSelect: newDataSelect
    })
  },
  //选择框
  select(e){
    var dataset= e.target.dataset;
    var newSelectBoxGroup = this.data.selectBoxGroup;
    newSelectBoxGroup[dataset.parentindex].activeIndex = dataset.index;
    var type = dataset.type;
    var newDataSelect = this.data.dataSelect;
    if (type !="price"){
        newDataSelect[type] = dataset.typecontent;
    }else{
        newDataSelect.pricestart = dataset.pricestart;
        newDataSelect.priceend = dataset.priceend;
    }
    this.setData({
        selectBoxGroup:newSelectBoxGroup,
        dataSelect: newDataSelect
    });
  },
  sure(){
      var data = this.data.dataSelect;
      if (data.newdata =="点击确认时间"){
          data.newdata = "";
      }
      console.log(data);
      var str = '';
      for(let key in data){
          str += key+"="+data[key]+"&";
      }
      wx.reLaunch({
          url: '../index?'+str
      })
  },
  clear(){
      var clearSelectBoxGroup = this.data.selectBoxGroup;
      for (let item of clearSelectBoxGroup){
          if (item.activeIndex){
              item.activeIndex = 0
          }
      }
      this.setData({
          selectBoxGroup: clearSelectBoxGroup,
          dataSelect: {}
      });
  },
  onShareAppMessage: function () {

  }
})