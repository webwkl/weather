Page({
    data:{
        life: [],
        AK:'ApTi11tj0QnLBbP5T8apbKG9T7BOqQgb',
        city:'',
        lifeImgBaseUrl: '../assets/img/',
        lifeImg: ['cloth.png','car.png','medicine.png','sport.png','uv.png']
    },
    onShow: function() {
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
        //console.log(url);
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                for(var i = 0, max = res.data.results[0].index.length; i< max; i++) {
                    res.data.results[0].index[i].img = that.data.lifeImgBaseUrl + that.data.lifeImg[i];
                }
                that.setData({
                    life: res.data.results[0].index,
                    city : res.data.results[0].currentCity
                });
            }
        })
    }
})