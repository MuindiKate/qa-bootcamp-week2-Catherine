type UserProfile = {
  id: number;            
  username: string;      
  settings?: {      
    notifications?: boolean;   
  }    
};

const user1: UserProfile = { id: 1, username: "kat", settings: { notifications: true } };  // true
const user2: UserProfile = { id: 2, username: "jordyn" };   // no settings
const user3: UserProfile = { id: 3, username: "gallanger", settings: {} };  // empty object

function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;   
}

console.log(user1.username, isNotified(user1));
console.log(user2.username, isNotified(user2));
console.log(user3.username, isNotified(user3));