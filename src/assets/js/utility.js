  function bd09Togcj02(bd_lon, bd_lat) {
      var x = bd_lon - 0.0065;
      var y = bd_lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
      var gg_lng = z * Math.cos(theta);
      var gg_lat = z * Math.sin(theta);
      return [gg_lng, gg_lat];
  }

  function gcj02Tobd09(lng, lat) {
      var z = Math.Sqrt(lng * lng + lat * lat) + 0.00002 * Math.Sin(lat * x_PI);
      var theta = Math.Atan2(lat, lng) + 0.000003 * Math.Cos(lng * x_PI);
      var bd_lng = z * Math.Cos(theta) + 0.0065;
      var bd_lat = z * Math.Sin(theta) + 0.006;
      return [bd_lng, bd_lat];
  }


  function wgs84Togcj02(lng, lat) {
      if (out_of_china(lng, lat)) {
          [lng, lat];
      } else {
          var dlat = transformlat(lng - 105.0, lat - 35.0);
          var dlng = transformlng(lng - 105.0, lat - 35.0);
          var radlat = lat / 180.0 * Math.PI;
          var magic = Math.sin(radlat);
          magic = 1 - ee * magic * magic;
          var sqrtmagic = Math.sqrt(magic);
          dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
          dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
          var mglat = lat + dlat;
          var mglng = lng + dlng;
          return [mglng, mglat];
      }
  }


  function gcj02towgs84(lng, lat) {
      if (out_of_china(lng, lat)) {
          return [lng, lat];
      } else {
          var dlat = transformlat(lng - 105.0, lat - 35.0);
          var dlng = transformlng(lng - 105.0, lat - 35.0);
          var radlat = lat / 180.0 * PI;
          var magic = Math.sin(radlat);
          magic = 1 - ee * magic * magic;
          var sqrtmagic = Math.sqrt(magic);
          dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
          dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
          var mglat = lat + dlat;
          var mglng = lng + dlng;
          return [lng * 2 - mglng, lat * 2 - mglat];
      }
  }

  function out_of_china(lng, lat) {
      // 纬度3.86~53.55,经度73.66~135.05
      return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
  }

  function transformlat(lng, lat) {
      var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
      ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
      return ret;
  }

  function transformlng(lng, lat) {
      var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
      ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
      ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
      return ret;
  }

  /// <summary>
  /// web墨卡托经纬度转米
  /// </summary>
  /// <param name="lng"></param>
  /// <param name="lat"></param>
  /// <returns></returns>
  function lonLat_to_meter(lng, lat) {

      var x = lng * 20037508.34 / 180;
      var y = Math.log(Math.tan((90 + lat) * PI / 360)) / (PI / 180);
      y = y * 20037508.34 / 180;
      return [x, y];
  }


  //Web墨卡托转经纬度
  function meter_to_lonLat(x, y) {

      var lon = x / 20037508.34 * 180;
      var lat = y / 20037508.34 * 180;
      lat = 180 / PI * (2 * Math.Atan(Math.Exp(lat * PI / 180)) - PI / 2);

      return [lon, lat];
  }
  var x_PI = Math.PI * 3000.0 / 180.0;
  var PI = Math.PI;
  var ee = 0.00669342162296594323;
  var a = 6378245.0;




  function setCookie(k, v, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      document.cookie = k + "=" + v + "; " + expires;
  }

  function clearCookie(k) {
      //清除cookie    
      setCookie(k, "", -1);
  }

  function getCookie(k) {
      var cookiearr = document.cookie.split(";");
      var le = cookiearr.length;
      for (var item = 0; item < le; item++) {
          if (cookiearr[item].search(name) >= 0) {
              return cookiearr[item].split("=")[1];
          }
      }
  }


  function setSession(k, v) {

  }

  function getSession(k) {

  }

  function isBrowser(name) {
      if (navigator.userAgent.indexOf(name) > -1) {
          return true;
      }
      return false;
  }


  function isHasImg(pathImg) {
      /*  $.ajaxSetup({
           async: false
       }); */
      var isExist = true;
      /* $.get(pathImg).success(function(response) {
          isExist = true;
      }).error(function(data, status, headers, config) {
          isExist = false;
      }); */
      $.ajax({
          type: "get",
          //以post形式向后台传递数据
          url: pathImg,
          //浏览器不缓存被请求页面，默认为true
          cache: false,
          async: false,
          callback: "callback",
          success: function(data) {
              isExist = true;
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              isExist = false;
          }
      });
      return isExist;
  }

  /**
   * 添加了新浪借口 <script type="text/javascript" src="http://counter.sina.com.cn/ip/" charset="gb2312"></script>
   */
  function getIP() {
      return returnCitySN["cip"];
  }


  Date.prototype.format = function(fmt) {
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "h+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
      }
      return fmt;
  }

  /**
   * 获取面的中心点
   * @param {*} points 
   */
  function GetPolygonCenter(points) {
      var lonSum = 0;
      var latSum = 0;
      points.map(function(item) {
          lonSum += item.lon;
          latSum += item.lat;
      });
      var arrLen = points.length;
      return [lonSum / arrLen, latSum / arrLen];
  }


  /**
   * 获取面的中心点
   * @param {*} points 
   */
  function GetPolygonCenter2(points) {
      var xMin = points[0].lon;
      var xMax = points[0].lon;
      var yMin = points[0].lat;
      var yMax = points[0].lat;
      points.map(function(item) {
          if (xMin > item.lon) {
              xMin = item.lon;
          }
          if (xMax < item.lon) {
              xMax = item.lon;
          }
          if (yMin > item.lat) {
              yMin = item.lat;
          }
          if (yMax < item.lat) {
              yMax = item.lat;
          }
      });
      return [(xMin + xMax) / 2, (yMin + yMax) / 2];
  }


  ///获取当前设备
  var browser = {　　
      versions: function() {　　
          var u = navigator.userAgent;
          var ua = navigator.userAgent.toLowerCase();　　
          return { //移动终端浏览器版本信息 
              trident: u.indexOf('Trident') > -1, //IE内核
              　presto: u.indexOf('Presto') > -1, //opera内核
              　　webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              　　gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
              　　mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              　　ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              　　android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
              　　iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
              　　iPad: u.indexOf('iPad') > -1, //是否iPad
              　　webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
              　　wechat: ua.match(/MicroMessenger/i) == "micromessenger", //微信
              　　weibo: ua.match(/WeiBo/i) == "weibo", //微博
              　　qq: ua.match(/QQ/i) == "qq" //qq
          };
      }(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };



  function initCommunitys(lon, lat) {
      $.ajax({
          type: "GET",
          url: config.initServerUrl,
          //url: "http://localhost:8888/src/assets/test.json",
          data: "op=7&dis=0.01&lon=" + lon + "&lat=" + lat,
          dataType: "jsonp",
          callback: "callback",
          success: function(data) {
              var html = '';
              $.each(data.Data, function(commentIndex, comment) {
                  html += '<option value ="' + comment.DFFCODE_NAME + '"  data-id="' + comment.DFFCODE_CODE + '"  >' + comment.DFFCODE_NAME + '</option>';
              });
              $("#community-name").html(html);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {}
      });
  }

  function addCommunitys(communityName, communityId, id) {
      var html = '';
      html += '<option value ="' + communityName + '"  data-id="' + communityId + '"  >' + communityName + '</option>';
      $("#" + id).html(html);
  }

  function createGuid() {
      //return tgis.Earth.earthObj.Factory.createGUID();
      var guid = "";
      for (var i = 1; i <= 32; i++) {
          var n = Math.floor(Math.random() * 16.0).toString(16);
          guid += n;
          if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
              guid += "-";
          }
      }
      return guid;
  };
  //******************* */

  /**
   * 检验数字
   * @param {*} obj 
   */
  function checkNumber(obj) {
      var reg = /^[0-9]+$/;
      if (obj != "" && !reg.test(obj)) {
          return false;
      } else {
          return true;
      }
  }

  /**
   * 检验email地址
   * @param {*} obj 
   */
  function checkEmail(obj) {
      var myreg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!myreg.test(obj)) {
          return false;
      } else {
          return true;
      }
  }

  /**
   * 检验手机号码（国内）
   * @param {*} obj 
   */
  function checkChinaMobilePhone(obj) {
      var myreg = /0?(13|14|15|17|18|19)[0-9]{9}/;
      if (!myreg.test(obj)) {
          return false;
      } else {
          return true;
      }
  }

  /**
   * 检验电话号码（国内）
   * @param {*} obj 
   */
  function checkChinaPhone(obj) {
      var myreg = /[0-9-()（）]{7,18}/;
      if (!myreg.test(obj)) {
          return false;
      } else {
          return true;
      }
  }

  /**
   * 检验IP
   * @param {*} obj 
   */
  function checkIP(obj) {
      var myreg = /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/;
      if (!myreg.test(obj)) {
          return false;
      } else {
          return true;
      }
  }

  /**
   * 检验身份证
   * @param {*} obj 
   */
  function checkIdCard(obj) {
      var myreg = /\d{17}[\d|x]|\d{15}/;
      if (!myreg.test(obj)) {
          return false;
      } else {
          return true;
      }
  }