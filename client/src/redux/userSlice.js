import { createSlice } from '@reduxjs/toolkit'

//******* Declare your state variable here
const initialState={
  userData: {},
}

export const userSlice=createSlice( {
  name: 'userData',

  initialState,

  reducers: {
  
    setuserData: ( state, action ) => {
      state.userData=action.payload
      console.log("-----------=--=--=-=-==-=",action.payload)
    },

  },

} )


// Action creators are generated for each case reducer function
export const {  setuserData }=userSlice.actions

export default userSlice.reducer;