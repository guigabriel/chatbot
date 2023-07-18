export default class Conversation {
  id?: number;
  userId: number;
  message: string;
  date: string;

  constructor() {
    this.id = 0;
    this.message = '';
    this.date = '';
    this.userId = 0;
  }
}
