const {Router}= require("express");
const userModel = require("../Model/userModel");
const userRouter = Router();


userRouter.post("/create-user",upload.single("file"), async(req,res)=>{
    const {name, email, password} = req.body;
    const userEmail = await userModel.findOne({email});
    if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

    const filename = req.file.filename ;
    const fileUrl = path.join(filename);
      
      bcrypt.hash(password, 10, async function(err, hash) {
        
        await userModel.create({
          name: name,
          email: email,
          password: hash,
          avatar: fileUrl
        });
    });



// const user={
//     name:name,
//     email:email,
//     password:password,
//     avatar: fileUrl,
// } ;
console.log(user);
});

module.exports = userRouter;