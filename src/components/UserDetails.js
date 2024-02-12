class UserDetails {
    constructor(userId, accessToken, refreshToken, email, role, firstName, lastName) {
        this.userId = userId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }
};

export default UserDetails;
