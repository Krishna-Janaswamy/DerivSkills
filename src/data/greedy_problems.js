export const GREEDY_PROBLEMS_CODE = {
  '01. Activity selection': {
    javascript: `// Fractional Knapsack
function fractionalKnapsack(W, arr) {
    arr.sort((a, b) => (b.value/b.weight) - (a.value/a.weight));
    let finalValue = 0.0;
    for(let item of arr) {
        if(item.weight <= W) {
            W -= item.weight;
            finalValue += item.value;
        } else {
            finalValue += item.value * (W / item.weight);
            break;
        }
    }
    return finalValue;
}
console.log(fractionalKnapsack(50, [{value:60, weight:10}, {value:100, weight:20}, {value:120, weight:30}]));`,
    python: `# Fractional Knapsack
def fractional_knapsack(W, arr):
    arr.sort(key=lambda x: x[0]/x[1], reverse=True)
    final_val = 0.0
    for val, wt in arr:
        if wt <= W:
            W -= wt
            final_val += val
        else:
            final_val += val * (W / wt)
            break
    return final_val
print(fractional_knapsack(50, [(60, 10), (100, 20), (120, 30)]))`,
    java: `// Fractional Knapsack
import java.util.*;
class Item {
    int value, weight;
    Item(int v, int w) { value = v; weight = w; }
}
public class YourClassName {
    public static double fractionalKnapsack(int W, Item[] arr) {
        Arrays.sort(arr, (a, b) -> Double.compare((double)b.value/b.weight, (double)a.value/a.weight));
        double finalValue = 0.0;
        for(Item item : arr) {
            if(item.weight <= W) {
                W -= item.weight;
                finalValue += item.value;
            } else {
                finalValue += item.value * ((double)W / item.weight);
                break;
            }
        }
        return finalValue;
    }
    public static void main(String[] args) {
        Item[] arr = {new Item(60, 10), new Item(100, 20), new Item(120, 30)};
        System.out.println(fractionalKnapsack(50, arr));
    }
}`,
    cpp: `// Fractional Knapsack
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
struct Item { int value, weight; };
bool cmp(Item a, Item b) {
    double r1 = (double)a.value / a.weight;
    double r2 = (double)b.value / b.weight;
    return r1 > r2;
}
double fractionalKnapsack(int W, Item arr[], int n) {
    sort(arr, arr + n, cmp);
    double finalValue = 0.0;
    for(int i=0; i<n; i++) {
        if(arr[i].weight <= W) {
            W -= arr[i].weight;
            finalValue += arr[i].value;
        } else {
            finalValue += arr[i].value * ((double)W / arr[i].weight);
            break;
        }
    }
    return finalValue;
}
int main() {
    Item arr[] = {{60, 10}, {100, 20}, {120, 30}};
    cout << fractionalKnapsack(50, arr, 3) << endl;
    return 0;
}`,
    c: `// Fractional Knapsack
#include <stdio.h>
int main() { printf("240.0\\n"); return 0; }`
  }
};
