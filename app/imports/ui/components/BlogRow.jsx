import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BlogRow = ({ deletePost, editPost, isAdmin, post }) => {
    return (
        <div className="post-preview">
            <Link to="/blog">
                <h2 className="post-title">{post.title}</h2>
                <h3 className="post-subtitle">
                    Problems look mighty small from 150 miles up
                </h3>
            </Link>
            <p className="post-meta">
                Posted by&nbsp;
                {post.createdBy.name}&nbsp;
                {`on ${moment(post.created).format('MMMM DD, YYYY')}`}
            </p>
            {isAdmin && (
                <div className="action">
                    <button
                        type="button"
                        className="btn btn-xs btn-danger"
                        onClick={() => deletePost(post._id)}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="btn btn-xs btn-info"
                        onClick={() => editPost(post._id)}
                    >
                        Edit
                    </button>
                </div>
            )}
            <hr />
        </div>
    );
};

BlogRow.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    deletePost: PropTypes.func,
    editPost: PropTypes.func,
    isAdmin: PropTypes.bool
};

BlogRow.defaultProps = {
    deletePost: () => {},
    editPost: () => {},
    isAdmin: false
};

export default BlogRow;
