//jQuery boilerplate used, from http://jqueryboilerplate.com/ thx people smarter than me!
;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = "EzFade",
        defaults = {
            duration: 3000,
            parentName: 'EzFade',
            childName: 'EzFadeElm',
            fadeSpeed: 1000,
            width: '100%',
            height: '600',
            position: 'relative'
        };

    // plugin constructor
    function Plugin( element, options ) {
        this.element = $(element);
        self = this;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;        
        this.container ={}
        this.init();
        console.log(this);
        $(window).resize(function(){
            self.getContainerSize(self.element, self.container, function(){
                self.element.children().each(function(key,value){
                    var $val = $(value);
                    self.resizePhoto($val);     
                });
            });
        });
    }

    Plugin.prototype = {
        //initializes the set interval to show and 'hide' each image
        startFade: function(el){
            setInterval(function(){
                $(el).children(":first")
                    .animate({'opacity':0},self.options.fadeSpeed)
                    .next('img')
                    .animate({'opacity':100},self.options.fadeSpeed)
                    .end()
                    .appendTo(el);
            },self.options.duration); 
        },

        //method for finding the parent size so it knows how to size the child elements
        getContainerSize: function(el,obj,callback){
            obj.width = el.innerWidth();
            obj.height = el.height();
            obj.ratio = obj.width / obj.height;
            if(callback){
                callback();
            }
        },

        //Tha money shot!
        resizePhoto: function(photo){
            var photoHeight = photo.height(),
                photoWidth = photo.width(),
                photoRatio = photoWidth / photoHeight,
                resizeAmt = null;
            //resizes based on height or width
            if(photoRatio <= self.container.ratio){
                resizeAmt = photoHeight * ( self.container.width / photoWidth );
                photo.css({
                    'width': self.container.width,
                    'top' : - ((resizeAmt - self.container.height) / 2),
                    'height' : 'auto',
                    'left' : 'auto',
                    'max-width' : '100%',
                });
            }else{
                resizeAmt = photoWidth * ( self.container.height / photoHeight );
                photo.css({
                    'height': self.container.height,
                    'left': - ((resizeAmt - self.container.width) / 2),
                    'top' : 'auto',
                    'width' : 'auto',
                    'max-width' : 'none',
                });
                console.log('else');
            }
        },

        init: function() {
            //As soon as it loads add classes and styles to parent and children
            //Loading animation "borrowed" from Kelly Dyson @ http://dontwakemeup.com/css-loading-animation/
            //Plz don't sue me :)
            var loadIcon = $(
                '<div class="spinner"><div class="b1 se"></div><div class="b2 se"></div><div class="b3 se"></div><div class="b4 se"></div><div class="b5 se"></div><div class="b6 se"></div><div class="b7 se"></div><div class="b8 se"></div><div class="b9 se"></div><div class="b10 se"></div><div class="b11 se"></div><div class="b12 se"></div></div>');
            loadIcon.insertBefore(self.element);
            self.element.addClass(self.options.parentName)
                .css({
                    'overflow': 'hidden',
                    'height' : self.options.height,
                    'width': self.options.width,
                    'position': self.options.position
                })
                .children('img').each(function(key,val){
                    $val = $(val);
                    $val.addClass(self.options.childName).css({
                        'position': 'absolute',
                        'opacity': '0'
                    });
                });
            //when it loads finally resize all elements
            $(window).load(function(){
                loadIcon.hide();
                self.getContainerSize(self.element, self.container, function(){
                    self.element.children().each(function(key,value){
                        var $val = $(value);
                        self.resizePhoto($val);
                        if(key == 0){
                            $val.css({
                                'opacity' : '100'
                            });
                        }
                    });
                });
                self.startFade(self.element);
            });
        }
  
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };



})( jQuery, window, document );