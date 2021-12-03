console.log('WB#4');

(function() {
  var proxied = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function() {
    this.onreadystatechange = function (e) {
      if (this.readyState === 4) {
        const url = this.responseURL;

        if (url.indexOf('https://s-point.wb.ru/s10/api/v2/pickpoint/goods/list') > -1) {
          const resp = JSON.parse(this.responseText);
          console.log('WB#8', this.responseURL, resp);
        }
      }
    };

    return proxied.apply(this, [].slice.call(arguments));
  };
})();
