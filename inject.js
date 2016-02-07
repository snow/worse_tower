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

    if('page-members' == currentId) {
      addBusyPanel();
    }
  }, 2000);

  $(document).on('click', '.wtwr-sidebar a', function(e) {
    e.preventDefault();

    var guid = $(e.currentTarget).data('guid');
    var target = $('.todolist[data-guid="' + guid + '"]');

    if (!target.length) return

    $('body, html').scrollTop(target.offset().top - 70) ;
  });

  function addBusyPanel() {
    if($('#page-members .switch-to-busy').length > 0) { return; }

    var jSwitch = $('<a class="switch-to-busy" href="javascript:;">Busy Panel</a>');
    var jMemberPanel = $('#page-members');
    var jBusyPanel = $('<div id="page-busy" class="page-inner" data-page-name="Busy">'+
      '<section class="today">' +
      '<h5 class="box-title"><i class="twr twr-crosshairs"></i>今天</h5>' +
      '<div class="todolist">' +
      '<ul class="todos"></ul>'+
      '</div>' +
      '</section>' +
      '<section class="next">' +
      '<h5 class="box-title"><i class="twr twr-tasks"></i>接下来</h5>' +
      '<div class="todolist">' +
      '<ul class="todos"></ul>'+
      '</div>' +
      '</section>' +
      '</div>')
    $('#page-members .group-default').prepend(jSwitch);

    jSwitch.on('click', function(evt){
      jBusyPanel.insertBefore(jMemberPanel);
      jMemberPanel.detach();
    });

    var connGuid = $('#conn-guid').val();
    jMemberPanel.find('.member-link').each(function(idx, el){
      var memberUrl = el.href + "?conn_guid="+connGuid+"&pjax=1";
      $.ajax({
        url: memberUrl,
        success: function(data) {
          var jPage = $(data)
          jBusyPanel.find('.today ul').append(jPage.find('.box-today .todos .todo'));
          jBusyPanel.find('.next ul').append(jPage.find('.box-next .todos .todo'));
        }
      });
    });
  }

})(jQuery);
