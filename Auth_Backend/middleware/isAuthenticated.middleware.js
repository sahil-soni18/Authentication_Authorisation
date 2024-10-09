import jwt from "jsonwebtoken";

// Define the middleware function
function isLoggedIn (req, res, next) {
    // console.log(req.cookies.auth_token);
    // console.log("-------------------------------");
    // console.log(JSON.stringify(req.cookies));
    console.log(`Req.cookies.auth_token === ${req.cookies.auth_token}...`)
    if (!req.cookies.auth_token) {  // Check if token exists
        console.log("Please log in first...");
        return res.status(401).send("Unauthorized");
    } else {
        try {
            let data = jwt.verify(req.cookies.auth_token, "ThisisSecretKey");
            console.log(`Data (Auth MiddleWare): ${JSON.stringify(data)}...`);
            req.user = data;  // Attach user info to request object
            next();
        } catch (err) {
            console.log("Invalid token");
            return res.status(401).send("Invalid Token");
        }
    }
}

export default isLoggedIn;



