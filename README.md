# Tax Calculator

This repository contains the implementation of a `calculateTax` function in JavaScript that calculates the annual tax an individual needs to pay based on their income, age, and number of dependents. The function follows specific rules and uses recursion for the calculation.

## Function Description

The `calculateTax` function takes three parameters:
1. `income` (number): The annual income of an individual in USD.
2. `age` (number): The age of the individual.
3. `dependents` (number): The number of dependents the individual has.

### Calculation Rules
1. **Validation**:
   - If `income` is less than 0 or not a number, return "Invalid income".
   - If `age` is less than 0 or not a number, return "Invalid age".
   - If `dependents` is less than 0 or not a number, return "Invalid dependents".

2. **Age-Based Rules**:
   - If the age is less than 18, return "Not eligible for tax".
   - If the age is 65 or older, the individual gets a 20% tax discount.

3. **Income-Based Rules**:
   - If the income is less than or equal to $10,000, the tax is 10% of the income.
   - If the income is between $10,001 and $50,000, the tax is 20% of the income.
   - If the income is more than $50,000, the tax is 30% of the income.

4. **Dependents Deduction**:
   - For each dependent, the individual gets a $500 tax deduction.

5. **Minimum Tax**:
   - The minimum tax is $0 (no negative tax).

### Implementation

The function uses a recursive helper function `calculateTaxRecursive` to handle the tax calculation:

```javascript
function calculateTax(income, age, dependents) {
    // Validate inputs
    if (typeof income !== 'number' || income < 0) {
        return "Invalid income";
    }
    if (typeof age !== 'number' || age < 0) {
        return "Invalid age";
    }
    if (typeof dependents !== 'number' || dependents < 0) {
        return "Invalid dependents";
    }

    // Recursive tax calculation function
    function calculateTaxRecursive(income, age, dependents, discount = false) {
        // Base cases
        if (age < 18) {
            return "Not eligible for tax";
        }
        
        let tax;
        if (income <= 10000) {
            tax = income * 0.10;
        } else if (income <= 50000) {
            tax = income * 0.20;
        } else {
            tax = income * 0.30;
        }

        // Deduct for dependents
        tax -= dependents * 500;

        // Ensure tax is not negative
        tax = Math.max(0, tax);

        // Apply 20% discount if age is 65 or older
        if (age >= 65 && !discount) {
            tax *= 0.80; // Apply 20% discount
        }

        return tax;
    }

    return calculateTaxRecursive(income, age, dependents);
}

// Test the function
console.log(calculateTax(50000, 30, 2)); // Expected output: 9000
console.log(calculateTax(60000, 70, 1)); // Expected output: 14400
console.log(calculateTax(9000, 25, 0));  // Expected output: 900
console.log(calculateTax(15000, 16, 0)); // Expected output: Not eligible for tax
console.log(calculateTax(-5000, 30, 2)); // Expected output: Invalid income
console.log(calculateTax(50000, -5, 2)); // Expected output: Invalid age
console.log(calculateTax(50000, 30, -2)); // Expected output: Invalid dependents
