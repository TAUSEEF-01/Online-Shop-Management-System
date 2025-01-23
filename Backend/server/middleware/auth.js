function checkAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    next();
}

function checkAdmin(req, res, next) {
    if (!req.session.user || !req.session.user.is_admin) {
        return res.status(403).json({ message: "Not authorized" });
    }
    next();
}


module.exports = { checkAuth, checkAdmin };
