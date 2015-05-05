$(document).ready(function() {
    var tool = {
        $el: $('#tags'),
        init: function() {
            this.$dataWrap = this.$el.find('ul');
        },
        make: function(makeNum) {
            makeNum = makeNum || this.MAKENUM;
            var html = [];
            for (var i = 0; i < makeNum; i++) {
                html.push(this.makeItem(false, false, i));
            }
            this.$dataWrap.html(html.join(''));
        },
        makeItem: function(isNew, url, index) {
            var imgPrefix;
            var picIndex;
            if (isNew) {
                // 新人加入 todo just for test
                picIndex = Math.floor(Math.random() * 2) + 1;
                url = 'assets/img/avatar/n-' + picIndex + '.png';
            } else {
                picIndex = Math.floor(Math.random() * this.PIC_NUM) + 1;
                url = 'assets/img/avatar/p-' + picIndex + '.png';
            }
            return '<li>' +
                // '<a href="http://www.google.com" target="_blank"><img class="avatar" width=50 height=50 src="' + url + '"><p>' + index + '</p></a>' +
                '<a href="http://www.google.com" target="_blank"><img class="avatar" width=50 height=50 src="' + url + '"></a>' +
                '</li>';
        },
        PIC_NUM: 4,
        MAKENUM: 50 // 图案数量
    }

    tool.init();
    tool.make();

    var $canvasWrap = $('#canvas-wrap');
    var $canvas = $('#canvas');

    function start() {
        var canRun = $('#canvas').tagcanvas({
            textColour: '#ff0000',
            // outlineThickness: 1,
            maxSpeed: 0.03,
            minSpeed: 0.01,
            initial: [0.01, 0.01], // 开始的时候自动
            depth: 0.75,
            imageMode: 'both',
            wheelZoom: false
        }, 'tags');
        if (!canRun) {
            $('#canvas-wrap').hide();
        }
    }

    start();

    $('#pause-btn').click(function() {
        $canvas.tagcanvas("pause");
    });

    $('#resume-btn').click(function() {
        $canvas.tagcanvas("resume");
    });

    $('#add-btn').click(function() {
        addOne().done(function() {
            start();
            $('#total-num').text(tool.$dataWrap.find('li').length);

            setTimeout(function() {
                $canvas.tagcanvas("tagtofront", {
                    index: tool.$dataWrap.find('li').length - 1,
                    callback: function() {
                        $canvas.tagcanvas("setspeed", [0.01, 0.01]);
                    }
                });
            }, 0);
        });

    });

    $('#add-multi-btn').click(function() {
        multiAdd(20, function(){
        	start();
        	setTimeout(function() {
                $canvas.tagcanvas("tagtofront", {
                    index: tool.$dataWrap.find('li').length - 1,
                    callback: function() {
                        $canvas.tagcanvas("setspeed", [0.01, 0.01]);
                    }
                });
            }, 0);
        })
    });

    function multiAdd(times, done) {
        if (times > 0) {
            addOne().done(function () {
            	multiAdd(times - 1, done);
            });
        } else {
        	done();
        }
    }

    function addOne(url) {
        var dfd = $.Deferred();
        $canvas.tagcanvas("pause");
        var $newItem = $(tool.makeItem(true, '', tool.$dataWrap.find('li').length));
        $animItem = $newItem.clone();
        $animItem.addClass('anim-start');
        $canvasWrap.append($animItem);
        $animItem.animate({
            'margin-left': 0,
            'margin-top': 0,
            opacity: 0,
            height: 0,
            width: 0
        }, 2000, function() {
            $animItem.remove();
            tool.$dataWrap.append($newItem);
            dfd.resolve();
        });
        return dfd.promise();

        // 修改某个图标
        // var toUpdateIndex = Math.floor(Math.random() * tool.MAKENUM) + 1;
        // var $targetImg = tool.$dataWrap.find('li').eq(toUpdateIndex).find('img');
        // $targetImg.attr('src', 'img/avatar/n-special.jpg');
        // $canvas.tagcanvas("tagtofront", {
        //     index: toUpdateIndex,
        //     callback: function() {
        //         start();
        //     }
        // });

        // $canvas.tagcanvas("setspeed", [0.01, 0.01]);
    }

});
