class ApiResponse {
    constructor(statusCode, data, message="success") {
        this.statusCode = statusCode;
        // this.data is a property attached to object created by the class, 
        // and stores actual data/content you want to send back in response.
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}