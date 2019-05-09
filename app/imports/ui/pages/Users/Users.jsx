import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import MeteorUsers from '../../../api/users/Users';

const Users = ({ loading, users }) => {
    const userId = Meteor.userId();
    const isAdmin = Roles.userIsInRole(userId, 'admin');

    return (
        <div className="container" style={{ paddingTop: 70 }}>
            <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                    {!isAdmin ? (
                        'Permission denied'
                    ) : (
                        <React.Fragment>
                            {loading && <div>loading</div>}
                            {!loading && users.length <= 0 && (
                                <div>No User created</div>
                            )}
                            {!loading && users.length > 0 && (
                                <div>
                                    {users.map(user => (
                                        <div key={user._id}>{user.name}</div>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired
        })
    )
};

Users.defaultProps = {
    users: []
};

export default withTracker(() => {
    const subcription = Meteor.subscribe('users');

    return {
        loading: !subcription.ready(),
        users: MeteorUsers.find().fetch()
    };
})(Users);