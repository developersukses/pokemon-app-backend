import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import PokemonRoute from './routes/PokemonRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(PokemonRoute);


app.listen(process.env.APP_PORT, () => {
    console.log('testing aja')
})