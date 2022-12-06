class CustoError extends Error{
constructor(message,code){
    super(message);
    this.code = code

    // google error class in javascript
}
}

export default CustomError