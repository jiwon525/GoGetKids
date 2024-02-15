class ScheduleDetails {
    constructor(id = null, date, firstName = '', lastName = '', school = '', studentclass = '', status = '', studentid = '', transporttype = '', pickuptime = null, dismissaltime = null) {
        this.id = id;
        this.date = date;
        this.firstName = firstName;
        this.lastName = lastName;
        this.school = school;
        this.studentclass = studentclass;
        this.status = status;
        this.studentid = studentid;
        this.transporttype = transporttype;
        this.pickuptime = pickuptime;
        this.dismissaltime = dismissaltime;
    }
}

export default ScheduleDetails;
