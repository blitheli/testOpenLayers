import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';

/**
    使用openlayers加载 MoonTrek发布的 月球南极高分影像        

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
      source: src
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
