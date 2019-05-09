import { Meteor } from 'meteor/meteor';
import Blogs from '../Blogs';

Meteor.publish('blogs', function() {
    if (!this.userId) {
        return this.ready();
    }

    return Blogs.find();
});
