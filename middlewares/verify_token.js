const jwt = require("jsonwebtoken");

// Token Validity Verification
function verifyTokenValidity(req,res,next) {  
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({message: "No Token Provided"});
        return;
    }
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded; // decoded is an object contains jwt payload
        next();
    } catch (error) {
          res.status(401).json({message: "Verify Your Token"});
        return;
    }
}



// Define Authorization Should be Called After the Token Validity MiddleWare

function isAuthorized(req,res,next) {
    if (req.user.userId === req.params.id || req.user.isAdmin === true) {
     
      return next();
    }
    res.status(403).json({message: "Action Unauthorized"});
}

// Only Admin Authorazation (is Authorized + is authenticated)

function hasAdminAcces(req, res, next) {
  if (req.user && req.user.isAdmin === true) {
    return next();
  }
  res.status(403).json({ message: "Action Unauthorized. Only Admin Can Access This Service" });
}

// Block No Admin From Setting IsAdmin Option
function blockNonAdminFromSettingIsAdmin(req, res, next) {
  if ('isAdmin' in req.body) {
    if (!req.user || req.user.isAdmin !== true) {
      return res.status(403).json({ message: "Unauthorized to set isAdmin field" });
    }
  }
  next();
}


//exportation 
module.exports = {verifyTokenValidity,isAuthorized,hasAdminAcces,blockNonAdminFromSettingIsAdmin}