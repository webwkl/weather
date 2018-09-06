Page({
    data:{
      AK:'ApTi11tj0QnLBbP5T8apbKG9T7BOqQgb',
        city: '',
        future: ''
    },
    onShow: function () {
      var that = this;
      wx.getStorage({
        key: 'citys',
        success: function (res) {
          that.loadWeather(res.data);
        }
      })
    },
    loadWeather: function (city) {
        var that  = this;
        var url = 'https://api.map.baidu.com/telematics/v3/weather?location=' + city + '&output=json&ak=ApTi11tj0QnLBbP5T8apbKG9T7BOqQgb';
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                that.setData({
                    city: res.data.results[0].currentCity,
                    future: res.data.results[0].weather_data
                });
            }
        })
    },
})