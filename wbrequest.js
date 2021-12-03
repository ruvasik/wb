

(function() {
  const SSKEY = 'wbdataxxxx';

  const uniq = (list) => {
    const data = {};

    list.forEach(item => {
      data[`${item.id}-${item.rid}`] = item;
    });

    return Object.values(data);
  }

  var proxied = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function() {
    this.onreadystatechange = function (e) {
      if (this.readyState === 4) {
        const url = this.responseURL;

        if (url.indexOf('https://s-point.wb.ru/s10/api/v2/pickpoint/goods/list') > -1) {
          const resp = JSON.parse(this.responseText);

          if (resp?.total > 0) {
            let data = JSON.parse(sessionStorage.getItem(SSKEY) || '[]');
            data = [...data, ...resp.data];

            sessionStorage.setItem(SSKEY, JSON.stringify(uniq(data)));
          }
        }
      }
    };

    return proxied.apply(this, [].slice.call(arguments));
  };
})();
