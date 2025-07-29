class ApiResponse {
    constructor(
        statusCode,data,messege="success"
    ){
        this.statusCode =statusCode;
        this.data =data;
        this.messege = messege
    }
}