# Plugins整理
## 目录
* [工具类](#tool)
* [浏览器增强类](#browser-strong)
* [表单类](#form)
* [图片类](#img)
* [UI组件类](#ui)
* [用户体验增强](#ux)
* [其他类](#other)
* [Bootstrap相关类](#bootstrap)
* [JS Plugins仓库](#repository)

## <a name="tool">工具类</a>
* 方便操作对象，数组等的工具库
    * [underscore.js](http://underscorejs.org/)
    * [lo-dash](http://lodash.com/) 与underscore.js的api基本一致。与underscore比其优势是，效率高；可自定义构建
    * [Sugar](https://github.com/andrewplummer/Sugar/) 在原生对象上增加一些工具方法
    * [functional.js](https://github.com/leecrossley/functional-js/) 提够了一些Curry的支持
    * [bacon.js](https://github.com/baconjs/bacon.js/) 函数式编程，cool
    * [streamjs](https://github.com/winterbe/streamjs) 用流的方式来对数组，对象进行系列操作
* 异步流程控制
    * 发布订阅
        * [eventproxy](https://github.com/JacksonTian/eventproxy) 朴灵出品
        * [Arbiter.js](http://arbiterjs.com/)
    * [q](https://github.com/kriskowal/q/) Promise风格的
    * [Async.js](https://github.com/caolan/async/)
* 时间库
    * [moment](http://momentjs.com/)
    * [datejs](http://www.datejs.com/)
* 浏览器探测
    * [Bowser](https://github.com/ded/bowser) 探测具体浏览器和版本
    * [ua-parser-js](https://github.com/faisalman/ua-parser-js) 探测具体浏览器和版本，操作系统，设备类型等
* 调试
    * [JavaScript Debug](http://benalman.com/projects/javascript-debug-console-log/) 对console.log的简单封装，当浏览器不支持console.log时，输出在一个页面元素里
    * [log](https://github.com/adamschwartz/log) 让控制台输出的log有样式
* [uri.js](https://github.com/medialize/URI.js) uri操作
* [cookie](https://github.com/ScottHamper/Cookies) 增删改cookie的工具库
* [BigDecimal.js](https://github.com/dtrebbien/BigDecimal.js) 提高精度的数字操作


## <a name="browser-strong">浏览器增强类</a>
### 让一些旧浏览器变牛逼的库
* [Selectivizr](https://github.com/keithclark/selectivizr)  让IE 6-8一些的css3选择器
* [ieBetter](https://github.com/zhangxinxu/ieBetter.js) 让ie6-8有高级浏览器的特性
* [ExplorerCanvas](https://github.com/arv/ExplorerCanvas) 让IE8-的浏览器支持canvas
* [CSS3 Pie](http://css3pie.com/) 让IE6-9支持border-radious,box-shadow,linear-gradient。 可以使用.htc文件（注意Mine type）或.js文件。在用Pie.js时，box-radious的元素有背景色时，不显示背景色。。。
* [https://github.com/anselmh/object-fit](https://github.com/anselmh/object-fit) 让浏览器支持`object-fit`这css规则
* [HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills) 一堆Polyfills

### 选择器增强
* [Lining.js](https://github.com/zmmbreeze/lining.js) 让浏览器实现类似`::nth-line(), ::nth-last-line()`的效果

### 未归类
* [prefixfree](https://github.com/LeaVerou/prefixfree/) 用了它，写css时，就不需要加浏览器的前缀了

## <a name="form">表单类</a>
* [jquery-file-upload](https://github.com/blueimp/jQuery-File-Upload) 上传文件组件
* [zTree](http://www.ztree.me/v3/main.php#_zTreeInfo) 文件树形视图控件

### 表单验证
* [jquery-validation](https://github.com/jzaefferer/jquery-validation)
* [jQuery-Validation-Engine](http://posabsolute.github.io/jQuery-Validation-Engine/)

### 表单元素美化
* [uniform](http://uniformjs.com/) 提供对下拉框，单，复选框，按钮等表单元素的美化
* [select2](http://ivaynberg.github.io/select2/index.html) 多选下拉框
* [DropKick](http://robdel12.github.io/DropKick/) 下拉框，单，多选。外观比uniform好
* [switchery](http://abpetkov.github.io/switchery/) ios7风格的开关组件
* [nouislider](http://refreshless.com/nouislider/) 用滚动条来设置/控制（音量等）
* [range.css](http://danielstern.ca/range.css/) 美化`input[type=range]`元素的外观

## <a name="img">图片类</a>
* [holderjs](http://imsky.github.io/holder/) 生成占位图片
* lazyload
* [imagesLoaded](http://desandro.github.io/imagesloaded/) 选取的图片都加载好后执行调回

### 浏览图片
* [fancybox](http://fancyapps.com/fancybox/) 弹出查看图片，视屏等等 [demo](http://fancyapps.com/fancybox/demo/)
* [yoxview](http://www.yoxigen.com/yoxview/) 弹出查看图片，图片尺寸缩放很自然

### 图片墙
* [wookmark](http://www.wookmark.com/jquery-plugin)

## <a name="ui">UI组件类</a>
### 数据可视化(图表)
* [Echarts](http://echarts.baidu.com/) 百度出品
* [highcharts](http://www.highcharts.com/) 功能强大。是收费的。
* [Plottable.JS](http://plottablejs.org/) 基于D3的一个图表库
* [flot](http://www.flotcharts.org/) 文档不给力
* [chartJs](http://www.chartjs.org/) [中文文档](http://www.bootcss.com/p/chart.js/docs/)  demo很漂亮，很清晰。比较轻量级。
* [ichartJs](http://www.ichartjs.com/) 中国的一个家伙搞的，感觉还不错。

### 待办事宜日历
* [full calendar](http://arshaw.com/fullcalendar/) 支持脱放的方式来改变待办事宜的时间
* [Simple Events Calendar](http://codecanyon.net/item/simple-events-calendar-js/full_screen_preview/462149?ref=themespotters) 外观很喜欢。收费 5$

### 时间选取组件
* [jQuery ui datepicker](http://jqueryui.com/datepicker/) 经典，不是很好看
* [pickadate](http://amsul.ca/pickadate.js/) 轻量级，手机友好的，漂亮。但貌似只能在弹出层中显示，而没有下拉这种方式显示。
* [zebra-datepicker](http://stefangabos.ro/jquery/zebra-datepicker/) 可配置性很强。但貌似只能在弹出在右上方。。。
* [bootstrap-datepicker](http://www.eyecon.ro/bootstrap-datepicker/) bootstrap风格。
* [dateRangePicker](https://github.com/dangrossman/bootstrap-daterangepicker) 选取时间段。bootstrap风格。该组件依赖Twitter Bootstrap, Moment.js和jQuery.

### 自定义滚动条
* [perfect scrollbar](https://github.com/noraesae/perfect-scrollbar) 轻量级的滚动条。外观与mac上chrome的滚动条一样。
* [iscroll](http://iscrolljs.com) 在移动设备上用不错

### 表格组件
* [datatables](http://www.datatables.net/) 表格可交互（对内容进行排序，删除等）
* [backgrid](http://backgridjs.com/) 各种功能，带分页，可编辑表格内容。很棒。
* [excellentexport](https://github.com/jmaister/excellentexport) 把表格的内容生成excel。兼容 Firefox, Chrome, IE6+

### 选取颜色
* [Spectrum](http://bgrins.github.io/spectrum/?color=&color2=%233355cc&color3=%23000000#toc0)

### 编辑器
* [ace](http://ace.c9.io) 代码编辑器，可以用来做demo演示
* [ckeditor](http://ckeditor.com/)
* [ueditor](http://ueditor.baidu.com/website/) 百度做的
* [tinymce](http://www.tinymce.com/tryit/full.php) 对html内容进行实时的编辑
* [summernote](https://github.com/summernote/summernote) 在移动设备上用不错

### HTML5播放器
* [jwplayer](http://www.jwplayer.com/) 被大量网站使用
* [html5media](http://html5media.info/) 简单的h5player，轻量级
* [jplayer](http://jplayer.org/) 功能强太，可换肤

### 展示
* [Impress.js](https://developer.cdn.mozilla.net/media/uploads/demos/b/a/bartaz/54e3827142e4149a5c01db64c9517c84/impressjs_1333223745_demo_package/index.html#/bored) 各种旋转，和奇特的体验
* [fullPage](http://alvarotrigo.com/fullPage) 全屏显示。用滚轮来翻页
* [pagePiling](http://alvarotrigo.com/pagePiling/) 和fullPage类似
* [turn.js](https://github.com/blasten/turn.js) 做一本书，带漂亮的翻页的效果

### 幻灯
* [coin-slider](https://github.com/kopipejst/coin-slider/) 兼容IE6。蛮好的~。不过其切换方式是一块块的。不能配置切换方式。。。
* [wowslider](http://wowslider.com/rq/jquery-image-viewer/)  幻灯切换时各种很炫的效果。收费。
* [cycle2](http://jquery.malsup.com/cycle2/) 普通的幻灯，竟然不支持垂直滚动。。。
* [jcarousel](http://sorgalla.com/jcarousel/) 普通的幻灯，不兼容IE6
* [reveal](https://github.com/hakimel/reveal.js) 3d滚动。做ppt相当不错
* [nodePPT](https://github.com/ksky521/nodePPT) 国人做的，做ppt也相当不错。有些方面比 reveal做的还好。但生成导出的html有些问题
* [roundabout](https://github.com/fredleblanc/roundabout) 3d切换，看的后面图片的边

### 弹出框
* [Magnific-Popup](https://github.com/dimsemenov/Magnific-Popup) 兼容PC，Mobile。还不错，有5k+的star
* [layer](https://github.com/sentsin/layer) 国人开发的，兼容ie6+。不喜欢其调用方式。

### 动画效果
* [mixitup](https://mixitup.kunkalabs.com/) 用漂亮的动画效果来完成排序和筛选
* [jQuery.Marquee](https://github.com/aamirafridi/jQuery.Marquee) 跑马灯效果
* [quickflip](http://jonraasch.com/blog/quickflip-jquery-plugin) 卡片翻转效果
* [卡片翻转效果2](http://nnattawat.github.io/flip/) 兼容性可以。写的比较简单：1，只支持x方向翻转 2,类名都是规定好的 3，只能被调用一次。 需要改写一下。我的改进版见[这里](https://github.com/iamjoel/be-grace-front-end-developer/tree/master/my-lib/flip/quickflip.js)
* [TheaterJS](https://github.com/Zhouzi/TheaterJS) 模拟两个人在屏幕上对话
* [midnight.js](https://github.com/Aerolab/midnight.js) 文字颜色随着背景变，屌炸了
* [color-animation](http://www.bitstorm.org/jquery/color-animation/) jquery的颜色渐变动画插件。jquery的动画不支持颜色值的变化。改库提供了这个支持。
* [transit](https://github.com/rstacruz/jquery.transit) 对元素进行css的变换

#### 视觉差插件
* [scrollorama](https://github.com/johnpolacek/scrollorama) 比较简单 
* [superscrollorama](https://github.com/johnpolacek/superscrollorama) 能做的效果更多，但要用第三方Tween的库，使用起来比较复杂。
* [scrolldeck](https://github.com/johnpolacek/scrolldeck.js)

### flash
* [swfobj](http://code.google.com/p/swfobject/wiki/documentation) 能够自动检测PC、Mac机器上各种主流浏览器对Flash插件的支持情况。它使得插入Flash媒体资源尽量简捷、安全。而且它是非常符合搜索引擎优化的原则的。此外，它能够避免您的HTML、XHTML中出现object、embed等非标准标签，从而符合更加标准。

## <a name="ux">用户体验增强类</a>
* [Intro.js](http://usablica.github.io/intro.js/) 用来介绍网站的功能很不错。也可以做新手引导。
* [blockUI](http://jquery.malsup.com/block/) Lolding组件。
* [simple-hint](https://github.com/catc/simple-hint) 提示信息。用css做的。兼容性IE 9+。
* [dotdotdot](https://github.com/BeSite/jQuery.dotdotdot) 文字溢出时，添加在文字末尾加省略号
* [jQuery-menu-aim](https://github.com/kamens/jQuery-menu-aim) 二级菜单的切换如Amazon主页上一样迅速
* [AnythingZoomer](https://github.com/CSS-Tricks/AnythingZoomer/) 放大镜功能
* 美化/高亮语法代码
    * [google-code-prettify](https://code.google.com/p/google-code-prettify/)
    * [DlHighlight](http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine) 仅支持JavaScript、CSS、XML、HTML 这4语法高亮
* [please](http://www.checkman.io/please/) 按要求随机舒服的颜色

## <a name="other">其他类</a>
* [Ink](http://zurb.com/ink/) 响应式html邮件框架
* [性能测试](http://benchmarkjs.com/)
* 抓取，解析RSS内容（不能跨域，所以后台要做代理，所谓的解析Rss其实就是解析xml）
    * [jFeed](https://github.com/jfhovinne/jFeed)
    * [jRss](https://github.com/malderete/jRss)  简单版的jFeed
* [scriptcam](http://www.scriptcam.com/) 与摄像头交互

## <a name="bootstrap">Bootstrap相关类</a>
* 免费皮肤
    * [AdminLTE](https://github.com/almasaeed2010/AdminLTE)

## <a name="repository">JS Plugins仓库</a>
* [jster](http://jster.net/)
* [node modules](https://nodejsmodules.org/)
* [awesome-nodejs](https://github.com/vndmtrx/awesome-nodejs)