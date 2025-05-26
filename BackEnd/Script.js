const express=require('express');
const app = express();
    
const server = app.listen(5000, '192.168.0.109', () => {
    console.log('Server is running on http://192.168.0.109:5000');
});

app.get('/test', (req,res)=> {
    res.send("testt good")
})