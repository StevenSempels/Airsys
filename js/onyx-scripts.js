/*------------------------------------------------------------------
[Onyx Javascript Master File]

Project:	Onyx Creative Portfolio Template
Version:	1.1
Last change:	18/07/17
Created by:		Incondite Media
-------------------------------------------------------------------*/





/*------------------------------------------------------------------
[Header Shrink]
-------------------------------------------------------------------*/

'use strict'; /* Strict Mode */

function init() {
		
window.addEventListener('scroll', function(e){
										   
	var distanceY = window.pageYOffset || document.documentElement.scrollTop,
		shrinkOn = 25,
		header = document.querySelector("#header, #sidebar-header");
		
	if (distanceY > shrinkOn) {
		classie.add(header,"small");
	} 
	
	else {
		if (classie.has(header,"small")) {
			classie.remove(header,"small");
		}
	}
	});
	}
	
window.onload = init();





/*------------------------------------------------------------------
[Header Shrink Class Selector]
-------------------------------------------------------------------*/

( function( window ) {

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  /* Full Names */
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
 /* Short Names */
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

/* Transport */

if ( typeof define === 'function' && define.amd ) {
  define( classie );
} else {
  /* Global Browser */
  window.classie = classie;
}

})( window );





/*------------------------------------------------------------------
[IOS Fix]
-------------------------------------------------------------------*/

(function(w){
	
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );





/*------------------------------------------------------------------
[Smooth Scrolling]
-------------------------------------------------------------------*/

$('a[href*="#"]').click(function(e) {
	var target = $(this).attr("data-scroll-target");
    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1000);
    $("[for=op]:visible").eq(1).click()
	return false;
});





/*------------------------------------------------------------------
[Text Typer]
-------------------------------------------------------------------*/

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 5000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 1000;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
 
 /* Styling */
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.05em solid #fff }";
  document.body.appendChild(css);
};





/*------------------------------------------------------------------
[Masonry]
-------------------------------------------------------------------*/

// $(window).on('load', function () {

//     $('.masonry-container').masonry({
//         "itemSelector": ".item",
//         "columnWidth": ".grid-sizer",
//     });

// });