import { prisma } from '../../lib/prisma';
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      const token = JWT.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .json({
          message: "Login successful",
          token: token,
          user: {
            id: user.id,
            name: user.name,
          },
        })
        .setHeader("Set Cookie", "token=" + token + "; HttpOnly; Path=/"); //set header
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  } else {
    res.status(405).json({
      message: "Method not allowed",
    });
  }
}
