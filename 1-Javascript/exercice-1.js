// ### Exercise 1
//
// Given the following array of transactions:
//
// ```javascript
// [
//   { userId: "u1", amount: 100 },
//   { userId: "u2", amount: -50 },
//   { userId: "u1", amount: -30 },
//   { userId: "u3", amount: 200 },
//   { userId: "u2", amount: 70 }
// ]
// ```
//
// #### Requirements
//
// Implement a function that:
//
// - Calculates the total balance per user
// - Returns users sorted by balance (descending)
// - Identifies whether each user has a negative balance
//
// #### Expected Output Format
//
// ```javascript
// { userId: "u1", balance: 70, isNegative: false }
// ```
//
// #### Considerations
//
// - The input may contain a large number of records
// - Optimize for time and space complexity

const userData = [
  { userId: "u1", amount: 100 },
  { userId: "u2", amount: -50 },
  { userId: "u1", amount: -30 },
  { userId: "u3", amount: 200 },
  { userId: "u2", amount: 70 },
];

// With Group by, and then sum the amount with de reduce
const groupedUserData = Object.groupBy(userData, ({ userId }) => userId);

const totalAmountByUser = Object.keys(groupedUserData).reduce((acc, curr) => {
  // Sum total amount
  let totalAmount = groupedUserData[curr].reduce(
    (lastVal, currentVal) => lastVal + currentVal.amount,
    0,
  );

  // Build output
  let totalUserData = {
    userId: curr,
    balance: totalAmount,
    isNegative: totalAmount < 0,
  };

  acc.push(totalUserData);
  return acc;
}, []);

console.log(totalAmountByUser);
