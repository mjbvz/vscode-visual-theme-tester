interface User {
  id: number;
  name: string;
  preferences: {
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
}

const processUsers = (users: User[]) => {
  return users.map((user) => {
    return {
      ...user,
      displayName: user.name.toUpperCase(),
      settings: {
        theme: user.preferences.theme,
        alerts: (user.preferences.notifications.email && user.preferences.notifications.push) ? {
          level: 'high',
          channels: ['email', 'push']
        } : {
          level: 'low',
          channels: user.preferences.notifications.email ? ['email'] : ['push']
        }
      }
    };
  });
};

const complexFunction = () => {
  const data = [
    {
      items: [
        { value: 1, nested: { deep: { deeper: [1, 2, 3] } } },
        { value: 2, nested: { deep: { deeper: [4, 5, 6] } } }
      ]
    }
  ];
  
  return data.reduce((acc, item) => {
    return acc.concat(item.items.filter((subItem) => {
      return subItem.nested.deep.deeper.some((val) => {
        return val > 2 && (val < 5 || (val === 6 && true));
      });
    }));
  }, [] as any[]);
};