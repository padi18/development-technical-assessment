// Exercise 1
// Using the users, orders, and orderItems collections, compute the following:
//
// For each user, return:
//
// User name
// Total number of orders
// Total amount spent
// Include only users with total spending greater than 500 (consider only completed orders)
// Sort results by total spending (descending)

// The current database to use.
use("dev-interview");

db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "userOrders",
    },
  },
  { $unwind: "$userOrders" },
  { $match: { "userOrders.status": "completed" } },
  {
    $lookup: {
      from: "orderItems",
      localField: "userOrders._id",
      foreignField: "orderId",
      as: "items",
    },
  },
  { $unwind: "$items" },
  {
    $group: {
      _id: "$_id",
      name: {
        $first: "$name",
      },
      totalOrders: {
        $sum: 1,
      },
      totalSpent: {
        $sum: "$items.price",
      },
    },
  },
  { $match: { totalSpent: { $gt: 500 } } },
  { $sort: { totalSpent: -1 } },
  { $project: { _id: 0, name: 1, totalOrders: 1, totalSpent: 1 } },
]);
