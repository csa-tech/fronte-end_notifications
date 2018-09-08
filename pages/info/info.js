// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    restaurants:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (parameter) {

    async function getRestaurants() {
      // console.log("=== getRestaurants ===")
      var tipeData = (await getTipe('5b4db7d2508973001336b623'))
      0
      var ret = []
      var docs = tipeData.data.blocks[0].value
      for (i in docs) {
        docId = docs[i].value.id
        blocks = docs[i].value.blocks
        // WeChat resolves an Array as an Object of numbers
        // if the items are Objects
        // so that we have to use "docs[i].value.id" instead of "i.value.id"
        // Stupid!
        ret.push({
          "name": getBlockFromBlocks(blocks, "name"),
          "id": getBlockFromBlocks(blocks, "id"),
          "photo": getBlockFromBlocks((await getTipe(docId)).data.blocks, "photo").url,
        })
      }
      return ret;
    }

    function getTipe(DOCUMENT_ID) {
      // Tipe REST API
      var YOUR_ORG_SECRET_KEY = 'NWFiMmVkZjVkZDZhMmUwMDEzYWRiNzRl'
      var YOUR_API_KEY = 'ARMKDNAA1ZNKV2RSJFG6MQYD6' // Generated-API-Key-1521675799392
      return new Promise((resolve, reject) => {
        wx.request({
          url: 'https://api.tipe.io/api/v1/document/' + DOCUMENT_ID + parameter.id,
          data: {
          },
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': YOUR_API_KEY,
            'Tipe-Id': YOUR_ORG_SECRET_KEY,
          },
          success: resolve
        })
      })
    }

    function getBlockFromBlocks(blocks, name) {
      for (i in blocks) {
        if (blocks[i].name == name)
          return blocks[i].value
      }
      return null
    }

    var restaurantsData = await getRestaurants();
    this.setData({ restaurants: restaurantsData })
    console.log(restaurantsData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})