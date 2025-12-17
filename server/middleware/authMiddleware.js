// Middleware to allow only recruiters
export const authorizeRecruiter = (req, res, next) => {
  if (!req.user || req.user.role !== 'recruiter') {
    return res.status(403).json({ error: 'Recruiter access only' });
  }
  next();
};
import jwt from 'jsonwebtoken'
export const protect = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Debug: authHeader:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Debug: Missing or malformed token header');
      return res.status(401).json({ error: 'Missing or malformed token' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Debug: token:', token);
    try {
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        console.error('Debug: JWT_SECRET is not set in environment');
        return res.status(500).json({ error: 'Server configuration error' });
      }
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Debug: jwt.verify succeeded, decoded:', decoded);
      if (roles.length && !roles.includes(decoded.role)) {
        console.log('Debug: role check failed. Required:', roles, 'Got:', decoded.role);
        return res.status(403).json({ error: 'Access denied' });
      }
      req.user = decoded;
      // Debug log for job posting
      if (req.method === 'POST' && req.path === '/jobs') {
        console.log('Debug: POST /api/jobs - Decoded token:', decoded);
        console.log('Debug: User role:', decoded.role);
      }
      next();
    } catch (err) {
      console.error('Debug: jwt.verify error:', err && err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
