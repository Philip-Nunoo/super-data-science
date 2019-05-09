import { Mongo } from 'meteor/mongo';
import BlogSchema from './schema';

class BlogCollection extends Mongo.Collection {
    constructor() {
        super('organizations');
        this.attachSchema(BlogSchema);
    }
}

const Blogs = new BlogCollection();

export default Blogs;
