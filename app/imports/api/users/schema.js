import SimpleSchema from 'simpl-schema';

export const LoginSchema = new SimpleSchema({
    email: {
        type: String
    },
    password: {
        type: String,
        uniforms: {
            type: 'password'
        }
    }
});

export default 'UserSchema';
