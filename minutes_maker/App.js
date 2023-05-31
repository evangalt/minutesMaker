// libs
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
require("dotenv").config();

// @todo add logic to take variable of full meeting transcript and break it into chunks
// @todo reg-ex out the time stamps
let inputString = `
Uh, for a while, so seems like there&#39;s been some relief in length of stay.
0:15:57.870 --&gt; 0:16:12.50
Evan Galt
Pretty good month for neurology as you can see, compared especially compared to the fiscal
year to date and cardiology dropped pretty significantly as well, not quite where we wanna be yet
but getting closer.
`;
const regex = /\d+:\d+:\d+\.\d+ --&gt; \d+:\d+:\d+\.\d+\n/g;
inputString = inputString.split(regex).join('');

const parseMinutesWithGpt = async (
  inputString,
  openai,
) => {
  if (typeof inputString != 'string') {
    throw new Error('inputString must be of type string.');
  }
  // @todo Investigate reducing the size of the token prompt (use platform.openai.com/tokenizer or tiktokenizer.vercel.app)
  // Define specific prompts based on the user's account level
  const basicPrompt = `
    Parse the following meeting minutes: ${inputString}. Summarize the meeting discussion and provide a bulleted list of action items.
  `;		

  // Call the OpenAI API to prompt GPT to parse the jobOrder object
  // @todo research if the GPT SDK has rate-limiting handling of 429 response errors
  // @todo may need to write logic to handle this if we're sending too many requests to OpenAI;
  // @todo need to parallelize these requests so we don't wait 1 minute to send the next request (after receiving the last response)
  try {
    const startTime = Date.now();
    const response = await openai.createChatCompletion(
      {
        // model: 'text-davinci-002',
        model: 'gpt-3.5-turbo',
        messages: [
          // @note we can define a 'role' for GPT here to potentially improve parsing performance
          // {"role": "system", "content": "You are performing text analysis."},
          {"role": "user", "content": `${basicPrompt}`},
        ],
        // prompt: `${basicPrompt}`,
      },
      {
        // timeout: 1000,
        headers: {
        // insert headers if applicable
          // Authorization: `Bearer ${process.env.OPENAI_API_KEY_MINUTES_MAKER}`
        },
      }
    // max_tokens: 4096,
    // temperature: 0.5,
    // n: 1,
    // stop: '\n'
      );
  
    if (response) {
      // @todo add logic to handle if response.status === 429
      const { choices } = response.data;
      const message = choices[0].message;
      // handle the usage data for the prompt
      const { usage } = response.data;
      const completionTokens = usage.completion_tokens;
      const promptTokens = usage.prompt_tokens;
      const requestTotalTokens = usage.total_tokens;
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const elapsedTimeInSeconds = elapsedTime/1000;

      return { message, requestTotalTokens, elapsedTimeInSeconds };
    }
  } catch (err) {
      console.log(err);
  }
}

const run = async () => {
  const sendRequest = async (inputString) => {
    let inputCounter = 1;
    const openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPENAI_API_KEY_MINUTES_MAKER,
    }));

    try {
      const response = await parseMinutesWithGpt(inputString, openai);
      // count the number of requests made from the inputString prompt (if it needs to be broken into more than one)
      console.log(`Input counter: ${inputCounter}`);
      inputCounter++;
      return response;
    } catch (error) {
      // handle 400 response errors by reducing the input by half and trying to send both separately, then repeat
      if (error.response && error.response.status === 400) {
        const halfLength = Math.ceil(inputString.length / 2);
        const firstHalf = inputString.slice(0, halfLength);
        const secondHalf = inputString.slice(halfLength);

        await sendRequest(firstHalf);
        await sendRequest(secondHalf);
      } else {
        console.error(error);
      }
    }
  };

  const meetingMinutes = await sendRequest(inputString);
  console.log(meetingMinutes);
};

run();

// @todo add ability to send multiple requests and chain the responses to a single meetingMinutes & action items string
