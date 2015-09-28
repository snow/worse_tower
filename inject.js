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
  $('.wrapper > .header > *').wrapAll('<div class="inner" />');

  var pageId = '';
  function generateSidebar(jTodoSec) {
    var title_n_guids = [];
    jTodoSec.find('.todolists .todolist').each(function(idx, el){
      var jTodolist = $(el);
      var name = jTodolist.find('h4 .name').text();
      var guid = jTodolist.data('guid');
      var tid = 'todolist-' + guid;
      jTodolist.attr('id', tid);
      title_n_guids.push([name, tid]);
    });

    var jSidebar = $('<ul class="wtwr-sidebar" />');
    $.each(title_n_guids, function(idx, el){
      jSidebar.append('<li><a href="#' + el[1] + '">' + el[0] + '</a></li>');
    });
    $('.wrapper').append(jSidebar);
  }

  function removeSideBar() {
    $('.wtwr-sidebar').remove();
  }

  // FIXME should try to listen to pjaxload instead of interval
  setInterval(function(){
    var jPage = $('.wrapper > .container > .page > .page-inner');
    if (jPage.attr('id') != pageId) {
      pageId = jPage.attr('id');

      var jTodoSec = $('.section-todos');
      if (jTodoSec.length) {
        generateSidebar(jTodoSec);
      } else {
        removeSideBar();
      }
    }
  }, 2000);

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
