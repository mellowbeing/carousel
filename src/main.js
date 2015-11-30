$el       = $('.carouselContainer');
$main     = $el.find('.carouselMain');
$thumbs   = $el.find('.carouselThumbsContainer');

var carousel = new window.Carousel({
  'main'            : $main,
  'thumbs'          : $thumbs,
  'thumbsVisible'   : 5
});

carousel.init();
