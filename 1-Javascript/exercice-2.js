// ### Exercise 2 — Optimization
//
// Refactor and optimize the following function:
//
// ```javascript
// function getTopUsers(transactions) {
//   let result = [];
//
//   for (let i = 0; i < transactions.length; i++) {
//     let total = 0;
//
//     for (let j = 0; j < transactions.length; j++) {
//       if (transactions[j].userId === transactions[i].userId) {
//         total += transactions[j].amount;
//       }
//     }
//
//     result.push({ userId: transactions[i].userId, total });
//   }
//
//   return result;
// }
// ```
//
// #### Requirements
//
// - Improve performance (time complexity)
// - Eliminate duplicated results

const userData = [
  { userId: "u1", amount: 100 },
  { userId: "u2", amount: -50 },
  { userId: "u1", amount: -30 },
  { userId: "u3", amount: 200 },
  { userId: "u2", amount: 70 },
];

function originalGetTopUsers(transactions) {
  let result = [];

  for (let i = 0; i < transactions.length; i++) {
    let total = 0;

    for (let j = 0; j < transactions.length; j++) {
      if (transactions[j].userId === transactions[i].userId) {
        total += transactions[j].amount;
      }
    }

    result.push({ userId: transactions[i].userId, total });
  }

  return result;
}

console.log("Original:", originalGetTopUsers(userData));

const getTopUsers = (transactions) => {
  const groupedUserData = Object.groupBy(transactions, ({ userId }) => userId);

  const totalAmountByUser = Object.keys(groupedUserData).reduce((acc, curr) => {
    let totalAmount = groupedUserData[curr].reduce(
      (lastVal, currentVal) => lastVal + currentVal.amount,
      0,
    );

    let totalUserData = {
      userId: curr,
      total: totalAmount,
    };

    acc.push(totalUserData);
    return acc;
  }, []);

  return totalAmountByUser;
};

console.log("Optimized:", getTopUsers(userData));
