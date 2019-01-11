export class ProfileService {
    profiles = {
        image: 'profile1',
        name: 'Bruce Wayne',
        bio: 'Hello, I am Wayne, Bruce Wayne. I have lot of resource and I can get whatever I Want.',
        friends: '4',
        interests: ['Reading', 'Traveling', 'Shopping', 'Eating'],
        contact: 'batman@hotmail.com'
    }
    updateName(name: string){
        if(name == "") {
            return;
        }else {
            this.profiles.name = name;
        }
    }
    updateBio(bio: string) {
        if(bio =="") {
            return;
        }else {
            
        this.profiles.bio = bio;
        }
    }
    insertInterest(input: string){
        this.profiles.interests.push(input);
    }
    deleteInterest(input: string){
        const interests = this.profiles.interests
        for (const i in interests) {
            if (input === interests[i]) {
                let di: number = parseInt(i);
                interests.splice(di, 1);
            }
        }
    }
}