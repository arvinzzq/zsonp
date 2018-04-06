'use strict';

function generateFnName(prefix) {
    return Math.random().toString(36).substr(2);
}

function generateUrlJsonp(url, fnName, params) {
    var urlJsonp = url + '?callback=' + fnName;
    Object.keys(params).forEach(function (name) {
        urlJsonp += '&' + name + '=' + params[name];
    });
    return urlJsonp;
}

function createScriptElement(url) {
    var scriptEle = document.createElement('script');
    scriptEle.setAttribute('type', 'text/script');
    scriptEle.setAttribute('src', url);
    scriptEle.async = true;
    return scriptEle;
}

function zsonp(options) {
    return new Promise(function (resolve, reject) {
        var url = options.url,
            params = options.params;

        var fnName = generateFnName('callback');
        window[fnName] = function (data) {
            resolve(data);
        };
        var urlJsonp = generateUrlJsonp(url, fnName, params);
        var scriptEle = createScriptElement(urlJsonp);
        scriptEle.onload(function () {
            scriptEle.onload = null;
            if (scriptEle.parentNode) {
                scriptEle.parentNode.removeChild(scriptEle);
            }
            delete window[fnName];
        });
        scriptEle.onerror = function (error) {
            reject({
                error: error
            });
        };
        document.getElementsByTagName('head')[0].appendChild(scriptEle);
    });
}

module.exports = zsonp;
