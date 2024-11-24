    export default async function handler(req, res) {
        const { method } = req;
    
        switch (method) {
        case "GET":
            // Logika untuk GET
            res.status(200).json({ message: "GET request success" });
            break;
    
        case "POST":
            // Logika untuk POST
            res.status(201).json({ message: "POST request success" });
            break;
    
        case "PUT":
            // Logika untuk PUT
            res.status(200).json({ message: "PUT request success" });
            break;
    
        case "DELETE":
            // Logika untuk DELETE
            res.status(200).json({ message: "DELETE request success" });
            break;
    
        default:
            // Jika metode tidak didukung, return 405
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    }
    