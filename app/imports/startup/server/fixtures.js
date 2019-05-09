/* eslint-disable no-underscore-dangle */
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import Blogs from '../../api/blogs/Blogs';
import fixturesBlogs from './fixtures.blogs';

const createBlog = () => {
    const adminUsers = Roles.getUsersInRole('admin').fetch();
    if (!Blogs.findOne() && adminUsers.length > 0) {
        const bulk = Blogs.rawCollection().initializeUnorderedBulkOp();
        const id = adminUsers[0]._id;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < fixturesBlogs.length; i++) {
            bulk.insert({
                _id: Random.hexString(17),
                ...fixturesBlogs[i],
                published: true,
                createdBy: id,
                createdAt: new Date()
            });
        }

        bulk.execute();
    }
};

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

        createBlog();
    }
    createBlog();
});
