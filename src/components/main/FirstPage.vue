<template>
  <div>
    <baidu-map
      class="bm-view"
      :center="{ lng: 120.781419, lat: 31.59371 }"
      :zoom="20"
      @ready="handler"
      mapType="BMAP_NORMAL_MAP"
    >
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-marker
        :position="{ lng: 120.3003, lat: 30.17737 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
    </baidu-map>
    <button
      type="button"
      class="btn btn-default"
      @click="goBaiduMap"
      style="width: 150px;margin-top: 30px;"
    >
      导航
    </button>
  </div>
</template>

<script>
import Header from './Header.vue';
export default {
  components: { Header },
  data() {
    return {
      Location: '杭州南站售票厅'
    };
  },
  methods: {
    goBaiduMap() {
      window.location.href =
        'http://api.map.baidu.com/geocoder?address=' +
        this.Location +
        '&output=html&src=我的位置';
    },
    handler({ BMap, map }) {
      var point = new BMap.Point(109.49926175379778, 36.60449676862417);
      map.centerAndZoom(point, 13);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      var circle = new BMap.Circle(point, 6, {
        strokeColor: 'Red',
        strokeWeight: 6,
        strokeOpacity: 1,
        Color: 'Red',
        fillColor: '#f03'
      });
      map.addOverlay(circle);
      // s3
      map.addControl(new BMap.ScaleControl()); // 添加比例尺
      map.addControl(new BMap.MapTypeControl());
      // 添加带有定位的导航控件
      var navigationControl = new BMap.NavigationControl();
      map.addControl(navigationControl);
      // 添加定位控件
      var geolocationControl = new BMap.GeolocationControl();
      geolocationControl.addEventListener('locationSuccess', function(e) {
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert('当前定位地址为：' + address);
      });
      geolocationControl.addEventListener('locationError', function(e) {
        // 定位失败事件
        alert(e.message);
      });
      map.addControl(geolocationControl);
    }
  }
};
</script>

<style>
.bm-view {
  width: 100%;
  height: 1000px;
}
</style>
