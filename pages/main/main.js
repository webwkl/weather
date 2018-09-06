Page({
    data:{
      AK: 'ApTi11tj0QnLBbP5T8apbKG9T7BOqQgb',
        city: '',
        temp: '',
        todayDayImg: '',
        todayNightImg: '',
        weather: '',
        todayDate: '',
        todayTime: '',
        inputCity:'',
        result:''
    },
    // 监听页面加载
    onLoad: function () {
        this.loadInfo();
        this.getTime();
        wx.showShareMenu({
          withShareTicket: true
        });
        
    },
    // 监听页面初次渲染完成
    onReady: function () {
      
    },
    // 监听页面显示
    onShow: function () {

    },
    // 监听页面隐藏
    onHide: function () {

    },
    // 监听页面卸载
    onUpload: function () {
      
    },
    // 监听用户下拉动作
    onPullDownRefresh: function () {
        this.getTime();
    },
    // 监听页面上拉触底
    onReachBottom: function () {

    },
  onShareAppMessage: function () {
    return {
      title: '关注天气，放心出行',
      path: '/pages/main/main',
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
    loadInfo: function () {
        var that = this;
        wx.getLocation({
            type: 'gcj02',
            success: function(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                var AK = that.data.AK;
               that.loadCity(latitude, longitude, AK, that.loadWeather);
            }
        })
    },
    loadCity: function (latitude, longitude, AK, callback) {
        var that = this;
        var url = 'https://api.map.baidu.com/geocoder/v2/?location=' + latitude + ',' + longitude + '&output=json&ak=' + AK;
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                var city = res.data.result.addressComponent.city;
                that.setData({city :city});
                callback && callback(city, AK);
            }
        })
    },
    loadWeather: function (city) {
      wx.setStorage({
        key: 'citys',
        data: city
      })
      var that  = this;
      var url = 'https://api.map.baidu.com/telematics/v3/weather?location=' + city + '&output=json&ak=ApTi11tj0QnLBbP5T8apbKG9T7BOqQgb';
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              if (res.data.error == -3) {
                  wx.showToast({
                    title: '没有你输的城市',
                    icon: 'none',
                    duration: 1000,
                    mask: true
                  })
                  return false;
              }
                var desNum = that.random(5);
                var future = res.data.results[0].weather_data.filter(function(ele, index) {
                    return index > 0;
                });
                var temReg = /\d+℃/;
                that.setData({
                    temp: res.data.results[0].weather_data[0].date.match(temReg)[0],
                    todayDayImg: res.data.results[0].weather_data[0].dayPictureUrl,
                    todayNightImg: res.data.results[0].weather_data[0].nightPictureUrl,
                    weather: res.data.results[0].weather_data[0].weather + ' | ' + res.data.results[0].weather_data[0].wind,
                });
            }
        })
    },
    random: function(max, min) {
        var min = min || 0;
        return Math.floor(Math.random() * (max - min +1) + min);
    },
    getTime: function () {
        var date = new Date();
        var minute = date.getMinutes() >=10 ? date.getMinutes() : ('0' + date.getMinutes());
        var hour = date.getHours() >=10 ? date.getHours() : ('0' + date.getHours());
        var now = date.getDate() >= 10 ? date.getDate() : ('0' + date.getDate());
        var todayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + now;
        var todayTime = hour + ':' + minute;
        this.setData({
            todayDate: todayDate,
            todayTime: todayTime
        })
    },

    //输入事件
    inputing: function (e) {
      this.setData({ inputCity: e.detail.value });
    },

    //搜索按钮
    bindSearch: function () {
      var name = /^[\u4e00-\u9fa5]+$/;
      if (this.data.inputCity == '') {
        wx.showToast({
          title: '请输入城市名称',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
      };
      if (!name.test(this.data.inputCity)) {
        console.log(111)
        wx.showToast({
          title: '只限中国城市哦',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
      };
      
      this.loadWeather(this.data.inputCity);
      this.setData({
        city : this.data.inputCity
      });
      
    }
})