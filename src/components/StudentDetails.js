class StudentDetails {
    constructor(_id, address, class_name, dob, firstname, gender, lastname, parent_id, postcode, school_name, status, studentid, zone) {
        this._id = _id;
        this.address = address;
        this.class_name = class_name;
        this.dob = dob;
        this.firstname = firstname;
        this.gender = gender;
        this.lastname = lastname;
        this.parent_id = parent_id;
        this.postcode = postcode;
        this.school_name = school_name;
        this.status = status;
        this.studentid = studentid;
        this.zone = zone;
    }
}

export default StudentDetails;