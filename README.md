# Headless Printing

This script prints a webpage using a headless browser instance.

## Usage

1. clone this repo and run `npm install`
2. Create a `.env` file in the project root
3. Set USERNAME, PASSWORD, and URL environmental variables:

   ```bash
   # within ./.env
   USERNAME=username@mail.com
   PASSWORD=your_password
   URL=http://localhost:3000/login
   ```

4. run `node index.js`
