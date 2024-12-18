import express from 'express'
import cors from 'cors';

const app = express()

app.use(express.json());
app.use(cors());

app.listen(9000,()=>{
    console.log(`app listening on http://localhost:9000`);  
})