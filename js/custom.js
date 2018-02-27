
$(document).ready(function() {
  // BarbaJS calls
  if(document.querySelector("#barba-wrapper") && document.querySelector(".barba-container")){
    Barba.Pjax.start();
    var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
      },
      fadeOut: function() {
        return $(this.oldContainer).animate({ opacity: 0 }).promise();
      },
      fadeIn: function() {
        window.scrollTo(0, 0);
        var _this = this;
        var $el = $(this.newContainer);
        $(this.oldContainer).hide();
        $el.css({
          visibility : 'visible',
          opacity : 0
        });
        $el.animate({ opacity: 1 }, 400, function() {
          _this.done();
        });
      }
    });
    Barba.Pjax.getTransition = function() {
      return FadeTransition;
    };
  }
  else{
    console.log("BarbaJS wrappers not found.");
  }

  // Smooth scrolling
  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, 'easeInOutExpo');

          if ( $(this).parents('.nav-menu').length ) {
            $('.nav-menu .menu-active').removeClass('menu-active');
            $(this).closest('li').addClass('menu-active');
          }

          if ( $('body').hasClass('mobile-nav-active') ) {
              $('body').removeClass('mobile-nav-active');
              $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
              $('#mobile-body-overly').fadeOut();
          }
          return false;
        }
      }
    });
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });

      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Counting numbers
  /*
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });
  */
  // Tooltip & popovers
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  // Background image via data tag
  $('[data-block-bg-img]').each(function() {
    // @todo - invoke backstretch plugin if multiple images
    var $this = $(this),
      bgImg = $this.data('block-bg-img');

      $this.css('backgroundImage','url('+ bgImg + ')').addClass('block-bg-img');
  });

  // jQuery counterUp
  /*
  if(jQuery().counterUp) {
    $('[data-counter-up]').counterUp({
      delay: 20,
    });
  }
  */

  /*Scroll Top link
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrolltop').fadeIn();
    } else {
      $('.scrolltop').fadeOut();
    }
  });
  $('.scrolltop, #logo a').click(function(){
    $("html, body").animate({
      scrollTop: 0
    }, 1000, 'easeInOutExpo');
    return false;
  });*/

  let stripeForm = document.getElementById("contributionForm")
  if(stripeForm){
    stripeForm.onsubmit=function(e) {
      e.preventDefault();
      console.log("\tProcessing a payment...");
      // Set your secret key: remember to change this to your live secret key in production
      // See your keys here: https://dashboard.stripe.com/account/apikeys
      var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

      // Token is created using Checkout or Elements!
      // Get the payment token ID submitted by the form:
      var token = request.body.stripeToken; // Using Express

      // Charge the user's card:
      stripe.charges.create({
        amount: 999,
        currency: "usd",
        description: "COntribution to Change for New Brunswick",
        source: token,
      }, function(err, charge) {
        // asynchronously called
      });
    }
  }
  else{
    console.log("\tNo form found on this page.");
  }
  
  function getAmount(){return 400;}
});