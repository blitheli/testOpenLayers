import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';

/**
    使用openlayers加载 MoonTrek发布的 月球 局部高分影像        
  //url: 'http://139.224.107.180:9080/type=1000010000&x={x}&y={y}&z={z}'
  
  //url : 'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg'
  //url: ''        

    20230610
 */

//  Moon: 全球高程彩图
let src = new XYZ({
  //tileSize: 512,
  maxResolution: 180 / 256,
  wrapX: false,   //  关闭水平重复
  projection: "EPSG:4326",  
  url: 'https://trek.nasa.gov/tiles/Moon/EQ/Apollo15_MetricCam_ClrConf_Global_1024ppd/1.0.0//default/default028mm/{z}/{y}/{x}.png'
});

//  Moon: 南极高分影像,  原始BBOX:[-136526,-136525,136525,136526],<TopLeftCorner>-1095930 1095930
//  后续想办法直接使用m作为单位
let SPole855 = new XYZ({
  //tileSize: 512,
  maxResolution: 180 / 256,
  wrapX: false,   //  关闭水平重复
  projection: "EPSG:4326",
  url: 'https://trek.nasa.gov/tiles/Moon/SP/LRO_NAC_AvgMosaic_SPole855_1mp/1.0.0//default/default028mm/{z}/{y}/{x}.png'
});

let moonWAC = new XYZ({
  //tileSize: 512,
  maxResolution: 180 / 256,
  wrapX: false,   //  关闭水平重复
  projection: "EPSG:4326",
  //  Moon: WAC+NAC, 最大11J
  url: 'http://astrox.cn:9080/type=1000000001&x={x}&y={y}&z={z}'
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
      //source: moonWAC
      source: SPole855
    }),

    //  用于调试的瓦片图层
    new TileLayer({
      source: debugSource
    })
  ],

  view: new View({
    center: [-90, 0],
    zoom: 2,
    minZoom: 1,
    projection: "EPSG:4326"
  })
});
