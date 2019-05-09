import React from 'react';

const Home = () => {
    return (
        <React.Fragment>
            <header
                className="masthead"
                // eslint-disable-next-line prettier/prettier
                style={{ backgroundImage: 'url(\'img/home-bg.jpg\')' }}
            >
                <div className="overlay" />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <div className="post-heading">
                                <h1>Welcome</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">Welcome to the understandable blog</div>
            </div>
        </React.Fragment>
    );
};

export default Home;
