import SimpleSchema from 'simpl-schema';

export const LoginSchema = new SimpleSchema({
    email: String,
    password: String
});

export const SignupSchema = new SimpleSchema({
    email: String,
    password: {
        type: String
    },
    confirmPassword: {
        type: String,
        custom() {
            if (this.value !== this.field('password').value) {
                return 'passwordMismatch';
            }
            return true;
        }
    }
});
