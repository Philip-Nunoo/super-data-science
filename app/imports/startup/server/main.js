import { Accounts } from 'meteor/accounts-base';
import './api';
import './fixtures';

Accounts.config({
    forbidClientAccountCreation: true
});
