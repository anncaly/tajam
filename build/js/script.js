// @import "js/owl.carousel.min.js";

$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
  	loop: true,
  	dots: true,
  	autoplay: true,
  	autoplayTimeout: 5000,
  	responsive: {
  		0: {
  			items: 1, 
  			nav: false
  		}
  	},
  });
});