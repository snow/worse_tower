/**
 * content scripts
 *
 * @author : snow@firebloom.cc
 * @license : GPLv3
 */

(function() {
  // show page action
  // ------------------
  chrome.runtime.sendMessage({});
})();

(function($){
  $('.header > *').wrapAll('<div class="inner" />');
  // window.addEventListener('popstate', function(evt){
  //   console.log(evt);
  // });

  // $(window).on('popstate', function(evt){
  //   console.log('> w <');
  //   console.log(evt);
  // });

  // $(document).on('pjaxload#page-projects', function(evt){
  //   console.log(evt);
  // });
})(jQuery);
