export class GroupChatServices {
    messages = [
      {
        user: 'incoming',
        text: 'Have you finished homework?'
      },
      {
        user: 'incoming',
        text: 'Whats the deadline'
      },
      {
        user: 'outgoing',
        text: 'No i haven\'t done yet'
      },
      {
        user: 'incoming',
        text: 'Have you finished homework?'
      },
      {
        user: 'incoming',
        text: 'Whats the deadline'
      },
      {
        user: 'outgoing',
        text: 'It\'s next monday'
      },
      {
        user: 'incoming',
        text: 'let me know when you\'re done!!'
      }
      
    ];
    recieveMsg(message: string){
      const txt = {user: 'outgoing', text: message}
      this.messages.push(txt);
    }
  }
  