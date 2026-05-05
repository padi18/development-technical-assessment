// Exercise 3
// Using the transactions and orders collections, identify orders where a
// transaction initially failed and was later retried.
//
// For each order, return:
//
// Order ID
// Total number of transactions
// Date of the most recent transaction
// Status of the most recent transaction
// ID of the most recent transaction
// Order status

// The current database to use.
use("dev-interview");

db.orders.aggregate([
  {
    $lookup: {
      from: "transactions",
      localField: "_id",
      foreignField: "orderId",
      as: "orderTransactions",
    },
  },
  {
    $match: {
      "orderTransactions.status": "failed",
      $expr: { $gt: [{ $size: "$orderTransactions" }, 1] },
    },
  },
  {
    $addFields: {
      sortedTransactions: {
        $sortArray: { input: "$orderTransactions", sortBy: { createdAt: -1 } },
      },
    },
  },
  {
    $addFields: {
      latestTransaction: { $arrayElemAt: ["$sortedTransactions", 0] },
    },
  },
  {
    $project: {
      _id: 0,
      "Order ID": "$_id",
      "Total number of transactions": { $size: "$orderTransactions" },
      "Date of the most recent transaction": "$latestTransaction.createdAt",
      "Status of the most recent transaction": "$latestTransaction.status",
      "ID of the most recent transaction": "$latestTransaction._id",
      "Order status": "$status",
    },
  },
]);

/* Son todos completed
{
    $match: {"latestTransaction.status": { $ne: "completed"} }
  },
*/
