import api from './api';

export async function login(email, password){
  const res = await api.post('./login', { email, password });
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}
export function logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
