class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode      // HTTP status code
        this.data = data                  // Response data payload
        this.message = message            // Response message (default: "Success")
        this.success = statusCode < 400   // true if status code indicates success
    }
}

export { ApiResponse }
