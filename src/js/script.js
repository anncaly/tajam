// @import "js/owl.carousel.min.js";

$(document).ready(function(){
  $('.slide-one').owlCarousel({
  	loop: true,
  	dots: true,
  	autoplay: true,
  	autoplayTimeout: 4000,
  	responsive: {
  		0: {
  			items: 1, 
  			nav: false
  		}
  	}
  });
  $('.slide-two').owlCarousel({
  	loop: true,
  	dots: true,
  	autoplay: true,
  	autoplayTimeout: 4000,
  	dotsContainer: '#carousel-custom-dots',
  	nav: true,
		navText: [
   		"<img src=\"../img/left-arrow.png\">",
   		"<img src=\"../img/right-arrow.png\">"
			],
  	responsive: {
  		0: {
  			items: 1, 
  			// nav: true
  		}
  	}
  });
//   $('.owl-custom-dot').click(function () {
//     owl.trigger('to.owl.carousel', [$(this).index(), 300]);
// });
  $(function() {
		$('.border').matchHeight();
		$('.table').matchHeight();
	});
  // $('.toggle-nav').click(function(e) {
  //   $(this).toggleClass('active');
  //   $('.menu ul').toggleClass('active');
  //   e.preventDefault();
  // });
  $('.toggle-nav').on('click', function() {
    $('nav ul').toggleClass('show');
  });
  // $('.toggle-nav').click(function() {
  //   $(this).toggleClass('show');
  //   $("header nav").slideToggle(400, function() {
  //     $(this).toggleClass("nav-expanded").css('display', '');
  // });
  // });
});