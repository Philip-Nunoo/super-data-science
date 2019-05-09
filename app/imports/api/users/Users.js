import { Meteor } from 'meteor/meteor';

const Users = Meteor.users;

// eslint-disable-next-line no-underscore-dangle
Users._transform = user => {
    let username;
    if (user.profile && user.profile.name) {
        username = user.profile.name;
    }
    if (!username && user.emails) {
        username = user.emails[0].address;
    }

    return {
        ...user,
        name: username
    };
};

export default Users;
