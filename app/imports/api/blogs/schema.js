import SimpleSchema from 'simpl-schema';

export const BlogFormSchema = new SimpleSchema({
    title: String,
    description: String,
    published: {
        type: Boolean,
        optional: true,
        defaultValue: true
    }
});

const BlogSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});

BlogSchema.extend(BlogSchema);

export default BlogSchema;
