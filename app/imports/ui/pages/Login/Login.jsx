import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-bootstrap4/AutoForm';
import AutoField from 'uniforms-bootstrap4/AutoField';
import SubmitField from 'uniforms-bootstrap4/SubmitField';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { Bert } from 'meteor/themeteorchef:bert';
import { Link } from 'react-router-dom';
import { LoginSchema } from '../../../api/users/schema';

const bridge = new SimpleSchema2Bridge(LoginSchema);

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        Meteor.loginWithPassword(email, password, err => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const Login = () => (
    <AutoForm
        className="auth-form"
        schema={bridge}
        onSubmit={({ email, password }) => login(email, password)}
        onSubmitFailure={error =>
            Bert.alert(error.reason, 'danger', 'growl-top-right')
        }
        onSubmitSuccess={() => {
            Bert.alert('Login successfully!', 'success', 'growl-top-right');
        }}
    >
        <AutoField name="email" />
        <AutoField name="password" type="password" />
        <SubmitField value="Login" inputClassName="btn btn-primary btn-block" />
        Don&apos;t have an account? <Link to="/signup">Sign up now!</Link>
    </AutoForm>
);

Login.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            nextPathname: PropTypes.string
        })
    }).isRequired
};

export default Login;
