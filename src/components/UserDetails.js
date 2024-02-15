class UserDetails {
    constructor(accessToken, _id, email, role, firstName, lastName, company_name, school_name) {
        this.accessToken = accessToken;
        this._id = _id;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.company_name = company_name || null;
        this.school_name = school_name || null;
    }
};

export default UserDetails;

