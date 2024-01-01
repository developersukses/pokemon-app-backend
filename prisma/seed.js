import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


const createPokemon = async({pokemon_id,nickname, fib, fib_nickname}) => {
    await prisma.pokemon.create({
        data: {
            pokemon_id: pokemon_id,
            nickname: nickname,
            fib: fib,
            fib_nickname: fib_nickname 
        }
    })
}

const main = async() => {
    await createPokemon({pokemon_id: 1, nickname: "saur"})
    await createPokemon({pokemon_id: 2, nickname: "ivy"})
    await createPokemon({pokemon_id: 4, nickname: "ander", fib: 1, fib_nickname: 'ander-0'})
    await createPokemon({pokemon_id: 8, nickname: "warto", fib: 1, fib_nickname: 'warto-0'})
    await createPokemon({pokemon_id: 9, nickname: "blasto", fib: 2, fib_nickname: 'blasto-1'})
    await createPokemon({pokemon_id: 12, nickname: "kupu-kupu"})
    await createPokemon({pokemon_id: 10, nickname: "hileud"})
    await createPokemon({pokemon_id: 16, nickname: "japati"})
    await createPokemon({pokemon_id: 20, nickname: "tikus"})

    const allPokemon = await prisma.pokemon.findMany()
    console.log(allPokemon)
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})

