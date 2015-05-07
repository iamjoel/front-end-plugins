$(document).ready(function () {
	var $pageWrap = $('#fullpage');
	// 生产每个页面的锚
	function makeAnchorArr ($el, prefix) {
		prefix = prefix || 'page-';
		var anchorArr = [];
		var pageNum = $el.length;
		for(var i = 0; i < pageNum; i++){
			anchorArr.push(prefix + (i + 1));
		}
		return anchorArr;
	}
	var $pages = $pageWrap.find('.section');
	var $tipArrow = $('.tip-arrow')
	var pageNum = $pages.length;
	$pageWrap.fullpage({
		anchors: makeAnchorArr($pageWrap.find('>.section')),// 如果不加这个，就不会有hash，也就不能记住页面状态
		easingcss3: 'ease-out', // css动画
		// easing: 'ease-out', // js 动画
		scrollingSpeed: 400,
		afterLoad: function(anchorLink, index){
			// console.log('page:%d loaded!', index);
			$pages.eq(index - 1).addClass('page-active');
			if(index === pageNum){
				$tipArrow.hide();
			}else{
				$tipArrow.show();
			}
		},
        onLeave: function(index){
			// console.log('page:%d leave!', index);
			$pages.eq(index - 1).removeClass('page-active');
        }
	});
});