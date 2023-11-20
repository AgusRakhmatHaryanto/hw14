import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient(); 

export default async function handler(req, res) {
    const {bookId} = req.query;
    try{
        switch(req.method){
            case "GET":{
                const book = await prisma.book.findUnique({
                    where: {
                        id: bookId
                    }
                });
                res.status(200).json(book);
                break;
            }
            case "PUT":{
                const {title, author, publisher, year, pages} = req.body;
                const updatedBook = await prisma.book.update({
                    where: {
                        id: bookId
                    },
                    data: {
                        title,
                        author,
                        publisher,
                        year,
                        pages
                    }
                });
                res.status(200).json(updatedBook);
                break;
            }
            case "DELETE":{
                const deletedBook = await prisma.book.delete({
                    where: {
                        id: bookId
                    }
                });
                res.status(200).json(deletedBook);
                break;
            }
            default:{
                res.status(405).json({message: "Method not allowed"});
            }
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}