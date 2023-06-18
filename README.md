# Segment Feature Summarizer

This project is a web-based application that accepts a link from https://support.deselect.com/ and generates a summary for the blog content in the link using OpenAI's GPT-3 language model. It also provides a list of features for the user to select and review.

**Please note, this project is for educational purposes only. Web scraping is performed for learning and should not be used to infringe upon or violate any terms of service. Always respect the rights of the website owners.**

## Project Structure

The project consists of three main components:

1. The `Home` component is the main entry point of the application. This component is responsible for the user interface, user interactions, and the logic to make HTTP requests to the server.

2. The `api/generate` endpoint is responsible for interacting with the OpenAI's GPT-3 language model and returns the summarization of the blog post provided in the request body.

3. The `getBlogContent` function is a utility function that scrapes the blog post content from the provided URL and summarizes the content using the `node-summarizer` package.

## Setup and Run

To run the project locally:

1. Clone this repository.

2. Install the required dependencies with:

```bash
npm install
```

3. Set up the environment variable `OPENAI_API_KEY` with your OpenAI API key. You can obtain this key from the OpenAI website. You can set the environment variable in a `.env.local` file at the root of your project like this:

```env
OPENAI_API_KEY=your_openai_api_key
```

4. Run the project in development mode with:

```bash
npm run dev
```

This will start the application on [localhost:3000](http://localhost:3000).

## Note

Please ensure you have a stable internet connection while using the application as it interacts with external services like OpenAI and `support.deselect.com`. Ensure that the links provided are from https://support.deselect.com/.

Please note that you will be charged for each request you make to the OpenAI API. Be mindful of the usage to avoid unexpected charges. Ensure that your API key is kept secret and never exposed in your client-side code or any public repositories.

## Dependencies

This project uses several dependencies:

1. [Next.js](https://nextjs.org/) for the web application framework.
2. [React](https://reactjs.org/) for building user interfaces.
3. [OpenAI API](https://www.openai.com/api/) for summarization of text.
4. [node-summarizer](https://www.npmjs.com/package/node-summarizer) for summarization of scraped content.
5. [puppeteer](https://www.npmjs.com/package/puppeteer) for web scraping.

## Limitations

The project is set up to provide a concise summary of blog posts from `https://support.deselect.com/`. It does not provide a detailed explanation of the content, just the summary. Also, it only works with English language content.

## To Do
- Add ability for users to control summary length
- Look for better method to "summarize" text content being sent to openai to manage token length
- Save existing responses with same temperature in DB???

## Contribution

If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).
