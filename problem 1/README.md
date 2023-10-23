# Problem 1

1. **Formula Implementation**:
   The formula for summing the first \( n \) positive integers is derived from an arithmetic progression. The formula is given by:
   $$
   \text{sum} = \frac{n(n + 1)}{2}
   $$
   - The function `sum_to_n_a` takes a single argument \( n \).
   - Inside the function, the formula is used to calculate the sum, which is then returned.
   - This implementation has a time complexity of \( O(1) \) as it computes the result directly using a formula. The space complexity is also \( O(1) \) as there are no additional data structures used that grow with input size.

    ```javascript
    // Formula Implementation
    var sum_to_n_a = function(n) {
        return (n * (n + 1)) / 2;
    };
    ```  

2. **Iterative Implementation**:
   This implementation follows a straightforward iterative approach to compute the sum of integers from \( 1 \) to \( n \).
   - The function `sum_to_n_b` takes a single argument \( n \).
   - Inside the function, a `sum` variable is initialized to \( 0 \).
   - A `for` loop is then used to iterate through the values from \( 1 \) to \( n \), incrementing the `sum` variable by \( i \) on each iteration.
   - Finally, `sum` is returned from `sum_to_n_b`.
   - The time complexity for this implementation is \( O(n) \) due to the loop iterating \( n \) times.
   - The space complexity is \( O(1) \) as there are no additional data structures used that grow with the input size, and all the variables used occupy constant space regardless of the value of \( n \).

    ```javascript
    // Iterative Implementation using a self-invoking function with closure
    var sum_to_n_b = function(n) {
        var sum = 0;
        for (var i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    };

    ```  

3. **Recursive Implementation**:
   This implementation follows the classic recursive approach to solve the problem.
   - The function `sum_to_n_c` takes a single argument \( n \).
   - Inside the function, a base case is checked: if \( n \) is \( 1 \), the function returns \( 1 \). Otherwise, it returns \( n \) plus a recursive call to `sum_to_n_c` with \( n - 1 \).
   - This recursive process continues until \( n \) is \( 1 \), at which point all the recursive calls resolve and the sum is computed.
   - This implementation has a time complexity of \( O(n) \) due to the recursive calls. However, this approach can lead to a stack overflow error for large values of \( n \) due to the recursion depth. The space complexity is \( O(n) \) due to the recursive call stack.

    ```javascript
    // Recursive Implementation
    var sum_to_n_c = function(n) {
        return n === 1 ? 1 : n + sum_to_n_c(n - 1);
    };
    ```
