import { asyncHandler } from "../utils/asyncHandler.js" ;
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        
        return { accessToken, refreshToken }; 

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refresh and access token");
    }
}

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
    const {username, fullname, email, password} = req.body;
    console.log("username:", username, ", fullname:", fullname,", email:", email, ", password:", password);

    // console.log(req)
    console.log("reqBody", req.body)

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
    const existedUser = await User.findOne({
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

    // it will give error due to ?. if its not provided in form
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }


    console.log("reqFiles", req.files)
    // console.log(req.files?.avatar[0])
    // console.log(req.files?.avatar[0]?.path)

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar is required")
    }

    // 5. upload images to cloudinary
    //    get url from cloudinary response returned
    //    check avatar upload to cloudinary via multer 
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    // coverImageLocalPath = not given cloudinary gives "" empty str
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    console.log("avatCldRes", avatar)
    // console.log(coverImage)

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

    console.log("user", user)

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
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})

const loginUser = asyncHandler( async (req, res) => {

    // 1. get data from req.body
    // 2. check username/email
    // 3. find user in db
    // 4. password check
    // 5. generatae access, refresh token
    // 6. send token in secure cokkies
    // 7. send rseponse

    // 1. get data from req.body
    const { email, username, password } = req.body;

    // 2. check username/email
    if (!username || !email) {
        throw new ApiError(400, "username or email is required");
    }
    
    // 3. find user in db
    const user = await User.findOne({
        // mongoDB operators ($or, $and, $nor $where etc)
        $or: [{ username }, { email }]
    }) 

    // if user not found
    if (!user) {
        throw new ApiError(404, "username does not exist");
    }

    // if user found
    // 4. password check
    const isPasswordValid = await user.isPasswordCorrect(password);
    
    // if password not correct
    if (!isPasswordValid) {
        throw new ApiError(401, "invalid password");
    }

    // if password correct
    // 5. generatae access & refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    
    // 6. send token in secure cookies
    // if db call is expensive, update the user obj
    // otherwise do the following db call
    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken");

    // options for cookies to modify by server 
    // only due to, http = true & secure = true
    const options = {
        httpOnly: true,
        secure: true,
    }

    // 7. send rseponse
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            { 
                user: loggedInUser, accessToken, refreshToken 
            },
            "user logged in successfully"
        )
    );
})

const logoutUser = asyncHandler( async (req, res) => {
    
    await User.findByIdAndUpdate(
        // req has access to user which we added via auth.middleware.js
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    // options for cookies to modify by server 
    // only due to, http = true & secure = true
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearcookie("accessToken", options)
    .clearcookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out"))
})

export { registerUser, loginUser, logoutUser }