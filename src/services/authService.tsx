import { validationUsers } from '../db';

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await validationUsers(username, password);
    
    if (response.isSuccess) {
      return { success: true, message: response.message };
    } else {
      throw new Error(response.message);
    }
  } catch (error) {
    return { success: false, message: 'An unexpected error occurred' };
  }
};
