(function() {
    var emptyFn = function() {};
    window.console = window.console || {
        log: emptyFn,
        error: emptyFn
    };
    var template = {
        first: '<li><a href="javascript:void(0);" class="first-page">首页</a></li>',
        prev: '<li><a href="javascript:void(0);" class="prev-page">上一页</a></li>',
        next: '<li><a href="javascript:void(0);" class="next-page">下一页</a></li>',
        last: '<li><a href="javascript:void(0);" class="last-page">末页</a></li>',
        normal: '<li><a href="javascript:void(0);" class="normal-page" data-id="{index}">{index}</a></li>'
    };
    var config = {};
    var defaultParam = {
        'showPagingNavNum': 10,
        'pageAt': 1,
        'pageNum': 0,
        onPageChange: emptyFn
    };

    function Paging($el, param) {
        var self = this;
        this.isPaging = true;
        this.$el = $el;
        this.param = $.extend({}, defaultParam, param);
        param = this.param;
        this.pageNum = param.pageNum;

        var validMsg = validParam(param, $el);
        if (validMsg !== true) {
            console.error(validMsg);
            return;
        }
        this.pageAt = 1;
        this.init();

        this.$el.on('click', '.normal-page', function(){
            if($(this).closest('li').hasClass('current')){
                return;
            }
            var pageAt = parseInt($(this).attr('data-id'), 10);
            self.setPageAt(pageAt);
        });

        this.$el.on('click', '.first-page', function(){
            if($(this).closest('li').hasClass('disabled')){
                return;
            }
            self.setPageAt(1);
        });

        this.$el.on('click', '.prev-page', function(){
            if($(this).closest('li').hasClass('disabled')){
                return;
            }
            var pageAt = self.pageAt - 1;
            self.setPageAt(pageAt);
        });

        this.$el.on('click', '.last-page', function(){
            if($(this).closest('li').hasClass('disabled')){
                return;
            }
            self.setPageAt(self.pageNum);
        });

        this.$el.on('click', '.next-page', function(){
            if($(this).closest('li').hasClass('disabled')){
                return;
            }
            var pageAt = self.pageAt + 1;
            self.setPageAt(pageAt);
        });
    }

    Paging.prototype.init = function() {
        var pageNum = this.param.pageNum;
        var html = [];
        html.push('<ul class="paging">');
        html.push(template.first);
        html.push(template.prev);
        if (pageNum > 0) {
            html.push(makePageArray(1, pageNum, this.param.showPagingNavNum).join(''));
        }
        html.push(template.next);
        html.push(template.last);
        html.push('</ul>');
        this.$el.append($(html.join('')));
        this.$el.find('[data-id='+ 1 +']').closest('li').addClass('current');
        this.updatePageNav();
    };
    Paging.prototype.setPageNum = function(pageNum, pageAt) {
        this.pageNum = pageNum;
        pageAt = pageAt || 1;
        this.pageAt = pageAt;
        this.update();
    };

    Paging.prototype.setPageAt = function(pageAt) {
        this.pageAt = pageAt;
        this.update();
        this.param.onPageChange(pageAt);
    };

    Paging.prototype.update = function() {
        this.$el.find('.normal-page').each(function(){
            $(this).closest('li').remove();
        });
        this.$el.find('.prev-page').closest('li').after(makePageArray(this.pageAt, this.pageNum, this.param.showPagingNavNum).join(''));
        this.$el.find('[data-id='+ this.pageAt +']').closest('li').addClass('current');
        this.updatePageNav();
    };

    Paging.prototype.updatePageNav = function() {
        var $el = this.$el;
        $el.find('.first-page').closest('li').removeClass('disabled');
        $el.find('.prev-page').closest('li').removeClass('disabled');
        $el.find('.next-page').closest('li').removeClass('disabled');
        $el.find('.last-page').closest('li').removeClass('disabled');
        if(this.pageAt === 1){
            $el.find('.first-page').closest('li').addClass('disabled');
            $el.find('.prev-page').closest('li').addClass('disabled');
        }

        if(this.pageAt === this.pageNum){
            $el.find('.next-page').closest('li').addClass('disabled');
            $el.find('.last-page').closest('li').addClass('disabled');
        }
    };

    Paging.prototype.getPageLimit = function(first_argument) {
        return this.param.pageLimit;
    };

    Paging.prototype.addListener = function(type, callback) {
        switch (type) {
            case 'onPageChange':
                this.param.pageChange = callback;
                break;
            default:
                console.error('not support event type');
        }
    };

    function makePageArray(pageAt, pageNum, showPagingNavNum) {
        var array = [];
        var start;
        var end;
        if (pageNum <= showPagingNavNum) { // 全部显示
            start = 1;
            end = pageNum + 1; // 因为不包括end
        } else {
            if (pageAt - parseInt(showPagingNavNum / 2, 10) <= 0) {
                start = 1;
            } else if (pageAt + parseInt(showPagingNavNum / 2, 10) > pageNum) {
                start = pageNum - showPagingNavNum + 1;
            } else {
                start = pageAt - parseInt(showPagingNavNum / 2, 10);
            }
            end = start + showPagingNavNum;
            if (end >= pageNum + 1) {
                end = pageNum + 1;
            }
        }

        for (var i = start; i < end; i++) {
            array.push(template.normal.replace(/{index}/g, i));
        }
        return array;
    }

    function validParam(param, $el) {
        if ($el === undefined) {
            return '$el needed!';
        }
        if ($el.length === 0) {
            return 'not find $el!';
        }
        return true;
    };

    $.fn.paging = function(option) {
        var paging = new Paging(this, option);
        return paging;
    };
})();
