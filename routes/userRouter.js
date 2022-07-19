const express=require( "express" );
const {createUser,getUser, getAllUser}=require( `./../controllers/userController` );
const {logIn,signUp,protect,restrictTo}=require( "../controllers/authController" );
const userRouter=express.Router();


//TODO:                     ************** Routes ***************

//Create user
userRouter.post('/',createUser);

// Login
userRouter.post( '/login', logIn );

// Signup
userRouter.post('/signup',signUp);


// Get users
userRouter.route( "/:id" )
.get( getUser )



module.exports=userRouter;