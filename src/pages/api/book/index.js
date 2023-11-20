import { prisma } from "../../../lib/prisma";
import JWT from "jsonwebtoken";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname.toLowerCase().replace(/\s/g, "")
    );
  },
});

const filterUpoad = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filterUpoad,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        upload.single("image")(req, res, async function (err) {
          if (err) {
            res.status(400).json({ message: err.message });
            return;
          }
          try {
            const { title, author, publisher, year, pages } = req.body;
            const token = req.cookies.token;
            if (!token) {
              return res.status(400).json({ message: "Invalid credentials" });
            }
            const user = JWT.verify(token, process.env.JWT_SECRET);
            if (!user) {
              return res.status(400).json({ message: "Invalid credentials" });
            }
            const book = await prisma.book.create({
              data: {
                title,
                author,
                publisher,
                year: parseInt(year),
                pages: parseInt(pages),
                image: req.file.path.split("public")[1],
              },
            });
            res.json({ book });
          } catch (err) {
            console.log("err", err);
            return res.status(400).json({ message: "Book already exists" });
          }
        });
      case "GET":
        try {
          const books = await prisma.book.findMany({
            orderBy: {
              title: "asc",
            },
          });
          return res.json({ books });
        } catch (err) {
          console.log(err);
          return res.status(400).json({ message: "Something went wrong" });
        }
      default:
        res.status(400).json({ message: "Invalid request method" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
