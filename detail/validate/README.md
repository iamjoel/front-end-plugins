# [.Validate](https://github.com/jzaefferer/jquery-validation)
[官方文档](http://jqueryvalidation.org/documentation/)

## 功能
### 支持的验证规则
1. 非空
1. 后台（ajax）
1. 位数限制
1. 数字。以及大小在某个区间的数字
1. 邮箱
1. URL
1. 电话
1. 日期
1. 与某个值相等(密码确认时很有用)


## 注意点
* `rules`中的规则的键值与输入框的name属性一致
* 后台验证时，服务器返回true,则表示验证成功。其余均表示验证失败，如果返回字符串（后台返回是内容必须被字符串符合包裹""）,则该字符串为错误信息；若不是字符串，则配置的remote的值为错误信息,默认是`Please fix this field.`
