import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Users from '../Users';

Meteor.publish('users', function() {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
        return this.ready();
    }

    return Users.find();
});
