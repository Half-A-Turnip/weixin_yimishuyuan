var app = getApp()
Page({
    phone:function(){
        wx.makePhoneCall({
            phoneNumber: '0571-88805188'
        })
    },
    goBaoMing:function(){
        wx.navigateTo({
            url: '../baoming/baoming'
        })
    }
})