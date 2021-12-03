// Checking page title
if (document.title.indexOf("WBPoint") != -1) {
  var s = document.createElement('script');
  s.src = chrome.runtime.getURL('wbrequest.js');
  s.onload = function() {
    this.remove();
  };
  (document.head || document.documentElement).appendChild(s);

  let listNode = null;

  let observer = new MutationObserver(mutations => {
    for(let mutation of mutations) {
      for(let addedNode of mutation.addedNodes) {
        if ((addedNode?.tagName || '').toLowerCase() === 'app-ready-item') {
          const nodeData = {};
          // console.log(addedNode);
          nodeData.name = addedNode.querySelector('div.opp-item-data-entry span.opp-item-hoverlight').textContent;
          nodeData.phone = addedNode.querySelector('div.opp-item__cell--separated div.opp-item-data-entry--s span').textContent;

          console.log(nodeData);
        }
      }
    }
  });

  let safeCounter = 0;
  const timer = setInterval(() => {
    safeCounter++;

    listNode = document.querySelector('.opp-manager--fw.opp-apps-list');

    if (listNode) {
      clearInterval(timer);

      // setTimeout(() => {
      //   fetch('https://s-point.wb.ru/s10/api/v2/pickpoint/16001/switch', {
      //     headers: {
      //       'x-token': localStorage.getItem('_wb-ext-user-token'),
      //       'accept': 'application/json, text/plain, */*',
      //       'accept-encoding': 'gzip, deflate, br',
      //     },
      //   })
      //     .then((response) => {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       console.log('DATA', data);
      //     });
      // }, 5000);

      observer.observe(listNode, { childList: true, subtree: true });
    }

    if (safeCounter > 100)
      clearInterval(timer);
  }, 200);
}
