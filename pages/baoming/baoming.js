// baoming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      classIndex: null,
      subIndex: null,
      dataSelect:[
          {
              title:'三年级',
              id:3,
              child:[
                {
                    id:1001,
                    text:'语文'
                }
              ]
          },
          {
              title: '四年级',
              id:4,
              child: [
                  {
                      id: 1002,
                      text: '数学'
                  }
              ]
          },
          {
              title: '五年级',
              id:5,
              child: [
                  {
                      id: 1001,
                      text: '语文'
                  },
                  {
                      id: 1002,
                      text: '数学'
                  }
              ]
          },
          {
              title: '六年级',
              id:6,
              child: [
                  {
                      id: 1001,
                      text: '语文'
                  },
                  {
                      id: 1002,
                      text: '数学'
                  }
              ]
          },
          {
              title: '初一',
              id:7,
              child: [
                  {
                      id: 1001,
                      text: '语文'
                  },
                  {
                      id: 1002,
                      text: '数学'
                  },
                  {
                      id: 1003,
                      text: '英语'
                  },
                  {
                      id: 1004,
                      text: '科学'
                  }
              ]
          },
          {
              title: '初二',
              id:8,
              child: [
                  {
                      id: 1001,
                      text: '语文'
                  },
                  {
                      id: 1002,
                      text: '数学'
                  },
                  {
                      id: 1003,
                      text: '英语'
                  },
                  {
                      id: 1004,
                      text: '科学'
                  }
              ]
          },
          {
              title: '初三',
              id:9,
              child: [
                  {
                      id: 1002,
                      text: '数学'
                  },
                  {
                      id: 1003,
                      text: '英语'
                  },
                  {
                      id: 1004,
                      text: '科学'
                  }
              ]
          },
          {
              title: '高一',
              id:10,
              child: [
                  {
                      id: 1002,
                      text: '数学'
                  }
              ]
          },
          {
              title: '高二',
              id:11,
              child: [
                  {
                      id: 1002,
                      text: '数学'
                  }
              ]
          },
      ],
    //   account:''
  },
  changeClass:function(e){
      this.setData({
          classIndex: e.detail.value,
          subIndex: null
      })
  },
  changeSub:function(e){
      this.setData({
          subIndex: e.detail.value
      })
  },
  //填入手机号
//   setAccount:function(e){
//       this.setData({
//           account: e.detail.value
//       })
//   },
  //获取验证码
//   getCode: function (e) {
//       let account = this.data.account;
//       if (!this.checkNull('^1[3|4|5|7|8][0-9]{9}$', account)){
//           this.doerr('手机号码格式错误');
//       }else{
//         let that = this;
//         wx.request({
//             url: '',
//             header: { 'content-type': 'application/x-www-form-urlencoded' },
//             data: { account: account},
//             method: "POST",
//             success:function(res){
//                 console.log(res);
//             },
//             error:function(err){
//                 that.doerr('网络错误');
//             }
//         });
//       }
//   },
  formSubmit: function (e) {
      let data = e.detail.value;
      if(data.grade === null){
          this.doerr('年级不能为空', 1000)
      }else if(data.subject === null){
          this.doerr('学科不能为空', 1000)
      }else if(data.name.length<=0){
          this.doerr('姓名不能为空',1000)
      } else if (!this.checkNull('^1[3|4|5|7|8][0-9]{9}$', data.account)){
          this.doerr('手机号码格式错误',1000);
      } else {
        let that = this;
        data.classtype=0;
        wx.request({
            url: 'https://m.yimishuyuan.com/info/baoming_data',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: data,
            method: "POST",
            success:function(res){
               var resData = JSON.parse(res.data.slice(1, res.data.length - 1));
               console.log(resData);
               if (resData.res=="success"){
                   wx.showToast({
                       title: resData.msg,
                       icon:'sucess',
                       duration: 1000
                   });
               }else{
                   that.doerr(resData.msg);
               }
            },
            error:function(err){
                that.doerr('网络错误');
            }
        });
      }
  },
  doerr:function(text="错误提示",duration=1500){
      wx.showToast({
          title: text,
          image: '../../images/error.png',
          duration: duration
      });
  },
  checkNull: function(regstr, text) {
      let reg = new RegExp(regstr);
      if (reg.test(text)) {
          return true;
      }
      else {
          return false;
      }
  }
})