function generateFnName(prefix) {
    return `${prefix}${Math.random().toString(36).substr(2)}`;
}

function generateUrlJsonp(url, fnName, params) {
    let urlJsonp = `${url}?callback=${fnName}`;
    Object.keys(params).forEach(name => {
        urlJsonp += `&${name}=${params[name]}`
    });
    return urlJsonp;
}

function createScriptElement(url) {
    const scriptEle = document.createElement('script');
    scriptEle.setAttribute('type', 'text/javascript');
    scriptEle.setAttribute('src', url);
    scriptEle.async = true;
    return scriptEle;
}

function zsonp(options) {
    return new Promise((resolve, reject) => {
        const { url, params } = options;
        const fnName = generateFnName('callback');
        window[fnName] = (data) => {
            resolve(data);
        };
        const urlJsonp = generateUrlJsonp(url, fnName, params);
        const scriptEle = createScriptElement(urlJsonp);
        scriptEle.onload = () => {
            scriptEle.onload = null;
            if (scriptEle.parentNode) {
                scriptEle.parentNode.removeChild(scriptEle);
            }
            delete window[fnName];
        };
        scriptEle.onerror = (error) => {
            reject({
                error
            });
        };
        document.body.appendChild(scriptEle);
    });
}

module.exports = zsonp;