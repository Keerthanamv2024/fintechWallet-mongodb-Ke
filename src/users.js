use fintechDB

// Drop and recreate with validation
db.users.drop()

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
        },
        password: {
          bsonType: "string",
          minLength: 5
        }
      }
    }
  }
})

// Insert users
db.users.insertMany([
  {
    _id: ObjectId('69c16c06c00b3b8189267418'),
    name: 'Keerthana',
    email: 'keerthana@gmail.com',
    password: '12345'
  },
  {
    _id: ObjectId('69c16c06c00b3b8189267419'),
    name: 'Ezhil',
    email: 'ezhil@gmail.com',
    password: '54321'
  },
  {
    _id: ObjectId('69c16c06c00b3b818926741a'),
    name: 'Ram',
    email: 'ram@gmail.com',
    password: '12345'
  }
])