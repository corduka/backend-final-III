
const authorization = (role) => {
    return async (req, res, next) => {
        // 1. Check if user is authenticated (assuming a prior auth middleware ran)
        if (!req.user) {
            return res.status(401).send({ error: "Unauthorized: No user found in request." });
        }
        
        // 2. Check if the user has the required role
        if (req.user.role !== role) {
            // 403 Forbidden is the correct status for lack of permission
            return res.status(403).send({ error: "Forbidden: You do not have the required role to access this resource." });
        }
        
        next();
    }
}

export { authorization };