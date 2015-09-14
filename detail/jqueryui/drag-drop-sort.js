$(function() {
	// http://api.jqueryui.com/droppable/
	// http://api.jqueryui.com/draggable/
	// http://api.jqueryui.com/sortable/
    var $preview = $('.preview');
    // 拖拽
    $preview.sortable({
            connectWith: ".preview",
            containment: "parent",
            tolerance: 'pointer',
            placeholder: "sortable-placeholder",
            receive: function(evt, ui) {
                ui.helper.width($preview.width());
            }
        }).droppable({
        	tolerance: "fit",// 完全吻合
            drop: function(evt, ui) {
                if (ui.helper.hasClass('dragables__item')) {
                    var $cloneHelper = ui.helper.clone();
                    $cloneHelper.draggable({
                        // helper: 'clone',
                        start: function(evt, ui) {
                            $preview.sortable({
                                disabled: true
                            });
                        },
                        stop: function() {
                            $preview.sortable({
                                disabled: false
                            });

                        }
                    });
                    $preview.append($cloneHelper);
                    ui.helper.remove();
                }
            }
        })
        .disableSelection();

    $('.sortables__item').draggable({
        connectToSortable: '.preview',
        helper: 'clone',
        start: function(evt, ui) {

        }
    });

    $('.dragables__item').draggable({
        helper: 'clone',
        start: function(evt, ui) {
            $(ui.helper).css({
                width: 50,
                height: 50
            });
            $preview.sortable({
                disabled: true
            });
        },
        stop: function() {
            $preview.sortable({
                disabled: false
            });
        }
    });
});
