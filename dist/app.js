"use strict";

var _fetchdata = require("./fetchdata");

var _graphqlYoga = require("graphql-yoga");

var _graphql = require("graphql");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var url = 'https://rickandmortyapi.com/api/character/';

var runApp = function runApp(data) {
  var typeDefs = "\n  type Query{\n   character(id: Int!): Character! \n   characters(page: Int!, pageSize: Int!, name: String, Status: String, planet: String): [Character!]!\n   planets:[String!]!\n  }\n  type Character{\n    id: Int!\n    name: String!\n    status: String!\n    planet: String!\n  }\n  \n  ";
  var resolvers = {
    Query: {
      character: function character(parent, args, ctx, info) {
        var obj = data.find(function (c) {
          return c.id === args.id;
        });
        return {
          id: obj.id,
          name: obj.name,
          status: obj.status,
          planet: obj.location.name
        };
      },
      characters: function characters(parent, args, ctx, info) {
        var page = args.page || 1;
        var pageSize = args.pageSize || 20;
        var inicio = (page - 1) * pageSize;
        var fin = inicio + pageSize;
        var filteredData = data.filter(function (elem) {
          return elem.name.includes(args.name || elem.name);
        }).filter(function (elem) {
          return elem.status.includes(args.status || elem.status);
        }).filter(function (elem) {
          return elem.location.name.includes(args.planet || elem.location.name);
        }).slice(inicio, fin).map(function (obj) {
          return {
            id: obj.id,
            name: obj.name,
            status: obj.status,
            planet: obj.location.name
          };
        });
        return filteredData;
      },
      planets: function planets(parent, args, ctx, info) {
        var planet = [];
        data.forEach(function (element) {
          planet.push(element.location.name);
        });
        planet = _toConsumableArray(new Set(planet));
        return planet;
      }
    }
  };
  var server = new _graphqlYoga.GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
  });
  server.start({
    port: "3004"
  });
};

(0, _fetchdata.fetchData)(runApp, url);