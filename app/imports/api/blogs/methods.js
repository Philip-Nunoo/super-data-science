import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import SimpleSchema from 'simpl-schema';
import { BlogFormSchema } from './schema';
import Blogs from './Blogs';

export const createBlog = new ValidatedMethod({
    name: 'blog/create',
    mixins: [CallPromiseMixin, LoggedInMixin],
    checkRoles: {
        roles: ['admin'],
        rolesError: {
            error: 'not-allowed',
            message: 'You are not allowed to call this method',
            reason: 'You are not allowed to call this method'
        }
    },
    checkLoggedInError: {
        error: 'notLogged',
        message: 'You need to be logged in to call this method',
        reason: 'You need to login'
    },
    validate: BlogFormSchema.validator(),
    run({ _id, ...doc }) {
        if (!this.isSimulation) {
            if (_id) {
                return Blogs.update({ _id }, { $set: doc });
            }
            return Blogs.insert(doc);
        }
        return false;
    }
});

export const getPost = new ValidatedMethod({
    name: 'blog/get',
    mixins: [CallPromiseMixin, LoggedInMixin],
    checkRoles: {
        roles: ['admin'],
        rolesError: {
            error: 'not-allowed',
            message: 'You are not allowed to call this method',
            reason: 'You are not allowed to call this method'
        }
    },
    checkLoggedInError: {
        error: 'notLogged',
        message: 'You need to be logged in to call this method',
        reason: 'You need to login'
    },
    validate: new SimpleSchema({
        id: {
            type: String,
            regEx: SimpleSchema.RegEx.Id
        }
    }).validator(),
    run({ id }) {
        if (!this.isSimulation) {
            return Blogs.findOne(id);
        }
        return false;
    }
});

export default 'Blog.Methods';
