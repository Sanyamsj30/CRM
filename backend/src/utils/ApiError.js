class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message) // Call the parent Error class constructor with the message

        this.statusCode = statusCode      // HTTP status code (e.g., 404, 500)
        this.data = null                  // Placeholder for any extra data (always null here)
        this.message = message            // Error message
        this.success = false              // Indicates the request failed
        this.errors = errors              // Optional array of error details

        if (stack) {
            this.stack = stack            // If stack trace is passed, use it
        } else {
            // Automatically captures where the error happened
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError };
