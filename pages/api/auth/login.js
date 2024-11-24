    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcrypt';
    import prisma from '../../../lib/prisma';

    export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Cari pengguna berdasarkan email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
        return res.status(404).json({ error: 'Invalid email or password' });
        }

        // Periksa password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Buat token JWT
        const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        // Menangkap error dan mencetak ke konsol untuk debugging
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
    }
        