// Another file with errors to increase the Problems badge count
export function calculateTotal(items: string[]): number {
  // Error: operator '+' cannot be applied to types 'number' and 'string'
  return items.reduce((sum, item) => sum + item, 0);
}

// Error: property 'nonExistent' does not exist on type 'number'
const num = 42;
console.log(num.nonExistent());