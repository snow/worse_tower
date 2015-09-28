/**
 *
 * @author : snow@firebloom.cc
 * @license : MIT
 */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  chrome.pageAction.show(sender.tab.id);
  sendResponse();
});
