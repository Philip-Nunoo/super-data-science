import { Mongo } from 'meteor/mongo';
import BlogSchema from './schema';
import Users from '../users/Users';

class BlogCollection extends Mongo.Collection {
    constructor() {
        super('posts');
        this.attachSchema(BlogSchema);

        // eslint-disable-next-line no-underscore-dangle
        this._transform = blog => {
            return {
                ...blog,
                createdBy: Users.findOne(blog.createdBy) || {}
            };
        };
    }
}

const Blogs = new BlogCollection();

export default Blogs;
