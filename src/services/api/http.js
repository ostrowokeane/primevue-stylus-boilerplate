import axios from "axios";
import { cloneDeep } from "lodash";
import useToasts from "@/modules/useToasts";
import useUser from "@/modules/useUser";
const { showToast } = useToasts();

import { get } from "lodash";
const getData = obj => get(obj, "data");

const API_URL = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data.msg) {
      showToast({
        severity: "info",
        summary: response.data.msg,
        detail: response.data.msgDetail || "",
        life: 5000
      });
    }
    return response;
  },
  error => {
    // если надо на каждую ошибку выбрасывать toast, то раскомментировать код ниже
    /* 
    const { response } = error;
    showToast({
      severity: "error",
      summary: response?.data?.error || "Ошибка",
      detail: response?.data?.message || "Неизвестная ошибка на сервере",
      life: 5000
    }); 
    */
    return Promise.reject(error);
  }
);

window.FormData.prototype.appendRecursive = function(data, wrapper = null) {
  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) return;

    const value = data[key];

    if (Array.isArray(value) && value.every(item => item instanceof File)) {
      for (const file of value) {
        this.append(wrapper ? wrapper + key : key, file);
      }
    } else if (!(value instanceof File) && typeof value === "object") {
      this.appendRecursive(value, wrapper ? wrapper + "[" + key + "]" : key);
    } else {
      this.append(wrapper ? wrapper + "[" + key + "]" : key, value);
    }
  }
};

class Http {
  constructor(axiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  _getUrl(url = "") {
    if (url !== "") {
      url = url.charAt(0) === "/" ? url : "/" + url;
    }
    return API_URL + url;
  }

  _getFormData(data) {
    const formData = new FormData();
    formData.appendRecursive(data);
    return formData;
  }

  _getOptions(options) {
    const {
      auth = false, // если true, то не использовать заголовок X-API-key
      formDataConvert = false, // конвертировать тело запроса в FormData перед отправкой (используется в случае наличия файла в теле)
      dataAbstraction = true, // извлекать и возвращать data из оъекта ответа с сервера
      data = {},
      config = {},
      params = {},
      url
    } = options;

    const resultUrl = this._getUrl(url);
    const resultData = formDataConvert ? this._getFormData(data) : data;
    const resultConfig = cloneDeep(config);
    resultConfig.params = params;

    if (!auth) {
      const { user } = useUser();
      resultConfig.headers = {
        ["X-API-Key"]: user.apiKey
      };
    }

    return {
      formDataConvert,
      dataAbstraction,
      config,
      data,
      url,
      resultUrl,
      resultData,
      resultConfig
    };
  }

  _onResponse(res, resOptions) {
    return resOptions.dataAbstraction ? getData(res) : res;
  }

  _sendUpdateRequest(type, url, data, options) {
    if (options.formDataConvert) {
      const modifiedData = cloneDeep(data);
      modifiedData._method = type;
      return this.post(url, modifiedData, options);
    }

    const resOptions = this._getOptions({ url, data, ...options });
    return this.axiosInstance[type](
      resOptions.resultUrl,
      resOptions.resultData,
      resOptions.resultConfig
    ).then(res => this._onResponse(res, resOptions));
  }

  get(url, params = {}, options = {}) {
    const resOptions = this._getOptions({ url, params, ...options });

    return this.axiosInstance
      .get(resOptions.resultUrl, resOptions.resultConfig)
      .then(res => this._onResponse(res, resOptions));
  }

  post(url, data, options = {}) {
    const resOptions = this._getOptions({ url, data, ...options });

    return this.axiosInstance
      .post(
        resOptions.resultUrl,
        resOptions.resultData,
        resOptions.resultConfig
      )
      .then(res => this._onResponse(res, resOptions));
  }

  put(url, data, options = {}) {
    return this._sendUpdateRequest("put", url, data, options);
  }

  patch(url, data, options = {}) {
    return this._sendUpdateRequest("patch", url, data, options);
  }

  delete(url, params, options = {}) {
    const resOptions = this._getOptions({ url, params, ...options });

    return this.axiosInstance
      .delete(resOptions.resultUrl, resOptions.resultConfig)
      .then(res => this._onResponse(res, resOptions));
  }
}

const baseHttp = new Http(axiosInstance);

export default baseHttp;
