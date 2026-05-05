import { getUsersBalance } from "../services/users.services.js";

/**
 * Get the balance per user
 * @param {*} req
 * @param {*} res Response
 */
const UserTransactions = async function (req, res) {
  const minBalance = req.query.minBalance;
  if (minBalance !== undefined && isNaN(Number(minBalance))) {
    throw new Error("Min Balance is not a number");
  }

  console.log("Hemos llegado");

  const result = await getUsersBalance(minBalance);

  console.log("Resultado: ", result.slice(5));

  return res.status(200).json(result);
};

export { UserTransactions };
