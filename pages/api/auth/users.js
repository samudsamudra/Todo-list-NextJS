import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query; // Ambil ID dari query parameter

  // Cek method
  if (req.method === 'GET') {
    try {
      if (!id) {
        // Jika tidak ada ID, ambil semua user
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
      } else {
        // Jika ada ID, ambil user berdasarkan ID
        const user = await prisma.user.findUnique({
          where: { id: parseInt(id) },
        });

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
      }
    } catch (error) {
      console.error('Error fetching user(s):', error);
      return res.status(500).json({ error: 'Failed to fetch user(s)' });
    }
  } else if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          password,
        },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { email, password } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      if (!email && !password) {
        return res.status(400).json({ error: 'Email or password must be provided' });
      }

      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          email: email ? email : undefined,
          password: password ? password : undefined,
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    // Jika metode tidak diizinkan
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
