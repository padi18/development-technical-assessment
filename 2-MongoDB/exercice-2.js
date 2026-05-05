// Exercise 2
// Using the transactions, users, orders, and orderItems collections,
// identify completed transactions that do not match the corresponding order amount.
//
// For each transaction, return:
//
// User name
// User email
// Transaction ID
// Transaction amount
// Order ID
// Order amount

// The current database to use.
use("dev-interview");

db.transactions.aggregate([
  { $match: { status: "completed" } },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userData",
    },
  },
  { $unwind: "$userData" },
  {
    $lookup: {
      from: "orderItems",
      localField: "orderId",
      foreignField: "orderId",
      as: "items",
    },
  },
  { $unwind: "$items" },
  {
    $group: {
      _id: "$_id",
      name: {
        $first: "$userData.name",
      },
      email: {
        $first: "$userData.email",
      },
      amount: {
        $first: "$amount",
      },
      orderId: {
        $first: "$orderId",
      },
      orderAmount: {
        $sum: "$items.price",
      },
    },
  },
  {
    $match: {
      $expr: { $ne: ["$amount", "$orderAmount"] },
    },
  },
  { $sort: { orderAmount: -1 } },
  {
    $project: {
      _id: 0,
      "User name": "$name",
      "User email": "$email",
      "Transaction ID": "$_id",
      "Transaction amount": "$amount",
      "Order ID": "$orderId",
      "Order amount": "$orderAmount",
    },
  },
]);
