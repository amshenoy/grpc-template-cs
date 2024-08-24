const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf
const PROTO_PATH = path.join(__dirname, '..', 'protos', 'greet.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greet;

// Create a client instance
const PORT = 5243;
const endpoint = `localhost:${PORT}`;
const client = new greeterProto.Greeter(endpoint, grpc.credentials.createInsecure());

// Make a request to the SayHello endpoint
client.SayHello({ name: 'World' }, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Greeting:', response.message);
  }
});
