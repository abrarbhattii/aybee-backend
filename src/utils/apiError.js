import { Error } from "mongoose";

class ApiError extends Error {
    constructor(statusCode, message="something wrong", errors=[], stack="") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if(stack){
            this.stack = stack;
        } else {
            // It tells Node.js: Capture the current stack trace and assign it 
            // to this.stack, but exclude this constructor function from the trace.
           Error.captureStackTrace(this, this.constructor) 
        }
    }
}

export { ApiError }