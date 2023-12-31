import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';

/**
    使用openlayers加载 阿里云服务器上的瓦片服务发布的 月球全球高程彩图

    最大缩放级别(z=6)

    20230610
 */

let src = new XYZ({
  //tileSize: 512,
  maxResolution: 180 / 256,
  wrapX: false,   //  关闭水平重复
  projection: "EPSG:4326",
  //  Moon: 全球高程彩图
  url: 'http://139.224.107.180:9080/type=1000000011&x={x}&y={y}&z={z}'
});

//  用于调试的瓦片图层
let debugSource = new TileDebug({
  projection: "EPSG:4326",
  tileGrid: src.getTileGrid()
});

const map = new Map({
  target: 'map',
  layers: [

    new TileLayer({
      source: src      
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
    maxZoom: 7,   //  限制最大缩放级别(z=6)
    projection: "EPSG:4326"
  })
});
