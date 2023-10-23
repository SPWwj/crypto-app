# Problem 1

1. **Formula Implementation**:
   The formula for summing the first \( n \) positive integers is derived from an arithmetic progression with a common difference of \( 1 \). The formula is given by:
   $$
   \text{sum} = \frac{n(n + 1)}{2}
   $$
   - The function `sum_to_n_a` takes a single argument \( n \).
   - Inside the function, the formula is used to calculate the sum, which is then returned.
   - This implementation has a time complexity of \( O(1) \) as it computes the result directly using a formula, without any loops or recursion.


2. **Iterative Implementation using a self-invoking function with closure**:
   In this implementation, the idea is to simulate an iterative process using recursion, but without any loop constructs.
   - The function `sum_to_n_b` takes a single argument `n`.
   - Inside the function, a variable `sum` is initialized to `0`.
   - A self-invoking function `add` is defined with a parameter `i`. This function adds the value of `i` to `sum`, and if `i` is less than `n`, it calls itself with `i + 1`. This recursive call simulates the iteration.
   - The self-invoking function `add` is initially invoked with `i` set to `1`.
   - Finally, the `sum` is returned from `sum_to_n_b`.

```
// Iterative Implementation using a self-invoking function with closure
var sum_to_n_b = function(n) {
    var sum = 0;
    (function add(i) {
        sum += i;
        if (i < n) add(i + 1);
    })(1);
    return sum;
};

```

3. **Recursive Implementation**:
   This implementation follows the classic recursive approach to solve the problem.
   - The function `sum_to_n_c` takes a single argument `n`.
   - Inside the function, a base case is checked: if `n` is `1`, the function returns `1`. Otherwise, it returns `n` plus a recursive call to `sum_to_n_c` with `n - 1`.
   - This recursive process continues until `n` is `1`, at which point all the recursive calls resolve and the sum is computed.
   - This implementation has a time complexity of `O(n)` due to the recursive calls. However, this approach can lead to a stack overflow error for large values of `n` due to the recursion depth.

```
// Recursive Implementation
var sum_to_n_c = function(n) {
    return n === 1 ? 1 : n + sum_to_n_c(n - 1);
};
```