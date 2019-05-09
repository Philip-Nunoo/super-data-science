import { Accounts } from 'meteor/accounts-base';
import './api';

Accounts.config({
    forbidClientAccountCreation: true
});
