import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

/**
    使用openlayers加载 瓦片服务器发布的 月球全球高程彩图

    20230610
 */

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({        
        //tileSize: 512,
        maxResolution: 180 / 256,
        wrapX: false,
        projection: "EPSG:4326",
        //  Moon: WAC+NAC, 最大11J
        //url: 'http://astrox.cn:9080/type=1000000001&x={x}&y={y}&z={z}'

        //  Moon: 全球高程彩图
        url: 'http://139.224.107.180:9080/type=1000000011&x={x}&y={y}&z={z}'

        //  Moon: 南极高分影像        
        //url: 'http://139.224.107.180:9080/type=1000010000&x={x}&y={y}&z={z}'

        //url : 'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg'
        //url: 'https://trek.nasa.gov/tiles/Moon/EQ/Apollo15_MetricCam_ClrConf_Global_1024ppd/1.0.0//default/default028mm/{z}/{y}/{x}.png'        
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 0,
    minZoom: 0,
    projection:"EPSG:4326"
  })
});
