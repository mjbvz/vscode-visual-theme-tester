interface UserData {
  id: number;
  preferences: {
    theme: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
}

class DataProcessor {
  private processUserData(users: UserData[]): Promise<any[]> {
    return Promise.all(
      users.map((user) => {
        return this.validateUser(user).then((isValid) => {
          if (isValid) {
            return {
              ...user,
              settings: {
                computed: {
                  isActive: user.preferences.notifications.email && (
                    user.preferences.notifications.push || (
                      user.preferences.theme === 'dark' ? true : false
                    )
                  ),
                  score: this.calculateScore([
                    user.id,
                    user.preferences.notifications.email ? 10 : 0,
                    user.preferences.notifications.push ? 5 : 0
                  ])
                }
              }
            };
          } else {
            throw new Error(`Invalid user: ${user.id}`);
          }
        }).catch((error) => {
          console.error('Processing failed:', {
            userId: user.id,
            error: error.message,
            context: {
              hasEmail: user.preferences?.notifications?.email ?? false,
              hasPush: user.preferences?.notifications?.push ?? false,
              theme: user.preferences?.theme ?? 'default'
            }
          });
          return null;
        });
      })
    );
  }

  private calculateScore(factors: number[]): number {
    return factors.reduce((total, factor) => {
      return total + (factor > 0 ? (
        factor * 2 + (factor > 5 ? (
          factor > 10 ? 3 : 2
        ) : 1)
      ) : 0);
    }, 0);
  }

  private validateUser(user: UserData): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const isValid = Boolean(
            user && 
            user.id && 
            user.preferences && (
              user.preferences.notifications && (
                typeof user.preferences.notifications.email === 'boolean' &&
                typeof user.preferences.notifications.push === 'boolean'
              )
            )
          );
          resolve(isValid);
        } catch (err) {
          reject(err);
        }
      }, 100);
    });
  }
}

// Complex nested structure with multiple bracket types
const complexConfig = {
  database: {
    connections: [
      {
        name: 'primary',
        config: {
          host: 'localhost',
          options: {
            ssl: true,
            timeout: 5000,
            retries: {
              max: 3,
              backoff: (attempt: number) => {
                return Math.min(1000 * Math.pow(2, attempt), 10000);
              }
            }
          }
        }
      }
    ]
  },
  middleware: [
    (req: any, res: any, next: any) => {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token && token.length > 0) {
          try {
            const decoded = JSON.parse(atob(token));
            req.user = {
              ...decoded,
              permissions: decoded.roles?.map((role: string) => ({
                role,
                actions: ['read', 'write'].filter((action) => (
                  decoded.scopes?.includes(`${role}:${action}`) || false
                ))
              })) || []
            };
            next();
          } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
          }
        } else {
          res.status(401).json({ error: 'Token required' });
        }
      } else {
        res.status(401).json({ error: 'Authorization header required' });
      }
    }
  ]
};