# [ztree](http://www.treejs.cn/v3/api.php)
```
var setting = {
  check: {
    enable: true,
    chkboxType: { "Y": "s", "N": "ps" } // 选择级联的设置
  },
  view: {
    showIcon: false
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  callback: {
    onClick: function (event, treeId, nodeData) {},
    onCheck: function () {}
  }
};

var treeObj = $.fn.zTree.init($("#area-tree"), setting, data);

// data 是个数组，每项里必须有 pId（父元素id） 和 name（显示名称）
data = data.map.forEach(function (each) {
  each.pId = each.pid;
  each.name = each.text;
  return each;
});

var needExpendNodes = treeObj.getNodesByFilter(function (each) {
  return true; // 默认全展开。 如果要展开第一层，可以用 each.level === 1
}, false);
// 展开
needExpendNodes.forEach(function (node) {
  treeObj.expandNode(node, true);
});

// 选中某些节点
treeObj.checkNode(node, true, true);

// 筛选所有的叶子节点
nodes.filter(function (node) {
  return !node.isParent
})

```