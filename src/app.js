import { fetchData } from './fetchdata';
import {GraphQLServer} from 'graphql-yoga';
import { stripIgnoredCharacters } from 'graphql';

const url = 'https://rickandmortyapi.com/api/character/';

const runApp = data => {

  const typeDefs = `
  type Query{
   character(id: Int!): Character! 
   characters(page: Int!, pageSize: Int!, name: String, Status: String, planet: String): [Character!]!
   planets:[String!]!
  }
  type Character{
    id: Int!
    name: String!
    status: String!
    planet: String!
  }
  
  `
  
  const resolvers = {
    Query:{
      character: (parent, args, ctx, info)=>{
        const obj = data.find(c => c.id === args.id)
        return{
          id: obj.id,
          name: obj.name,
          status: obj.status,
          planet: obj.location.name

        }

        
      },

      characters: (parent, args, ctx, info)=>{
        const page = args.page || 1;
        const pageSize = args.pageSize || 20;

        const inicio = (page - 1) * pageSize;
        const fin = inicio + pageSize;

        const filteredData = data.filter(elem => elem.name.includes(args.name || elem.name))
              .filter(elem => elem.status.includes(args.status || elem.status))
              .filter(elem => elem.location.name.includes(args.planet || elem.location.name))
              .slice(inicio, fin)
              .map(obj => {
                  return {
                      id: obj.id,
                      name: obj.name,
                      status: obj.status,
                      planet: obj.location.name
           }
         })

        return filteredData;
      },
      planets:(parent,args,ctx,info)=>{
        let planet = [];
        data.forEach(element => {
          planet.push(element.location.name);
        });
        planet = [...new Set(planet)];
        return planet;
      }
    
    },
  }
  

 const server = new GraphQLServer({typeDefs,resolvers});
 server.start({port:"3004"});

};

fetchData(runApp, url);
