const asyncHandler = (requestHandle) => {
  () => {
    Promise.resolve(requestHandle(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

//using try catch

// const asyncHandler1 = (fn) => async (req, res, next) => {
//   try {
//     await fn(req,res,next);
//   } catch (error){
//     res.status(err.code || 500).json({
//         success: false,
//         message: err.message
//     })
//   }
// };
