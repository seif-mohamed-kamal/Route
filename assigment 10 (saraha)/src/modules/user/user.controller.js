import { Router } from "express";
import { profile } from "./user.service.js";
import { successResponse } from "../../common/utils/index.js";
const router=Router()

router.get("/" , async (req,res,next)=>{
    // console.log(req.user.sub)
    const result  = await profile(req.user.sub)
    return successResponse({ res, status: 200, data: result });
})
export default router