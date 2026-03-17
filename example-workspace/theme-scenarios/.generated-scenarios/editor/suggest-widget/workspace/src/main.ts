import { DataProcessor, createProcessor, DEFAULT_OPTIONS } from './utils';

function processUserData() {
  const processor = new DataProcessor();
  const userData = ['  hello  ', '  world  ', '  typescript  '];
  
  // Process the data using various methods
  const cleaned = processor.processData(userData);
  const isValid = processor.validateData(cleaned);
  
  if (isValid) {
    const formatted = processor.formatData(cleaned);
    console.log('Formatted data:', formatted);
  }
  
  // This is where we'll trigger autocomplete
  const result = processor.
}