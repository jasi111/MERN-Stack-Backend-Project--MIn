 // HOF
// Taking a regular function and calling it as async function
const asyncHandler = (fn) => async(req,res,next) => {
   try {
    await fn(req,res,next)
   } catch (err) {
    res.status(err.code || 500).json ({
        success:false,
        message:err.message
    })
   }
}

//added by Satyendra
// Function same as above
// function asyncHandler(fn) {
//     return async function (req, res, next) {
//       try {
//         await fn(req, res, next);
//       } catch (err) {
//         res.status(err.code || 500).json({
//           success: false,
//         });
//       }
//     };
//   }




export default asyncHandler;