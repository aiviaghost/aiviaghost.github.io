
$(document).ready(function(){
  $('#sp1').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  });

  $('.imgs').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    slidesToShow: 3,
    draggable: true,
    dots: false,
  });
});
