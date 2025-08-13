import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js" // it is use to throw the error
import {User} from "../models/user.model.js" //  it is import to acces the User model in DataBase
import { uploadOnCloudinary } from "../utils/cloudinary.js" // it provide function to uplode on cloudinary
import { ApiResponse } from "../utils/ApiRespons.js" // it is user for responce
const resisterUser = asyncHandler(async (req, res) => {
  //steps :-
  //take details of user from fronted
  //validation (all required data are proper or not)
  //check the user already exits (mail,username)
  //check the image / check the avtar
  //uplode on cloudinary / check avtar
  //create user object - create entry in data base
  //remove password and token fild from responce ( after aplode the data on db , db give responce all the data)
  // check user creation
  //return responce
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // take details of user from fronted
  const { fullName, password, username, email } = req.body; // here we only able to take row  data , not able to take image, to take image we write middleware in routes 
  console.log("email : ",email);


  //validation (all required data are proper or not)
  if(
    [fullName, password, username, email].some((field)=>
    field?.trim()==="")
  ){
    throw new ApiError(400, "all field are requered")
  }

 //check the user already exits (mail,username)
 const userarepresent = User.find({ // find method find karte user madhe username , email are already exits ahe ky t ... return karte true , false
    $or :[{ username },{ email }] // $or operater are use to check two field
 })
 if(userarepresent){
    throw new ApiError(409, "username or email are already exits")
 }

 //check the image / check the avtar

 const avatarLocalPath =req.files?.avatar[0]?.path;
 const coverImageLocalPath =req.files?.coverImage[0]?.path;
 if(!avatarLocalPath){
  throw new ApiError(400,"Avatar is requered");
 }


 //uplode on cloudinary / check avtar
const avatar = await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);
if(!avatar){
   throw new ApiError(400,"Avatar is requered");
}

//create user object - create entry in data base
const user =await User.create( // use to create an user object in data base
  {
    fullName,
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()
  }
 )

 //remove password and token fild from responce

 const userCreation = await User.findById(user._id).select(
  "-password -refreshToken" // hya fiels - houn jatil user chya responce madhun 
 )

  // check user creation
  if(!userCreation){
    throw new ApiError(500,"something went wrong during the creation of user");
  }


   //return responce
   return  res.status(201).json(
    new ApiResponse(201,userCreation,"user resister succesfully")
   )
});

export { resisterUser };
