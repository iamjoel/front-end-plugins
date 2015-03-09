# [DatePicker](https://github.com/foxrunsoftware/DatePicker/)
[官方文档](http://foxrunsoftware.github.io/DatePicker/reference.html)    
兼容至少IE7+(没测IE6)

## 功能
1. 可自定义日历数量
1. 可自定义日历显示位置
1. 可选择一段时间

## 注意点
* 比较悲催的是，选择的开始和截止时间都是没有参数支持来自定义的。但可以用`onRenderCell`来实现该功能。
* 从官网下的`datepicker.js`，要将其中的$.curCSS（jquery 1.8中废弃）替换成$(sel).css
* `locale`中定义了年月日的国际化的数据
