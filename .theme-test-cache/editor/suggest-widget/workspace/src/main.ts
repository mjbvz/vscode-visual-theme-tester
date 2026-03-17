import { StringUtils, ArrayUtils } from './utils';

function processData() {
  const text = "hello world from typescript";
  const numbers = [1, 2, 3, 2, 4, 3, 5];
  
  // Process text using StringUtils
  const capitalizedText = StringUtils.capitalize(text);
  console.log('Capitalized:', capitalizedText);
  
  // Process array using ArrayUtils
  const uniqueNumbers = ArrayUtils.unique(numbers);
  console.log('Unique numbers:', uniqueNumbers);
  
  // This is where we'll trigger autocomplete
  const result = StringUtils.
}