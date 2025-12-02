function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role && role.includes(req.user.role)) {
      next();
    } else {
      if (res.locals.html) {
        // HTML response
        res.redirect("/inbox");
      } else {
        // JSON response
        res.status(401).json({
          errors: {
            common: {
              msg: "You are not authorized to access this page!",
            },
          },
        });
      }
    }
  };
}

module.exports = {
  requireRole,
};
