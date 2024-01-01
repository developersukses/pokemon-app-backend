import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const createPokemon = async (req, res) => {
    const { pokemon_id, nickname } = req.body;

    try {

        //after probalitiy 50% 
        const pokemon = await prisma.pokemon.create({
            data: {
                pokemon_id: pokemon_id,
                nickname: nickname,
            }
        });

        res.status(201).json(pokemon)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const getPokemon = async (req, res) => {
    try {

        const pokemonCount = await prisma.pokemon.count()

        if (req.query.limit) return getPokemonPage(req, res, pokemonCount)

        const response = await prisma.pokemon.findMany({
            take: 20,
            orderBy: {
                id: 'asc'
            }
        })

        const result = {
            count: pokemonCount,
            results: response
        }

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const releasePokemon = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let prima = false;
        const randomInteger = Math.floor((Math.random() * 20) + 1);
        let pembagi = 0
        for(let i = 1; i <= randomInteger; i++){
            if(randomInteger%i == 0){
                pembagi++
            }
        }

        if(pembagi == 2){
            prima = true 
        }

        const release = prima && (await prisma.pokemon.delete({
                where: {
                    id: id 
                }
            })
        )

        const result = !release ? { release: prima, msg: "Oops, you failed release this pokemon, please try again." } : { release: prima, ...release }

        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const getPokemonByName = async (req,res) => {
    try {
        const response  = await prisma.pokemon.findUnique({
            where: {
                nickname : req.params.nickname
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
}

export const updateNickname = async (req, res) => {

    try {

        const id = parseInt(req.params.id)

        const data = await prisma.pokemon.findUnique({
            where: {
                id: id
            }
        })

        const nickname = data?.nickname
        const fib = data?.fib == null ? 1 : (data.fib + 1)
        let fibAngka = 0

        switch (fib) {
            case 1:
                fibAngka = 0
                break;
            case 2:
                fibAngka = 1
                break;
            case 3:
                fibAngka = 1
                break;
            default:
                fibAngka = fib - 2
                break;
        }

        if (fib > 3) {
            fibAngka = fibonacci(fibAngka)
        }

        const response = await prisma.pokemon.update({
            where: {
                id: id
            },
            data: {
                fib: fib,
                fib_nickname: nickname + '-' +  fibAngka
            }
        })

        res.status(200).json(response)

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

const getPokemonPage = async (req, res, count) => {

    try {

        const offset = parseInt(req.query.offset)
        const limit = parseInt(req.query.limit)

        const response = await prisma.pokemon.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                id: 'asc'
            }
        })

        const result = { count: count, results: response }

        res.status(200).json(result)

    } catch (error) {
        res.status(404).json({ msg: error.message })
    }

}

const fibonacci = (num) => {
    if (num <= 1) return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}

