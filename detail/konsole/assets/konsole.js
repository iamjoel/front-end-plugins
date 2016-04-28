/*
 * Konsole.js - On-Screen Debugger Console
 * @author Sandro Ducceschi [eatcodeplay.ch, Switzerland]
 */
(function() {
    'use strict';
    //---------------------------------------------------
    //
    //  Constructor / Initialization
    //
    //---------------------------------------------------
    /**
     * <h3>A on-screen debugger / default console replacement class</h3><br/>
     * By default Konsole will take over your Browser default <code>console</code>.<br/>
     * You can prevent that by changing the <code>Konsole.takeOver</code> property.
     * @see Konsole.takeOver
     * @namespace Konsole
     */
    var Konsole = { version: "1.2.0" },
    p = Konsole.prototype = {};

    p.init = function()
    {
        this.htmlStr = [
            '<div id="konsole-highlight"></div>',
            '<div id="konsole">',
            '<div class="log"><div class="log wrapped"></div></div>',
            '<div class="cmdline"><input type="text" value="" /></div>',
            '</div>'
        ].join('');

        this.spacer = '&nbsp;&nbsp;';

        this.cmds = [
            { name: ['hide','close','x','exit'], func: Konsole.hide, help: 'Hides/Closes the Konsole.'},
            { name: 'clear',        func: Konsole.clear,        help: 'Clears the Konsole output.'},
            { name: 'resize',       func: Konsole.resize,       help: 'Resize Konsole in percent (0-100). Example: resize 22'},
            { name: 'snap',         func: p.snapKonsole,        help: 'Snap Konsole to any border (top,right,bottom,left). Example: snap right'},
            { name: 'find',         func: p.highlightElement,   help: 'Find/Highlight element(s) via selectors. Example: find p.myClass'},
            { name: 'get',          func: p.getElement,         help: 'Log element(s) via selectors. Example: get p.myClass'},
            { name: 'css',          func: p.modifyElementCSS,   help: [ 'This command allows various css related actions.',
                                                                        'css bind {selector} -> Binds a element for css manipulation. Press ESC to exit this mode.',
                                                                        'css get {selector} -> Shows the css properties for matching element(s)',
                                                                        'css class {selector} add/remove {styleName} -> Attaches/Detaches a CSS Class from the matching element(s)'
                                                                      ].join('\n')},
            { name: 'overflow',     func: p.findOverflow,       help: 'Find overflowing elements.'},
            { name: 'stats',        func: p.doobStats,          help: 'Show FPS/MS Stats (using mrdoob/stats.js).'},
            { name: 'report',       func: p.sendReport,         help: 'Send a report to KonsoleReport. See Documentation for more details.'},
            { name: 'about',        func: p.about,              help: 'About the Konsole.'},
            { name: 'help',         func: p.help,               help: 'See Documentation for more details.'}
        ];

        if (typeof $ != 'undefined')
        {
            $(document).ready(function(){
                var $body = $('body');
                $body.append(p.htmlStr);
                var $konsole = $('#konsole');
                var $cmdLine = $konsole.find('.cmdline input');

                if (p._visible)
                {
                    if (p.isTouchDevice())
                        $konsole.addClass('touchable');
                    $konsole.css('display', 'block');
                    $konsole.find('.log.wrapped').append(p.logs.join('<br/>'));
                    $cmdLine.focus();
                    p.updateLogContent();

                    var logEl = $konsole.find('.log.wrapped').get(0);
                    if (logEl.addEventListener) {
                        logEl.removeEventListener('mousewheel', p.handleMouseWheel);
                        logEl.removeEventListener('DOMMouseScroll', p.handleMouseWheel);
                        logEl.addEventListener('mousewheel', p.handleMouseWheel, false);
                        logEl.addEventListener('DOMMouseScroll', p.handleMouseWheel, false);
                    } else {
                        logEl.detachEvent('onmousewheel', p.handleMouseWheel);
                        logEl.attachEvent('onmousewheel', p.handleMouseWheel);
                    }
                }

                Konsole.snap = p._konsoleSnap;

                if (p._monitoringObject)
                    p.updateMonitoring();

                $cmdLine.off('keyup').on('keyup', p.handleCmdInput);
                $cmdLine.off('keydown').on('keydown', p.handleCmdResize);
                $(this).off('keypress keyup').on('keypress keyup', p.handleKeyboardEvent);

                if (p.isTouchDevice())
                {
                    var addTouchButton = function() {
                        var $touch = $('.konsole-touch');
                        if ($touch.length == 0) {
                            $body.append('<div class="konsole-touch"></div>');
                            $touch = $($touch.selector);
                            $touch.off('click').on('click', function(){
                                if (!p._visible)Konsole.show();
                                else Konsole.hide();
                            });
                        }
                    };
                    setInterval(function(){
                        addTouchButton();
                    }, 2500);
                    addTouchButton();
                }
            });
        }
        else 
        {
            console.warn('Konsole requires jQuery to be loaded in the <head> before itself.');
        }
    };
    //---------------------------------------------------
    //
    //  Variables / Private Properties
    //
    //---------------------------------------------------
    p.history = [];
    p.historyIndex = 0;
    p.logs = [];
    p.logCount = 0;
    /** @type {Object} */
    p._monitoringObject = null;
    p._lastResizePercentage = 0.22;
    p._cssEditData = null;
    p._statsTimer = 0;
    p._stats = null;
    //---------------------------------------------------
    //
    //  Public Properties
    //
    //---------------------------------------------------
    /**
     * The Key to which Konsole should be bound.
     * When pressed, the Konsole will either show or hide.
     * @name Konsole.key
     * @type {string}
     * @default §
     */
    Konsole.key = '§';
    /**
     * If the default browser console should be logged to as well
     * @name Konsole.originalEnabled
     * @type {Boolean}
     * @default true
     */
    Konsole.originalEnabled = true;
    /**
     * If Konsole Reporting is enabled or not. Default: false
     * @name Konsole.reportingEnabled
     * @type {Boolean}
     * @default false
     */
    Konsole.reportingEnabled = false;
    /**
     * URL to KonsoleReporter
     * @name Konsole.reportingUrl
     * @type {String}
     * @default './konsolereport/log.php'
     */
    Konsole.reportingUrl = './konsolereport/log.php';
    /**
     * Defines the maximum depth that an object should be inspected. Default: 5
     * @name Konsole.maxLogDepth
     * @type {Number}
     * @default 5
     */
    Konsole.maxLogDepth = 5;
    /**
     * Boolean value indicating if the Konsole is visible or not. Can also be set to either hide or show the Konsole.
     * @name Konsole.visible
     * @example
     * // Displays the Konsole
     * Konsole.visible = true;
     * // Hides the Konsole
     * Konsole.visible = false;
     * @type {Boolean}
     * @default false
     */
    Object.defineProperty(Konsole, 'visible', {
        get: function() {
            return p._visible;
        },
        set: function(bool) {
            if (bool)
                Konsole.show();
            else
                Konsole.hide();
        },
        enumerable: true,
        configurable: false
    });
    p._visible = false;
    /**
     * Boolean value indicating if Konsole logging is enabled or disabled.<br/>
     * If Konsole is in Takeover-Mode, this will also disable the browser default console logging.
     * @name Konsole.enabled
     * @type {Boolean}
     * @default true
     */
    Konsole.enabled = true;
    /**
     * Snap the Console to any of the four borders of the screen.
     * Values are: <code>top, right, bottom, left</code>
     * @name Konsole.snap
     * @example
     * // Snaps the Konsole to the right of the browser
     * Konsole.snap = 'right';
     * @type {String}
     * @default top
     */
    Object.defineProperty(Konsole, 'snap', {
        get: function() {
            return p._konsoleSnap;
        },
        set: function(str) {
            var $konsole = $('#konsole'), newCSS = {};
            $konsole.css({'top':'auto','right':'auto','bottom':'auto','left':'auto'});
            if (str == 'left' || str == 'right') newCSS['top'] = 0;
            if (str == 'top' || str == 'bottom') newCSS['left'] = 0;
            newCSS[str] = (str == 'bottom') ? 5 : 0;
            $konsole.css(newCSS);
            p._konsoleSnap = str;
            Konsole.resize();
        },
        enumerable: true,
        configurable: false
    });
    p._konsoleSnap = 'top';
    /**
     * Catch all Javascript errors and log them to Konsole
     * @name Konsole.showErrors
     * @type {Boolean}
     * @default false
     */
    Object.defineProperty(Konsole, 'showErrors', {
        get: function() {
            return p._showErrors;
        },
        set: function(bool) {
            if (bool)
                window.addEventListener('error', p.handleGlobalError);
            else
                window.removeEventListener('error', p.handleGlobalError);
            p._showErrors = bool;
        },
        enumerable: true,
        configurable: false
    });
    p._showErrors = false;
    /**
     * Defines if Konsole shall act as the default <code>console</code>.<br/> This allows
     * you to use Konsole the same way you would use the regular </code>console</code>.<br/>
     * <strong>Caution:</strong><br/>More than likely Konsole will not feature all the methods
     * that your regular console has.<br/>You can however still use the regular console when this
     * is enabled by calling it at <code>_console</code>.
     * @name Konsole.takeOver
     * @example
     * // Without Takeover
     * Konsole.takeOver = false;
     * Konsole.log("test"); // This is Konsole (duuh)
     * console.log("test"); // Your Browsers regular console
     *
     * // WITH Takeover
     * Konsole.takeOver = true;
     * console.log("test"); // Konsole is now the default console
     * _console.log("test"); // This is the browser default console
     * @type {Boolean}
     * @default true
     */
    Object.defineProperty(Konsole, 'takeOver', {
        get: function() {
            return p._takeOver;
        },
        set: function(bool) {
            if (bool) {
                //noinspection JSValidateTypes
                if (!p.isEmpty(window.console) && window.console != Konsole)
                    window._console = window.console;
                //noinspection JSValidateTypes
                window.console = Konsole;
            }
            else {
                if (!p.isEmpty(window._console))
                    window.console = window._console;
                window._console = null;
            }
            p._takeOver = bool;
        },
        enumerable: true,
        configurable: false
    });
    p._takeOver = true;
    //---------------------------------------------------
    //
    //  API / Public Methods
    //
    //---------------------------------------------------
    /**
     * Log a message to the console
     * @function
     * @name Konsole.log
     * @example
     * Konsole.log("myString", 5, true, [1,2,3,4], {myValue: "hello world"});
     * @param {...*} values . Can be any valid javascript object/type
     */
    Konsole.log = function(values) { p.addMessage(arguments, 'log'); };
    /**
     * Log a info message to the console
     * @function
     * @name Konsole.info
     * @example
     * Konsole.info("myString", 5, true, [1,2,3,4], {myValue: "hello world"});
     * @param {...*} values . Can be any valid javascript object/type
     */
    Konsole.info = function(values) { p.addMessage(arguments, 'info'); };
    /**
     * Log an event message to the console
     * @function
     * @name Konsole.event
     * @example
     * Konsole.event("myString", 5, true, [1,2,3,4], {myValue: "hello world"});
     * @param {...*} values . Can be any valid javascript object/type
     */
    Konsole.event = function(values) { p.addMessage(arguments, 'event'); };
    /**
     * Log an error message to the console
     * @function
     * @name Konsole.error
     * @example
     * Konsole.error("myString", 5, true, [1,2,3,4], {myValue: "hello world"});
     * @param {...*} values . Can be any valid javascript object/type
     */
    Konsole.error = function(values) { p.addMessage(arguments, 'error'); };
    /**
     * Log a warn message to the console
     * @function
     * @name Konsole.warn
     * @example
     * Konsole.warn("myString", 5, true, [1,2,3,4], {myValue: "hello world"});
     * @param {...*} values . Can be any valid javascript object/type
     */
    Konsole.warn = function(values) { p.addMessage(arguments, 'warn'); };
    /**
     * Log a system message to the console
     * @function
     * @name Konsole.system
     * @example
     * Konsole.system("myString", 5, true, [1,2,3,4], {myValue: "hello world"});
     * @param {...*} values . Can be any valid javascript object/type
     */
    Konsole.system = function(values) { p.addMessage(arguments, 'system'); };
    /**
     * Observe a Data Object for any modifications. This method only works in
     * Browsers that support <code>Object.observe</code>
     * @function
     * @name Konsole.observe
     * @example
     * var myObject = {person: "John Doe", age: 32, usesKonsole: true};
     * Konsole.observe(myObject, "PersonData");
     * myObject.age = 35;
     * @param {Object} model    The Object/Model to observe
     * @param {String} name     The Name to identify the model with
     */
    Konsole.observe = function(model, name) { p.observeObject(model, name); };
    /**
     * Monitor a value. Useful for repetitive/fast changing values.
     * @function
     * @name Konsole.monitor
     * @example
     * var incremental = 0;
     * Konsole.monitor(incremental, "My Value");
     * setInterval(function() {
     *     Konsole.monitor(incremental++, "My Value");
     * }, 500);
     * @param {*} value         Your Value
     * @param {String} name     The Name to identify the value with
     */
    Konsole.monitor = function(value, name) { p.monitorValue(value, name); };
    /**
     * Log a seperator to the console
     * @function
     * @name Konsole.sep
     */
    Konsole.sep = function() { p.addMessage(['――――――――――――――――――――'], 'system'); };
    /**
     * Log a seperator to the console
     * @function
     * @name Konsole.separator
     */
    Konsole.separator = function() { p.addMessage(['――――――――――――――――――――'], 'system'); };
    /**
     * Shows the console
     * @function
     * @name Konsole.show
     */
    Konsole.show = function()
    {
        if (!Konsole.enabled)
            return;

        if ((document.readyState == 'interactive' || document.readyState == 'complete') && !p._visible)
        {
            var $konsole = $('#konsole');
            if ($konsole.length == 0) {
                $('body').append(p.htmlStr);
                $konsole = $($konsole.selector);
            }

            if (p.isTouchDevice())
                $konsole.addClass('touchable');

            var $log = $konsole.find('.log.wrapped'),
                $cmd = $konsole.find('.cmdline input');

            Konsole.resize();
            $log.html('');
            $log.append(p.logs.join('<br/>'));
            $konsole.css('display', 'block');
            $cmd.focus();
            p.updateLogContent();

            $cmd.on('keyup', p.handleCmdInput);
            $cmd.on('keydown', p.handleCmdResize);

            var logEl = $log.get(0);
            if (logEl.addEventListener) {
                logEl.removeEventListener('mousewheel', p.handleMouseWheel);
                logEl.removeEventListener('DOMMouseScroll', p.handleMouseWheel);
                logEl.addEventListener('mousewheel', p.handleMouseWheel, false);
                logEl.addEventListener('DOMMouseScroll', p.handleMouseWheel, false);
            } else {
                logEl.detachEvent('onmousewheel', p.handleMouseWheel);
                logEl.attachEvent('onmousewheel', p.handleMouseWheel);
            }
        }
        p._visible = true;
    };
    /**
     * Hides the console
     * @function
     * @name Konsole.hide
     */
    Konsole.hide = function()
    {
        if (!Konsole.enabled)
            return;

        p._visible = false;
        var $konsole = $('#konsole'),
            $cmdLine = $konsole.find('.cmdline input');
        $cmdLine.off('keyup');
        $cmdLine.off('keydown');
        $konsole.css('display', 'none');
    };
    /**
     * Clears the console
     * @function
     * @name Konsole.clear
     */
    Konsole.clear = function()
    {
        if (!Konsole.enabled)
            return;

        $('#konsole').find('.log.wrapped').html('');
        p.logCount = 0;
        p.logs = [];
    };
    /**
     * Resizes the console
     * @function
     * @name Konsole.resize
     * @param {Number} [percentage] Percentage of the screen size (0-100) the konsole should take up.
     * @default 22
     */
    Konsole.resize = function(percentage)
    {
        if (!Konsole.enabled)
            return;

        var $konsole = $('#konsole'), calculatedDimension;
        p._lastResizePercentage = (typeof percentage != 'undefined') ? percentage/100 : p._lastResizePercentage;
        if (p._konsoleSnap == 'left' || p._konsoleSnap == 'right')
        {
            calculatedDimension = Math.floor(($(window).width()-40)*p._lastResizePercentage);
            $konsole.css({'height': '100%', 'width': calculatedDimension});
            $konsole.find('.log').css({'width': calculatedDimension-10, 'height': 'calc(100% - 36px)'});
            $konsole.find('.log.wrapped').css({'width': calculatedDimension-13, 'height': '100%'});
        }
        else
        {
            calculatedDimension = Math.floor(($(window).height() - 40) * p._lastResizePercentage);
            $konsole.css({'width': '100%', 'height': 'auto'});
            $konsole.find('.log').css({'height': calculatedDimension, 'width': 'calc(100% - 10px)'});
            $konsole.find('.log.wrapped').css('height', calculatedDimension);
        }
        p.updateLogContent();
    };
    /**
     * Create a Command/Function that can be called from the Konsole Input.
     * @function
     * @name Konsole.createCommand
     * @example
     * var myFunction = function(str) {
     *     alert(str);
     * };
     * Konsole.createCommand("alert", myFunction, 'Display an alert window. Example: "alert hello world"');
     * @param {String} cmdName      The name of the command
     * @param {Function} cmdFunc    The method/function that should be called
     * @param {String} [cmdHelp]    A short documentation of the command you are adding
     */
    Konsole.createCommand = function(cmdName, cmdFunc, cmdHelp)
    {
        p.cmds.push({name: cmdName, func: cmdFunc, help: (p.isEmpty(cmdHelp)) ? 'No help available' : cmdHelp});
    };
    /**
     * Get Stack Line from where this function is called (filename, line, char index)
     * @function
     * @name Konsole.getStackLine
     * @param {Number} [index] Since the index of the line you want may vary, you can specificy the index here.
     * @default 3
     */
    Konsole.getStackLine = function(index)
    {
        index = index || 3;
        if (typeof Error != 'undefined') {
            try {
                var err = new Error(), line, stack = err['stack'].split("\n");
                if (index >= stack.length)
                    index = stack.length - 1;
                line = stack[index];
                line = line.slice(line.indexOf("at "), line.length);
                return line.replace(/(http.?:\/\/.*\/)/g, '')
                            .replace(/\?.+?(?=:)/g, '')
                            //.replace(/\(|\)/g, '')
                            .replace(/\s:/, ' index:');
            } catch(err) { return ''; }
        }
        return '';
    };
    /**
     * If <code>Konsole.reportingEnabled</code> is true and a
     * valid <code>Konsole.reportingUrl</code> is defined,
     * allows you to send data to KonsoleReport for storage.
     * @function
     * @name Konsole.report
     * @example
     * var reportData = {
     *     type: "log", // Can be log, system, event, info, warn, error, report
     *     msg:  "This is my message" // The message to show in the Report
     *     callee: "MyClass.js" // optional
     *
     *     // add any number of properties you want to log, nested object are also allowed
     * };
     * Konsole.report(reportData);
     * @param {Object} data A freely definable object containing any values you may want to log
     */
    Konsole.report = function(data)
    {
        if (Konsole.reportingEnabled) {
            try {
                data = data || {};
                data.client = {'agent': navigator.userAgent, 'language': navigator.language || navigator.userLanguage, 'platform': navigator.platform, 'version': navigator.appVersion};
                $['post'](Konsole.reportingUrl, {'data': JSON.stringify(data)}, null, 'json');
            } catch (err) {}
        }
    };

    //---------------------------------------------------
    //
    //  Private Methods
    //
    //---------------------------------------------------

    p.addMessage = function(values, type)
    {
        if (!Konsole.enabled)
            return;

        var parsedStr = '',
            msg = '<span class="log-system">&nbsp;</span>';
        if (typeof values == 'undefined' || values == null || (values.length == 1 && values[0] == null))
        {
            msg = p.getLineNumber();
            p.logToOriginalConsole(values, type);
            msg += '<p class="log-system"><i>null</i></p>';
            this.logs.push(msg);
        }
        else if (typeof values != 'undefined')
        {
            msg = p.getLineNumber();
            p.logToOriginalConsole(values, type);

            var n = values.length;
            for (var i = 0; i < n; i++)
            {
                var val = values[i];
                if (i > 0) parsedStr += ' ';

                if (typeof val == 'string' && p.isSimpleHtml(val))
                    parsedStr += p.prettifySimpleHtml(val);
                else if (p.isArray(val))
                    parsedStr += p.prettifyArray(val);
                else if (typeof val == 'object')
                    parsedStr += p.prettifyObject(val);
                else
                    parsedStr += (typeof val == 'string') ? val.replace(/\n/g, '<br/>') : val;
            }

            parsedStr = parsedStr.replace(/\t/g, p.spacer);
            msg += '<p class="log-'+type+'">'+parsedStr+'</p>';
            this.logs.push(msg);
        }

        if (p._visible && parsedStr != "")  {
            $('#konsole').find('.log.wrapped').append(msg + '<br/>');
            p.updateLogContent();
        }
    };

    p.removeMessage = function(index, deleteCount)
    {
        deleteCount = deleteCount || 1;
        p.logs.splice(index, deleteCount);
        $('#konsole').find('.log.wrapped').append(p.logs.join('<br/>'));
        p.updateLogContent();
    };

    p.logToOriginalConsole = function(data, type)
    {
        if (Konsole.originalEnabled && typeof _console != 'undefined' && _console && typeof data != 'undefined' && typeof type != 'undefined') {
            if (typeof _console[type] != 'undefined' && typeof _console[type].apply != 'undefined')
                _console[type].apply(_console, data);
            else if (typeof _console.log.apply != 'undefined')
                _console.log.apply(_console, data);
        }
        else if (Konsole.takeOver == false && Konsole.originalEnabled == true) {
            if (typeof console[type] != 'undefined' && typeof console[type].apply != 'undefined')
                console[type].apply(console, data);
            else if (typeof console.log.apply != 'undefined')
                console.log.apply(console, data);
        }
    };

    p.getLineNumber = function()
    {
        p.logCount++;
        var num = p.logCount;
        if (p.logCount < 1000)
            num = p.padNumber(p.logCount,4);
        return '<span class="log-system">['+num+'] </span>';
    };

    p.updateLogContent = function()
    {
        var $konsole = $('#konsole'),
            el = $konsole.find('.log.wrapped').get(0);
        if (el) {
            el.scrollTop = el.scrollHeight;

            $konsole.find('.inspect').each(function() {
                $(this).off('mouseenter mouseleave');
                $(this).hover(p.handleDOMHoverOver, p.handleDOMHoverOut);
            });

            $konsole.find('.inspect.full').each(function(){
                var $full = $(this), $simple = $full.prev();
                $simple.off('click').on('click', function() {
                    $simple.css('display', 'none');
                    $full.css('display', 'block');
                    el.scrollTop = el.scrollHeight;
                    $full.off('click').on('click', function(){
                        $full.css('display', 'none');
                        $simple.css('display', 'block');
                    })
                })
            });

            $konsole.find('span.klo').off('click').on('click', function(){
                var $this = $(this),
                    $next = $this.next();

                $this.hide(); $next.show();

                $next.find('.klx').off('click').on('click', function(){
                    $this.show(); $next.hide();
                })
            });

            if (typeof prettyPrint !== 'undefined')
                prettyPrint();
        }
    };

    //----------------------------------
    //  Prettifier Methods
    //----------------------------------

    p.prettifyArray = function(data, prefix, depth)
    {
        depth = depth || 0; depth++;
        var suffix = (typeof prefix == 'undefined') ? '' : prefix;
        prefix = (typeof prefix == 'undefined') ? p.spacer : p.spacer+prefix;

        var str = '[';
        if (depth <= Konsole.maxLogDepth) {
            var n = data.length;
            var lastItemType = null;
            var isMixedArray = false;
            for (var i = 0; i < n; i++) {
                if (!lastItemType) lastItemType = typeof data[i];
                if (typeof data[i] != lastItemType) {
                    isMixedArray = true;
                    break
                }
            }

            if (lastItemType == 'object' && !isMixedArray)
                isMixedArray = true;

            str = (depth > 1) ? '<span class="klo">▶ Array['+n+']</span><span class="klc"><span class="klx">▼ </span>[' : '[';
            if (isMixedArray)
                str += '<br/>'+prefix;

            for (i = 0; i < n; i++) {
                if (typeof data[i] == 'object' && typeof data[i] != 'boolean' && typeof data[i] != 'string' && typeof data[i] != 'number')
                    str += p.prettifyObject(data[i], prefix, depth);
                else if (typeof data[i] == 'string')
                    str += '"' + data[i] + '"';
                else
                    str += data[i];

                if (!isMixedArray && i < n -1)
                    str += ', ';
                else if (i < n - 1)
                    str += ',<br/>' + prefix;
            }


            str += (isMixedArray) ? '<br/>'+suffix+'​]' : ']';
            if (depth > 1)
                str += '</span>';
            return str;
        }
        return str+'…]';
    };

    p.prettifyObject = function(data, prefix, depth)
    {
        depth = depth || 0; depth++;
        var key,
            str = (depth > 1) ? '<span class="klo">▶ Object</span><span class="klc"><span class="klx">▼ </span>{' : '{',
        suffix = (typeof prefix == 'undefined') ? '' : prefix;
        prefix = (typeof prefix == 'undefined') ? p.spacer : p.spacer+prefix;

        if (depth <= Konsole.maxLogDepth)
        {
            if (typeof data == 'object' && p.isXml(data))
                return '<code class="konsole prettyprint">'+p.prettifyXml(data)+'</code>';

            if (typeof data == 'object' && data == null)
                return 'null';

            if (p.isInDOM(data) || p.hasJQueryContext(data))
                return p.prettifyDOM(data);

            for (key in data)
            {
                if (data.hasOwnProperty(key))
                {
                    str += '<br/>' + prefix + key + ': ';
                    if (typeof data[key] === 'string' && !p.isSimpleHtml(data[key]))
                        str += '"'+data[key]+'"';
                    if (typeof data[key] === 'string' && p.isSimpleHtml(data[key]))
                        str += '"'+p.prettifySimpleHtml(data[key])+'"';
                    else if (typeof data[key] === 'number' || typeof data[key] === 'boolean')
                        str += data[key];
                    else if (p.isArray(data[key]))
                        str += p.prettifyArray(data[key], prefix, depth);
                    else if (p.isFunction(data[key]))
                        str += '[object Function]';
                    else if (p.isObject(data[key]))
                        str += p.prettifyObject(data[key], prefix, depth);
                }
            }
            str += '<br/>'+suffix+'​}';
            if (depth > 1)
                str += '</span>';
            return str;
        }
        return str+'…}';
    };

    p.prettifySimpleHtml = function(data)
    {
        data = data.replace(/</g, '&lt;').replace(/>/, '&gt;').replace(/\n/g, '<br/>').replace(/    /g, p.spacer+p.spacer);
        return '<code class="konsole prettyprint">'+data+'</code>';
    };

    p.prettifyXml = function(data)
    {
        var prettified;
        try { prettified = new XMLSerializer().serializeToString(data); } 
        catch (e) { prettified = data.xml; }
        prettified = prettified.replace('?>', '?>\n')
        .replace(/</g, '&lt;')
        .replace(/>/, '&gt;')
        .replace(/\n/g, '<br/>')
        .replace(/    /g, p.spacer+p.spacer);
        return prettified;
    };

    p.prettifyDOM = function(dataArr)
    {
        dataArr = (dataArr.hasOwnProperty('context') || p.isArray(dataArr)) ? dataArr : [dataArr];
        var n = dataArr.length,
        i, finalArr = [];
        for (i = 0; i < n; i++)
        {   
            var node = dataArr[i],
            pos = $(node).offset(),
            width = node.offsetWidth,
            height = node.offsetHeight,
            str = p.prettifyXml(node);
            str = str.replace('<br>', '');
            str = str.replace(/(\s?)xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g, '');

            var output = '', startTag = '', endTag = '', content = '', endTagMatches, hasSimple = false;
            try {
                startTag = str.match(/^&lt;\w+(&gt;|.*&gt;)/g)[0];   // /^&lt;\w{1,}(&gt;|.*&gt;)/g
                endTagMatches = str.match(/&lt;\/\w+>$/g);           // /&lt;\/\w{1,}>$/g
                endTag = (endTagMatches && endTagMatches.length > 0) ? endTagMatches[0] : '';
                content = str.replace(startTag, '').replace(endTag, '');
            } catch (err){}

            if (typeof pos != 'undefined')
            {
                if (content.indexOf('&lt;') != -1) {
                    hasSimple = true;
                    output = '<code class="konsole prettyprint inspect simple cords_'+pos.left+'-'+pos.top+'-'+width+'-'+height+'">'+startTag+'…​'+endTag+'</code>';
                }

                output += '<code class="konsole prettyprint inspect '+((hasSimple) ? 'full' : '')+' cords_'+pos.left+'-'+pos.top+'-'+width+'-'+height+'">'+str+'</code>';
                if (node.className.indexOf('log-css') == -1 && node.className.indexOf('log-log') == -1 && node.className.indexOf('log-info') == -1 && node.className.indexOf('log-event') == -1 &&
                    node.className.indexOf('log-warn') == -1 && node.className.indexOf('log-system') == -1 && node.className.indexOf('log-error') == -1 &&
                    node.className.indexOf('konsole') == -1 && node.id.indexOf('konsole') == -1 && node.className != 'log' && node.className != 'log wrapped' && node.className != 'cmdline')
                    finalArr.push(output);
            }
        }
        return finalArr.join(",<br/>");
    };


    //----------------------------------
    //  Command Line Methods
    //----------------------------------

    p.retrieveCommand = function(input)
    {
        if (p._cssEditData != null)
            return 'acss';

        var cmds = this.cmds;
        var n = cmds.length, i;
        for (i = 0; i < n; i++) {
            if ((typeof cmds[i].name == 'string' && cmds[i].name == input) || (typeof cmds[i].name != 'string' && cmds[i].name.indexOf(input) != -1))
                return cmds[i];
        }
        return null;
    };

    p.snapKonsole = function(str)
    {
        Konsole.snap = str;
    };

    p.sendReport = function(str)
    {
        Konsole.report({type: 'report', msg: str, callee: 'User'});
    };

    p.about = function()
    {
        p.addMessage(['Konsole '+Konsole.version+' {eatcodeplay.ch}'], 'system');
    };

    p.help = function(requestedCommand)
    {
        if (p.isEmpty(requestedCommand)) {
            p.addMessage(['Available commands:'], 'info');
            var cmdNames = [], cmds = p.cmds, n = cmds.length;
            for (var i = 0; i < n; i++) {
                var cmdName = cmds[i].name;
                if (typeof cmdName != 'string')
                    cmdName = cmds[i].name.join(' ');

                if (cmdName != 'report' || (cmdName == 'report' && Konsole.reportingEnabled))
                    cmdNames.push(cmdName);
            }
            p.addMessage(cmdNames, 'log');
            p.addMessage(['Enter "help {command}" for more details'], 'system');
        } else {
            var cmd = p.retrieveCommand(requestedCommand);
            if (cmd)
                p.addMessage([requestedCommand+' -> '+cmd.help], 'system');
        }
    };

    //----------------------------------
    // DOM Methods
    //----------------------------------

    p.highlightElement = function(selector)
    {
        var kId ='#konsole ', kParent = '[class^="konsole"] ';
        $(selector).not(kId).not(kId+selector).not(kParent).not(kParent+selector).css('outline', '2px solid #00FF00');
        setTimeout(function(){ $(selector).css('outline', ''); }, 1500);
    };

    p.getElement = function(selector)
    {
        var selected = null;
        if (typeof selector == 'undefined' || p.isEmpty(selector)) {
            $(document).on('click', function(evt)
            {
                evt.preventDefault(); evt.stopPropagation();
                var el = document.elementFromPoint(evt.clientX, evt.clientY);
                if (selected == el) {
                    $(el).css('background', '');
                    p.addMessage([$(el)], 'log');
                    $('#konsole').find('.cmdline input').focus();
                    $(document).off('click');
                }
                else {
                    $(el).css('background', 'rgba(238, 190, 68, 0.4)');
                    setTimeout(function(){ $(el).css('background', ''); }, 800);
                    selected = el;
                }
            });
        }
        else {
            var kId ='#konsole ', kParent = '[class^="konsole"] ';
            p.addMessage([$(selector).not(kId).not(kId+selector).not(kParent).not(kParent+selector)], 'log');
        }
    };

    //----------------------------------
    // Analysis Methods
    //----------------------------------

    p.doobStats = function()
    {
        if (typeof Stats != 'function') {
            console.system('Loading stats.js, just a sec..');
            p.loadExternalScripts('//cdn.rawgit.com/mrdoob/stats.js/master/build/stats.min.js', 'doobStats');
        }

        var $stats = $('#stats');
        if ($stats.length > 0) {
            clearInterval(p._statsTimer);
            p._stats = null;
            $stats.remove();
        }
        else {
            p._statsTimer = setInterval(function() {
                if (typeof Stats == 'function') {
                    clearInterval(p._statsTimer);
                    p.removeMessage(-1);
                    p._stats = new Stats();
                    p._stats.domElement.style.position = 'fixed';
                    p._stats.domElement.style.right = '0';
                    p._stats.domElement.style.top = '0';
                    p._stats.domElement.style.zIndex = '100001';
                    document.body.appendChild(p._stats.domElement);
                    p._statsTimer = setInterval(function() {
                        p._stats.update();
                    }, 1000 / 60);
                }
            }, 100);
        }
    };

    p.observeObject = function(obj, objName)
    {
        if (!Konsole.enabled)
            return;

        if (typeof Object.observe == 'function')
        {
            obj.name = objName || obj.name;
            console.info('Observing: '+obj.name);
            Object.observe(obj, function(changes) {
                changes.forEach(function(change)
                {
                    var operationType = '';
                    if (change.type == 'add')
                        operationType = 'New Property has been added to "'+change.object.name+'":';
                    else if (change.type == 'update')
                        operationType = 'A Property of "'+change.object.name+'" has been updated:';
                    else if (change.type == 'delete')
                        operationType = 'A Property of "'+change.object.name+'" has been deleted:';

                    var strArr = [
                        operationType,
                        ("Property&nbsp;: "+change.name),
                        ("Old Value: "+change['oldValue']),
                        ("New Value: "+change.object[change.name])
                    ];

                    if (change.type == 'add')
                        strArr.splice(2, 1);
                    else if (change.type == 'delete')
                        strArr.splice(3, 1);
                    console.info(strArr.join("\n"));
                });
            });
        }
        else {
            console.system('Object.observe is not implemented. Loading Polyfill.');
            p.loadExternalScripts('//cdn.rawgit.com/MaxArt2501/object-observe/master/dist/object-observe-lite.min.js', 'objectObserve');
            var interval = setInterval(function(){
                if (typeof Object.observe == 'function') {
                    clearInterval(interval);
                    p.observeObject(obj, objName);
                }
            }, 100);
        }
    };

    p.monitorValue = function(value, valueName)
    {
        if (!Konsole.enabled)
            return;

        if (!p._monitoringObject)
            p._monitoringObject = {};
        p._monitoringObject[valueName] = value;
        p.updateMonitoring();
    };

    p.updateMonitoring = function()
    {
        var $monitor = $('.konsole-monitor');
        if ($monitor.length == 0) {
            $('body').append('<div class="konsole-monitor"><div class="close">X</div><div class="values"></div></div>');
            $monitor = $($monitor.selector);
            $monitor.find('.close').off('click').on('click', function(){ $monitor.remove(); p._monitoringObject = null; });
            $monitor.on('mousedown', function(evt) {
                var el = $(this).get(0);
                $monitor.data({oX: el.style.right, oY: el.style.top, cX: evt.clientX, cY: evt.clientY});
                $(window).off('mousemove').on('mousemove', function(evt) {
                    var data = $monitor.data();
                    if (isNaN(data.oX)) data.oX = -parseFloat(data.oX);
                    if (isNaN(data.oY)) data.oY = parseFloat(data.oY);
                    $monitor.css({'right': -(data.oX + evt.clientX - data.cX), 'top': (data.oY + evt.clientY - data.cY), 'cursor': 'default'});
                });
            });
            $monitor.off('mouseup').on('mouseup', function() { $(window).off('mousemove'); });
        }

        for (var prop in p._monitoringObject) {
            if (p._monitoringObject.hasOwnProperty(prop)) {
                if ($monitor.find('.values div[data-konmon="'+prop+'"]').length > 0)
                    $monitor.find('.values div[data-konmon="'+prop+'"]').text(prop+': '+ p._monitoringObject[prop]);
                else
                    $monitor.find('.values').append('<div data-konmon="'+prop+'">'+prop+': '+ p._monitoringObject[prop]+'</div>');
            }
        }
    };

    p.findOverflow = function()
    {
        var docWidth = document.documentElement.offsetWidth,
            foundOverflow = false;
        [].forEach.call(
            document.querySelectorAll('*'),
            function(el) {
                if (el.offsetWidth > docWidth) {
                    foundOverflow = true;
                    console.log(el);
                }
            }
        );
        if (!foundOverflow)
            Konsole.system('No overflowing elements found');
    };

    //----------------------------------
    //  CSS Modification Methods
    //----------------------------------

    p.modifyElementCSS = function(cmdStr)
    {
        var styles, cmdArr = cmdStr.split(' '), cmd = cmdArr.shift(), params = cmdArr.join(' ');
        if (p._cssEditData == null && cmd == 'bind' && $(params).length > 0)
        {
            p._cssEditData = {selector: params};
            styles = p.getCurrentSelectorStyles(p._cssEditData);
            p.logComputedStyle(styles, p._cssEditData);
            p.highlightElement(params);
            return;
        }
        else if (cmd == 'get')
        {
            p._cssEditData = {selector: params};
            styles = p.getCurrentSelectorStyles(p._cssEditData);
            p.logComputedStyle(styles, p._cssEditData);
            p._cssEditData = null;
            return;
        }
        else if (cmd == 'class')
        {
            var paramStr, mode;
            if (params.indexOf(' add ') != -1) {
                mode = 'add';
                paramStr = params.split(' add ');
            }
            else if (params.indexOf(' remove ') != -1) {
                mode = 'remove';
                paramStr = params.split(' remove ');
            }
            if (typeof mode != 'undefined') {
                var kId ='#konsole ',
                    kParent = '[class^="konsole"] ',
                    selector = paramStr[0],
                    $elements = $(selector).not(kId).not(kId+selector).not(kParent).not(kParent+selector);
                $elements[mode + 'Class'](paramStr[1]);
                return;
            }
        }
        Konsole.warn('Selector returned 0 elements');
    };

    p.applyCSSBindCommands = function(input)
    {
        if (input && input.length > 0)
        {
            var inputArr, prop, value, cssData = p._cssEditData;
            if (input == 'highlight') {
                p.highlightElement(cssData.selector);
            }
            else if (input.indexOf(':') != -1)
            {
                cssData.keyAccess = false;
                inputArr = input.split(':');
                prop = p.trim(inputArr[0]);
                value = p.trim(inputArr[1]).replace(/;/,'');
                $(cssData.selector).css(prop.toLowerCase(), value);
                var styles = p.getCurrentSelectorStyles(cssData);
                p.logComputedStyle(styles, cssData);
            }
            else if (input.indexOf(' ') == -1)
            {
                cssData.keyAccess = true;
                cssData.keyProperty = input;
            }
        }
    };

    p.getCurrentSelectorStyles = function(cssData)
    {
        var computedStyles = {},
            $cssSelector = $(cssData.selector),
            cStyles,
            elStyles = $cssSelector.attr('style'),
            classNames = $cssSelector.attr('class'),
            elementId = $cssSelector.attr('id'),
            styleNamesArr = [];
        classNames = (typeof classNames != 'undefined' && classNames != '') ? classNames.split(' ') : [];

        var n = classNames.length;
        for (var i = 0; i < n; i++)
            classNames[i] = '.'+classNames[i];
        styleNamesArr = styleNamesArr.concat(classNames);
        if (n > 0)
            styleNamesArr.push(classNames.join(''));
        if (elementId) {
            styleNamesArr.push('#' + elementId);
            for(i = 0; i < n; i++)
                styleNamesArr.push('#' + elementId + classNames[i]);
            styleNamesArr.push('#' + elementId + classNames.join(''));
        }
        if (styleNamesArr.indexOf(cssData.selector) == -1)
            styleNamesArr.push(cssData.selector);

        if (typeof cssData.selector == 'string') {
            cStyles = p.getCurrentClassStyles(styleNamesArr);
            cssData.styleName = cssData.selector;
        }
        if (typeof cssData.selector == 'object')
        {
            if (cssData.selector.className != '') {
                cStyles = p.getCurrentClassStyles(cssData.selector.className.split(' '), '.');
                cssData.styleName = '.' + cssData.selector.className.split(' ').join('.');
            }
            else if (cssData.selector.id != '') {
                cStyles = p.getCurrentClassStyles(cssData.selector.id, '#');
                cssData.styleName = '#' + cssData.selector;
            }
            else {
                cStyles = [];
                cssData.styleName = 'element.style';
            }
        }

        if (typeof elStyles != 'undefined')
            cStyles.push('{'+elStyles+'}');

        n = cStyles.length;
        for (i = 0; i < n; i++)
        {
            var sArr = cStyles[i].match(/{(.*)}/)[1].split(';');
            var m = sArr.length;
            for (var j = 0; j < m; j++)
            {
                var str = p.trim(sArr[j]);
                if (!p.isEmpty(str)) {
                    var strArr = str.split(':'),
                        prop = p.trim(strArr[0]);
                    computedStyles[prop] = p.trim(strArr[1]).replace(/;/,'');
                }
            }
        }
        return computedStyles;
    };

    p.getCurrentClassStyles = function(selectors, prefix)
    {
        selectors = (typeof selectors == 'string') ? [selectors] : selectors;
        var findings = [], numClassNames = selectors.length;
        for (var k = 0; k < numClassNames; k++)
        {
            var selector = (typeof prefix != 'undefined') ? prefix + selectors[k] : selectors[k];
            var styles = document.styleSheets, n = styles.length;
            for(var i = 0; i < n; i++) {
                var rules = styles[i].rules || styles[i].cssRules;
                findings = p.getCSSStyleRules(selector, rules, findings);
            }
        }
        return (findings.length > 0) ? findings : [];
    };

    p.getCSSStyleRules = function(selectorText, rules, results_array)
    {
        var n = rules.length;
        for(var i = 0; i < n; i++) {
            if (rules[i].type == 1 && rules[i].selectorText == selectorText) {
                var cssText = (rules[i].cssText) ? rules[i].cssText : rules[i].style.cssText;
                results_array.push(cssText);
            }
            else if (rules[i].type == 4) {
                var innerRules = rules[i].rules || rules[i].cssRules;
                results_array = p.getCSSStyleRules(selectorText, innerRules, results_array);
            }
        }
        return results_array;
    };

    p.logComputedStyle = function(computedStyle, cssData)
    {
        var out = '<span class="selector">' + cssData.styleName + ' </span><span>{</span><br/>';
        for (var propName in computedStyle) {
            if (computedStyle.hasOwnProperty(propName))
            {
                var value = computedStyle[propName];
                var fValue = value + ';';
                if (value.indexOf('rgb') != -1)
                {
                    var rgba = computedStyle[propName].match(/\((.+)\)/)[1].split(',');
                    var hexCode = '#' + p.c2Hex(rgba[0]) + p.c2Hex(rgba[1]) + p.c2Hex(rgba[2]);
                    fValue = computedStyle[propName] + '; <span class="comment"> /* '+hexCode+' */</span>';
                }
                out += p.spacer+'<span class="property">'+propName+"</span><span>: "+fValue+'</span><br/>';
            }
        }
        out += "<span>}</span>";
        var $log = $('#konsole').find('.log.wrapped');
        if (typeof cssData['$log'] == 'undefined') {
            var msg = p.getLineNumber();
            msg += '<p class="log-css">'+out+'</p>';
            $log.append(msg + '<br/>');
            cssData['$log'] = $('.log-css:last');
            this.logs.push(msg);
        }
        else {
            cssData.$log.html(out);
            this.logs[this.logs.length-1] = cssData.$log.prev().get(0).outerHTML  + cssData.$log.get(0).outerHTML;
        }
        $log.get(0).scrollTop = $log.get(0).scrollHeight;
    };

    //-------------------------------------------
    // Type/Value Checking/Manipulation Methods
    //-------------------------------------------

    p.isXml = function(v) {
        var documentElement = v && (v.ownerDocument || v).documentElement;
        return documentElement ? documentElement.nodeName !== "HTML" : false;
    };
    p.isSimpleHtml = function(v) {
        return /<[a-z][\s\S]*>/i.test(v);
    };
    p.isInDOM = function(v) {
        var documentElement = v && (v.ownerDocument || v).documentElement;
        return documentElement ? documentElement.nodeName === "HTML" : false;
    };
    p.isArray = function(v) {
        return !!(typeof v === 'object' && {}.toString.call(v) === '[object Array]');
    };
    p.isFunction = function(v) {
        return !!(typeof v === 'function' && {}.toString.call(v) === '[object Function]');
    };
    p.isObject = function(v) {
        return !!(typeof v === 'object' && {}.toString.call(v) === '[object Object]');
    };
    p.isEmpty = function(v) {
        return !!(typeof v === 'undefined' || v == null || (typeof v === 'string' && v == ''));
    };
    p.hasJQueryContext = function(v) {
        return (v.hasOwnProperty('context') && p.isInDOM(v.context)) ? true : false;
    };
    p.trim = function(v) {
        return (String.prototype.trim) ? v.trim() : v.replace(/^\s+|\s+$/g, '');
    };
    p.padNumber = function(v, l, p) {
        p = p || '0'; v = v + '';
        return v.length >= l ? v : new Array(l - v.length + 1).join(p) + v;
    };

    p.c2Hex = function(c) {
        var hex = parseFloat(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    p.isTouchDevice = function()
    {
        return 'ontouchstart' in window || ('onmsgesturechange' in window && window.navigator.msMaxTouchPoints > 0);
    };

    //----------------------------------
    // Resources Methods
    //----------------------------------

    p.loadExternalScripts = function(url, id)
    {
        var d = document, t = 'script', s = d.createElement(t);
        s.id = id;
        s.src = url;
        d.body.appendChild(s);
    };

    //---------------------------------------------------
    //
    //  Event Handling
    //
    //---------------------------------------------------

    p.handleCmdInput = function(e)
    {
        var $cmdLine = $('#konsole').find('.cmdline input');
        if (e.keyCode == 13) // ENTER
        {   
            var inputValue = $(this).val(),
            inputArr = inputValue.split(" "),
            cmdStr = inputArr.shift(),
            args = inputArr.join(" "),
            cmd = p.retrieveCommand(cmdStr.toLowerCase());

            if (p.history[p.history.length-1] != inputValue)
                p.history.push(inputValue);
            p.historyIndex = p.history.length;

            if (cmd && cmd == 'acss')
                p.applyCSSBindCommands(inputValue);
            else if (cmd)
                cmd.func(args);

            if (!cmd) {
                try {
                    var expression = $(this).val(),
                        result = window.eval(expression);
                    if (result != undefined)
                        p.addMessage([result], 'log');
                } catch (err ) {
                    p.addMessage(['Unknown command. Type "help" for a list of available commands.'], 'system');
                }
            }
            $cmdLine.val('');
        }
        else if (e.ctrlKey == true) {
            // do nothing...
        }
        else if (e.altKey == false && (e.keyCode == 38 || e.keyCode == 40)) // ARROW_UP || ARROW_DOWN
        {
            var cssData = p._cssEditData;
            if (cssData == null || (cssData && typeof cssData.keyAccess != 'undefined' && !cssData.keyAccess)) {
                if (e.keyCode == 38 && p.history.length > 0 && p.historyIndex - 1 > -1)
                    p.historyIndex--;
                else if (e.keyCode == 40 && p.history.length > 0 && p.historyIndex + 1 < p.history.length)
                    p.historyIndex++;
                $cmdLine.val(p.history[p.historyIndex]);
            }
        }
    };

    p.handleLogMouseWheel = function(evt)
    {
        evt = window.event || evt;
        var $log = $('#konsole').find('.log.wrapped'),
            scrollTop = $log.scrollTop(),
            delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));
        $log.scrollTop(scrollTop - (delta*13));
    };

    p.handleCmdResize = function(e)
    {
        var $konsole = $('#konsole'), cssData = p._cssEditData;
        if (cssData != null && typeof cssData.keyAccess != 'undefined' && cssData.keyAccess)
        {
            var $cssSelector = $(cssData.selector),
                currentVal = $cssSelector.css(cssData.keyProperty);
            if (typeof currentVal != 'undefined')
            {
                var unit = currentVal.match(/[a-z,A-Z,%]+/g),
                    value = currentVal.match(/[-?0-9]+/);

                unit = (unit) ? unit[0] : '';
                value = (value) ? parseFloat(value[0]) : 0;
                if (unit == 'px' || unit == 'em' || unit == '%') {
                    if (e.keyCode == 38)
                        value += (e.shiftKey) ? 10 : 1;
                    if (e.keyCode == 40)
                        value -= (e.shiftKey) ? 10 : 1;
                    $cssSelector.css(cssData.keyProperty, value + '' + unit);
                    p.logComputedStyle(p.getCurrentSelectorStyles(cssData), cssData);
                }
            }
        }
        else if (e.altKey && !e.ctrlKey && (e.keyCode == 38 || e.keyCode == 40))
        {
            if (e.keyCode == 38)
                p._lastResizePercentage -= (e.shiftKey) ? 0.05 : 0.005;
            else if (e.keyCode == 40)
                p._lastResizePercentage += (e.shiftKey) ? 0.05 : 0.005;
            Konsole.resize();
        }
        else if (e.ctrlKey == true && e.altKey == true && (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40))
        {
            var prop;
            if (e.keyCode == 38)        prop = 'top';
            else if (e.keyCode == 40)   prop = 'bottom';
            else if (e.keyCode == 37)   prop = 'left';
            else if (e.keyCode == 39)   prop = 'right';
            Konsole.snap = prop;
        }
        else if (!e.altKey && e.ctrlKey && (e.keyCode == 38 || e.keyCode == 40))
        {
            var el = $konsole.find('.log.wrapped')[0];
            if (el) {
                if (e.keyCode == 38)
                    el.scrollTop -= (e.shiftKey) ? 26 : 13;
                else if (e.keyCode == 40)
                    el.scrollTop += (e.shiftKey) ? 26 : 13;
            }
        }
    };

    p.handleKeyboardEvent = function(e)
    {
        if (e.type == 'keypress' && String.fromCharCode(e.which) == Konsole.key) {
            e.preventDefault();
            if (!p._visible) Konsole.show();
            else Konsole.hide();
        }
        else if (e.keyCode == 27 && p._cssEditData != null)
        {
            Konsole.system('CSS Edit Mode deactivated');
            p._cssEditData = null;
            $('#konsole').find('.cmdline input').focus();
        }
    };

    p.handleGlobalError = function(err)
    {
        try {
            var loc = err.colno ? err.lineno + ':' + err.colno : err.lineno,
                msg = err.message,
                file = err.filename.split('/').pop();
            Konsole.error(msg+'  <- '+file+':'+loc);
            Konsole.show();
        } catch (err) {}
    };

    p.handleDOMHoverOver = function()
    {
        var $konsoleHighlight = $('#konsole-highlight'),
            cords,
            matches = $(this).attr('class').match(/cords_(.+)(?:\W)/);
        if (matches && matches[1])
            cords = matches[1].split('-');
        if (cords)
        {
            $konsoleHighlight.css({'left': cords[0]+'px', 'top': cords[1]+'px', 'width': cords[2]+'px', 'height': cords[3]+'px'});
            $konsoleHighlight.show();
            $(this).css('outline', '1px dashed #777');
        }
    };

    p.handleDOMHoverOut = function()
    {
        $('#konsole-highlight').hide();
        $(this).css('outline', 0);
    };
    
    //---------------------------------------------------
    // init
    //---------------------------------------------------
    window.Konsole = Konsole;
    Konsole.takeOver = true;
    p.init();
}());