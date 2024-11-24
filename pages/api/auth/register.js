import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    const { method } = req;

    try {
        if (method === 'DELETE') {
            // Hapus Todo berdasarkan ID
            const { id } = req.query;

            // Validasi ID
            if (!id || isNaN(parseInt(id))) {
                return res.status(400).json({ error: 'Parameter ID harus berupa angka dan tidak boleh kosong' });
            }

            // Hapus dari database
            const deletedTodo = await prisma.todo.delete({
                where: { id: parseInt(id) },
            });

            return res.status(200).json({ message: 'Todo berhasil dihapus', deletedTodo });
        } else if (method === 'GET') {
            // Ambil semua Todo
            const todos = await prisma.todo.findMany();
            return res.status(200).json(todos);
        } else if (method === 'POST') {
            // Tambahkan Todo baru
            const { title, completed, userId } = req.body;

            // Validasi input
            if (!title || typeof completed !== 'boolean' || !userId || isNaN(parseInt(userId))) {
                return res.status(400).json({ error: 'Data tidak valid: pastikan title, completed, dan userId valid' });
            }

            const newTodo = await prisma.todo.create({
                data: {
                    title,
                    completed,
                    userId: parseInt(userId),
                },
            });

            return res.status(201).json(newTodo);
        } else if (method === 'PUT') {
            // Update Todo berdasarkan ID
            const { id } = req.query;
            const { title, completed, userId } = req.body;

            // Validasi ID dan body
            if (!id || isNaN(parseInt(id))) {
                return res.status(400).json({ error: 'Parameter ID harus berupa angka dan tidak boleh kosong' });
            }

            if ((!title && completed === undefined && !userId) || (userId && isNaN(parseInt(userId)))) {
                return res.status(400).json({ error: 'Data tidak valid: pastikan ada field yang diupdate' });
            }

            const updatedTodo = await prisma.todo.update({
                where: { id: parseInt(id) },
                data: {
                    ...(title && { title }),
                    ...(completed !== undefined && { completed }),
                    ...(userId && { userId: parseInt(userId) }),
                },
            });

            return res.status(200).json(updatedTodo);
        } else {
            // Method not allowed
            return res.status(405).json({ error: `Method ${method} tidak diizinkan` });
        }
    } catch (error) {
        console.error('Error handling request:', error);

        // Tangani error Prisma secara spesifik
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Data tidak ditemukan' });
        }

        return res.status(500).json({ error: 'Terjadi kesalahan pada server', detail: error.message });
    }
}
