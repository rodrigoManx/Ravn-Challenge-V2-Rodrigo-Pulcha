export function getQueryParamsAsObj() {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    let ret = {};
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        ret[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return ret;
}
export function getErrorMessageOfStatus(status) {
    switch (true) {
        case status === 401:
            return "";
        case status === 405:
            return "No se permite el uso del método, ya estamos trabajando para resolverlo";
        case status >= 400 && status < 500:
            return "Algo salió mal, pruede probar recargando la página";
        case status >= 500:
            return "A ocurido un error, ya estamos trabajando para resolverlo. Intenta más tarde";
        default:
            return "Algo salió mal, ya estamos trabajando para resolverlo, intenta más tarde";
    }
}
export function handleHttpError(status, extraMsg = "") {
    const messageError = getErrorMessageOfStatus(status);
    if (messageError) {
        console.log(`Error ${status} ${extraMsg}:
        ${messageError}`);
    }
}

export function handleConnectionError(err) {
    console.log("Connection error:", err);
}
