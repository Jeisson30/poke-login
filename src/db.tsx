interface User {
    username: string;
    password: string;
  }
  
  export const hardcodedUsers: User[] = [
    {
      username: 'admin@aspida',
      password: 'pass8909!'
    },
    {
      username: 'user@aspida',
      password: 'pass156!'  
    }
  ];
  
  // CONSUMO API SIMULADA
  export const validationUsers = (username: string, password: string) => {
    return new Promise<{ isSuccess: boolean, message: string }>((resolve, reject) => {
      setTimeout(() => {
        const user = hardcodedUsers.find(u => u.username === username && u.password === password);
        
        if (user) {
          resolve({ isSuccess: true, message: `Welcome, ${username}!` });
        } else {
          reject({ isSuccess: false, message: 'Invalid credentials' });
        }
      }, 1000);
    });
  };
  