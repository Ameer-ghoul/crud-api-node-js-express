import express from "express";
import { v4 as uuidv4 } from 'uuid';
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

let posts = [];

app.get('/', (req, res) => {
    res.send('hello node')
})

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => { 
    posts.push({...req.body, id: uuidv4()});
    res.send(posts);
})

app.get('/posts/:id', (req, res) => { 
    let id = req.params.id;
    let post = posts.find(post => post.id == id)
    res.send(post);
})

app.delete('/posts/:id', (req, res) => { 
    let {id} = req.params;
    posts = posts.filter(post => post.id != id);
    res.send(posts);
})

app.patch('/posts/:id', (req, res) => { 
    let {title, desc} = req.body;
    let id = req.params.id;
    let post = posts.find(post => post.id == id)
    if (title) { 
        post.title = title;
    }
    if (desc) { 
        post.desc = desc;
        res.send(post);
    } 


})

app.listen('3000 ', () => {
    console.log('server running')
})