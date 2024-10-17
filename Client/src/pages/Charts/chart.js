export const UserData = [
    {
      label: 'Accountant',
      items: ['User1', 'User2', 'User3'], 
    },
    {
      label: 'Manager',
      items: ['User1', 'User2', 'User3', 'User4', 'User5', 'User6'], 
    },
    {
      label: 'SP Admin',
      items: ['User1', 'User2', 'User3', 'User4'] 
    },
    {
      label: 'CRM Admin',
      items: ['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7', 'User8', 'User9', 'User10'], 
    },
  ];

  export const UserDataWithValues = UserData.map(item => ({
    label: item.label,
    value: item.items.length, 
  }));
  
  export const valueFormatter = (item) => `${item.value}`; 