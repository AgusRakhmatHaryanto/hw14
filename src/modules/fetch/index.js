import { instance } from "../axios/index";

async function registerUser(name, email, password){
    try{
        const res = await instance.post("/auth/register", {
            name,
            email,
            password
        })
        return res.data
    }
    catch(err){
        throw new Error(err.res.data.message || 'Something went wrong')
    }
}


async function loginUser(email, password){
    try{
        const res = await instance.post("/auth/login", {
            email,
            password
        })
        return res.data
    }
    catch(err){
        throw new Error(err.res.data.message || 'Something went wrong')
    }
}

async function createBook(formData){
    try{
        const res = await instance.post("/books", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }
    catch(err){
        throw new Error(err.res.data.message || 'Something went wrong')
    }
}

async function getBooks(){
    try{
        const res = await instance.get("/books")
        return res.data
    }
    catch(err){
        throw new Error(err.res.data.message || 'Something went wrong')
    }
}

async function getBookById(id){
    try{
        const res = await instance.get(`/books/${id}`)
        return res.data
    }
    catch(err){
        throw new Error(err.res.data.message || 'Something went wrong')
    }
}

async function updateBook(id, title, author, publisher, year, pages){
    try{
        const res = await instance.put(`/books/${id}`, {
            title,
            author,
            publisher,
            year,
            pages
        })
        return res.data
    }
    catch(err){
        throw new Error(err.res.data.message || 'Something went wrong')
    }
}

async function deleteBook(id){
    try{
        const res = await instance.delete(`/books/${id}`)
        return res.data
    }
    catch(err){
        throw new Error(err.res.data.message || 'Something went wrong')
    }
}


export {
    registerUser,
    loginUser,
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
}