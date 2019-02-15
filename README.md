# Web 前端常用插件
## 目录
* [工具类](#tool)
* [浏览器增强类](#browser-strong)
* [表单类](#form)
* [图片类](#img)
* [图标类](#icon)
* [UI 框架](#ui-framework)
* [UI 组件类](#ui)
* [用户体验增强](#ux)
* [动画](#anim)
* [SVG](#svg)
* [测试](#test)
* [其他类](#other)
* [Bootstrap相关类](#bootstrap)
* [Vue.js 相关](#vue)
* [React 相关](#react)
* [小程序](#min-app)
* [GraphQL](#graphql)
* [JS Plugins仓库](#repository)

## <a name="tool">工具类</a>
* 方便操作对象，数组等的工具库
    * [underscore.js](http://underscorejs.org/)
    * [lo-dash](https://lodash.com/) 与underscore.js的api基本一致。与underscore比其优势是，效率高；可自定义构建
    * [Sugar](https://github.com/andrewplummer/Sugar/) 在原生对象上增加一些工具方法
    * [functional.js](https://github.com/leecrossley/functional-js/) 提够了一些Curry的支持
    * [bacon.js](https://github.com/baconjs/bacon.js/) 函数式编程，cool
    * [streamjs](https://github.com/winterbe/streamjs) 用流的方式来对数组，对象进行系列操作
    * [clone.js](https://github.com/pvorb/clone) 对各种对象的深度复制。
* 数据类型
    * 字符串
        * [strman](https://github.com/dleitee/strman) 字符串操作库。它为各种实用程序、格式选项和字符串转换，提供了超过 60 种实用的方法。
    * 数字
        * [BigDecimal.js](https://github.com/dtrebbien/BigDecimal.js) 提高精度的数字操作
    * 对象
        * [Watch.js](https://github.com/melanke/Watch.JS) 监视对象或属性的变化
    * 时间
        * [Moment.js](http://momentjs.com/)
        * [day.js](https://github.com/iamkun/dayjs) 和 Moment.js 一样的 API。只有 2KB。
        * [date-fns](https://date-fns.org/docs/) 现代时间库。
        * [datejs](http://www.datejs.com/)
    * 正则
        * [rewrap](https://github.com/taijiweb/rewrap) 正则工具库。相关插件[regexp-frequent](https://github.com/taijiweb/regexp-frequent),[rewrap-patch](https://github.com/taijiweb/rewrap-patch)
    * [parameter](https://github.com/node-modules/parameter) 验证参数的格式
* 与服务器端交互
  * [axios](https://www.npmjs.com/package/axios) 支持浏览器和 Node.js 的HTTP请求工具。axios 不支持jsonp。
  * [jsonp](https://github.com/webmodules/jsonp)
* 异步流程控制
    * 发布订阅
        * [eventproxy](https://github.com/JacksonTian/eventproxy) 朴灵出品
        * [Arbiter.js](http://arbiterjs.com/) [详细](detail/Arbiter)
    * [q](https://github.com/kriskowal/q/) Promise风格的
    * [Async.js](https://github.com/caolan/async/)
* 加载器
    * [little-loader](https://github.com/walmartlabs/little-loader) JS 加载器。Webpack 不支持加载外部js，可用这个。
* mock
    * [Mock.js](https://github.com/nuysoft/Mock) 生成随机数据和mock Ajax 请求
    * [jquery-mockjax](https://github.com/jakerella/jquery-mockjax) [mock](http://baike.baidu.com/view/2445748.htm) ajax请求
* 浏览器探测
    * [Bowser](https://github.com/ded/bowser) 探测具体浏览器和版本
    * [ua-parser-js](https://github.com/faisalman/ua-parser-js) 探测具体浏览器和版本，操作系统，设备类型等
* 调试
    * [Eruda](https://github.com/liriliri/eruda/blob/master/doc/README_CN.md) Eruda 是一个专为手机网页前端设计的调试面板，类似 DevTools 的迷你版，其主要功能包括：捕获 console 日志、检查元素状态、捕获XHR请求、显示本地存储和 Cookie 信息等等。
    * [vConsole](https://github.com/WechatFE/vConsole) 轻量、可拓展、针对手机网页的前端开发者调试面板插件。微信前端做。
    * [console-polyfill](https://github.com/paulmillr/console-polyfill/) 能放心的使用 console.log()之类的console方法
    * [log](https://github.com/adamschwartz/log) 让控制台输出的log有样式
* [uri.js](https://github.com/medialize/URI.js) uri操作
* [Cookie](https://github.com/ScottHamper/Cookies) 增删改cookie的工具库
* [store.js](https://github.com/marcuswestin/store.js/) 对 localStorage 的封装。兼容 IE6+。
* [director](https://github.com/flatiron/director) 前端路由库 [详细](detail/director)
* [JSDoc](http://usejsdoc.org/) 根据javascript文件中注释的信息，生成API文档 [详细](detail/JSDoc)
* [hotkeys](http://jslite.io/hotkeys/) 键盘事件的封装
* [MD5](https://github.com/pvorb/node-md5) 用 MD5 的方式加密文件的库
* [Exif.js](https://github.com/exif-js/exif-js) 读取 JPEG 图片的拍摄信息。可以通过拍摄信息中的 Orientation 来解决 ios 手机上传竖拍照片会逆时针旋转90度的问题。
* [download](https://github.com/kevva/download) 实现下载的库。支持 url 和流。 [详细](detail/download)
* 模板引擎
  * [Handlebar](http://handlebarsjs.com/installation.html)
  * [Ejs](http://www.embeddedjs.com/)
  * [Jade](http://jade-lang.com/)
* 生成pdf
  * [jsPDF](https://github.com/MrRio/jsPDF) 在浏览器端生成 pdf。
  * [pdfkit](http://pdfkit.org/)
* [compass.js](http://ai.github.io/compass.js/) 指南针。只有在手机浏览器上才能用。
* [中国行政区域数据](https://github.com/airyland/china-area-data)
* canvas
  * [jcanvas](https://projects.calebevans.me/jcanvas) 基于 jQuery 的 canvas 工具库，支持托拽。[画画的Demo](https://projects.calebevans.me/painter/)


## <a name="browser-strong">浏览器增强类</a>
### 让一些旧浏览器变牛逼的库
* [Selectivizr](https://github.com/keithclark/selectivizr)  让IE 6-8一些的css3选择器
* [ieBetter](https://github.com/zhangxinxu/ieBetter.js) 让ie6-8有高级浏览器的特性
* [ExplorerCanvas](https://github.com/arv/ExplorerCanvas) 让IE8-的浏览器支持canvas
* [CSS3 Pie](http://css3pie.com/) 让IE6-9支持border-radious,box-shadow,linear-gradient。 可以使用.htc文件（注意Mine type）或.js文件。在用Pie.js时，box-radious的元素有背景色时，不显示背景色。。。
* [formFive](http://etiennetalbot.github.io/formFive/) 让旧的浏览器支持HTML5表单的一些特性，如 placeholder,autofocus
* [https://github.com/anselmh/object-fit](https://github.com/anselmh/object-fit) 让浏览器支持`object-fit`这css规则
* [HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills) 一堆Polyfills
* [flexibility](https://github.com/jonathantneal/flexibility) 让旧的 IE 也支持 Flexbox

### 选择器增强
* [Lining.js](https://github.com/zmmbreeze/lining.js) 让浏览器实现类似`::nth-line(), ::nth-last-line()`的效果

### CSS 兼容性
* [prefixfree](https://github.com/LeaVerou/prefixfree/) 根据 caniuse.com 数据库自动补全 CSS 私有前缀
* [stickybits](https://github.com/dollarshaveclub/stickybits) `position: sticky` polyfills。

## <a name="form">表单类</a>
* [jquery-file-upload](https://github.com/blueimp/jQuery-File-Upload) 上传文件组件 [详细](detail/fileUpload)
* [zTree](http://www.treejs.cn/v3/main.php) 文件树形视图控件 [详细](detail/ztree)
* [Treed](http://colorify.rocks/index.html) 树编辑器。感觉展示的感觉很像思维导图
* [FileAPI](https://github.com/mailru/FileAPI) 对文件选择框内的文件的一些处理
* [autosize](https://github.com/jackmoore/autosize) 让 文本域(textarea) 的高度随着文字内容的变高而变高。

### 表单验证
* [.Validate](https://github.com/jzaefferer/jquery-validation) [详细](detail/validate)
* [jQuery-Validation-Engine](http://posabsolute.github.io/jQuery-Validation-Engine/)
* 身份证验证
  * [id-card-uitls](libs/id-card-uitls.js)
  * [IdCard](https://github.com/NoBey/IdCard) 身份证的工具库，支持身份证号验证，获取地址，生日，男女等信息。

### 表单元素美化
* [uniform](http://uniformjs.com/) 提供对下拉框，单，复选框，按钮等表单元素的美化
* [select2](http://ivaynberg.github.io/select2/index.html) 多选下拉框
* [selectivity](http://arendjr.github.io/selectivity/) 和unfirom比较类似
* [DropKick](http://robdel12.github.io/DropKick/) 下拉框，单，多选。外观比uniform好
* [switchery](http://abpetkov.github.io/switchery/) ios7风格的开关组件
* [nouislider](https://refreshless.com/nouislider/) 用滚动条来设置/控制（音量等）
* 滑块/Range
  * [vue slider component](https://github.com/NightCatSama/vue-slider-component) 基于 Vue。
  * [slider](https://github.com/react-component/slider) 基于 React。
  * [range.css](http://danielstern.ca/range.css/) 美化`input[type=range]`元素的外观
* [Colorion](http://gradientbuttons.colorion.co/) 背景是渐变色的按钮。hover 时有动画效果。

## <a name="img">图片类</a>
* [holderjs](http://imsky.github.io/holder/) 生成占位图片
* [imagesLoaded](http://desandro.github.io/imagesloaded/) 选取的图片都加载好后执行调回
* [gif.js](https://github.com/jnordberg/gif.js) 生成 gif 文件。
* [core-video-to-gif](https://github.com/JackPu/core-video-to-gif) 将视频截取为 gif 的前端 JavaScript 类库。
* [CSSgram](https://github.com/una/CSSgram) 用CSS3的Filter实现Instagram滤镜的库

## <a name="icon">图标类</a>
* [Icon Font汇总](https://github.com/lvwzhen/iconpark)
* SVG做的图标
    * [svgicons](http://svgicons.sparkk.fr/)
    * [iconic](https://useiconic.com/icons/)
    * [hybicon.js](http://hybicon.softwaretailoring.net/documentation.html) 带交互效果。如 hover, click。 [详细](detail/hybicon)
* HTML字符实体图标
    * http://www.amp-what.com/
* [transformicons](http://www.transformicons.com/) 图标点击时，会有一些变换效果。如，加号变成叉号
* [css3patterns](http://lea.verou.me/css3patterns/) css3 做的可平铺纹理。浏览器兼容性不好。


### 浏览图片
* [fancybox](http://fancyapps.com/fancybox/) 弹出查看图片，视屏等等 [demo](http://fancyapps.com/fancybox/demo/)
* [yoxview](http://www.yoxigen.com/yoxview/) 弹出查看图片，图片尺寸缩放很自然

### 图片墙
* [wookmark](http://www.wookmark.com/jquery-plugin)

## <a name="ui-framework">UI 框架</a>
* [WeUI](https://github.com/weui/weui) 由微信官方设计团队为微信 Web 开发量身设计。
* [SUI Mobile](https://github.com/sdc-alibaba/SUI-Mobile) 阿里巴巴国际UED前端出品的移动端UI库。
* [Framework7](http://framework7.io/)
* [wired elements](https://github.com/wiredjs/wired-elements) 手绘效果的组件库。它的底层是 Web components。

## <a name="ui">UI 组件类</a>
### 拖拽
* [dragula](https://github.com/bevacqua/dragula) 支持Draggable，Dropable和Sortable。感觉比jqueryUI的轻量级，好用的样子
* [angular-dragula](http://bevacqua.github.io/angular-dragula/) dragular 官方的 angular 版本
* [vue-grid-layout](https://github.com/jbaysolutions/vue-grid-layout) 支持托拽和自定义大小网格系统。

### 数据可视化(图表)
* [F2](https://github.com/antvis/f2/blob/master/README.zh-CN.md) 阿里出品。为移动端而生。
* [Echarts](http://echarts.baidu.com/) 百度出品。 [Vue 版 Echart](https://github.com/ecomfe/vue-echarts)。
* [D3.js](https://d3js.org/) 超灵活的做数据可视化的工具。
* [highcharts](http://www.highcharts.com/) 功能强大。是收费的。
* [Plottable.JS](http://plottablejs.org/) 基于D3的一个图表库
* [flot](http://www.flotcharts.org/) 文档不给力
* [chartJs](http://www.chartjs.org/) [中文文档](http://www.bootcss.com/p/chart.js/docs/)  demo很漂亮，很清晰。比较轻量级。
* [ichartJs](http://www.ichartjs.com/) 中国的一个家伙搞的，感觉还不错。
* k线图(k line)
  * [Echarts的k线图](http://echarts.baidu.com/echarts2/doc/doc.html#K) 功能比较简单
  * [kline](https://github.com/chxj1992/kline) 功能比较多，支持 webpack 等。

### 时间选取组件
* [foundation-datepicker](http://foundation-datepicker.peterbeno.com/example.html)
* [DatePicker](https://github.com/foxrunsoftware/DatePicker/) 一个简单的日历 [详细](detail/datepicker)
* [full calendar](http://fullcalendar.io/) 支持脱放的方式来改变待办事宜的时间
* [Simple Events Calendar](http://preview.codecanyon.net/item/simple-events-calendar-js/full_screen_preview/462149?ref=themespotters) 外观很喜欢。收费 5$
* [jQuery ui datepicker](http://jqueryui.com/datepicker/) 经典，不是很好看
* [pickadate](http://amsul.ca/pickadate.js/) 轻量级，手机友好的，漂亮。但貌似只能在弹出层中显示，而没有下拉这种方式显示。
* [zebra-datepicker](http://stefangabos.ro/jquery/zebra-datepicker/) 可配置性很强。但貌似只能在弹出在右上方。。。
* [bootstrap-datepicker](http://www.eyecon.ro/bootstrap-datepicker/) bootstrap风格。
* [dateRangePicker](https://github.com/dangrossman/bootstrap-daterangepicker) 选取时间段。bootstrap风格。该组件依赖Twitter Bootstrap, Moment.js和jQuery.
* [v-calendar](https://github.com/nathanreyes/v-calendar) 基于Vue (版本需要 2.5+)。单日历，双日历，日期范围。

### 滚动无限加载
* [vue-infinite-scroll](https://github.com/ElemeFE/vue-infinite-scroll) 饿了么出品。
* [vue-recyclerview](https://github.com/hilongjw/vue-recyclerview) 高性能的滚动无限列表加载。为了提高性能，代码有重复利用 DOM。
* [React Infinite Scroller](https://github.com/CassetteRocks/react-infinite-scroller) 基于 React。

### 自定义/美化滚动条
* [better scroll](https://github.com/ustbhuangyi/better-scroll) [文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/) 在PC上使用时的推荐配置： `{scrollbar:true,mouseWheel: {speed: 20,invert: false}}`
* [perfect scrollbar](https://github.com/noraesae/perfect-scrollbar) 轻量级的滚动条。外观与mac上chrome的滚动条一样。 对 IE11- 兼容性不好。
* [iscroll](http://iscrolljs.com) 在移动设备上用不错

### 滚动条其他
* [ScrollFix](https://github.com/joelambert/ScrollFix) 对 IOS 的滚动优化：局部滚动。配合使用： `overflow-y: scroll; /* has to be scroll, not auto */-webkit-overflow-scrolling: touch`。
* [xscroll](https://github.com/huxiaoqi567/xscroll) 滚动相关的一堆牛逼功能。

### 加载(Loding)效果
* [CSS Spinners](https://github.com/jlong/css-spinners) CSS做的
* [Loaders.css](https://connoratherton.com/loaders) CSS做的


### 表格组件
* [jsGrid](http://js-grid.com/) Data Grid。 [详细](detail/jsGrid)
* [backgrid](http://backgridjs.com/) 基于Backbone.js的DataGrid
* [excellentexport](https://github.com/jmaister/excellentexport) 把表格的内容生成excel。兼容 Firefox, Chrome, IE6+
* [datatables](https://www.datatables.net/) 表格可交互（对内容进行排序，删除等）
* [handsontable](https://handsontable.com/) 生成Excel外观的数据
* [JSpreadsheets](http://jspreadsheets.com/) 表格数据的组件库
* [jQuery Grid](http://gijgo.com/grid) by gijgo.com

### 选取颜色
* [Spectrum](http://bgrins.github.io/spectrum/?color=&color2=%233355cc&color3=%23000000#toc0)

### 分享到SNS
* [JiaThis](http://www.jiathis.com/) 生成分享代码。

### 富文本编辑器
* [Vue-Quill-Editor](https://github.com/surmon-china/vue-quill-editor) 将 [Quill](https://github.com/quilljs/quill) 封装成 Vue 组件。图片上传默认是把图片转成Base64来存，也支持监听上传事件，来将图片上传到服务器。
* [ace](https://ace.c9.io/) 代码编辑器，可以用来做demo演示
* [ckeditor](http://ckeditor.com/)
* [ueditor](http://ueditor.baidu.com/website/) 百度做的。
* [tinymce](https://www.tinymce.com/tryit/full.php) 对html内容进行实时的编辑
* [summernote](https://github.com/summernote/summernote) 在移动设备上用不错

### 通知组件
* [notie.js](https://github.com/jaredreich/notie)

### HTML5播放器
* [jwplayer](https://www.jwplayer.com/) 被大量网站使用
* [html5media](https://html5media.info/) 简单的h5player，轻量级
* [jplayer](http://jplayer.org/) 功能强大，可换肤

### 展示
* [Impress.js](https://developer.cdn.mozilla.net/media/uploads/demos/b/a/bartaz/54e3827142e4149a5c01db64c9517c84/impressjs_1333223745_demo_package/index.html#/bored) 各种旋转，和奇特的体验
* [fullPage](http://alvarotrigo.com/fullPage/) 全屏显示。用滚轮来翻页 [详细](detail/fullpage) [2.9.7](https://github.com/alvarotrigo/fullPage.js/releases/tag/2.9.7) 以后的版本是收费的。
* [zepto.fullpage](https://github.com/yanhaijing/zepto.fullpage) 专注于移动端的fullPage.js，依赖Zepto
* [pagePiling](http://alvarotrigo.com/pagePiling/) 和fullPage类似
* [turn.js](https://github.com/blasten/turn.js) 做一本书，带漂亮的翻页的效果
* [timelinejs](https://github.com/ilkeryilmaz/timelinejs/) 用时间轴方式展示信息。
* [coverflow](https://github.com/quietshu/coverflow)  苹果上唱片封面的效果（Apple Cover Flow UI effect）。

### 幻灯
* [vue-easy-slider](https://github.com/shhdgit/vue-easy-slider) 基于 Vue。
* [SuperSlide](http://www.superslide2.com/)/[TouchSlide](http://www.superslide2.com/) 国产库！兼容IE6，焦点图/幻灯片/Tab标签切换/图片滚动/无缝滚动等常见效果，支持移动端
* [slidesjs](http://slidesjs.com/) 挺好用的，只是那幻灯导航的CSS都要自己写，呵呵 [详细](detail/jquery.slide)
* [iSlider](https://github.com/BE-FE/iSlider) 无任何插件依赖的手机平台javascript滑动组件 [详细](detail/iSlider)
* [bgstretcher](http://www.ajaxblender.com/bgstretcher-2-jquery-stretch-background-plugin-updated.html) 全屏幻灯，会随着页面大小的变化而变化。
* [Swiper](https://github.com/nolimits4web/swiper/) 开源、免费、强大的移动端触摸滑动插件 [Swiper中文网](http://www.swiper.com.cn/)
* [coin-slider](https://github.com/kopipejst/coin-slider/) 兼容IE6，不过其切换方式是一块块的。不能配置切换方式
* [wowslider](http://wowslider.com/rq/jquery-image-viewer/)  幻灯切换时各种很炫的效果。收费。
* [cycle2](http://jquery.malsup.com/cycle2/) 普通的幻灯，竟然不支持垂直滚动
* [jcarousel](http://sorgalla.com/jcarousel/) 普通的幻灯，不兼容IE6
* [reveal](https://github.com/hakimel/reveal.js) 3d滚动。做ppt相当不错
* [nodePPT](https://github.com/ksky521/nodePPT) 国人做的，做ppt也相当不错。有些方面比 reveal做的还好。但生成导出的html有些问题
* [roundabout](https://github.com/fredleblanc/roundabout) 3d切换，看的后面图片的边
* [SmartPhoto](https://github.com/appleple/SmartPhoto) 专为移动设备打造的响应式图像查看器，它易于使用，并支持手势触摸操作，例如捏合或者滑动。同时，它还具备对初学者友好的大量实用的事件处理器，以及用户自定义选项。

### 弹出框
* [Magnific-Popup](https://github.com/dimsemenov/Magnific-Popup) 兼容PC，Mobile。还不错，有5k+的star
* [layer](https://github.com/sentsin/layer) 国人开发的，兼容ie6+。不喜欢其调用方式。

### 二维码
* [QR Code Generator](https://github.com/kazuhikoarase/qrcode-generator/tree/master/js)
* [jquery-qrcode](https://github.com/jeromeetienne/jquery-qrcode) 生成二维码图片的jQuery 插件，很好用。该插件是基于 QR Code Generator 开发的。

### 动画效果
* [animate.css](https://github.com/daneden/animate.css) 预设了很多动画。
* [transformjs](https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs) Made css3 transform super easy。腾讯出品。
* [mixitup](https://mixitup.kunkalabs.com/) 用漂亮的动画效果来完成排序和筛选
* [jQuery.Marquee](https://github.com/aamirafridi/jQuery.Marquee) 跑马灯效果
* [quickflip](http://jonraasch.com/blog/quickflip-jquery-plugin) 卡片翻转效果
* [卡片翻转效果2](http://nnattawat.github.io/flip/) 兼容性可以。写的比较简单：1，只支持x方向翻转 2,类名都是规定好的 3，只能被调用一次。 需要改写一下。我的改进版见[这里](https://github.com/iamjoel/be-grace-front-end-developer/tree/master/my-lib/flip/quickflip.js)
* [TheaterJS](https://github.com/Zhouzi/TheaterJS) 模拟两个人在屏幕上对话
* [midnight.js](https://github.com/Aerolab/midnight.js) 文字颜色随着背景变，屌炸了
* [color-animation](http://www.bitstorm.org/jquery/color-animation/) jquery的颜色渐变动画插件。jquery的动画不支持颜色值的变化。改库提供了这个支持。
* [transit](https://github.com/rstacruz/jquery.transit) 对元素进行css的变换
* [tagcanvas](http://www.goat1000.com/tagcanvas.php) 3D标签云效果 [详细](detail/tagcanvas)
* [iconate](https://github.com/bitshadow/iconate) 图片切换动画
* [Snap.js](https://github.com/jakiestfu/Snap.js/) 左/右侧导航的出现效果
* [CSS shake](http://elrumordelaluz.github.io/csshake/) 抖动动画
* [ClickSpark.js](http://www.ymc.ch/sandbox/clickspark/demo.html) 点击后的一些酷炫的效果

#### 视觉差插件
* [ScrollMagic](https://github.com/janpaepke/ScrollMagic) 对 superscrollorama 的重写。
* [scrollorama](https://github.com/johnpolacek/scrollorama) 比较简单
* [superscrollorama](https://github.com/johnpolacek/superscrollorama) 能做的效果更多，但要用第三方Tween的库，使用起来比较复杂。
* [scrolldeck](https://github.com/johnpolacek/scrolldeck.js)
* [stellar.js](https://github.com/markdalgleish/stellar.js) 让图片或背景图以不同速率移动，已停止维护。

### flash
* [swfobj](https://code.google.com/archive/p/swfobject/wikis/documentation.wiki) 能够自动检测PC、Mac机器上各种主流浏览器对Flash插件的支持情况。它使得插入Flash媒体资源尽量简捷、安全。而且它是非常符合搜索引擎优化的原则的。此外，它能够避免您的HTML、XHTML中出现object、embed等非标准标签，从而符合更加标准。 [详细](detail/flash)

## 抽奖
* [wScratchPad](https://github.com/websanova/wScratchPad) 刮刮卡刮奖效果
* [jqueryrotate](http://beneposto.pl/jqueryrotate/) 旋转插件。可以用来做转盘抽奖效果

## <a name="ux">用户体验增强类</a>
* [Intro.js](http://usablica.github.io/intro.js/) 用来介绍网站的功能很不错。也可以做新手引导。
* [blockUI](http://jquery.malsup.com/block/) Lolding组件。
* [simple-hint](https://github.com/catc/simple-hint) 提示信息。用css做的。兼容性IE 9+。
* [dotdotdot](https://github.com/FrDH/jQuery.dotdotdot) 文字溢出时，添加在文字末尾加省略号
* [jQuery-menu-aim](https://github.com/kamens/jQuery-menu-aim) 二级菜单的切换如Amazon主页上一样迅速
* [AnythingZoomer](https://github.com/CSS-Tricks/AnythingZoomer/) 放大镜功能
* [PRISM](http://prismjs.com/) 代码高亮
* [please](http://www.checkman.io/please/) 按要求随机舒服的颜色
* [Awesomplete](http://leaverou.github.io/awesomplete/) 输入的智能提示，自动补全
* [proTip](http://protip.rocks/) 提示。感觉比 Bootstrap 的 tip 好
* [Hammerjs](http://hammerjs.github.io/) 手势库。封装了 Swipe, Tap, Pinch, Pan等手势
* [favico.js](http://lab.ejci.net/favico.js/) 动态改 favicon。牛逼是可以放视频~
* [elevator.js](https://github.com/tholman/elevator.js) 用做电梯的方式，伴着背景乐，返回到页面顶部。 Just for fun。
* [panorama_viewer](https://github.com/peachananr/panorama_viewer) 轻量级全景图。 代码不足两百行，基于 jQuery。
* Toast
  * [cxlt](https://github.com/chengxulvtu/cxlt-vue2-toastr) 基于 Vue2。

## <a name="anim">动画</a>
* [velocity](https://github.com/julianshapiro/velocity) 提高Jquery动画的性能。以及颜色动画之类的新特性。

## <a name="svg">SVG</a>
* [Snap.svg](http://snapsvg.io/) 操作 SVG 的 JS 库。号称 SVG 的 jQuery。[demo](detail/snap)
* [walkway](https://github.com/ConnorAtherton/walkway) 以动画的方式，渐渐地画出 SVG 的路径。

## <a name="test">测试</a>
* Mocha
* Chai
* Should
* Snoion
* [DeviceMock.js](http://rm-labo.com/labo/devicemock/) mock 设备。


## <a name="other">其他类</a>
* 复制到剪贴板
  * [clipboard.js](https://github.com/zenorocha/clipboard.js) Modern copy to clipboard. No Flash. Just 3kb gzipped.
  * [ZeroClipboard](https://github.com/zeroclipboard/ZeroClipboard) 将内容复制到剪切板兼容主流浏览器的解决方案 [详细](http://www.jianshu.com/p/1a74c112f962)
* [html2canvas](http://html2canvas.hertzen.com/) html转化成canvas，可以用来做截图。[详细](detail/html2canvas)
* [Ink](http://zurb.com/ink/) 响应式html邮件框架
* [性能测试](https://benchmarkjs.com/)
* 抓取，解析RSS内容（不能跨域，所以后台要做代理，所谓的解析Rss其实就是解析xml）
    * [jFeed](https://github.com/jfhovinne/jFeed)
    * [jRss](https://github.com/malderete/jRss)  简单版的jFeed
* [scriptcam](http://www.scriptcam.com/) 与摄像头交互
* [cylon.js](https://cylonjs.com/) 机器人框架，支持35个平台
* 图片的瀑布流展示
  * [Masonry](https://github.com/desandro/masonry) 依赖 jQuery。
  * [bricks.js](https://github.com/callmecavs/bricks.js) 高性能版 Masonry。不依赖 jQuery。
* [devices.css](https://github.com/marvelapp/devices.css) 移动设备边框的外观。做原型的时候用不错。
* [city](https://github.com/basecss/city) 国家行政区划分数据。从国家统计局拿的。 [城市数据](https://github.com/basecss/city/blob/master/lib/citydata.json)
* [全栈JavaScript错误监控](https://fundebug.com/) 提供监控报错的服务。

## <a name="bootstrap">Bootstrap相关类</a>
* [Bootbox.js](http://bootboxjs.com/) 对bootstrap的弹出框做的一些封装
* 免费皮肤
    * [AdminLTE](https://github.com/almasaeed2010/AdminLTE)
    * [gentelella](https://github.com/puikinsh/gentelella)

## <a name="vue">Vue相关</a>
* 全家桶
  * [vue-router](https://github.com/vuejs/vue-router) 官方提供的路由插件
  * vuex
* 手机 UI 库
    * [Vant](https://www.youzanyun.com/zanui/vue#/zh-CN/component/quickstart) 有赞出品。组件比 Mint UI 多。
    * [Weex Ui](https://alibaba.github.io/weex-ui/#/cn/) 阿里出品。有些业务组件是 Vant 没有的。
    * [Cube UI](https://didi.github.io/cube-ui/#/zh-CN) 滴滴出品。基于 Vue.js 实现的精致移动端组件库。
    * [Mand Mobile](https://didi.github.io/mand-mobile/#/home) 滴滴出品。面向金融场景的Vue移动端UI组件库。 有些业务组件值得参考。
    * [Mint UI](https://github.com/ElemeFE/mint-ui) 饿了么出品。
    * [vux](https://github.com/airyland/vux) 一个凑合的 Vue.js 移动端 UI 组件库。
    * [vue-weui](https://github.com/aidenZou/vue-weui) weui 的 vue 实现。
* 管理后台
    * [Element UI](https://github.com/ElemeFE/element) 饿了么出品。
    * [iView Admin](https://github.com/iview/iview-admin) 基于 [iView](https://www.iviewui.com/) 做的后台。 Talking Data 出品。
    * [Vue Admin](https://github.com/fundon/vue-admin)
    * [Vue Manage System](https://github.com/lin-xin/vue-manage-system) 基于 Element UI。支持多 Tab 选项卡等功能。
    * [D2 Admin](https://github.com/FairyEver/d2admin-vue-element) 基于 Element UI。简约主题。支持 首屏加载等待动画等。
* [Muse UI](https://github.com/museui/muse-ui) Material Design 的 Vue 实现。
* [buefy](https://github.com/buefy/buefy) 基于 Vue 的轻量级 UI 组件库。
* [Vue-head](https://github.com/ktquez/vue-head) 管理head标签中的信息。
* [vue-i18n](https://github.com/kazupon/vue-i18n) 多语言解决方案。

## <a name="react">React 相关</a>
* 管理后台
    * [Zent](https://www.youzanyun.com/zanui/react/guides/install) 有赞出品。Zent ( \ˈzent\ ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。 

## <a name="min-app">小程序</a>
* 其他框转小程序(转译型框架)
  * [mpvue](http://mpvue.com/) 美团出品。 Vue 转微信小程序、百度智能小程序、头条小程序 和 支付宝小程序。
  * [WePY](https://github.com/Tencent/wepy) 类 Vue 写法转 小程序。
  * [Taro](https://github.com/NervJS/taro) 京东出品。React 转生成能运行在微信/百度/支付宝/字节跳动小程序、H5、React Native 等的应用。
  * [Chameleon](https://cmljs.org/doc/) 滴滴出品的不同环境的跨端整体解决方案。
  * [uniapp](https://uniapp.dcloud.io/) DClound出品。生成 App，小程序，H5。
  * [graceUI](http://grace.hcoder.net/) 可生成 uniapp 和 小程序代码。小额收费。
* 增强型小程序框架
  * [MPX](https://didi.github.io/mpx/) 滴滴出品。致力于提高小程序开发体验的增强型小程序框架，通过Mpx，我们能够最先进的web开发体验(Vue + Webpack)来开发生产性能深度优化的小程序
* 组件库
  * [MinUI](https://meili.github.io/min/index.html) 蘑菇街出品。
  * [zanui-weapp](https://github.com/youzan/zanui-weapp) Vant UI 的小程序版。有赞出品。

## <a name="graphql">GraphQL</a>
* [prisma](https://github.com/prismagraphql/prisma/)  Prisma turns your database into a realtime GraphQL API。

## <a name="repository">JS Plugins仓库</a>
* [jQuery Cards](http://jquerycards.com/) 高质量的 jQuery 插件网站
* [jster](http://jster.net/)
* [node modules](https://nodejsmodules.org/)
* [npmrank](http://anvaka.github.io/npmrank/online/) Sort npm packages by page rank
* [YOU MIGHT NOT NEED JQUERY PLUGINS](http://youmightnotneedjqueryplugins.com/) 不依赖 jQuery 的 js 插件。
* [awesome-nodejs](https://github.com/vndmtrx/awesome-nodejs)
* Vue
  * [Awesome Vue.js](https://github.com/vuejs/awesome-vue)
  * [awesome-github-vue](https://github.com/vndmtrx/awesome-nodejs)
* [Libraries.io](https://libraries.io/) 各种语言的库
* [OniUI](http://ued.qunar.com/oniui/index.html#avalon.accordion.doc.html) 去哪儿网做的一套基于Avalon的框架
