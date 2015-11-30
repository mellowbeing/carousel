/* 
  Carousel : Jennifer Refat, July 2015
  
  Functionality:
    - Prev/Next buttons to navigate "main" / large images
    - Prev/Next buttons to navigate thumbnail images
    - User can navigate to beginning and end of carousel
    - Displays thumbnail navigation only if total thumbnails exceed visible thumbs
    - Clicking on a thumbnail image will navigate user to view respective main image
*/

(function(global) {
  'use strict';

  global.Carousel = function Carousel(params) {

    var self    = this,
        options = params || {};

    
    /* 
      init 
      
      Sets everything up!  Initializes states and sets up event handlers
    */
    
    self.init = function() {
    
      self.main             = $(options.main);
      self.thumbs           = $(options.thumbs);
      self.thumbsPerSlide   = options.thumbsVisible;
      self.currentPos       = 0;
      self.thumbOffset      = 0;
      
      self.numThumbsTotal   = self.thumbs.find('.carouselThumbs li').length;
      self.numThumbSets     = Math.floor(self.numThumbsTotal / self.thumbsPerSlide);
      
      self.mainImages       = self.main.find('.scrollable li img');
      self.mainNavigation   = self.main.find('.nav li');
      
      self.thumbImages      = self.thumbs.find('li img');
      self.thumbNavigation  = self.thumbs.find('.nav li');
      
      self.setupMain();
      self.setupThumbs();
    };
    
    
    self.setupMain = function() {
      
      // Setup main list width!
      self.mainImageWidth = self.mainImages.width();
      self.mainNumImages  = self.mainImages.length;
      
      if (self.mainImageWidth) {
        setTimeout(self.setupMainListWidth, 0);
      } 
      else {
        self.mainImages.on('load', function() {
          self.mainImageWidth = self.mainImages.width();
          setupMainListWidth();
        });
      }
      
      self.mainNavigation.on('click', function() {
        self.navigateMain($(this));
      });
      
      self.setMainNavStatus();
    };
    
    
    self.setupThumbs = function() {

      // Setup thumbs list width!
      self.thumbImageWidth  = self.thumbs.find('li').width();
      
      if (self.thumbImageWidth) {
        setTimeout(self.setupThumbListWidth, 0);
      }
      else {
        self.thumbImages.on('load', function(){
          thumbImageWidth  = self.thumbs.find('li').width();
          setupThumbListWidth();
        });
      }
        
      // Display secondary thumbnail navigation
      if (self.numThumbsTotal > self.thumbsPerSlide) {
        $('.carouselThumbsContainer .nav').show();
        
        // Set thumbnail list width
        self.thumbs.find('ul').addClass('scrollable').css("width", self.thumbTotalWidth + 'px');
      }
      
      self.thumbNavigation.on('click', function() {
        self.navigateThumbs($(this));
      });
      
      self.thumbs.find('.carouselThumbs li').on('click', function() {
        var $thumb = $(this);
        
        self.currentPos = $thumb.index();
        self.navigateMain($thumb);
      });
      
      self.setThumbNavStatus();
      self.setActiveThumbnail();
    };
    
    
    self.setupMainListWidth = function(imageWidth) {
      var mainTotalWidth  = self.mainImageWidth * self.mainNumImages;

      // Set main list width
      self.main.find('.scrollable').css('width', mainTotalWidth + 'px');
    };
    
      
    self.setupThumbListWidth = function(imageWidth) {
      self.thumbTotalWidth  = self.thumbImageWidth * self.numThumbsTotal;

      // Set main list width
      self.thumbs.find('ul').addClass('scrollable').css("width", self.thumbTotalWidth + 'px');

      self.thumbOffset        = (self.mainImageWidth - self.thumbImageWidth * self.thumbsPerSlide) / 2;
      self.initialThumbOffset = self.thumbOffset;

      self.updateThumbOffset();
      self.setThumbNavStatus();
    };
    
    
     /*
      Navigates the main images
    */
    
    self.navigateMain = function(el) {
    
      var mainOffset,
          currentSet;
      
      // Only navigate left & right if within bounds
      if (el.hasClass('prev') && self.currentPos > 0) {
        self.currentPos--;
      }
      
      if (el.hasClass('next') && self.currentPos < self.mainNumImages-1) {
        self.currentPos++;
      }
      
      self.setMainNavStatus();
      
      // Calculate & set offset for image in view
      mainOffset = -(self.mainImageWidth * self.currentPos) + 'px';
      self.main.find('.scrollable').css("margin-left", mainOffset);
      
      // Update which thumbnail is active & visible
      self.setActiveThumbnail();
      
      // If slide is not visible in thumbs, update thumb view
      currentSet = Math.floor(self.currentPos / self.thumbsPerSlide);
    
      self.thumbOffset = -(currentSet * self.mainImageWidth) + self.initialThumbOffset;
      
      self.setThumbNavStatus();
      
      // Update thumbnail animation
      self.updateThumbOffset();
    };

  
    /*
      Navigates the thumbnail images
    */
    self.navigateThumbs = function(el) {
    
      // Previous button slides thumbnails left
      if (el.hasClass('prev')) {
        self.thumbOffset += self.mainImageWidth;
      }
      // Next button slides thumbnails right
      else {
        self.thumbOffset -= self.mainImageWidth;
      }
      
      // Update thumbnail animation
      self.updateThumbOffset();
      self.setThumbNavStatus();
    };
    
    
    /* 
      Animates thumbnail set
    */
    self.updateThumbOffset = function() {
      self.thumbs.find('.scrollable').css("margin-left", self.thumbOffset);
    };
    
    
    /*
      Updates main navigation arrows' states
    */
    self.setMainNavStatus = function() {
      
      // Update Previous & next buttons' status
      if (self.currentPos === 0) {
        self.mainNavigation.eq(0).addClass('inactive');
      }
      else {
        self.mainNavigation.eq(0).removeClass('inactive');
      }
      
      if (self.currentPos === self.numThumbsTotal-1) {
        self.mainNavigation.eq(1).addClass('inactive');
      }
      else {
        self.mainNavigation.eq(1).removeClass('inactive');
      }
    };
    
    
    /*
      Updates thumbnail navigation arrows' states
    */
    self.setThumbNavStatus = function() {
      
      // Update Previous & next buttons' status
      if (self.thumbOffset === self.initialThumbOffset) {
        self.thumbNavigation.eq(0).addClass('inactive');
      }
      else {
        self.thumbNavigation.eq(0).removeClass('inactive');
      }

      if (self.thumbOffset <= -(self.thumbTotalWidth - self.mainImageWidth) + self.initialThumbOffset) {
        self.thumbNavigation.eq(1).addClass('inactive');
      }
      else {
        self.thumbNavigation.eq(1).removeClass('inactive');
      }
    };
    
    
    /*
        Displays current active thumbnail
    */
    self.setActiveThumbnail = function() {
      self.thumbs.find('li').eq(self.currentPos).addClass('active').siblings().removeClass('active');
    };
  };

})(window);