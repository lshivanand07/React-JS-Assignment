import api from './api';

export async function fetchUserById() {
  const response = await api.get('/get-my-info');
  return response.data;
}

export async function fetchAllUser() {
  const response = await api.get('/get-all-users');
  return response.data;
}

interface editUserProps {
  user_name: string;
  dob: string;
  phone: string;
  gender: string;
  age: number;
}

export async function editUser(editedProfileData: editUserProps) {
  console.log('api ', editedProfileData);
  const response = await api.put('/edit-one-user', editedProfileData);
  return response.data;
}
