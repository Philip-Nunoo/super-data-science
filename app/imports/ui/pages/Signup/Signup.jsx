import React from 'react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-bootstrap4/AutoForm';
import AutoField from 'uniforms-bootstrap4/AutoField';
import SubmitField from 'uniforms-bootstrap4/SubmitField';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { SignupSchema } from '../../../api/users/schema';
import { createUser } from '../../../api/users/methods';

const bridge = new SimpleSchema2Bridge(SignupSchema);

const signup = (email, password) => {
    return createUser.callPromise({
        email,
        password,
        confirmPassword: password
    });
};

const Signup = () => (
    <AutoForm
        className="auth-form"
        schema={bridge}
        onSubmit={({ email, password }) => signup(email, password)}
        onSubmitFailure={error => {
            Bert.alert(error.reason, 'danger', 'growl-top-right');
        }}
        onSubmitSuccess={() => {
            Bert.alert(
                'User created successfully!',
                'success',
                'growl-top-right'
            );
        }}
    >
        <AutoField name="email" />
        <AutoField name="password" type="password" />
        <AutoField name="confirmPassword" type="password" />
        <SubmitField
            value="Sign up"
            inputClassName="btn btn-primary btn-block"
        />
        Already have an account? <Link to="/login">Sign in</Link>
    </AutoForm>
);

Signup.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            nextPathname: PropTypes.string
        })
    }).isRequired
};

export default Signup;
