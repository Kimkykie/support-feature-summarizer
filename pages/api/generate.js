import { Configuration, OpenAIApi } from "openai";
import getBlogContent from "../../utils/getBlogContent";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const link = req.body.link || "";
  if (link.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid link",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: await generatePrompt(link),
      temperature: 0,
      max_tokens: 2048
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

async function generatePrompt(link) {
  const blogContent = await getBlogContent(link);
  return `
    Using the given blog text content:

    ${blogContent}

    please generate a summary that identifies and concisely explains the key feature being discussed. Additionally, create a relevant and compelling title that encapsulates the main theme of the blog post.
    Please do not attemp to explain, just summarize the content with focus being on the key feature being discussed.
    The output should be formatted in the following manner:

    TITLE: [the synthesized title]
    SUMMARY: [the concise summary derived from the blog content]
    `;
}
