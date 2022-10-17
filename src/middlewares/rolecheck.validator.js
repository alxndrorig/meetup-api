class CheckingRole {
  isAdmin(req, res, next) {
    req.auth.role === 'admin' || req.auth.role === 'user'
      ? next()
      : res.status(403).json({ message: 'Forbidden' });
  }
  isUser(req, res, next) {
    req.auth.role === 'user'
      ? next()
      : res.status(403).json({ message: 'Forbidden' });
  }
}

export default CheckingRole;
