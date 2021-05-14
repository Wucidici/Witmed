<template>
  <div>
    <NavBar :active-index="activeIndex"></NavBar>
    <el-form style="background:black;">
      <el-row style="left:10%; top:10px;" :gutter="20">
        <el-col :span="6">
          <el-form-item label="起点">
            <el-input
              v-model="start"
              placeholder="请输入起点"
              style="width:300px;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="终点" prop="end">
            <el-select v-model="end" placeholder="请选择医院">
              <el-option
                label="常熟市第一人民医院"
                value="	常熟市第一人民医院-南门"
              ></el-option>
              <el-option label="常熟市中医院" value="常熟市中医院"></el-option>
              <el-option
                label="常熟市第二人民医院"
                value="常熟市第二人民医院"
              ></el-option>
              <el-option
                label="常熟市第三人民医院"
                value="常熟市第三人民医院"
              ></el-option>
              <el-option
                label="常熟市梅李人民医院"
                value="常熟市梅李人民医院"
              ></el-option>
              <el-option
                label="
常熟东南医院"
                value="常熟东南医院"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button-group>
            <el-tooltip
              class="item"
              effect="dark"
              content="公交路线规划"
              placement="top"
            >
              <el-button
                type="primary"
                :plain="!transit"
                icon="el-icon-guide"
                @click="usetransit"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="驾车路线规划"
              placement="top"
            >
              <el-button
                type="primary"
                :plain="!driving"
                icon="el-icon-truck"
                @click="usedriving"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="步行路线规划"
              placement="top"
            >
              <el-button
                type="primary"
                :plain="!walking"
                icon="el-icon-chicken"
                @click="usewalking"
              ></el-button>
            </el-tooltip>
          </el-button-group>
        </el-col>
      </el-row>
    </el-form>
    <baidu-map
      :scroll-wheel-zoom="true"
      class="bm-view"
      :center="{ lng: 120.781419, lat: 31.59371 }"
      :zoom="20"
      @ready="handler"
      mapType="BMAP_NORMAL_MAP"
    >
      <bm-marker
        :position="{ lng: 120.781419, lat: 31.59371 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      ></bm-marker>
      <bm-transit
        class="transit-text"
        v-if="transit"
        :start="start"
        :end="end"
        :auto-viewport="true"
        location="常熟市"
      ></bm-transit>
      <bm-walking
        class="transit-text"
        v-if="walking"
        :start="start"
        :end="end"
        :auto-viewport="true"
        location="常熟市"
      ></bm-walking>
      <bm-driving
        class="transit-text"
        v-if="driving"
        :start="start"
        :end="end"
        :auto-viewport="true"
        location="常熟市"
      ></bm-driving>
    </baidu-map>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
export default {
  data() {
    return {
      start: '常熟理工学院(东南校区)',
      end: '',
      driving: false,
      walking: false,
      transit: false,
      Location: '常熟理工学院',
      activeIndex: ''
    };
  },
  mounted() {
    this.activeIndex = localStorage.getItem('activeIndex');
  },
  components: {
    NavBar
  },
  methods: {
    usetransit() {
      if (this.start == '' || this.end == '') {
        this.$message({
          showClose: true,
          message: '请输入起点和终点',
          type: 'warning'
        });
        return;
      }
      this.transit = true;
      this.walking = false;
      this.driving = false;
    },
    usewalking() {
      if (this.start == '' || this.end == '') {
        this.$message({
          showClose: true,
          message: '请输入起点和终点',
          type: 'warning'
        });
        return;
      }
      this.transit = false;
      this.walking = true;
      this.driving = false;
    },
    usedriving() {
      if (this.start == '' || this.end == '') {
        this.$message({
          showClose: true,
          message: '请输入起点和终点',
          type: 'warning'
        });
        return;
      }
      this.transit = false;
      this.walking = false;
      this.driving = true;
    },
    handler({ BMap, map }) {
      var point = new BMap.Point(120.781419, 31.59371);
      map.centerAndZoom(point, 13);
      var marker = new BMap.Marker(point); // 创建标注
      // map.addOverlay(marker); // 将标注添加到地图中
      var circle = new BMap.Circle(point, 6, {
        strokeColor: 'Red',
        strokeWeight: 6,
        strokeOpacity: 1,
        Color: 'Red',
        fillColor: '#f03'
      });
      map.addOverlay(circle);
      map.addControl(new BMap.ScaleControl()); // 添加比例尺
      map.addControl(new BMap.MapTypeControl());
      // 添加带有定位的导航控件
      var navigationControl = new BMap.NavigationControl();
      map.addControl(navigationControl);
      // 添加定位控件
      var geolocationControl = new BMap.GeolocationControl();
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        console.log(r);
      });
      geolocationControl.addEventListener('locationSuccess', function(e) {
        // 定位成功事件
        var address = '';
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert('当前定位地址为：' + address);
        console.log(e);
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
  height: 600px;
  overflow: auto;
}
.transit-text {
  text-align: left;
}
</style>
