
Page({
  data: {
    imgs: [
      { url: '../assets/img/bg1.jpg' },
      { url: '../assets/img/bg2.jpg' },
      { url: '../assets/img/bg.jpg' }
    ],
    arr:[
      {tit:'111', },
      { tit: '222', },
      { tit: '333', },  
    ],
    top:40,
    currentSwiper: 0,
    autoplay: true
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current,
      top: 40 + (e.detail.current) * 40
    })
  },
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      top: 40 + (e.detail.current) * 40
    })
    console.log(that.data.top)
    console.log(e.detail.current)
  },
})
