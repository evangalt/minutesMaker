// libs
import { Configuration, OpenAIApi } from 'openai';
import _ from 'lodash';
import logo from './logo.svg';
import './App.css';

function App() {
  // @todo add logic to take variable of full meeting transcript and break it into chunks
  // @todo reg-ex out the time stamps
  let meetingMinutes = `
  0:0:0.0 --&gt; 0:0:3.870
  Evan Galt
  OK, OK, cool. So let me before I forget.
  0:0:8.120 --&gt; 0:0:11.730
  Evan Galt
  Alright, I think we&#39;re recording and I&#39;ll present.
  0:0:15.690 --&gt; 0:0:16.860
  Evan Galt
  So first.
  0:0:22.730 --&gt; 0:0:25.880
  Evan Galt
  If you all will let me know if you can see my screen.
  0:0:26.560 --&gt; 0:0:26.760
  Cynthia Hill
  Yes.
  0:0:28.410 --&gt; 0:0:33.720
  Evan Galt
  Excellent. So, yeah, we&#39;ll we&#39;ll jump right into the Charter presentation so that Cynthia and Toni
  Kay.
  0:0:35.20 --&gt; 0:0:43.920
  Evan Galt
  Can hopefully receive their approval and and get going. Then we&#39;ll do our project updates, review
  the one pager for this month and do a little data review.
  0:0:45.520 --&gt; 0:0:54.660
  Evan Galt
  So Cynthia and Toni Kay, I I think we we&#39;ll just get started with the Charter and at the end we&#39;ll
  just kind of do a A.
  0:0:55.680 --&gt; 0:1:3.270
  Evan Galt
  Semi official hand raise to to approve the Charter and I will turn it over to you all.
  0:1:3.830 --&gt; 0:1:33.580
  Cynthia Hill
  Awesome. Thank you. So again, we are seeking approval for a current project that we would like
  to work on and that project is to best facilitate the admission process for those patients at
  awaiting admission to IPR. I&#39;m certainly not going to go line by line, but give a quick summary in
  order to move forward, I&#39;d like to give a little bit of context about our IPR patients. Our IPR
  patients require prior authorization in order to be admitted. They also.
  0:1:33.710 --&gt; 0:2:7.170
  Cynthia Hill
  Have to meet criteria which is participating in three hours of therapy per day, requiring two of
  three therapy services, which could be PT, OT or speech, and requiring medical management.
  We also follow CMS regulations in that 60% of the patients admitted to IPR have to fall under
  identified 13. One of 13 identified diagnosis to maintain compliance would like to share that we
  have hardwired that process and remain.
  0:2:7.350 --&gt; 0:2:37.320
  Cynthia Hill
  Above 70% for the last two years for this particular project, our main focus and goal is to
  streamline the process because Yum science that are patients are sitting on the acute side
  awaiting admission. One of the metrics that we&#39;ll be following is the time from the IPR console to
  the admission of IPR by December of 2023. We would like to decrease that by 15%, also
  decreasing the cost avoidable cost.
  0:2:37.390 --&gt; 0:2:54.890
  Cynthia Hill
  Of the patient having to wait on the acute side currently right now, the participants in our project
  we parked partnered with our quality department and we have asked key stakeholders to be
  participants in the project and hopefully we&#39;ll have some good data for you next time we present.
  
  0:2:55.720 --&gt; 0:2:59.70
  Cynthia Hill
  That&#39;s the gist of the project, Tony. Do you want to add anything to it?
  0:3:1.150 --&gt; 0:3:9.860
  Toni-kay Gordon
  No, you&#39;re pretty much covered it all, just focusing on how can we streamline the referral process,
  which overall impacts length of stay.
  0:3:16.510 --&gt; 0:3:18.750
  Evan Galt
  Very good, I think.
  0:3:20.350 --&gt; 0:3:27.860
  Evan Galt
  We had, yeah. There we go. So yeah, so this is all signed. Uh, I I think the we need to update a
  couple of the.
  0:3:30.730 --&gt; 0:3:31.0
  Cynthia Hill
  Yeah.
  0:3:28.550 --&gt; 0:3:38.410
  Evan Galt
  The figures in here, like you were talking about the producing the percent. So what we&#39;ll get a
  final version circulated. But if are there any questions from the group?
  0:3:39.100 --&gt; 0:3:41.100
  Evan Galt
  Before we do our hand raise vote.
  0:3:47.940 --&gt; 0:3:50.640
  Evan Galt
  I&#39;m going to stop sharing for a second so I can see.
  0:3:54.750 --&gt; 0:4:1.850
  Evan Galt
  If not, can just raise your hand if if you approve of the Charter and the project and move forward.
  0:4:9.210 --&gt; 0:4:12.440
  Evan Galt
  I see some hand raises trickling in. Thank you all.
  0:4:15.60 --&gt; 0:4:16.340
  Evan Galt
  Ron, I&#39;ll.
  0:4:17.80 --&gt; 0:4:21.30
  Evan Galt
  Can I ask for your specifically acting as as chair?
  0:4:34.860 --&gt; 0:4:49.60
  Evan Galt
  Alright, I think we&#39;ve got a majority of votes, so congratulations. But so we we&#39;ll get that finalized
  and documented in the notes. Thank you, Cynthia and Toni Kay and good luck moving forward.
  0:4:49.560 --&gt; 0:4:50.210
  Cynthia Hill
  Thank you.
  `;
  const regex = /\d+:\d+:\d+\.\d+\s-->\s\d+:\d+:\d+\.\d+/g;
  meetingMinutes = meetingMinutes.replace(regex, '');
  const minutesChunkJSON = {
    // @todo
  };

  const parseMinutesWithGpt = async (
	  minutesChunkJSON,
		openai,
	) => {
		if (typeof csvJSONRow != 'object') {
			throw new Error('jsonMinutesChunk must be an object.');
		}
		// @todo Investigate reducing the size of the token prompt (use platform.openai.com/tokenizer or tiktokenizer.vercel.app)
		const minutesChunkStr = JSON.stringify(minutesChunkJSON);
	  
		// Define specific prompts based on the user's account level
		const basicPrompt = `
			Parse the following meeting minutes: ${minutesChunkJSON}. Summarize the meeting discussion and provide a bulleted list of action items.
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

  async function rateLimitedMap(items, requestsPerSecond, fn) {
    const results = [];
  
    for (const item of items) {
      // Process the item with the provided function
      const startTime = Date.now();
      const result = await fn(item);
      results.push(result);
      const endTime = Date.now();
  
      // Calculate remaining time to enforce the rate limit
      const elapsedTime = endTime - startTime;
      const delayMilliseconds = 1000 / requestsPerSecond;
      const msToWait = delayMilliseconds - elapsedTime;
  
      if (msToWait > 0) {
        await waitFor(msToWait);
      }
    }
  
    return results;
  }

  async function minutesMaker() {
    const openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPENAI_API_KEY_minutesMaker,
    }));
    // @note Current rate limit of OpenAI requestsPerSecond is ~58 (3500/minute). Rate limit can either be requests/min or tokens/min depending on the model
    // @todo slice off the first element in the csvJSON array for now just for testing
    const testChunk = minutesChunkJSON.slice(0, 1)
    let gptParsedMinutes;
    const requestsPerSecond = 20;
  
    gptParsedMinutes = await rateLimitedMap(
      // meetingMinutes,
      testChunk,
      requestsPerSecond, 
      async (minutesChunkJSON) => {
        return await parseMinutesWithGpt(
          minutesChunkJSON,
          openai,
        )
      }
    );

    return gptParsedMinutes;
  }
  
  let gptFullMinutesJSON = minutesMaker();
  // Initialize variables to accumulate the totals
  let totalElapsedTime = 0;
  let totalRequestTokens = 0;
  // Iterate over the array and accumulate the totals
  gptFullMinutesJSON.forEach((minutesChunk) => {
    totalElapsedTime += minutesChunk.elapsedTimeInSeconds;
    console.log(`Elapsed time for this minutesChunk: ${minutesChunk.elapsedTimeInSeconds}`);
    totalRequestTokens += minutesChunk.requestTotalTokens;
    console.log(`Request tokens for this minutesChunk: ${minutesChunk.requestTotalTokens}`)
  });
  // Calculate the averages
  const avgElapsedTime = totalElapsedTime / gptFullMinutesJSON.length;
  const avgRequestTokens = totalRequestTokens / gptFullMinutesJSON.length;
  // Log the results
  console.log(`Average Elapsed Time: ${avgElapsedTime} seconds`);
  console.log(`Average Request Tokens: ${avgRequestTokens}`);
  
	// destructure the content from the returned GPT message
	gptFullMinutesJSON = gptFullMinutesJSON.map(minutesChunk => {
		const gptJSON = JSON.parse(minutesChunk.message.content);
		return gptJSON;
	});

  console.log(gptFullMinutesJSON);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the MinutesMaker!
        </p>
        <p>
          Generating minutes...
        </p>
        <p>
          {gptFullMinutesJSON}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>
          &copy; 2023 Galt Enterprises
        </p>
      </header>
    </div>
  );
}

export default App;
