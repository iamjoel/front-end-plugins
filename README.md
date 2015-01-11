# Plugins整理
## 插件库
 * [jster](http://jster.net/)
 * [node modules](https://nodejsmodules.org/)

## 工具库
 * javascript底层工具库[underscore.js](http://underscorejs.org/) [lo-dash](http://lodash.com/)
 * [fanta](http://madscript.com/fanta/) JavaScript函数式编程的原生扩展库
 * 时间操作库   
    * [moment](http://momentjs.com/)
    * [datejs](http://www.datejs.com/)
 * 发布订阅  [Arbiter.js](http://arbiterjs.com/)
 * 浏览器探测 [Bowser](https://github.com/ded/bowser)
 * 输出调试信息（替代console的方案） [JavaScript Debug](http://benalman.com/projects/javascript-debug-console-log/)
 * 让log有颜色，部分浏览器支持 https://github.com/adamschwartz/log
 * 图片占位 [holderjs](http://imsky.github.io/holder/)
 * 让ie6-8有高级浏览器的特性 [ieBetter](https://github.com/zhangxinxu/ieBetter.js)
 * uri操作 [uri.js](https://github.com/medialize/URI.js) 
 * [cookie](https://github.com/ScottHamper/Cookies)
 * [bowser](https://github.com/ded/bowser) 浏览器探测
 * [BigDecimal.js](https://github.com/dtrebbien/BigDecimal.js) 提高精度的数字操作

## 让一些旧浏览器变牛逼的库
* [Selectivizr](https://github.com/keithclark/selectivizr)  让IE 6-8支持如下的css3选择器    
![Selectivizr支持的css3选择器](md-img/Selectivizr-support.png)

## 选择器增强
* [Lining.js](https://github.com/zmmbreeze/lining.js) 让浏览器实现类似`::nth-line(), ::nth-last-line()`的效果


****
##以下均依赖jquery
* 幻灯
    * [coin-slider](https://github.com/kopipejst/coin-slider/) 兼容IE6。蛮好的~。不过其切换方式是一块块的。不能配置切换方式。。。
    * [wowslider](http://wowslider.com/rq/jquery-image-viewer/)  幻灯切换时各种很炫的效果。收费。
    * [cycle2](http://jquery.malsup.com/cycle2/) 普通的幻灯，竟然不支持垂直滚动。。。
    * [jcarousel](http://sorgalla.com/jcarousel/) 普通的幻灯，不兼容IE6
    * [reveal](https://github.com/hakimel/reveal.js) 3d滚动。做ppt相当不错
    * [nodePPT](https://github.com/ksky521/nodePPT) 国人做的，做ppt也相当不错。有些方面比 reveal做的还好。顶！
    * [roundabout](https://github.com/fredleblanc/roundabout) 3d切换，看的后面图片的边
* 跑马灯
    * [jQuery.Marquee](https://github.com/aamirafridi/jQuery.Marquee)
* 弹出框
    * [Magnific-Popup](https://github.com/dimsemenov/Magnific-Popup) 兼容PC，Mobile。还不错，有5k+的star
    * [layer](https://github.com/sentsin/layer) 国人开发的，兼容ie6+。不喜欢其调用方式。
* 浏览图片
    * [fancybox](http://fancyapps.com/fancybox/) 弹出查看图片，视屏等等 [demo](http://fancyapps.com/fancybox/demo/)
    * [yoxview](http://www.yoxigen.com/yoxview/) 弹出查看图片，图片尺寸缩放很自然

* 视觉差插件
    * [scrollorama](https://github.com/johnpolacek/scrollorama) 比较简单 
    * [superscrollorama](https://github.com/johnpolacek/superscrollorama) 能做的效果更多，但要用第三方Tween的库，使用起来比较复杂。
    * [scrolldeck](https://github.com/johnpolacek/scrolldeck.js)

* 对元素进行css的变换
    * [transit](https://github.com/rstacruz/jquery.transit)

* 图片墙
    * [wookmark](http://www.wookmark.com/jquery-plugin)

* 树形控件
    * [zTree](http://www.ztree.me/v3/main.php#_zTreeInfo)

* 上传文件
    * [jquery-file-upload](https://github.com/blueimp/jQuery-File-Upload)

* 把表格的内容生成excel
    * [excellentexport](https://github.com/jmaister/excellentexport) 兼容 Firefox, Chrome, IE6+ 

* 让ie支持canvas
    * [explorercanvas](http://code.google.com/p/explorercanvas/d)


* 加载资源
    * [imagesLoaded](http://desandro.github.io/imagesloaded/) 选取的图片都加载好后执行回调

* 表单验证
    * [jquery-validation](https://github.com/jzaefferer/jquery-validation)
    * [jQuery-Validation-Engine](http://posabsolute.github.io/jQuery-Validation-Engine/)

* 美化表单元素
    * [uniform](http://uniformjs.com/) 提供对下拉框，单，复选框，按钮等表单元素的美化
    * [select2](http://ivaynberg.github.io/select2/index.html) 多选下拉框
    * [DropKick](http://robdel12.github.io/DropKick/) 下拉框，单，多选。外观比uniform好看
* 滚动条
    * [perfect scrollbar](https://github.com/noraesae/perfect-scrollbar) 轻量级的滚动条
    * [iscroll](http://iscrolljs.com) high performance, small footprint, dependency free, multi-platform javascript scroller
* flash
    * [swfobj](http://code.google.com/p/swfobject/wiki/documentation) 能够自动检测PC、Mac机器上各种主流浏览器对Flash插件的支持情况。它使得插入Flash媒体资源尽量简捷、安全。而且它是非常符合搜索引擎优化的原则的。此外，它能够避免您的HTML、XHTML中出现object、embed等非标准标签，从而符合更加标准。


* 表格组件
    * [datatables](http://www.datatables.net/) 表格可交互（对内容进行排序，删除等）
    * [backgrid](http://backgridjs.com/) 各种功能，带分页，可编辑表格内容。很棒。
* 编辑器
    * [ace](http://ace.c9.io) 代码编辑器，可以用来做demo演示
    * [ckeditor](http://ckeditor.com/)
    * [ueditor](http://ueditor.baidu.com/website/) 百度做的
    * [tinymce](http://www.tinymce.com/tryit/full.php) 对html内容进行实时的编辑
* 美化/高亮语法代码
    * [google-code-prettify](https://code.google.com/p/google-code-prettify/)
    * [DlHighlight](http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine) 仅支持JavaScript、CSS、XML、HTML 这4语法高亮

* 图表组件
	*  [highcharts](http://www.highcharts.com/) 功能强大。是收费的。。。 390$ * 6 = 2400左右
	* [flot](http://www.flotcharts.org/) 文档不给力
	* [chartJs](http://www.chartjs.org/) [中文文档](http://www.bootcss.com/p/chart.js/docs/)  demo很漂亮，很清晰。比较轻量级。
	* [ichartJs](http://www.ichartjs.com/) 中国的一个家伙搞的，感觉还不错。

* 菜单
    * [jQuery-menu-aim](https://github.com/kamens/jQuery-menu-aim) 二级菜单的切换如Amazon主页上一样迅速

* 选取时间
    * [jQuery ui datepicker](http://jqueryui.com/datepicker/) 经典，不是很好看
    * [pickadate](http://amsul.ca/pickadate.js/) 轻量级，手机友好的，漂亮。但貌似只能在弹出层中显示，而没有下拉这种方式显示。
    * [zebra-datepicker](http://stefangabos.ro/jquery/zebra-datepicker/) 可配置性很强。但貌似只能在弹出在右上方。。。
    * [bootstrap-datepicker](http://www.eyecon.ro/bootstrap-datepicker/) bootstrap风格。
    * [dateRangePicker](https://github.com/dangrossman/bootstrap-daterangepicker) 选取时间段。bootstrap风格。该组件依赖Twitter Bootstrap, Moment.js和jQuery.

* 待办事宜日历
   * [full calendar](http://arshaw.com/fullcalendar/) 支持脱放的方式来改变待办事宜的时间
   * [Simple Events Calendar](http://codecanyon.net/item/simple-events-calendar-js/full_screen_preview/462149?ref=themespotters) 外观很喜欢。收费 5$

* 选取颜色
    * [Spectrum](http://bgrins.github.io/spectrum/?color=&color2=%233355cc&color3=%23000000#toc0) 
* [please](http://www.checkman.io/please/) 按要求随机舒服的颜色
* html5播放器
    * [jwplayer](http://www.jwplayer.com/) 被大量网站使用
    * [html5media](http://html5media.info/) 简单的h5player，轻量级
    * [jplayer](http://jplayer.org/) 功能强太，可换肤
* 与摄像头交互
    * [scriptcam](http://www.scriptcam.com/) 
* 抓取，解析RSS内容（不能跨域，所以后台要做代理，所谓的解析Rss其实就是解析xml）
    * [jFeed](https://github.com/jfhovinne/jFeed) 
    * [jRss](https://github.com/malderete/jRss)  简单版的jFeed
* 展示
    * [Impress.js](https://developer.cdn.mozilla.net/media/uploads/demos/b/a/bartaz/54e3827142e4149a5c01db64c9517c84/impressjs_1333223745_demo_package/index.html#/bored) 各种旋转，和奇特的体验
    * [fullPage](http://alvarotrigo.com/fullPage) 全屏显示。用滚轮来翻页 
    * [Intro.js](http://usablica.github.io/intro.js/) 用来介绍网站的功能很不错
* [AnythingZoomer](https://github.com/CSS-Tricks/AnythingZoomer/) 放大镜功能
* css相关
    * [prefixfree](https://github.com/LeaVerou/prefixfree/) 用了它，写css时，就不需要加浏览器的前缀了
* 其他
    * [nouislider](http://refreshless.com/nouislider/) 用滚动条来设置/控制（音量等）
    * [blockUI](http://jquery.malsup.com/block/) 给元素加loading背景。也可以自己定制loading的css
    * [Ink](http://zurb.com/ink/) 响应式html邮件框架
    * [color-animation](http://www.bitstorm.org/jquery/color-animation/) jquery的颜色渐变动画插件。jquery的动画不支持颜色值的变化。改库提供了这个支持。
    * [simple-hint](https://github.com/catc/simple-hint) 提示框架,靠css做的
    * [dotdotdot](https://github.com/BeSite/jQuery.dotdotdot) 文字溢出时，添加在文字末尾加省略号
    * [性能测试](http://benchmarkjs.com/)
    * [卡片翻转效果](http://jonraasch.com/blog/quickflip-jquery-plugin) 兼容性可以。写的比较简单：1，只支持x方向翻转 2,类名都是规定好的 3，只能被调用一次。 需要改写一下。我的改进版见[这里](https://github.com/iamjoel/be-grace-front-end-developer/tree/master/my-lib/flip/quickflip.js)
    * [卡片翻转效果2](http://nnattawat.github.io/flip/) 可以支持多个方向的。但不支持
    * [turn.js](https://github.com/blasten/turn.js) 做一本书，带漂亮的翻页的效果
    * [switchery](http://abpetkov.github.io/switchery/) ios7风格的开关组价
    * [midnight.js](https://github.com/Aerolab/midnight.js) 文字颜色随着背景变，屌炸了

## bootstrap 免费皮肤
* [AdminLTE](http://www.almsaeedstudio.com/) (github)[https://github.com/almasaeed2010/AdminLTE]
