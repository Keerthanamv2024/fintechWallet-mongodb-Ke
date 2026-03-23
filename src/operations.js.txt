// ================= FUNCTIONS =================

// 🔹 ADD MONEY
function addMoney(userId, amount) {
  if (amount <= 0) {
    print("❌ Invalid amount")
    return
  }

  const result = db.wallets.updateOne(
    { userId: ObjectId(userId) },
    { $inc: { balance: amount } }
  )

  if (result.matchedCount === 0) {
    print("❌ Wallet not found")
    return
  }

  print("✅ Money added")
}


// 🔹 CHECK BALANCE
function checkBalance(userId) {
  const wallet = db.wallets.findOne({
    userId: ObjectId(userId)
  })

  if (!wallet) {
    print("❌ Wallet not found")
    return
  }

  print("💰 Balance:", wallet.balance)
}


// 🔹 SEND MONEY
function sendMoney(fromUser, toUser, amount) {

  if (amount <= 0) {
    print("❌ Invalid amount")
    return
  }

  const sender = db.wallets.findOne({
    userId: ObjectId(fromUser)
  })

  const receiver = db.wallets.findOne({
    userId: ObjectId(toUser)
  })

  if (!sender || !receiver) {
    print("❌ User not found")
    return
  }

  if (sender.balance < amount) {
    print("❌ Insufficient balance")
    return
  }

  // Deduct from sender
  db.wallets.updateOne(
    { userId: ObjectId(fromUser) },
    { $inc: { balance: -amount } }
  )

  // Add to receiver
  db.wallets.updateOne(
    { userId: ObjectId(toUser) },
    { $inc: { balance: amount } }
  )

  // Record transaction
  db.transactions.insertOne({
    fromUser: ObjectId(fromUser),
    toUser: ObjectId(toUser),
    amount: amount,
    date: new Date()
  })

  print("✅ Transaction successful")
}


// 🔹 VIEW TRANSACTIONS
function viewTransactions(userId) {
  print("📊 Transaction History:")

  db.transactions.find({
    $or: [
      { fromUser: ObjectId(userId) },
      { toUser: ObjectId(userId) }
    ]
  }).forEach(printjson)
}


// 🔹 DELETE USER
function deleteUser(email) {
  db.users.deleteOne({ email: email })
  print("🗑️ User deleted")
}

checkBalance("69c16c06c00b3b8189267418")
addMoney("69c16c06c00b3b818926741a", 500)
sendMoney("69c16c06c00b3b8189267419", "69c16c06c00b3b8189267418", 50)
viewTransactions("69c16c06c00b3b8189267418")
