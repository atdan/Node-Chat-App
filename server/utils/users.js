// class Person {
//     constructor (name, age){
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old`
//     }
// }
//
// var me = new Person('Daniel', 21);
// var description = me.getUserDescription();
// console.log(description)
// console.log('this.name: ', me.name);


class Users {
    constructor (){
        this.users = [];
    }

    addUser (id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        //return user that was removed

        var user = this.getUser(id);

        if (user){
            this.users = this.users.filter((user) => {
                return user.id !== id;
            })
        }

        return user
    }

    getUser(id){

       return this.users.filter((user) => {
           return  user.id === id
       })[0]


    }

    getUserList(room ){
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        var namesArray = users.map( (user) => {
            return user.name;
        });

        return namesArray
    }
}

module.exports = {Users};
