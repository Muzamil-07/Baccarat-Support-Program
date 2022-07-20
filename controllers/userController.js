const User=require("../models/userModel")
const factory=require( './FactoryHandler' );
const catchAsync =require("../utils/catchAysnc")

//Todo:  ************************** helper functuions ******************************

// FIX: get single users basaed on id
exports.getUser=factory.getOne( User);

// FIX: Create user basaed (By Admins)
exports.createUser=factory.createOne( User);

// FIX: Get all the users (By Admins)
exports.getAllUser=factory.getAll( User);

// FIX: Change user password (By Admins)
exports.changePassword=catchAsync( async ( req, res, next ) => {

  const user = await User.findById( req.params.id)
  if ( !user ) {
    return next( new AppError( `Could not find the document with ID: ${req.params.id}`, 404 ) );
  }
  user.password=req.body.password;
  await user.save({ validateBeforeSave: false });

  res.status( 200 ).json( {
      status: 'success',
  } );

} );

exports.setDuration=catchAsync(async (req,res,next)=>{
  const user= await User.findById(req.params.id);
  user.endingTime=new Date(Number(user.endingTime)+24*60*60*1000);
  await user.save({ validateBeforeSave: false });
  if ( !user ) {
    return next( new AppError( `Could not find the document with ID: ${req.params.id}`, 404 ) );
  }
  res.status( 200 ).json( {
    status: `Duration has been set successfully.`,
} );
})