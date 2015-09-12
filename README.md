# Carousel!

## /css
* all Carousel styles
  
## /images
* all Carousel images; 1000x400 large photos and 200x150 thumbnail photos

## /lib
* jQuery
* Jasmine library
* Jasmine jQuery

## /spec
* Carousel tests
  
## /src
* carousel.js; Carousel functionality
* main.js; initializes Carousel on page
  
## To view Carousel in action
* open index.html in browser
  * Displays Carousel with large Main images
  * Displays thumbnail images
* Hover over main image to see prev/next navigation arrows
* Navigation arrows will navigate to beginning and end of Carousel main images
* To enable navigation with more than 5 images, uncomment lines 46-50 and 67
* Supports mobile, tablet, and desktop formats
* Cross-browser tested in Chrome, Safari, and Firefox

## To run tests
* open SpecRunner.html in browser
  * Tests major Carousel functionality
* Doesn't test thumbnail navigation (prev/next buttons to navigate thumbnail images if there are more than 5 thumbnails)
