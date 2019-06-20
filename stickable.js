/*
 * stickable.js:
 * jQuery plugin that sticks a div at the top of viewport while scrolling
 * Usage: $( '#myDiv' ).stickable();
*/

( function( $ ) {

   if( ! $( '#stickable-css' ).length ) {
      $( 'head' ).append( '<style id="stickable-css">.stick {margin-top:0!important;position:fixed;top: 0;z-index:10000;}</style' );
   }

   $.fn.stickable = function() {
      return this.each( function() {
      
         var $element = $( this );
         var stickyHeight = $element.outerHeight();
         
         $element
         .outerHeight( stickyHeight )
         .before( '<div />');

         var $anchor = $element.prev();
         
         $( window ).on( 'scroll', function() {
            var scrollTop = $( this ).scrollTop();
            var stickyTop = $anchor.offset().top;
            var isStick = $element.hasClass( 'stick' );

            if ( scrollTop > stickyTop && ! isStick ) {
                $element.width( $element.width() ).addClass( 'stick' );
                $anchor.height( stickyHeight )
            } 
            if( scrollTop < stickyTop ) {
               $element.removeClass( 'stick' );
               $anchor.height( 0 );
            }
         }).trigger( 'scroll' )
         
         $( window).on( 'resize', function() {
            if( $element.hasClass( 'stick' ) ) {
               $element.removeClass( 'stick' );
               $element.outerWidth( $anchor.width() );
               $element.addClass( 'stick' );
            }
            else {
               $element.css({ width: '' });
            }
         }).trigger( 'resize' );
      });
   }
})(jQuery);