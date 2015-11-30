describe("Carousel", function() {
  
  'use strict';

  var carousel,
      $el,
      $main,
      $thumbs,
      fixture; 

  fixture = setFixtures('<section class="carouselContainer"><div class="carouselMain mask"><ul class="scrollable"><li><figure><img src="images/main1.jpg" alt="Slide image 1"/></figure></li><li><figure><img src="images/main2.jpg" alt="Slide image 2"/></figure></li><li><figure><img src="images/main3.jpg" alt="Slide image 3"/></figure></li><li><figure><img src="images/main4.jpg" alt="Slide image 4"/></figure></li><li><figure><img src="images/main5.jpg" alt="Slide image 5"/></figure></li></ul><ul class="nav"><li class="prev"><div class="navButton"><span></span></div></li><li class="next"><div class="navButton"><span></span></div></li></ul></div><div class="carouselThumbsContainer"><div class="carouselThumbs mask"><ul class="scrollable"><li><img src="images/thumb1.jpg" alt="Thumb image 1"/></li><li><img src="images/thumb2.jpg" alt="Thumb image 2"/></li><li><img src="images/thumb3.jpg" alt="Thumb image 3"/></li><li><img src="images/thumb4.jpg" alt="Thumb image 4"/></li><li><img src="images/thumb5.jpg" alt="Thumb image 5"/></li></ul></div><ul class="nav"><li class="prev"><div class="navButton"><span></span></div></li><li class="next"><div class="navButton"><span></span></div></li></ul></div></section>');
  
  beforeEach(function() {
    $(document.body).append(fixture);
    
    $el       = $(fixture).find('.carouselContainer');
    $main     = $el.find('.carouselMain');
    $thumbs   = $el.find('.carouselThumbsContainer');
    
    carousel = new window.Carousel({
      'main'            : $main,
      'thumbs'          : $thumbs,
      'thumbsVisible'   : 5
    });
    
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
  });
  
  afterEach(function() {
    $('#jasmine-fixtures').remove();
  });

  describe('when initialized', function() {
    
    var $prevButton,
        $nextButton;

    beforeEach(function(done) {
      spyOn(carousel, 'setThumbNavStatus');
      spyOn(carousel, 'setActiveThumbnail');
            
      carousel.init();
      
      $prevButton = $(carousel.main).find('.nav li').eq(0);
      $nextButton = $(carousel.main).find('.nav li').eq(1);
      
      var timer = setInterval(function() {
        if (carousel.mainImageWidth) {
          clearInterval(timer);
          done();
        }
      }, 100);
    });


    it('should expect previous button to be inactive', function() {
      expect($prevButton).toHaveClass('prev inactive');
    });

    it('should expect next button to be active', function() {
      expect($nextButton).toHaveClass('next');
    });

    it('should call setThumbNavStatus', function() {
      expect(carousel.setThumbNavStatus).toHaveBeenCalled();
    });

    it('should call setActiveThumbnail', function() {
      expect(carousel.setActiveThumbnail).toHaveBeenCalled();
    });

    it('should have a current position of 0', function() {
      expect(carousel.currentPos).toEqual(0);
    });

    it('should set main image width', function() {
      var mainScrollableWidth = $(carousel.main).find('.scrollable').width();
      expect(mainScrollableWidth).toEqual(5000);
    });

    it('should set thumbnail offset to 0px', function() {
      expect($(carousel.thumbs).find('.carouselThumbs .scrollable')).toHaveCss({'margin-left': '0px'});
    });
  });
  
  
  describe('when user clicks on the second thumbnail', function() {
    var $secondThumbnail;
    
    beforeEach(function() {
      carousel.init();
      $secondThumbnail = $(carousel.thumbs).find('.carouselThumbs li').eq(1);
      $secondThumbnail.trigger('click');
    });

    it('should change current position to 1', function() {
      expect(carousel.currentPos).toEqual(1);
    });
    
    it('should set thumbnail as active', function() {
      expect($secondThumbnail).toHaveClass('active');
    });

    it('should display corresponding main image', function() {
      expect($(carousel.main).find('.scrollable')).toHaveCss({'margin-left': '-1000px'});
    });
  });



  describe('when user clicks on main navigation button', function() {
    
    var $secondThumbnail;

    beforeEach(function() {
      carousel.init();
    });
    
    describe('and it is the prev button', function() {
      
      var $prevButton;
      
      beforeEach(function() {
        $prevButton = $(carousel.main).find('.nav li').eq(0);  
        $prevButton.trigger('click');
      });
      
      describe('and it is the first slide', function() {
        
        it('should be inactive', function() {
          expect($prevButton).toHaveClass('inactive');
        });
      });
    });
    
    describe('and it is the next button', function() {
      
      var $nextButton;
      
      beforeEach(function() {
        $nextButton = $(carousel.main).find('.nav li').eq(1);  
      });
      
      describe('and it is the last slide', function() {
        
        beforeEach(function() {
          $nextButton.trigger('click');
          $nextButton.trigger('click');
          $nextButton.trigger('click');
          $nextButton.trigger('click');  
        });
        
        it('should be inactive', function() {
          expect($nextButton).toHaveClass('next inactive');
        });
      });
    });
  });
});
