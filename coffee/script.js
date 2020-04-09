$(document).ready(function() {

    /*Sticky Navigation*/
    $('.js--community').waypoint(function(direction) {
        if (direction == 'down') {
            $('.main-nav-head').addClass('sticky');
        } else {
            $('.main-nav-head').removeClass('sticky');
        }
    }, {
        offset: '15%'
    });

	/*Animations on scroll*/
    $('.js--community').waypoint(function(direction) {
		$('.js--community').addClass('animated fadeIn');
	}, {
		offset: '50%'
    });
    
    $('.js--about').waypoint(function(direction) {
		$('.js--about').addClass('animated fadeIn');
	}, {
		offset: '60%'
    });

    $('.js--barista-left1').waypoint(function(direction) {
		$('.js--barista-left1').addClass('animated slideInLeft');
	}, {
		offset: '75%'
    });

    $('.js--barista-right1').waypoint(function(direction) {
		$('.js--barista-right1').addClass('animated slideInRight');
	}, {
		offset: '75%'
    });

    $('.js--barista-left2').waypoint(function(direction) {
		$('.js--barista-left2').addClass('animated slideInLeft');
	}, {
		offset: '75%'
    });

    $('.js--barista-right2').waypoint(function(direction) {
		$('.js--barista-right2').addClass('animated slideInRight');
	}, {
		offset: '75%'
    });

    $('.js--barista-left3').waypoint(function(direction) {
		$('.js--barista-left3').addClass('animated slideInLeft');
	}, {
		offset: '75%'
    });

    $('.js--barista-right3').waypoint(function(direction) {
		$('.js--barista-right3').addClass('animated slideInRight');
	}, {
		offset: '75%'
    });

    $('.js--barista-left4').waypoint(function(direction) {
		$('.js--barista-left4').addClass('animated slideInLeft');
	}, {
		offset: '75%'
    });

    $('.js--drop-in-button').waypoint(function(direction) {
		$('.js--drop-in-button').addClass('animated bounceInDown');
	}, {
		offset: '90%'
    });

    /*Mobile navigation*/
	$('.js--nav-icon').click(function() {
		var nav = $('.js--main-nav');
		var icon = $('.js--nav-icon i');
		nav.slideToggle(200);
		if (icon.hasClass('ion-navicon-round')) {
			icon.addClass('ion-close-round');
			icon.removeClass('ion-navicon-round');
		} else {
			icon.addClass('ion-navicon-round');
			icon.removeClass('ion-close-round');
		};
  });

  /*smooth scroll*/
  $('a[href*="#"]').on('click', function(e) {
	e.preventDefault();

	var target = this.hash,
	$target = $(target);
  
	$('html, body').animate(
	  {
		scrollTop: $($(this).attr('href')).offset().top,
	  },
	  500,'linear', function() {
		  window.location.hash = target;
	  }
	)
  })




});
