

Page({
  data:{
    decision:{}

  },

  acceptFunc: function (e) {
    console.log("已接受");
    
    
    
    wx.request({
      url: "http://localhost:3000/ride_acceptted?user_ID=" + String(this.data.decision.user_ID),
      //parameters = id
      //method: 'PUT',
      data: {
        
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data[0]);
        wx.navigateTo({
          url: '../myRide/myRide',
        })
      }
    })
    
    
  },

  declineFunc: function (e) {
    console.log("已拒绝");
    
    wx.request({
      url: "http://localhost:3000/ride_deny?user_ID=" + String(this.data.decision.user_ID),
      //parameters = id
      //method: 'PUT',
      data:{
        //status:"declined"
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data[0]);
        wx.navigateTo({
          url: '../myRide/myRide',
        })
      }
    })
  },

  onLoad:function(parameters){
    var that = this;
    console.log(parameters);

    wx.request({
      url: "http://localhost:3000/ride_list?user_ID="+String(parameters.id),
      //parameters = id
      data:{},
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
        console.log(res);
        that.setData({
          decision: res.data[0]
        });
        console.log(that.data.decision);
      }
    })

  }
});