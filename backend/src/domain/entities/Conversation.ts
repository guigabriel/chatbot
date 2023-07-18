export default class Conversation {
  id?: number;
  message: string;
  date: string;
  userId: number;

  constructor() {
    this.id = 0;
    this.message = '';
    this.date = '';
    this.userId = 0;
  }
}
