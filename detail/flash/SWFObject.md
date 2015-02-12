## 简介
SWFObject是一个用于在HTML中方便插入Adobe Flash媒体资源（*.swf文件）的独立、敏捷的JavaScript模块。该模块中的JavaScript脚本能够自动检测PC、Mac机器上各种主流浏览器对Flash插件的支持情况。它使得插入Flash媒体资源尽量简捷、安全。而且它是非常符合搜索引擎优化的原则的。此外，它能够避免您的 HTML、XHTML中出现object、embed等非标准标签，从而符合更加标准。

## api
swfobject.embedSWF(swfUrl, id, width, height, version, expressInstallSwfurl, flashvars, params, attributes)
参数说明
swfUrl（String，必须的）指定SWF的URL。
id（String，必须的）指定将会被Flash内容替换的HTML元素（包含你的替换内容）的id。
width（String，必须的）指定SWF的宽。
height（String，必须的）指定SWF的高。
version（String，必须的）指定你发布的SWF对应的Flash Player版本（格式为：major.minor.release）。
expressInstallSwfurl（String，可选的）指定express install SWF的URL并激活Adobe express install [ http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75 ]。
flashvars（String，可选的）用name:value对指定你的flashvars。
params（String，可选的）用name:value对指定你的嵌套object元素的params。
attributes（String，可选的）用name:value对指定object的属性。 


## 文档地址
* 官网：http://code.google.com/p/swfobject/
* 文档地址 http://code.google.com/p/swfobject/wiki/documentation


