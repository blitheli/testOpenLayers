import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';

/**
    使用openlayers加载 瓦片服务器发布的 月球全球高程彩图

    20230610
 */

//  Moon: 全球高程彩图
let moonDemClr = new XYZ({        
      //tileSize: 512,
      maxResolution: 180 / 256,
      wrapX: false,   //  关闭水平重复
      projection: "EPSG:4326",
      //  Moon: 全球高程彩图
      url: 'http://139.224.107.180:9080/type=1000000011&x={x}&y={y}&z={z}'
    });

    
let moonWAC = new XYZ({        
  //tileSize: 512,
  maxResolution: 180 / 256,
  wrapX: false,   //  关闭水平重复
  projection: "EPSG:4326",
  //  Moon: WAC+NAC, 最大11J
  url: 'http://astrox.cn:9080/type=1000000001&x={x}&y={y}&z={z}'

  //  Moon: 南极高分影像        
  //url: 'http://139.224.107.180:9080/type=1000010000&x={x}&y={y}&z={z}'

  //url : 'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg'
  //url: 'https://trek.nasa.gov/tiles/Moon/EQ/Apollo15_MetricCam_ClrConf_Global_1024ppd/1.0.0//default/default028mm/{z}/{y}/{x}.png'        
});

  //  用于调试的瓦片图层
let debugSource = new TileDebug({
  projection: "EPSG:4326",
  tileGrid: moonDemClr.getTileGrid()
});

const map = new Map({
  target: 'map',  
  layers: [
    
    new TileLayer({
      //source: moonDemClr
      source: moonWAC
    }),

    //  用于调试的瓦片图层
    new TileLayer({
      source: debugSource
    })
  ],

  view: new View({
    center: [0, 0],
    zoom: 2,
    minZoom: 2,
    projection:"EPSG:4326"
  })
});
