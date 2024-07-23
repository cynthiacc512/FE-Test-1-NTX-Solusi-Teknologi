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
