import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';

//db
import db from './_db.js'


//types
import { typeDefs } from './schema.js'
import { graphql } from 'graphql';

const resolvers ={
    Query: {
        games()
        {
            return db.games
        },
        game(_, args){ //parents , args , context the three to enter into circual brackets
            return db.games.find((game) => game.id === args.id)
        },
        reviews()
        {
           return db.reviews
        },
        authors()
        {
            return db.authors
        },
        author(_, args){ //parents , args , context the three to enter into circual brackets
            return db.authors.find((author) => author.id === args.id)
        },
        review(_, args){ //parents , args , context the three to enter into circual brackets
            return db.reviews.find((review) => review.id === args.id)
        }
    },
    Game :{ //related data queries
        reviews(parent)
        {
            return db.reviews.filter((r) => r.game_id === parent.id) //r will represent each object
        }
    },
    Author:{
        reviews(parent)
        {
            return db.reviews.filter((r) => r.author_id === parent.id) //r will represent the review object
        }
    }, //end of author related data reviews
    Review:{
        author(parent)
        {
            return db.authors.find((a) => a.id === parent.author_id) //a will represent the author object
        },
        game(parent)
        {
            return db.games.find((g) => g.id === parent.game_id) //g will represent the game object
        }
    },
    Mutation:{
        deleteGame(_,args){
            db.games = db.games.filter((g) => g.id !== args.id)
            return db.games
        },
        addGame(_,args){
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 8000).toString()
            }
            db.games.push(game)

            return game
        }
    }

} //end of method


//server setup

const server = new ApolloServer({
    //typedefs -- defitions of types of data
    typeDefs, 
    
    resolvers


});

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log('Server ready at port:', 4000);

