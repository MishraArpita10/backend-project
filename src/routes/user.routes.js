import { Router } from "express";
import { loginUser, logoutUser, registerUser ,refreshAccessToken, changeCurrentPasword, getCurrentuser, updateAccountDetails, updateUserCoverImage, getUserChannelProfile, getWatchHistory} from "../controllers/user.controller.js";
import { upload } from "../middleswares/multer.middleware.js";
import { verifyJWT } from "../middleswares/auth.middleware.js";
const router=Router()
router.route("/register").post(
    upload.fields([
     {
        name:"avatar",
        maxCount:1
     },
     {
        name:"coverImage",
        maxCount:1
     }
    ]),
    registerUser)
router.route("/login").post(loginUser)
//secured routes
router.route("/Logout").post(verifyJWT,logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPasword)
router.route("/current-user").get(verifyJWT,getCurrentuser)
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateAccountDetails)
router.route("/cover-image").patch(verifyJWT,upload.single("/coverImage"),updateUserCoverImage)
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT,getWatchHistory)
export default router