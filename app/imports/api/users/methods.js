import { Accounts } from 'meteor/accounts-base';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { SignupSchema } from './schema';

export const createUser = new ValidatedMethod({
    name: 'user.create',
    mixins: [CallPromiseMixin],
    validate: SignupSchema.validator(),
    run({ email, password }) {
        if (!this.isSimulation) {
            return Accounts.createUser({ email, password });
        }
        return false;
    }
});

export default 'User.Methods';
