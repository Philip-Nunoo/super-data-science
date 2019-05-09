import React from 'react';
import PropTypes from 'prop-types';
import AutoForm from 'uniforms-bootstrap4/AutoForm';
import AutoField from 'uniforms-bootstrap4/AutoField';
import { BlogFormSchema } from '../../api/blogs/schema';

const CreateBlogForm = ({ formRef, handleSubmit, onSuccess, model }) => {
    return (
        <AutoForm
            schema={BlogFormSchema}
            ref={ref => formRef(ref)}
            onSubmit={handleSubmit}
            model={model}
            onSubmitFailure={error => console.log(error)}
            onSubmitSuccess={() => {
                console.log('success');
                onSuccess();
            }}
            showInlineError
            modelTransform={(mode, objModel) => {
                const cleanModel = objModel;
                delete cleanModel.createdAt;
                delete cleanModel.createdBy;
                delete cleanModel.updatedAt;

                return cleanModel;
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
    onSuccess: PropTypes.func,
    model: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string
    })
};

CreateBlogForm.defaultProps = {
    formRef: () => {},
    handleSubmit: () => {},
    onSuccess: () => {},
    model: {}
};

export default CreateBlogForm;
