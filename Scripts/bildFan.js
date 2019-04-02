
$(document).ready(function(){
  $('#sp1').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    //slidesToScroll: 4
  });

  $('.imgs').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    slidesToShow: 3,
    dots: true,
    //slidesToScroll: 4
  });
});
