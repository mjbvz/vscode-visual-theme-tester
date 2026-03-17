export class DatabaseService {
  private connected = false;

  async connect(): Promise<void> {
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.connected = true;
  }

  isConnected(): boolean {
    return this.connected;
  }
}