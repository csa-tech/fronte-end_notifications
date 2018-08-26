//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: async function () {
    
    //wx.showToast({
      //title: '加载中',
      //icon: 'loading',
      //duration: 10000
    //});

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
          url: 'https://api.tipe.io/api/v1/document/' + DOCUMENT_ID,
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

    var restaurants = await getRestaurants()
    console.log(restaurants)

  }
  
})
