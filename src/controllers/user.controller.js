import { asyncHandler } from "../utils/asyncHandler.js" ;
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // or demo response in postman
    // res.status(200).json({
    //     message: "aybee code"
    // })

    // 1. get user detail from frontend/postman
    // 2. validation - not empty
    // 3. check if already exists (via email/username)
    // 4. check for images, check for avatar 
    // 5. if exists upload them to cloudinary
    //    get url from cloudinary response returned
    //    avatar upload to cloudinary via multer check
    // 6. create user object to store in nosql db 
    //    create db entry / creation call
    // 7. remove password & refresh token field from response
    // 8. check for user creation
    // 9. return response

    // 1. user detailfrom frontend/postman
    // express givess body access via req.body
    const {username, fullname, email, password} = req.body
    console.log("username:", username, ", fullname:", fullname,", email:", email, ", password:", password);

    // 2. validation
    if ( 
        [username, fullname, email, password]
        .some((field) => field?.trim() === "")
        // .some(callback)
        // .some() checks if at least one element, 
        // in the array does pass the condition.
        // If it passes i.e, returns true → .some() returns true.
        // If none match → .some() returns false.
    ) {
       throw new ApiError(400, "all fields are required")
    } 
    if (!email.includes("@")) {
        throw new ApiError(401, "correct email format required")
    }

    // 3. check if already exists (via email/username)
    const existedUser = User.findOne({
        // operators with $ sign, $and, $or $comment etc
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "user already exists")
    }

    // 4. check for images, check for avatar 
    // multer gives access to files via req.files
    // middleware adds more fields to request i.e, req
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar is required")
    }

    // 5. upload images to cloudinary
    //    get url from cloudinary response returned
    //    check avatar upload to cloudinary via multer 
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // check avatar upload
    if (!avatar) {
        throw new ApiError(400, "avatar is required")
    }

    // create user obj in mongoDb
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // 7. remove password & refresh token field from response
    // find user in mongoDb and unselect the selected fields with -sign
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // 8. check for user creation
    // check if user obj is created and stored in mongoDB
    if (!createdUser) {
        throw new ApiError(500, "something wrong while registering user")
    }

    // 9. return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, message="user registered successfully")
    )
})

export { registerUser }