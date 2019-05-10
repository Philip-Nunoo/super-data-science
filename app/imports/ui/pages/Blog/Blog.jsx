import React from 'react';
import moment from 'moment';
import { Bert } from 'meteor/themeteorchef:bert';
import { getPost } from '../../../api/blogs/methods';

class Blog extends React.PureComponent {
    state = {
        loading: true
    };

    componentDidMount() {
        this.getBlogInfo(this.props);
    }

    getBlogInfo(props) {
        const { id } = props.match.params;

        getPost
            .callPromise({ id })
            .then(post => this.setState({ post }))
            .catch(error => {
                Bert.alert(error.reason, 'danger', 'growl-top-right');
                this.setState({ error });
            })
            .finally(() => {
                this.setState({
                    loading: false
                });
            });
    }

    render() {
        const { error, post, loading } = this.state;
        if (loading) {
            return <div>Loading</div>;
        }
        if (error) {
            return <div>Error</div>;
        }
        return (
            <React.Fragment>
                <header
                    className="masthead"
                    // eslint-disable-next-line quotes
                    style={{ backgroundImage: "url('img/post-bg.jpg')" }}
                >
                    <div className="overlay" />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <div className="post-heading">
                                    <h1>{post.title}</h1>
                                    <span className="meta">
                                        Posted by&nbsp;
                                        {post.createdBy.name}&nbsp;
                                        {`on ${moment(post.created).format(
                                            'MMMM DD, YYYY'
                                        )}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <article>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                {post.description}
                            </div>
                        </div>
                    </div>
                </article>
            </React.Fragment>
        );
    }
}

export default Blog;
