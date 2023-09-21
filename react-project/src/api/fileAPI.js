import apiClient from './apiClient'

export const uploadFile = async ( file ) => {
  try {
    const { data } = await apiClient.post('/upload', file)
    return data;
  } catch (error) {
    console.error(error);
  }
}