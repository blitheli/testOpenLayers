本项目为 “瓦片服务器”发布的影像 创建Config文件，便于网站调用，显示所有图层信息

### 所有图层文件夹均来自于“瓦片服务器”中的“自定义图源”内文件夹
### 大部分图层来源于：https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=moon
### 在每个图层文件内部
- index.html            为图层的预览文件(手动或自动生成)
- WMTSCapabilities.xml  为图层的WMTS能力文件
- **.png                为图层的预览图
- metadata.html         为图层的元数据文件


## 配置文件(手动或自动生成),为每个图层的元数据信息描述，供网站调用
- MoonLayerConfig.json
- MarsLayerConfig.json


## 运行
- 将此文件夹通过IIS或其他服务器发布即可，客户端直接调用 **Config.json 即可！
    



    20230614    初次编写
