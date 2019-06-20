import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const token = localStorage.getItem('token');

const host = isProd ? 'https://galaxy-tensor-api.herokuapp.com' : 'http://localhost:9090';
const baseURL = `${host}/api`;

const auth = '/auth';
const chat = '/chat';
const myself = '/myself';
const search = '/search';

const instance = axios.create({
  baseURL,
  timeout: 40000,
  headers: {
    Authorization: token ? `Token ${token}` : undefined
  }
});

export const staticURL = `${host}/static`;

export const signIn = async (payload) => instance.post(`${auth}/sign-in`, { ...payload });
export const signInbyFace = async (payload) => instance.post(`${auth}/by-face`, { ...payload });
export const signUp = async (payload) => instance.post(`${auth}/sign-up`, { ...payload });

export const addBiometricData = async (payload) => instance.put(`${myself}/add-biometric-data`, { ...payload });
export const getChats = async (payload) => instance.get(`${myself}/get-chats`, { ...payload });

export const addChat = async (payload) => instance.put(`${chat}/add?personId=${payload.personId}`);
export const removeChat = async (payload) => instance.delete(`${chat}/remove?chatId=${payload.chatId}`);

export const addMessage = async (payload) => instance.post(`${chat}/add-message?chatId=${payload.chatId}`, { message: payload.message });
export const editMessage = async (payload) => instance.put(`${chat}/edit-message?chatId=${payload.chatId}`, { message: payload.message, messageId: payload.messageId });
export const getMessages = async (payload) => instance.get(`${chat}/get-messages?chatId=${payload.chatId}&offset=${payload.offset || 0}`);

export const findPerson = async (payload) => instance.get(`${search}/find-person?searchQuery=${encodeURIComponent(payload.searchQuery)}`);
