import React, { Component } from "react";

class Host2 extends Component {
  componentDidMount() {
    var cdstorage = this.crossDomainStorage({
      origin: "http://localhost:3000",
      path: "/",
    });
    /*var cdstorage = this.crossDomainStorage({
      origin: "http://localhost/locaStorage-tools",
      path: "/crossd_iframe.html",
    });*/

    localStorage.setItem(
      "estoesreactLOCAL",
      "app movil del localstorage de react para html "
    );

    cdstorage.setItem(
      "a_cross-domain_key8000",
      "El valor debe ser una cadena o se convertirá en una cadena..."
    );

    cdstorage.setItem(
      "estoesreact8000",
      "app movil del localstorage de react para html  "
    );

    cdstorage.setItem("nombre8000", "Jorge delgadillo");

    cdstorage.setItem(
      "variable_A_VUE",
      "Esto es una variable que viaja de REACT  A VUE"
    );

    cdstorage.setItem(
      "otra_variebla_react",
      "SIGUIENTE EJEMPLO DESDE REACT A VUE"
    );

    cdstorage.getItem("vfvfvf", function (key, value) {
      console.info("<br/>Cross Domain callback: (" + key + ": " + value + ")");
    });
  }

  crossDomainStorage(opts) {
    var origin = opts.origin || "",
      path = opts.path || "",
      storage = opts.storage || "localStorage";
    var cdstorage = {},
      _iframe = null,
      _iframeReady = false,
      _origin = origin,
      _path = path,
      _queue = [],
      _requests = {},
      _id = 0;

    var supported = (function () {
      try {
        return window.JSON && storage in window && window[storage] !== null;
      } catch (e) {
        return false;
      }
    })();

    //private methods

    var _sendRequest = function (data) {
      if (_iframe) {
        _requests[data.request.id] = data;
        _iframe.contentWindow.postMessage(
          JSON.stringify(data.request),
          _origin
        );
      }
    };

    var _iframeLoaded = function () {
      _iframeReady = true;
      if (_queue.length) {
        for (var i = 0, len = _queue.length; i < len; i++) {
          _sendRequest(_queue[i]);
        }
        _queue = [];
      }
    };

    var _handleMessage = function (event) {
      if (event.origin === _origin) {
        var data = JSON.parse(event.data);
        if (typeof _requests[data.id] != "undefined") {
          if (typeof _requests[data.id].deferred !== "undefined") {
            _requests[data.id].deferred.resolve(data.value);
          }
          if (typeof _requests[data.id].callback === "function") {
            _requests[data.id].callback(data.key, data.value);
          }
          delete _requests[data.id];
        }
      }
    };

    //Public methods

    cdstorage.getItem = function (key, callback) {
      if (supported) {
        var request = {
            id: ++_id,
            type: "get",
            key: key,
            storage: storage,
          },
          data = {
            request: request,
            callback: callback,
          };

        if (_iframeReady) {
          _sendRequest(data);
        } else {
          _queue.push(data);
        }

        if (window.jQuery) {
          return data.deferred.promise();
        }
      }
    };

    cdstorage.setItem = function (key, value) {
      if (supported) {
        var request = {
            id: ++_id,
            type: "set",
            key: key,
            value: value,
            storage: storage,
          },
          data = {
            request: request,
          };

        if (_iframeReady) {
          _sendRequest(data);
        } else {
          _queue.push(data);
        }

        if (window.jQuery) {
          return data.deferred.promise();
        }
      }
    };

    cdstorage.removeItem = function (key) {
      if (supported) {
        var request = {
            id: ++_id,
            type: "remove",
            key: key,
            storage: storage,
          },
          data = {
            request: request,
          };

        if (_iframeReady) {
          _sendRequest(data);
        } else {
          _queue.push(data);
        }

        if (window.jQuery) {
          return data.deferred.promise();
        }
      }
    };

    //Init
    if (!_iframe && supported) {
      _iframe = document.createElement("iframe");
      _iframe.style.cssText =
        "position:absolute;width:1px;height:1px;left:-9999px;";
      document.body.appendChild(_iframe);

      if (window.addEventListener) {
        _iframe.addEventListener(
          "load",
          function () {
            _iframeLoaded();
          },
          false
        );
        window.addEventListener(
          "message",
          function (event) {
            _handleMessage(event);
          },
          false
        );
      } else if (_iframe.attachEvent) {
        _iframe.attachEvent(
          "onload",
          function () {
            _iframeLoaded();
          },
          false
        );
        window.attachEvent("onmessage", function (event) {
          _handleMessage(event);
        });
      }
      _iframe.src = _origin + _path;
    }

    return cdstorage;
  }

  render() {
    return <div>Segundo componente</div>;
  }
}

export default Host2;
