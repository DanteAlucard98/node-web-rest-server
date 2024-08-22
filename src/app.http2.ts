import http from 'http';
import fs from 'fs';

const server = http.createServer((req,res)=> {
    // console.log(req.url);
    // res.writeHead(200,{'Content-Type':'text/html'});
    // res.write('<h1>Hola mundo</h1>')
    // res.end();

    if (req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(htmlFile);
        return; 
    }if(req.url?.endsWith('.js')){
        res.writeHead(200,{'Content-Type':'application/javascript'});

    }else if (req.url?.endsWith('.css')){
        res.writeHead(200,{'Content-Type':'text/css'})
    }
    try{
        const resposeContent = fs.readFileSync(`./public${req.url}`,'utf-8');
        res.end(resposeContent);
    }catch(error){
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end();
    }
    
});


server.listen(8080,()=>{
    console.log('Server running on port 8080');
}

)

