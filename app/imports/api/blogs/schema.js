import SimpleSchema from 'simpl-schema';

export const BlogFormSchema = new SimpleSchema(
    {
        _id: {
            type: String,
            optional: true,
            regEx: SimpleSchema.RegEx.Id
        },
        title: String,
        description: String,
        published: {
            type: Boolean,
            optional: true,
            defaultValue: true
        }
    },
    {
        clean: true
    }
);

const BlogSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            }
            if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            }
            return this.unset(); // Prevent user from supplying their own value
        }
    },
    createdBy: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue() {
            if (this.isInsert) {
                return this.userId;
            }
            if (this.isUpsert) {
                return { $setOnInsert: new Date() };
            }
            return this.unset(); // Prevent user from supplying their own value
        }
    },
    updatedAt: {
        type: Date,
        autoValue() {
            if (this.isUpdate) {
                return new Date();
            }
            return this.unset();
        },
        optional: true
    }
});

BlogSchema.extend(BlogFormSchema);

export default BlogSchema;
