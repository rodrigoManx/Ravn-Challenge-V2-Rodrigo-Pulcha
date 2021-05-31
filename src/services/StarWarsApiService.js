import { handleHttpError, handleConnectionError } from "./UtilsService";


export function fetchList(table, page=1) {
  return fetch(process.env.REACT_APP_API_SERVER + "/app/" + table + "/?page=" + page, {})
  .then((response) => {
      if (!response.ok) {
          handleHttpError(response.status);
          return {};
      }
      return response.json();
  }, handleConnectionError)
  .catch((error) => {
      alert(error);
      return;
  });
}

export function fetchDetail(table, id) {
  return fetch(process.env.REACT_APP_API_SERVER + "/app/" + table + "/detail/" + id + "/", {})
  .then((response) => {
      if (!response.ok) {
          handleHttpError(response.status);
          return {};
      }
      return response.json();
  }, handleConnectionError)
  .catch((error) => {
      alert(error);
      return;
  });
}