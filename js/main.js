
(function($) {

	function throttle(func, wait, options) {
	  var context, args, result;
	  var timeout = null;
	  var previous = 0;
	  if (!options) options = {};
	  var later = function() {
	    previous = options.leading === false ? 0 : Date.now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	  return function() {
	    var now = Date.now();
	    if (!previous && options.leading === false) previous = now;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	};
	function debounce( func , timeout ) {
	   var timeoutID , timeout = timeout || 200;
	   return function () {
	      var scope = this , args = arguments;
	      clearTimeout( timeoutID );
	      timeoutID = setTimeout( function () {
	          func.apply( scope , Array.prototype.slice.call( args ) );
	      } , timeout );
	   }
	}

	function empty(value){
		return (value === undefined || value === null || value === '');
	}

	function isInt(value) {
	  if (isNaN(value)) {
	    return false;
	  }
	  var x = parseFloat(value);
	  return (x | 0) === x;
	}

	var docSize, docWidth, docHeight, scrollPos, html_el, body, page, main,
		header, header_height, admin_bar, admin_bar_height, first_page_section;


	$(document).ready(function() {

		html_el = $('html');
		body = $('body');
		page = $('#page');
		main = $('#main');
		header = $('#header');
		first_page_section = $('section.page-section:first-child');

		$.wgatheme.initViewportSize();
		$.wgatheme.initScrollPos();
		// $.wgatheme.initHeader();
		$.wgatheme.initMobileMenu();

	});


	$.wgatheme = (function(wgatheme) {

		wgatheme.initMobileMenu = function() {

			$('.mobile-menu-toggle').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				body.toggleClass('mobile-menu-active');
			}).on('vmousedown', function(e) {
				e.stopPropagation();
			});
			$(document).on('vmousedown', 'body.mobile-menu-active .site-wrap', function() {
				$('body').removeClass('mobile-menu-active');
			});

			// $('.mobile-navigation a').on('click', function(e) {
			// 	var menuItem = $(this).parent();
			// 	var subMenu = $('> ul.sub-menu', menuItem);
			// 	if(subMenu.length && !menuItem.hasClass('sub-menu-active')) {
			// 		e.preventDefault();
			// 		$('.mobile-navigation .menu-item.sub-menu-active').not(menuItem.parents('.sub-menu-active')).each(function(i, el) {
			// 			$(el).removeClass('sub-menu-active');
			// 			$('> ul.sub-menu', el).animate({ height: 0 }, 400, 'easeOutExpo');
			// 		});
			// 		menuItem.addClass('sub-menu-active');
			// 		subMenu.css({ height: 'auto' });
			// 		var height = subMenu.outerHeight();
			// 		subMenu.css({ height: 0 }).animate({ height: height }, 400, 'easeOutExpo', function() { $(this).css({ height: 'auto' }); });
			// 	}
			// });

			// $('.mobile-navigation .menu-item.current-menu-ancestor, .mobile-navigation .menu-item.current-menu-item').each(function(i, el) {
			// 	var subMenu = $('> ul.sub-menu', el);
			// 	if(subMenu.length) {
			// 		$(el).addClass('sub-menu-active');
			// 		subMenu.css({ height: 'auto' });
			// 	}
			// });

		};

		wgatheme.smoothScrollToElement = function(element, speed, offset) {
			speed = typeof speed !== 'undefined' ? speed : 1000;
			offset = typeof offset !== 'undefined' ? offset : 0;
			if(element.length > 0) {
				var margin = parseInt(element.css('margin-top'));
				wgatheme.smoothScrollToPos(element.offset().top - (margin > 0 ? margin : 0), speed, offset);
			}
		};
		wgatheme.smoothScrollToPos = function(y, speed, offset) {
			speed = typeof speed !== 'undefined' ? speed : 1000;
			offset = typeof offset !== 'undefined' ? offset : 0;
			var fixedHeaderOffset = 0;
			$('html, body').stop(true).animate({ scrollTop: y - fixedHeaderOffset + offset }, speed, 'easeInOutExpo');
		};

		wgatheme.initScrollPos = function(){
			$.wgatheme.updateScrollPos();
			$(window).scroll(function(){ $.wgatheme.updateScrollPos(); });
			$(window).resize(function(){ $.wgatheme.updateScrollPos(); });
		};
		wgatheme.updateScrollPos = function(){
			scrollPos = $(document).scrollTop();
		};

		wgatheme.initViewportSize = function(){
			$.wgatheme.updateViewportSize();
			$(window).resize(function(){ $.wgatheme.updateViewportSize(); });
		};
		wgatheme.updateViewportSize = function(){
			function viewportSize() {
				var e = window, a = 'inner';
				if (!('innerWidth' in window )) {
					a = 'client';
					e = document.documentElement || document.body;
				}
				return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
			}
			docSize = viewportSize();
			docWidth = docSize.width;
			docHeight = docSize.height;
		};


		return wgatheme;

	})({});

})(jQuery);