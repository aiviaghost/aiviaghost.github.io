
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
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }},
      {breakpoint: 900,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }}
    ]
  });
});
