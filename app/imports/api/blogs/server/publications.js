import { publishComposite } from 'meteor/reywood:publish-composite';
import Blogs from '../Blogs';
import Users from '../../users/Users';

publishComposite('blogs', {
    find() {
        if (!this.userId) {
            return this.ready();
        }

        return Blogs.find();
    },
    children: [
        {
            find(blog) {
                return Users.find(blog.createdBy._id);
            }
        }
    ]
});
