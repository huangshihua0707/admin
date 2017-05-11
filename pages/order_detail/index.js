//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  
    orderlist: "",
    isBeyond: false,
    isHave: true,
    
  },


  onLoad: function () {
   
    this.getOrderList();
   
  },
  getOrderList() {

    var order_list = [
      { id: "1", name: "卡兹卡兹土豆脆片5袋装 蜂蜜黄 油口味 63g ", count: 1, price: '15.9' },
      { id: "2", name: "卡兹卡兹土豆脆片5袋装 蜂蜜黄 油口味 63g ", count: 2, price: '15.9' },
      { id: "3", name: "卡兹卡兹土豆脆片5袋装 蜂蜜黄 油口味 63g ", count: 3, price: '15.9' },
      { id: "4", name: "卡兹卡兹土豆脆片5袋装 蜂蜜黄 油口味 63g ", count: 6, price: '189' },


    ];
    console.log(order_list);
    this.setData({
      order_list: order_list
    })
  },
 
})
