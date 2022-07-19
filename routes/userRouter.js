const express=require( "express" );
const {createUser,getUser, getAllUser, changePassword, setDuration}=require( `./../controllers/userController` );
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
.get( protect,getUser )

// Get all users
userRouter.route('/').get(protect,restrictTo('admin'),getAllUser);

// Change user password
userRouter.route("/password/:id").patch(protect,restrictTo('admin'),changePassword)

// Set Duration
userRouter.route("/duration/:id").patch(protect,restrictTo('admin'),setDuration)


module.exports=userRouter;