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

// set header globally for axioKit to reuse
const setHeader = (header) => {
  API_HEADER = header;
};

// set defaults depending on passed baseURL
const setDefaults = ({ baseURL }) => {
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

const post = async (endpoint, payload, options = {}) => {
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

export const axioKit = {
  setHeader,
  setDefaults,
  post,
};
