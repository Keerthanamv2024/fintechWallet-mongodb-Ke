// Create wallets for all users
db.wallets.insertMany([
  {
    userId: ObjectId('69c16c06c00b3b8189267418'), // Keerthana
    balance: 500
  },
  {
    userId: ObjectId('69c16c06c00b3b8189267419'), // Ezhil
    balance: 200
  },
  {
    userId: ObjectId('69c16c06c00b3b818926741a'), // Ram
    balance: 0
  }
])