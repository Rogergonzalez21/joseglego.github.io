// Secion X: Name          # Line 0
//// X. Title              # Line 1
// Line 0: Inidcate Section { 0. Functions | 1. EventHandlers | 2. Init & Data}
// Line 1: Indicate Module & Small description (In extends sections this is helpful

$(document).ready(function() {  
  // Section 0: Functions
  //// 0. SameSize: Screen - Index
  var setIndexSize = function() {
    var windowSize = $(window).height();
    var textSize = $($('#index div')[0]).outerHeight();
    var footerSize = $('#footer').outerHeight();
    
    $('#index').height(windowSize);
    
    if (textSize <  windowSize) {
      $('#index').css('padding-top',((windowSize-textSize)/2)+'px');
    };
  };

  //// 0. Modal Projects
  var openModal = function(project) {
    $('#modal-content').html('<div class="text-center"><i class="fa fa-spinner fa-pulse fa-3x"></i></div>');
    $('#modal-content').load('views/projects/'+project+'.html');
    $('#modal').modal();
  };

  //// 0. Waiting Message: Show Message
  var waitingStart = function() {
    sending = swal('Wait...', 'Sending your email...');
  };

  //// 0. Waiting Message: Close Message
  var waitingStop = function() {
    sending.close();
  };

  //// 0. Send Email
  var sendEmail = function() {
    $.ajax({
      url: 'https://formspree.io/roger@rogs.me',
      method: 'POST',
      data: {
        name: $('#name').val(),
        message: $('#message').val(),
        email: $('#email').val(),
        _subject: $('#subject').val()
      },
      dataType: 'json',
      beforeSend: waitingStart
    }).done(function(data) {
      $('#name').val('');
      $('#email').val('');
      $('#name').val('');
      $('#subject').val('');
      $('#message').val('');
      swal.close();
      setTimeout(function() {
        swal('Great', 'Your email was sent. I will contact you soon. Thank you', 'success');
      }, 500);
    }).fail(function(response) {
      swal.close();
      setTimeout(function() {
        swal('Oops...', 'An error ocurred. Please, try again!', 'error');
      },500);
    });
  };

  //// 0. Float Navbar
  var floatNavbar = function() {
    var y = $(document).scrollTop();
    var windowSize = $(window).height();
    var header = $('#menu');
    
    //show the header fixed
    if (y >= windowSize) {
      header.addClass('navbar-fixed-top');
    } else {
      header.removeClass('navbar-fixed-top');
    }

    // show the active element
    if (y > $('#experience').position().top) {
      $('ul-menu li').removeClass('active');
    }
  };
  
  // Section 1: Events Handler
  //// 1. When click on Project
  $('.open-modal').on('click', function() {
    openModal($(this).attr('id'));
  });

  //// 1. Change Carousel Size
  $('#modal-content').on('click','#carousel-change', function() {
    var size = parseInt($('#carousel-container').attr('data-size'));
    var carousel = $('#carousel-container');
    carousel.removeClass();
    size = (size + 1) % 4;
    carousel.attr('data-size',size);
    switch(size) {
    case 0:
      carousel.addClass('col-sm-4 col-sm-offset-4');
      break;
    case 1:
      carousel.addClass('col-sm-6 col-sm-offset-3');
      break;
    case 2:
      carousel.addClass('col-sm-8 col-sm-offset-2');
      break;
    case 3:
      carousel.addClass('col-sm-12');
      break;
    }
  });

  //// 1. FormValidation
  $contactFormValidator = $('#contact-form').validate({
    highlight: function(element) {
      $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function(element) {
      $(element).closest('.form-group').removeClass('has-error');
      $(element).remove();
    },
    errorPlacement: function(error, element) {
      element.parent().append(error);
    },
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true
      }
    },
    submitHandler: function() {
      sendEmail();
    }
  });

  //// 1. Click on Email@ContactInfo
  $('#go-to-email').click(function() {
    $('#name').focus();
    sweetAlert({
      title: 'Write Me',
      text: 'You can write me though the Contact form. You will be on the form when this message closes (it will close automatically).',
      timer: 7000,
      showConfirmButton: true
    });
  });
  
  // Section 2: Data & Init;
  //// 2; Set Index
  setIndexSize();
  $('#index').backstretch([
    './assets/images/backgrounds/index0.jpg',
    './assets/images/backgrounds/index1.jpg',
  ], {
    duration: 4000,
    fade: 750
  });
  
  //// 2. Match Heigth
  $('.ido').matchHeight();
  $('.experience').matchHeight(); 
  $('.contact').matchHeight();
 
  //// 2. Slick
  $('#ac').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    fade: true
  });

  //// 2. Fixed Navbar
  $(document).scroll(function() {
    floatNavbar();
  });

  // Close Menu when select Section
  $('#navbar-lego').click('li', function() {
    $('#navbar-lego').collapse('hide');
  });
  
  //// 2. SmootScroll
  smoothScroll.init({
    offset: 0 // Integer. How far to offset the scrolling anchor location in pixels
  });

  //// 2. ScrollSpy
  $('body').scrollspy({ target: '#navbar-lego', offset: 64});

  //// 2. Tooltips
  $('[data-toggle="tooltip"]').tooltip();
});
