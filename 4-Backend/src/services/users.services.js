import { getCollection } from "../utils/mongo.utils.js";

/**
 * Get the balance per user
 * @param {*} req
 * @param {*} res Response
 */
const getUsersBalance = async function (minBalance) {
  const transactions = getCollection("transactions");
  const users = getCollection("users");

  return await users
    .aggregate([
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "userId",
          as: "userTransactions",
        },
      },
      { $unwind: "$userTransactions" },
      {
        $match: {
          "userTransactions.status": "completed",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          balance: { $sum: "$userTransactions.amount" },
        },
      },
      ...(minBalance !== undefined
        ? [{ $match: { balance: { $gt: Number(minBalance) } } }]
        : []),
      { $sort: { balance: -1 } },
    ])
    .toArray();
};

export { getUsersBalance };
