(() => {
  const getItem = (name, phone) => {
    const data = JSON.parse(sessionStorage.getItem('wbdataxxxx') || '[]');

    const _phone = phone.slice(-5).replace('-', '');

    return data.find(item => {
      const _name = item.buyer.name;
      const mobile = item.buyer.mobile.toString();

      return mobile.slice(-4) === _phone && name === _name;
    })
  };

  if (document.title.indexOf("WBPoint") != -1) {
    const SSKEY = 'wbdataxxxx';

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
            const nameNode = addedNode.querySelector('div.opp-item-data-entry span.opp-item-hoverlight');
            const phoneNode = addedNode.querySelector('div.opp-item__cell--separated div.opp-item-data-entry--s span');

            const user = getItem(nameNode.textContent, phoneNode.textContent);

            if (user) {
              phoneNode.innerHTML = user.buyer.mobile;
            }
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

        observer.observe(listNode, { childList: true, subtree: true });
      }

      if (safeCounter > 100)
        clearInterval(timer);
    }, 200);
  }
})()
