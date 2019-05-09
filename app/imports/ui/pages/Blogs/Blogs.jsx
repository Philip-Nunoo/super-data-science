import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import Blogs from '../../../api/blogs/Blogs';
import CreateBlogForm from '../../components/CreateBlogForm';
import { createBlog } from '../../../api/blogs/methods';
import BlogRow from '../../components/BlogRow';

@withTracker(() => {
    const subscription = Meteor.subscribe('blogs');

    return {
        loading: !subscription.ready(),
        blogs: Blogs.find().fetch(),
        userId: Meteor.userId()
    };
})
class BlogLists extends React.Component {
    static displayName = 'Blogs';

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        blogs: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string
            })
        ),
        userId: PropTypes.string.isRequired
    };

    static defaultProps = {
        blogs: []
    };

    state = {
        toggleCreateBlogForm: false
    };

    formRef = {};

    createBlog = () => {
        this.setState({
            toggleCreateBlogForm: true
        });
    };

    cancel = () => {
        this.formRef.reset();
        this.setState({
            toggleCreateBlogForm: false
        });
    };

    save = () => {
        this.formRef.submit();
    };

    renderActionButtons() {
        const { toggleCreateBlogForm } = this.state;

        return (
            <React.Fragment>
                {!toggleCreateBlogForm && (
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.createBlog}
                    >
                        Add blog
                    </button>
                )}
                {toggleCreateBlogForm && (
                    <React.Fragment>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.cancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.save}
                        >
                            Save
                        </button>
                    </React.Fragment>
                )}
                {toggleCreateBlogForm && (
                    <CreateBlogForm
                        formRef={ref => {
                            this.formRef = ref;
                        }}
                        handleSubmit={doc => createBlog.callPromise(doc)}
                        onSuccess={this.cancel}
                    />
                )}
            </React.Fragment>
        );
    }

    render() {
        const { loading, blogs, userId } = this.props;
        const isAdmin = Roles.userIsInRole(userId, 'admin');

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        {isAdmin && this.renderActionButtons()}
                        {loading && <div>loading</div>}
                        {!loading && blogs.length <= 0 && (
                            <div>No blog created</div>
                        )}
                        {!loading && blogs.length > 0 && (
                            <div>
                                {blogs.map(blog => (
                                    <BlogRow
                                        key={blog._id}
                                        post={blog}
                                        isAdmin={isAdmin}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogLists;
