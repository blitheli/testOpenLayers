import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileDebug from 'ol/source/TileDebug';

/**
    使用openlayers加载 MoonTrek发布的 月球 局部高分影像     

    局部影像，设置了extent边界，经纬度范围！

    Layer ID : Apollo15_PanCam_Slope_25N311E_5mp
    bbox : -49.771146,23.4260907,-48.0356413,26.0942471
    WMTS Endpoint : https://trek.nasa.gov/tiles/Moon/EQ/Apollo15_PanCam_Slope_25N311E_5mp
    Abstract : This is a slope-colorized shaded-relief of the digital elevation model (DEM) for the Aristarchus Plateau Area 1. Resolution of the original Apollo 15 Panametric images was 1.5m/pixel which allows an output DEM resolution of 5m/pixel using a softcopy photogrammetry system. It is register to ULCN 2005 control network. The DEM was registered horizontally and vertically to LRO's Lunar Orbiter Laser Altimeter (LOLA) data. Elevation values are in meters and referred to a radius of 1737400m.
    Projection :

    PROJCS["Equirectangular MOON",
      GEOGCS["GCS_MOON",
        DATUM["D_MOON",SPHEROID["MOON_localRadius",1737400,0]],
        PRIMEM["Reference_Meridian",0],UNIT["degree",0.0174532925199433]],
      PROJECTION["Equirectangular"],
      PARAMETER["latitude_of_origin",0],
      PARAMETER["central_meridian",0],
      PARAMETER["standard_parallel_1",25],
      PARAMETER["false_easting",0],
      PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]]]

    20230611
 */

//  Moon: 全球高程彩图
let src = new XYZ({
  //tileSize: 512,
  maxResolution: 180 / 256,
  wrapX: false,   //  关闭水平重复
  projection: "EPSG:4326",  
  url: 'https://trek.nasa.gov/tiles/Moon/EQ/Apollo15_PanCam_Slope_25N311E_5mp/1.0.0//default/default028mm/{z}/{y}/{x}.png'
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
      extent:[-49.771146,23.4260907,-48.0356413,26.0942471],    //  设置BBOX边界，不用请求边界之外的数据
    }),

    //  用于调试的瓦片图层
    new TileLayer({
      source: debugSource
    })
  ],

  view: new View({
    center: [-49, 23],  // 初始化后，显示原点设置为此点(使用经纬度)
    zoom: 2,    
    minZoom: 7,   // 最小缩放级别(z=6)
    maxZoom: 12,  // 最大缩放级别(z=11)
    projection: "EPSG:4326"
  })
});
