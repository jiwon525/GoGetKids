class TripDetails {
    constructor(_id, date, vehicle_number, vehicle_type, driver_email, company_name, school_name, zone, start_time, end_time) {
        this._id = _id;
        this.date = date; //ill remove this 
        this.vehicle_number = vehicle_number;
        this.vehicle_type = vehicle_type;
        this.driver_email = driver_email;
        this.company_name = company_name;
        this.school_name = school_name;
        this.zone = zone;
        this.start_time = start_time || null;
        this.end_time = end_time || null;
    }
};

export default TripDetails;

