import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
    if (Roles.getUsersInRole('admin').fetch().length <= 0) {
        console.log('No admin user found');
        const user = {
            email: 'admin@superdatascience.com',
            name: 'admin',
            roles: ['admin']
        };
        const id = Accounts.createUser({
            email: user.email,
            password: 'apple1',
            profile: { name: user.name }
        });

        if (user.roles.length > 0) {
            Roles.addUsersToRoles(id, user.roles);
        }
    }
});
