const expect = require(`expect`);
const {Users} = require(`./users`);

describe('Users', ()=> {
    var users;
    beforeEach(() => {
        users = new Users;
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'node'
        },
        {
            id: '2',
            name: 'Julia',
            room: 'node'
        }, {
            id: '3',
            name: 'Atuma',
            room: 'react'
        }
    ]
    });

    it('should add new user',  () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Atuma',
            room: 'Node room'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for node room',  () => {
        var userList = users.getUserList('node');

        expect(userList).toEqual(['Mike', 'Julia'])
    });

    it('should return names for react room',  () => {
        var userList = users.getUserList('react');

        expect(userList).toEqual(['Atuma'])
    });

    it('should find user',  () => {

        var userId = '2';

        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user',  () => {
        var userId = '99';

        var user = users.getUser(userId);

        expect(user).toBeUndefined();
    });

    it('should remove a user',  () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);

    });

    it('should not remove a user',  () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);

    });
})
