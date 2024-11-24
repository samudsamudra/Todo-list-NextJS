        import jwt from 'jsonwebtoken';

        // Fungsi middleware
        export const authMiddleware = (handler) => {
        return async (req, res) => {
            // Ambil token dari header authorization
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
            }

            try {
            // Verifikasi token JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Tambahkan informasi pengguna ke request
            return handler(req, res); // Lanjutkan ke handler berikutnya
            } catch (err) {
                console.error('Error verifying token:', err); // Log error ke terminal
                return res.status(403).json({ error: 'Forbidden: Invalid token' });
            }
            
        };
        };
        