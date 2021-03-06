$(document).ready(function(){
  $('.carousel__inner').slick({
    speed: 1200,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-arrow.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right-arrow.png"></button>',
    dotsClass: 'dots',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 2000,
        }
      }],
  });


  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  $('.catalog-item__more').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__wrapper').eq(i).toggleClass('catalog-item__wrapper_hidden');
      $('.catalog-item__wrapper').eq(i).siblings('.catalog-item__wrapper').toggleClass('catalog-item__wrapper_hidden');
      // $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_hidden');
    })
  })

  // Modal

  $('[data-modal=consultation').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function(e) {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  //form validation

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: 'required',
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: '*Пожалуйста, введите Ваше имя',
        phone: '*Пожалуйста, введите Ваш номер телефона',
        email: {
          required: '*Пожалуйста, введите Ваш адрес электронной почты',
          email: "*Адрес почты должен быть в формате name@domain.com"
        }
      }
    });
  }


  validateForm('#consultation form');
  validateForm('#consultation-form');
  validateForm('#order form');

  $('input[name=phone]').mask('+7 (999) 999-99-99');

  //send form data

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });

  //scroll page to top

  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
      $('.pageTop').fadeIn();
    }
    else {
      $('.pageTop').fadeOut();
    }
  });
  $("a[href^='#']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
});