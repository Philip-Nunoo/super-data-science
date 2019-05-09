import React from 'react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-bootstrap4/AutoForm';
import AutoField from 'uniforms-bootstrap4/AutoField';
import { BlogFormSchema } from '../../api/blogs/schema';

const CreateBlogForm = ({ formRef, handleSubmit, onSuccess }) => {
    return (
        <AutoForm
            schema={BlogFormSchema}
            ref={ref => formRef(ref)}
            onSubmit={handleSubmit}
            onSubmitFailure={error => console.log(error)}
            onSubmitSuccess={() => {
                console.log('success');
                onSuccess();
            }}
        >
            <AutoField name="title" />
            <AutoField name="description" />
        </AutoForm>
    );
};

CreateBlogForm.propTypes = {
    formRef: PropTypes.func,
    handleSubmit: PropTypes.func,
    onSuccess: PropTypes.func
};

CreateBlogForm.defaultProps = {
    formRef: () => {},
    handleSubmit: () => {},
    onSuccess: () => {}
};

export default CreateBlogForm;
