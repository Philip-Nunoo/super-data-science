import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BlogRow = ({ deletePost, editPost, isAdmin, post }) => {
    return (
        <div className="post-preview">
            <Link to={`/blog/${post._id}`}>
                <h2 className="post-title">{post.title}</h2>
                {/* <h3 className="post-subtitle">
                    Problems look mighty small from 150 miles up
                </h3> */}
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
                        className="btn btn-sm btn-danger"
                        onClick={() => deletePost(post._id)}
                    >
                        <i className="fas fa-trash-alt" />
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-sm btn-info"
                        onClick={() => editPost(post._id)}
                    >
                        <i className="fas fa-pen" />
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
