$(document).ready(function(argument) {
    var timeTool = {
        formatTime: function(date, split) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            var d = date.getDate();
            split = split || '/'
            return [y, this.fillZero(m), this.fillZero(d)].join(split);
        },
        fillZero: function(num) {
            num = parseInt(num, 10);
            return num < 10 ? '0' + num : num;
        }
    };


    var now = new Date();
    var min = new Date();
    min.setDate(min.getDate() - 10);
    var $input = $('.calender.input');
    $input.val(timeTool.formatTime(now));

    var todayStartTime = getTodayTime('start');
    var todayEndTime = getTodayTime('end');
    // 只能选今天以及今天之后的
    (function() {
        $('#after-today-date').DatePicker({
            mode: 'single',
            date: timeTool.formatTime(now),
            onBeforeShow: function(el) {
                if ($('#inputDate').val()) {
                    $('#inputDate').DatePickerSetDate($('#inputDate').val(), true);
                }
            },
            onChange: function(date, el) {
                $(el).val(timeTool.formatTime(date));
                $(el).DatePickerHide();
            },
            onRenderCell: function(elem, date) {
                var disabled;
                var className;
                // 不能选择今天以及之前的时间
                if (date.getTime() < todayStartTime) {
                    disabled = true;
                    className = 'disabled-cell';
                } else {
                    disabled = false;
                    className = 'enabled-cell';
                }
                return {
                    disabled: disabled,
                    className: className
                };
            }
        });
    })();

    // 只能选今天以及今天之前的
    (function() {
        $('#before-today-date').DatePicker({
            mode: 'single',
            date: timeTool.formatTime(now),
            onBeforeShow: function(el) {
                if ($('#inputDate').val()) {
                    $('#inputDate').DatePickerSetDate($('#inputDate').val(), true);
                }
            },
            onChange: function(date, el) {
                $(el).val(timeTool.formatTime(date));
                $(el).DatePickerHide();
            },
            onRenderCell: function(elem, date) {
                var disabled;
                var className;
                if (date.getTime() > todayEndTime) {
                    disabled = true;
                    className = 'disabled-cell';
                } else {
                    disabled = false;
                    className = 'enabled-cell';
                }
                return {
                    disabled: disabled,
                    className: className
                };
            }
        });
    })();

    // 选取一段时间
    (function() {
        var $date = $('#range-date');
        var from = new Date();
        var to = new Date();
        to.setDate(to.getDate() + 15);
        $date.val([timeTool.formatTime(from), timeTool.formatTime(to)].join('-'));
        $date.DatePicker({
            mode: 'range',
            calendars: 3,
            date: [from, to],
            onChange: function(dates, el) {
                if (timeTool.formatTime(dates[0]) !== timeTool.formatTime(dates[1])) {
                    var val = [timeTool.formatTime(dates[0]), timeTool.formatTime(dates[1])].join('-');
                    $(el).val(val);
                    $(el).DatePickerHide();
                }
            }
        });
    })();


    function getTodayTime(type) {
        var now = new Date();
        var d = new Date([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        var time;
        if (type == 'start') {
            time = d.getTime() - 1;
        } else {
            d.setDate(d.getDate() + 1);
            time = d.getTime() - 1;
        }
        return time;
    }
});
