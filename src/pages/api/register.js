import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      res.status(200).json({
        message: "User created successfully",
        user: user,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  }

