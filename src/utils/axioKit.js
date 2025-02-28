import axios from 'axios';
import { isEmpty } from './isEmpty.js';
import { toast } from './toast.js';

const errorHandler = ({ response }) => {
  console.log('failed here', response);

  const tokenFailure = [401, 403, 406];

  if (tokenFailure.includes(response?.status)) {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  console.error(response.data);

  const { error: title, message } = response.data;

  toast({
    icon: 'error',
    title,
    text: message.length < 30 ? message : 'Open console to debug.',
  });
  throw new Error(response.data.error);
};

let API_HEADER = '';

const setHeader = (header) => {
  API_HEADER = header;
};

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

  console.log(getHeader());

  return await axios
    .post(endpoint, {}, getHeader())
    .then((res) => {
      console.log('success call', res);

      if (useToast) toast({ icon: 'success', title: title || 'Success', text });

      return res;
    })
    .catch(errorHandler);
};

export const axioKit = {
  setHeader,
  setDefaults,
  post,
};
