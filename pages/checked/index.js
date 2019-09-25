Page({
  /**
   * 页面的初始数据
   */
  data: {
    noSelect: '../assets/img/home-s.png',
    hasSelect: '../assets/img/home.png',
    repContent: [{ message: '广告内容' }, { message: '不友善内容' }, { message: '垃圾内容' }, { message: '违法违规内容' }, { message: '其他' }],
    selectIndex: [
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
      { sureid: false },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  selectRep: function (e) {
    console.log(e)
    let index = e.currentTarget.dataset.selectindex;  //当前点击元素的自定义数据，这个很关键
    let selectIndex = this.data.selectIndex;    //取到data里的selectIndex
    selectIndex[index].sureid = !selectIndex[index].sureid;   //点击就赋相反的值
    this.setData({
      selectIndex: selectIndex   //将已改变属性的json数组更新
    })
  }
})

