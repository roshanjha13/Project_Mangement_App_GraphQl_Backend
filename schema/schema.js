const { projects, clients } = require("../sampleData");

const Project = require("../models/Project");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return clients.find((client) => client.id === parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    //single data for get
    project: {
      type: ProjectType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    //get all data
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    //single data for get
    client: {
      type: ClientType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
