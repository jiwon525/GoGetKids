class TripDetails {
    constructor(_id, tripId, vehicle_number, driver_email, company_name, date, school_name, zone, start_time, end_time) {
        this._id = _id;
        this.tripId = tripId;
        this.vehicle_number = vehicle_number;
        this.driver_email = driver_email;
        this.company_name = company_name;
        this.date = date;
        this.school_name = school_name;
        this.zone = zone;
        this.start_time = start_time || null;
        this.end_time = end_time || null;
    }
};

export default TripDetails;

