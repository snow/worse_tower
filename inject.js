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

  function generateSidebar() {
    var $todolists = $('.section-todos .todolists .todolist');

    if ($todolists.length == 0) {
      $('.wtwr-sidebar').remove();
      return
    }

    var items = $todolists.map(function() {
      var $todolist = $(this);
      var name = $todolist.find('h4 .name').text();
      var guid = $todolist.data('guid');

      return '<li><a href="javascript:;" data-guid="' + guid + '">' + name + '</a></li>'
    }).get();

    var $sidebar = $('<div class="wtwr-sidebar"><ul>' + items.join('') + '</ul></div>');

    $('.wrapper').prepend($sidebar);
  }

  // FIXME should try to listen to pjaxload instead of interval
  setInterval(function() {
    var currentId = $('.wrapper > .container > .page > .page-inner').attr('id');

    if (pageId != currentId) {
      generateSidebar();
      pageId = currentId;
    }
  }, 2000);

  $(document).on('click', '.wtwr-sidebar a', function(e) {
    e.preventDefault();

    var guid = $(e.currentTarget).data('guid');
    var target = $('.todolist[data-guid="' + guid + '"]');

    if (!target.length) return

    $('body, html').scrollTop(target.offset().top - 70) ;
  });

})(jQuery);
