<template>
  <div id="cesiumContainer"></div>
  <div class="temp-tool">
    <button @click="flyTo">飞行</button>
    <button @click="addLine">添加线</button>
    <button @click="addPoint">添加点</button>
  </div>
</template>

<script>
import { useMyStore as useCesiumStore} from '@/pinia/pinia.ts';

let cesiumStore;
export default {
  data: function () {
    return {
      toolBox:[]
    }
  },
  mounted() {
    cesiumStore = useCesiumStore();

    this.$nextTick(() => {
      // 创建 Cesium Viewer
      const viewer = new Cesium.Viewer('cesiumContainer', {
        clock: new Cesium.Clock(),
      });

      Cesium.when(viewer, () => {
        // 当 Viewer 完全初始化后，再调用 setViewer
        cesiumStore.setViewer(viewer);
      });
    });
  },
  methods: {
    flyTo() {
      const viewer = cesiumStore.viewer;

      // 设置初始视图
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-75.166, 39.952, 10000.0),
        orientation: {
          heading: Cesium.Math.toRadians(90),
          pitch: Cesium.Math.toRadians(-30),
          roll: 0.0
        }
      });
    },
    addPoint() {
      const viewer = cesiumStore.viewer;

      // 添加一个红色的点
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-75.0, 40.0),
        point: {
          pixelSize: 10,
          color: Cesium.Color.RED
        }
      });
    },
    addLine() {
      const viewer = cesiumStore.viewer;

      // 添加一条蓝色的线
      viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([-80, 25, -90, 25]),
          width: 5,
          material: Cesium.Color.BLUE
        }
      });
    }
  },
};
</script>

<style scoped>
#cesiumContainer {
  height: 100vh;
  width: 100vw;
}

.temp-tool {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
}
</style>
