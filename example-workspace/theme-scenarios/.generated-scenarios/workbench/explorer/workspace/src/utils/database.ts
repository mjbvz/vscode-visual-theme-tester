export const database = {
  async query(sql: string): Promise<any[]> {
    // Mock database implementation
    return [];
  },
  
  async insert(table: string, data: any): Promise<any> {
    // Mock insert implementation
    return { id: Math.random().toString(), ...data };
  },
  
  async findOne(table: string, where: any): Promise<any> {
    // Mock find implementation
    return null;
  }
};