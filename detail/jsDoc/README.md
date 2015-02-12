# [JSDoc](http://usejsdoc.org/)
JSDoc是一个根据javascript文件中注释的信息，生成API文档的工具。生成的文档是html文件。类似JavaDoc和PHPDoc。


## 用法
`/** 一坨注释之类的 */`    
JSDoc会从`/**`开头的注释中抽取信息。用`/*`,`/***`开头的注释会被JSDoc忽略。    
如
```
/** This is a description of the foo function. */
function foo() {
}

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```

## 生成API文档
我是用的基于Grunt的插件：[grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc)。

具体用法见[这里](https://github.com/krampstudio/grunt-jsdoc)。下面是我的grunt-doc的配置
```
'jsdoc': {
    src: ['my-lib/*/*.js', '!my-lib/doc/**/*.js'],
    options: {
        destination: 'my-lib/doc'
    }
}
```

## 使用标签
标签就是一些以`@`开头的命令。    
如果你想描述方法的参数，可以这样使用
```
/**
 * @param {string} somebody - Somebody's name
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
}
```
`somebody` 是参数名    
`{string}` 是参数的类型    
`Somebody's name` 参数的描述    

下面描述一些常用的标签
### `@param`
方法的参数描述。    
用法: `@param {类型} 参数名 - 描述`

* 如果参数名以`[]`来包围，表示这参数是可选的
* `参数名=默认值`，表示参数的默认值
* `{类型1|类型2}`，表示多个类型

[更多](http://usejsdoc.org/tags-param.html)

### `@returns`
方法的返回值。    
用法 : `@returns {类型} 返回值描述`

### `@file`
文件描述。    
用法 ： `@file 文件描述`

### `@todo`
描述一些要做的事。    
用法 ： `@todo 描述`

### `@author`
作者。    
用法 ： `@author 作者`

### `@constructor`
表明这个方法是个构造器。    
用法 ： `@constructor`

所有标签用法见[这里](http://usejsdoc.org/#JSDoc3_Tag_Dictionary)

## 完整demo的源码
见[这里](https://github.com/iamjoel/front-end-resource/tree/master/learn/JSDoc)。其中doc文件夹下的内容是grunt-doc生成的。

## 资源
* [官网](http://usejsdoc.org/)
* [jsdoc github](https://github.com/jsdoc3/jsdoc)
* [grunt-jsdoc](https://github.com/krampstudio/grunt-jsdoc) jsdoc的Grunt插件

