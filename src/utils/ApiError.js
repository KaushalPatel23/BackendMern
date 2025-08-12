class ApiErroe extends Error {
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
export { ApiErroe }; // whenever we rexport the class it export in {} bracket
