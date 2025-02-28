import axios from 'axios';
import { isEmpty } from './isEmpty.js';
import { aesKit } from './aesKit.js';
import { toast } from './toast.js';

const errorHandler = ({ response }) => {
  const { data, status } = response,
    tokenFailure = [401, 403, 406];

  if (tokenFailure.includes(status)) {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  console.error(data);

  const { error: title, message } = data;

  toast({
    icon: 'error',
    title,
    text: message.length < 30 ? message : 'Open console to debug.',
  });
  throw new Error(data.error);
};

let API_HEADER = '';

const setConfig = ({ baseURL, header }) => {
  API_HEADER = header;
  axios.defaults.baseURL = baseURL;
  axios.defaults.withCredentials = true;
};

const getHeader = () => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      Authorization: `${API_HEADER} ${token}`,
    },
  };
};

const post = async (endpoint = '', payload = {}, options = {}) => {
  if (isEmpty(payload) || typeof payload !== 'object')
    return errorHandler({
      response: {
        data: {
          error: 'INVALID_PAYLOAD',
          message: 'Payload is empty.',
        },
      },
    });

  const { useToast = true, title = '', text = '' } = options;

  return await axios
    .post(endpoint, { payload: aesKit.encrypt(payload) }, getHeader())
    .then(({ data }) => {
      if (useToast) toast({ icon: 'success', title: title || 'Success', text });

      return aesKit.decrypt(data.payload);
    })
    .catch(errorHandler);
};

const get = async (endpoint = '', payload = {}, options = {}) => {
  const query = payload ? `payload=${encodeURIComponent(aesKit.encrypt(payload))}` : '';

  const { useToast = true, title = '', text = '' } = options;

  return await axios
    .get(`${endpoint}?${query}`, getHeader())
    .then(({ data }) => {
      if (useToast) toast({ icon: 'success', title: title || 'Success', text });

      return aesKit.decrypt(data.payload);
    })
    .catch(errorHandler);
};

const put = async (endpoint = '', payload = {}, options = {}) => {
  if (isEmpty(payload) || typeof payload !== 'object')
    return errorHandler({
      response: {
        data: {
          error: 'INVALID_PAYLOAD',
          message: 'Payload is empty.',
        },
      },
    });

  if (!payload?._id)
    return errorHandler({
      response: {
        data: {
          error: 'INVALID_PARAMETERS',
          message: 'Identifier is missing.',
        },
      },
    });

  const { useToast = true, title = '', text = '' } = options;

  return await axios
    .put(endpoint, { payload: aesKit.encrypt(payload) }, getHeader())
    .then(({ data }) => {
      if (useToast) toast({ icon: 'success', title: title || 'Success', text });

      return aesKit.decrypt(data.payload);
    })
    .catch(errorHandler);
};

const del = async (endpoint = '', payload = {}, options = {}) => {
  if (!payload?._id)
    return errorHandler({
      response: {
        data: {
          error: 'INVALID_PARAMETERS',
          message: 'Identifier is missing.',
        },
      },
    });

  const query = `payload=${encodeURIComponent(aesKit.encrypt(payload))}`;

  const { useToast = true, title = '', text = '' } = options;

  return await axios
    .delete(`${endpoint}?${query}`, getHeader())
    .then(({ data }) => {
      if (useToast) toast({ icon: 'success', title: title || 'Success', text });

      return aesKit.decrypt(data.payload);
    })
    .catch(errorHandler);
};

export const axioKit = {
  setConfig,
  post,
  get,
  put,
  del,
};
