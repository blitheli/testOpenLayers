import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';

/**
    使用openlayers加载 MoonTrek发布的 月球南极高分影像        

    月球南极WMTS与EPSG4326的对应关系：
        月球投影:             EPSG 4326
            x:  0         -   lon: -90°
            y:  0         -   lat: 0°
            x:  -1095930  -   lon: -180°
            y:  1095930   -   lat: 90°

    <TopLeftCorner>-1095930 1095930

    Layer ID : LRO_NAC_AvgMosaic_SPole855_1mp
    bbox : -136526,-136525,136525,136526
    WMTS Endpoint : 
    Abstract : 
    Projection :
      urn:ogc:def:crs:IAU2000::30120

    
    后续想办法直接使用m作为单位

    20230611
 */

// BBOX等效的纬度范围(deg)
let deltaLat = 136526 / 1095930.0 * 90.0;
let wetLon = -90 - deltaLat;
let eastLon = -90 + deltaLat;
let southLat = -deltaLat;
let northLat = deltaLat;

let src = new XYZ({
  //tileSize: 512,
  maxResolution: 180 / 256,
  wrapX: false,   //  关闭水平重复
  projection: "EPSG:4326",
  url: 'https://trek.nasa.gov/tiles/Moon/SP/LRO_NAC_AvgMosaic_SPole855_1mp/1.0.0//default/default028mm/{z}/{y}/{x}.png'
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
      source: src,
      extent: [wetLon, southLat, eastLon, northLat] //  //  设置BBOX边界，不用请求边界之外的数据
    }),

    //  用于调试的瓦片图层
    new TileLayer({
      source: debugSource
    })
  ],

  view: new View({
    center: [-90, 0],     //  显示原点设置为南极
    zoom: 2,
    minZoom: 2,
    maxZoom: 12,  // 限制最大缩放级别(z=11)
    projection: "EPSG:4326"
  })
});
