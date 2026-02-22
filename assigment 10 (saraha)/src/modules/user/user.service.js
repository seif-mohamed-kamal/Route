import { findOne } from "../../DB/DB.repositry.js"
import { usermodel } from "../../DB/model/user.model.js"

export const profile   =async (id)=>{
    const user= await findOne({
        model: usermodel,
        filter: {_id: id },
        options: {lean:true}
      });
    //   console.log(user)
    return user
}