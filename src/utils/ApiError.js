class ApiError extends Error {
  constructor(
    statuscode,
    message = "something went wrong",
    errors = [],
    statck = ""
  ) {
    (super(message), (this.statuscode = statuscode));
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}
export { ApiError }; // whenever we rexport in {} means during import we can able to import with same in {}
