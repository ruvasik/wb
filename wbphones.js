// Checking page title
if (document.title.indexOf("WBPoint") != -1) {
  let listNode = null;

  let observer = new MutationObserver(mutations => {
    for(let mutation of mutations) {
      for(let addedNode of mutation.addedNodes) {
        console.log("node", addedNode.tagName);
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
