// libs
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
require("dotenv").config();

// @todo add logic to take variable of full meeting transcript and break it into chunks
// @todo reg-ex out the time stamps
let inputString = `
OK, so the the major items that we're talking about here is to create banners to track the patient progress from the care coordination steps, so that each individual one of those items that we had flowsheet rose that they're going to document on, is not causing clutter and information overload.
0:0:46.420 --> 0:0:51.690
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
On the form itself, so Elma.
0:0:54.580 --> 0:1:2.250
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Thought we would try and do one of those areas with some rules here for for those banners and we've done that for the DMA.
0:1:3.670 --> 0:1:23.780
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I think we still might need to tweak even though the Amy a little bit, but the rest of them I think it's probably gonna take a good two or three hours of sitting down with Deborah and team to kinda collaborate on how to trigger the banners on the rest of them.
0:1:23.980 --> 0:1:29.770
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But I created the DME so that we can kind of show what that's gonna look like today. Ohm.
0:1:32.410 --> 0:1:43.850
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Instead of this just coming on through here and showing each other little items they've done, I mean they can click here and if they choose DMA and like.
0:1:42.440 --> 0:1:44.240
Craig Glazer
Monty, you don't have anything shared, sorry.
0:1:46.160 --> 0:1:47.210
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I'm not presenting.
0:1:46.490 --> 0:1:47.970
Griselda Cardenas
Yeah, no.
0:1:47.220 --> 0:1:48.470
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I thought it's what I was.
0:1:48.480 --> 0:1:48.860
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Hold on.
0:1:59.80 --> 0:1:59.460
Evan Galt
There we go.
0:1:59.380 --> 0:2:1.700
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK, I stopped at the, stopped and restarted.
0:2:1.710 --> 0:2:2.670
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
It can everybody see me?
0:2:5.550 --> 0:2:5.810
Evan Galt
I can.
0:2:6.580 --> 0:2:6.710
Griselda Cardenas
Yes.
0:2:7.390 --> 0:2:7.670
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK.
0:2:8.980 --> 0:2:9.720
Brendan Kelley
Yeah, I can see it now.
0:2:10.40 --> 0:2:10.560
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Uh.
0:2:11.230 --> 0:2:24.100
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So instead of having each one of those little I individual items, some that we not everybody cares about just growing and growing and growing inside this area, it's just gonna stay as a link here.
0:2:24.370 --> 0:2:30.840
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And so in the Care coordinator is coming into the document and if they choose the DMA, then that's the DME will expand down.
0:2:31.150 --> 0:2:35.700
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And if they're going to answer ohh.
0:2:36.950 --> 0:2:39.970
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Some of these questions I'm just going to accept that.
0:2:41.920 --> 0:2:45.420
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Then we're just gonna show up banner down here in the documentation is pending.
0:2:46.350 --> 0:3:1.660
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Umm, if and they could document some other things here about documentation as well that we're not going to show each and individual every long that's there.
0:3:1.670 --> 0:3:3.860
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But we're gonna show the documentation as pending.
0:3:4.690 --> 0:3:19.290
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Ohh my plan is is once this is here if they hover or click on it then it can show what answers or triggering this to the team if they wanted to see just the answers that are making it trigger.
0:3:19.780 --> 0:3:24.130
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I do have a report that's created that I can try and tie into this for that to happen.
0:3:24.460 --> 0:3:49.960
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Now, if they're progressing to the next level, saying that they that we've placed a referral, then the documentation banner will go away and the pending the referral pending will pop up here letting us know that we have that same thing if we recording DMD, maybe home infusion with one company and home health with another then we would displaying banners for all three of those.
0:3:49.970 --> 0:3:58.720
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
If we were doing three of those at the same time, and then if we're progressing to one of the questions that.
0:4:3.760 --> 0:4:6.290
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
We're getting to the insurance part in some of these questions.
0:4:10.210 --> 0:4:12.340
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And maybe my rules not working so well.
0:4:20.830 --> 0:4:25.940
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I have to check my room because we should be advancing on over to the insurance authorization.
0:4:25.950 --> 0:4:28.260
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I think if I collect the next one down on the line.
0:4:34.770 --> 0:4:37.800
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But my rule's gonna make that change to the insurance off pending.
0:4:38.320 --> 0:4:54.120
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So for if we've got the referral going and the insurance company has been accepted by the agency and now we're waiting on the insurance to say yes, we're gonna pay, it'll progress.
0:4:54.130 --> 0:5:7.930
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So that banner and then if we progress down to one of the next questions, uh, now we've changed this and they're saying yes, they accepted it and we've come a long in here and we're saying that we're.
0:5:8.280 --> 0:5:9.210
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, that's not.
0:5:9.280 --> 0:5:10.270
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
That's not acceptable.
0:5:10.280 --> 0:5:17.530
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
We're not showing all that, but now we're saying that the DME is needing to be delivered now because we got everything coordinated.
0:5:20.510 --> 0:5:33.340
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
It's gonna change to the delivery of pending and if we were to come along and say that, uh, it was delivered to the bed side or delivered to home.
0:5:36.410 --> 0:5:39.460
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Gonna come along and say that that's completed cause it's been deleverage.
0:5:43.380 --> 0:5:56.310
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So that's how each one of those sections that would work, you know, because if we're working here, you're we're we would be creating banners that would flow through four either the two feet in the home health care Hospice and and the post acute care placements.
0:5:56.940 --> 0:6:3.370
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So we wanted to build one out to show you today to see if this is what we're kind of looking for to happen.
0:6:10.200 --> 0:6:12.230
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
We have some feedback or comments on this.
0:6:21.500 --> 0:6:22.870
Debra Warrington
Well, I think it looks good.
0:6:22.920 --> 0:6:30.540
Debra Warrington
I don't know if that helps the providers with the understanding of where we are in the process and I think that to me is the question.
0:6:40.220 --> 0:6:51.100
Elma Mendes
So the intended workflow then is to have, like Monty said, those reports where you can actually go and see the details if you want to know what you know, what what actually did happen.
0:6:51.110 --> 0:7:0.600
Elma Mendes
Like for instance, you know what was still what is still pending like the the detail behind it.
0:7:2.810 --> 0:7:4.960
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, that's correct, Debra.
0:7:4.970 --> 0:7:13.750
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I mean I I started putting together report that I wanna link to this since we're not gonna be showing this all of the little questions and answers that we do here.
0:7:13.910 --> 0:7:28.880
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And if your team is only documenting buttons that need to be documented and not coming through and filling everything out, well then if you were to click on this, it would actually show your report of everything that was actually done or the OR the progress says.
0:7:29.90 --> 0:7:35.910
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So if you would come in here and you hit said and I if I I can't clear it all out because of the flowsheet.
0:7:35.920 --> 0:7:43.310
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But if we were to come in here and say clear DME because we're not gonna do the DM anymore, the patient status is changed.
0:7:43.320 --> 0:7:44.140
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
You weren't gonna want it up.
0:7:44.150 --> 0:7:48.970
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Sending them to a rehab facility instead.
0:7:49.340 --> 0:7:54.690
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
If I clear this out, well, then that's going to negate any of that from happening.
0:7:55.20 --> 0:7:57.220
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And no matter will show for DMA.
0:7:58.40 --> 0:8:7.80
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Umm, but if you were coming in here and you were documenting, and let's just say you said the it's pending and we have.
0:8:7.90 --> 0:8:13.480
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
That was our last answer there, but if we hadn't answered any of these are already created all the triggers and you put in a note here, you know.
0:8:19.840 --> 0:8:29.290
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Then when you click here to see the report, well then you could see that it's pending and there's enough there saying the reason why it's pending and explaining what's going on.
0:8:29.300 --> 0:8:41.380
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
If the providers that are on the rounds need to see that, I think the idea that Elma came out with there was a pretty good one so that you can get it out of gone hands.
0:8:41.390 --> 0:8:56.360
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
You know that you're only spending that two or three minutes, but if it's a, you know if if we are pending and we've got some milestones and stuff that are going and we wanna do that deeper dive then if I link that report to it, you click on it, that'll give you the information that you need.
0:8:59.640 --> 0:9:10.900
Elma Mendes
So just to reiterate the the groupings that Doctor Glazer actually mentioned at that time that he saw right off the bat was the documentation, pending referrals and insurance auth.
0:9:11.100 --> 0:9:13.550
Elma Mendes
So that is how how we came up with these.
0:9:14.0 --> 0:9:16.370
Elma Mendes
It's a four different banners.
0:9:16.900 --> 0:9:21.490
Elma Mendes
Do you meet documentation pending DME, referral pending DME insurance off pending?
0:9:21.500 --> 0:9:32.890
Elma Mendes
So we're kind of just grouping them according to what the last filed value is and then and one banner trumps the other.
0:9:32.900 --> 0:9:34.360
Elma Mendes
So there's always just one banner.
0:9:42.440 --> 0:9:43.380
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I I mean it.
0:9:41.730 --> 0:9:46.490
Craig Glazer
Deb, does that actually work with the with the the case management workflow?
0:9:48.250 --> 0:10:8.910
Debra Warrington
I think so because probably quite we didn't do a really good job communicating is and each of those steps there may be three or four actions by the care coordinator like they may need a total 18 form sign, that kind of stuff doesn't necessarily need to be here for you guys to see, but it helps us with that progression.
0:10:9.800 --> 0:10:21.940
Debra Warrington
And so when we met with the care coordinators, that's what we further defined in all those steps that but we still just want to meet those kind of high level steps that the providers care about.
0:10:26.240 --> 0:10:28.90
Craig Glazer
Yeah, Brandon and Brianna, what do you guys think?
0:10:30.130 --> 0:10:30.920
Briana Witherspoon
I like this.
0:10:30.930 --> 0:10:43.330
Briana Witherspoon
I think that it's great that you can kind of have a quick snapshot to see where you are, but if you do have questions and you need to dive a little bit deeper, it seems fairly intuitive of where you would Click to find out more information.
0:10:47.660 --> 0:10:49.430
Brendan Kelley
Yeah, I I definitely agree.
0:10:49.500 --> 0:10:56.750
Brendan Kelley
And I I like, I mean I I do like how it's how it's laid out and how it is pretty intuitive to kind of.
0:10:58.510 --> 0:10:59.40
Brendan Kelley
Yeah, I'm.
0:10:59.50 --> 0:11:3.680
Brendan Kelley
I'm just envisioning like how this would work on rounds, and you know, invariably there will be. Somebody says.
0:11:4.30 --> 0:11:5.360
Brendan Kelley
What about acts?
0:11:5.450 --> 0:11:12.390
Brendan Kelley
And you know, being able to not have to search around for it or, you know, have a pretty good idea how to access that information.
0:11:12.400 --> 0:11:14.370
Brendan Kelley
I think we'll make this a useful tool.
0:11:18.990 --> 0:11:27.460
Marilyn Pitts
I can't remember if we talked about this in a previous meeting, but did we ever see what it looks like if you were to print the page?
0:11:27.470 --> 0:11:30.950
Marilyn Pitts
Or is this only gonna be for utilization within epic?
0:11:33.340 --> 0:11:40.190
Marilyn Pitts
Like will there be like a rounding report handoff to have in addition to the visualization on the screen?
0:11:53.180 --> 0:12:1.180
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Well, since this is actually a parent report, if you wanted to print this, you know rounding summary out.
0:12:1.190 --> 0:12:6.240
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
If you wanted to, I mean, I can put a link here so that you can print it.
0:12:9.970 --> 0:12:12.630
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I don't know that you would.
0:12:11.990 --> 0:12:14.410
Marilyn Pitts
I don't know how frequently that would be used though.
0:12:15.820 --> 0:12:16.510
Marilyn Pitts
I'm just curious.
0:12:15.950 --> 0:12:17.80
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, I was gonna say I'd.
0:12:29.760 --> 0:12:30.270
Brendan Kelley
Yeah.
0:12:30.760 --> 0:12:31.420
Brendan Kelley
I I I think.
0:12:17.610 --> 0:12:32.680
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I don't know if it would be useful, but if it's something that could be useful to somebody that wants to do that, I can place the link O you know, possibly right at the top that says parent and it'll print just and it'll print just this record.
0:12:35.0 --> 0:12:35.390
Brendan Kelley
Yeah.
0:12:35.400 --> 0:12:45.550
Brendan Kelley
There I I think they're probably will I I'm not one who would want this printed out, but I could envision there maybe some people who would like a a paper copy.
0:12:46.160 --> 0:12:50.930
Brendan Kelley
I also you know if you scroll back up to the top I I think it's.
0:12:51.320 --> 0:12:56.330
Brendan Kelley
I also think it's really nice how you have highlighted right up there.
0:12:56.720 --> 0:13:2.600
Brendan Kelley
You know the items that we can anticipate a call from Doctor Glazer about like the 121 day length of stay.
0:13:7.900 --> 0:13:12.210
Brendan Kelley
Yeah, I mean, joking aside it, I I, I I caught that as you were scrolling through.
0:13:12.220 --> 0:13:15.710
Brendan Kelley
I thought it's really nice that that's kind of right up right up top.
0:13:15.720 --> 0:13:25.380
Brendan Kelley
So we're kind of aware of those, you know how long the patient has been there and you know can kind of remain cognizant and mindful of what we're working towards.
0:13:29.20 --> 0:13:35.910
Craig Glazer
Yeah, I mean my thought with that, if you remember cause it's been a while since we talked about up there is that in these conversations would go that.
0:13:35.920 --> 0:13:37.740
Craig Glazer
This is Quintus tea.
0:13:37.750 --> 0:13:38.790
Craig Glazer
Because I can't say that.
0:13:38.800 --> 0:13:40.270
Craig Glazer
I guess it's trout slapper.
0:13:46.590 --> 0:13:46.730
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But.
0:13:40.540 --> 0:13:47.780
Craig Glazer
You guys are getting very entertaining with your names of patients in these environments that are not real.
0:13:47.990 --> 0:13:48.140
Brendan Kelley
Yeah.
0:13:49.410 --> 0:13:53.30
Craig Glazer
This is a Quintin Trump slapper who's here with whatever.
0:13:53.40 --> 0:13:55.180
Craig Glazer
And then you put in the principle problem, right?
0:13:55.190 --> 0:13:55.540
Craig Glazer
Who's here?
0:13:55.550 --> 0:13:55.790
Craig Glazer
What's?
0:13:55.800 --> 0:13:56.420
Craig Glazer
I'll make one up.
0:13:56.430 --> 0:13:57.460
Craig Glazer
Heart failure.
0:13:57.590 --> 0:14:4.240
Craig Glazer
He's on his 121st day of hospitalization and is expected discharge date is X.
0:14:4.750 --> 0:14:4.930
Brendan Kelley
Yeah.
0:14:4.510 --> 0:14:6.660
Craig Glazer
If you're far enough along, you would be able to say.
0:14:6.670 --> 0:14:19.180
Craig Glazer
Here's the discharge milestones that are completed and then you could then go down and be like OK, our plan disposition is whatever showing there, the family status for that is whatever shows there.
0:14:20.40 --> 0:14:24.600
Craig Glazer
We're not waiting on any medical things and this is where we are in care coordination.
0:14:24.680 --> 0:14:25.310
Craig Glazer
And then you can.
0:14:25.320 --> 0:14:33.180
Craig Glazer
Everyone can see the PT OT as speech recommendations so that we can say these are in alignment right?
0:14:33.280 --> 0:14:36.630
Craig Glazer
Like our planned discharge disposition is sniff, but he still needs a sitter.
0:14:36.640 --> 0:14:43.290
Craig Glazer
So does that I think, Deb, that you've said that sniffs don't take sitters, right?
0:14:44.600 --> 0:14:50.850
Debra Warrington
Uh, as a rule, but we're learning more and more from the skilled nursing that if we're doing it to keep the patient from.
0:14:52.80 --> 0:14:52.930
Debra Warrington
Harm.
0:14:53.320 --> 0:14:59.350
Debra Warrington
That's different than if we're doing the doing putting a patient with a sitter to keep them from wandering.
0:15:5.380 --> 0:15:6.0
Craig Glazer
Got it. OK.
0:15:8.280 --> 0:15:8.910
Craig Glazer
OK.
0:14:59.640 --> 0:15:9.300
Debra Warrington
It's the wandering sitters that cause the skilled nursing facilities more angst, so we might need to end up designating, Yep.
0:15:10.160 --> 0:15:11.380
Brendan Kelley
That's that's good information.
0:15:8.980 --> 0:15:11.780
Craig Glazer
But you know that would be the idea basically, right?
0:15:13.20 --> 0:15:13.240
Debra Warrington
Yeah.
0:15:16.620 --> 0:15:22.850
Craig Glazer
You know, so the first day it would be like, OK, the person here for this or on hospital day one, we think that they're gonna go home on X day.
0:15:23.320 --> 0:15:29.350
Craig Glazer
Case manager is gonna tell us that they have, you know, UT select insurance, so they should be covered for most things.
0:15:29.360 --> 0:15:30.490
Craig Glazer
Where do we think they're going?
0:15:30.500 --> 0:15:33.70
Craig Glazer
Where we're gonna go to an LTAC, OK.
0:15:33.600 --> 0:15:34.770
Craig Glazer
Have we told the family yet?
0:15:34.780 --> 0:15:36.900
Craig Glazer
No case manager is gonna tell the family today.
0:15:37.820 --> 0:15:40.250
Craig Glazer
We waiting on anything to progress towards discharge?
0:15:40.260 --> 0:15:49.940
Craig Glazer
No, someone's gonna put the order in and then we'll start seeing the update from case management to next day and we'll see the discharge milestone appears yellow the next day, right?
0:15:50.680 --> 0:16:2.330
Craig Glazer
I think that was, at least in my head, that's what the idea was on how this flows, so that with everything right in front of us, it's pretty quick and you don't have to feel like you have to hit every section every day, right?
0:16:2.340 --> 0:16:13.40
Craig Glazer
Like if you haven't come up with a discharge disposition yet, well, then that's what the conversation is on the first day, and then the next day it's just, do we still think that's the discharge disposition?
0:16:13.90 --> 0:16:13.440
Craig Glazer
Yes.
0:16:13.450 --> 0:16:13.760
Craig Glazer
OK.
0:16:13.770 --> 0:16:14.620
Craig Glazer
Is the family.
0:16:14.690 --> 0:16:15.280
Craig Glazer
Are they aware?
0:16:15.290 --> 0:16:16.100
Craig Glazer
Do they agree?
0:16:16.110 --> 0:16:16.420
Craig Glazer
Yeah.
0:16:16.430 --> 0:16:18.100
Craig Glazer
So are we waiting on any medical things?
0:16:18.310 --> 0:16:18.880
Craig Glazer
No.
0:16:19.150 --> 0:16:21.790
Craig Glazer
Where are we on case management to achieve this disposition?
0:16:22.830 --> 0:16:25.480
Craig Glazer
Does it fit with what PT, OT and speech say?
0:16:25.850 --> 0:16:27.800
Craig Glazer
OK, done right.
0:16:29.540 --> 0:16:31.720
Craig Glazer
At least that's the that in my head.
0:16:31.730 --> 0:16:37.160
Craig Glazer
That's the way it would work, but does that sound right to those of you that will actually be doing this?
0:16:45.520 --> 0:17:1.680
Brendan Kelley
That that does sound that does sound right and I I think this I think once we start using this tool, we'll of course get more comfortable with you know how that workflow and how that presentation should flow.
0:17:2.130 --> 0:17:17.990
Brendan Kelley
And I think I hope will also, you know, maybe as we use this tool, learn a little bit about ourselves and our process so that we're doing a an even better job communicating these things at the correct times with patients and families.
0:17:19.220 --> 0:17:19.400
Craig Glazer
Yeah.
0:17:19.360 --> 0:17:22.590
Brendan Kelley
You know, because I that's I, I mean, I I'm just.
0:17:22.600 --> 0:17:26.800
Brendan Kelley
I'm trying to think like what would I hope you know, six months or a year into this.
0:17:26.810 --> 0:17:32.590
Brendan Kelley
I would hope that we're having an idea like when we've got somebody with a mice, then it crisis in the hospital.
0:17:32.940 --> 0:17:48.440
Brendan Kelley
At what point do we need to start talking with the family about, you know, the anticipated or not at what point, I mean we kind of already know and do that, but you know being able to say to them with our patients having this diagnosis usually at this point we are having this conversation.
0:17:48.910 --> 0:17:50.260
Brendan Kelley
You know these.
0:17:50.270 --> 0:18:3.700
Brendan Kelley
You know, it's gonna be this many days and having those, you know, having a firm grasp on those data rather than just our gestalt, I think could actually, you know, help us and help families feel more confident about that.
0:18:3.710 --> 0:18:5.890
Brendan Kelley
We're having the right conversation at the right time.
0:18:10.560 --> 0:18:11.800
Craig Glazer
Yeah, I think that's a good point.
0:18:19.320 --> 0:18:19.780
Brendan Kelley
Yeah, yeah.
0:18:11.810 --> 0:18:25.770
Craig Glazer
In the other thing, hopefully this will give us his clarity on who has what conversation so that we can avoid some of the well, you know, PT suggested that I go to a rehab facility whether or not they did or not is a different question.
0:18:25.780 --> 0:18:26.350
Craig Glazer
I know.
0:18:26.910 --> 0:18:27.250
Brendan Kelley
Umm.
0:18:27.100 --> 0:18:28.970
Craig Glazer
And then the doctor says OK.
0:18:28.980 --> 0:18:32.30
Craig Glazer
But then the case manager says, but your insurance doesn't cover it.
0:18:32.80 --> 0:18:33.880
Craig Glazer
Then we end up in stock, right?
0:18:34.840 --> 0:18:35.160
Brendan Kelley
Right.
0:18:41.940 --> 0:18:42.450
Brendan Kelley
Hmm.
0:18:33.890 --> 0:18:51.930
Craig Glazer
So hopefully PT will be like we'll talk about our recommendations with the team and our daily rounds, you know, and then the case managers will go in and say like, you know, this is what we're thinking based on the team discussion because we now know that this person's insurance doesn't cover rehab, it does cover a sniff.
0:18:51.940 --> 0:18:55.110
Craig Glazer
So we're going to talk to them about a sniff and not a rehab facility, right.
0:18:55.840 --> 0:18:56.170
Debra Warrington
Perfect.
0:18:55.940 --> 0:18:56.330
Brendan Kelley
Umm.
0:18:55.880 --> 0:19:10.880
Craig Glazer
Hello and then you're right using the data that we get in over the course of the next six months by getting cleaner on our principle diagnosis, right and by following up on the the stuff that we put in.
0:19:11.880 --> 0:19:14.210
Brendan Kelley
Yeah, but but I I I like the.
0:19:15.570 --> 0:19:16.230
Brendan Kelley
I like that point.
0:19:16.240 --> 0:19:28.820
Brendan Kelley
You just drilled home about it, you know kind of helping us so that we are not tripping over each other when we're communicating expectations to the patients and their families.
0:19:30.370 --> 0:19:40.630
Brendan Kelley
I think that's a that that would be a that would be a that would be a key around important outcome from this entire thing even just that.
0:19:41.890 --> 0:19:43.670
Craig Glazer
Yeah, I agree.
0:19:56.20 --> 0:19:56.230
Brendan Kelley
Uh-huh.
0:19:46.940 --> 0:20:1.570
Craig Glazer
Starting to think about we may need to put a questionnaire together for the for the pilot teams for like you know, after three months on some some things and what are their, what is their feedback deshonna and Byron, what do you guys think from nursing perspective?
0:20:5.70 --> 0:20:21.960
Deshonna Taylor
How far could I do think that it is very intuitive and I don't think that they'll have any issues and using it and since they tend to have a most of their reports fairly well streamlined, I think this will be easy for them to go through.
0:20:24.850 --> 0:20:25.290
Byron Carlisle
I agree.
0:20:33.980 --> 0:20:36.400
Craig Glazer
Homer and Mercedes, do you guys have any other thoughts?
0:20:44.690 --> 0:20:45.620
Homer Walag
Hi, doctor Glazer.
0:20:45.630 --> 0:20:46.550
Homer Walag
So yeah, I have.
0:20:47.130 --> 0:20:48.320
Homer Walag
I think everything looks great.
0:20:48.330 --> 0:21:3.790
Homer Walag
So just a clarification, so when you do the actual rounding, will there be a group of patients that the doctor's or the identified or will that be available in the providers uh list in Epic?
0:21:6.460 --> 0:21:10.250
Craig Glazer
Do you mean on who's gonna be covered during whatever section of rounds?
0:21:10.260 --> 0:21:11.380
Craig Glazer
Is that what you're meaning, Homer?
0:21:12.0 --> 0:21:12.240
Homer Walag
Yeah.
0:21:13.430 --> 0:21:14.200
Craig Glazer
Yeah, I would.
0:21:14.270 --> 0:21:23.230
Craig Glazer
I our discussions before where that it would be based on whatever provider team comes to the rounds at any given time point, you would run their team list.
0:21:26.380 --> 0:21:26.770
Homer Walag
OK.
0:21:26.900 --> 0:21:38.710
Homer Walag
Yeah, the reason why I asked is that so if ever there are any questions when it comes to PT and or OT recommendations that we can immediately, uh reference the the patients charts.
0:21:39.820 --> 0:21:39.980
Craig Glazer
Yeah.
0:21:38.720 --> 0:21:41.620
Homer Walag
So thank you.
0:21:43.860 --> 0:21:44.570
Craig Glazer
Go ahead, mercedez.
0:21:44.580 --> 0:21:45.470
Craig Glazer
You don't have to raise your hand.
0:21:47.590 --> 0:21:50.800
Mercedez Wright
I didn't want to interrupt umm, but I just wanted to say no.
0:21:50.810 --> 0:21:52.310
Mercedez Wright
I think it looks really good.
0:21:52.320 --> 0:21:55.840
Mercedez Wright
Umm, I'm very pleased with how far everything has come.
0:21:55.850 --> 0:21:56.600
Mercedez Wright
I think it's gonna.
0:21:56.610 --> 0:21:58.270
Mercedez Wright
It's very visually appealing.
0:21:59.410 --> 0:22:5.210
Mercedez Wright
I don't have any additions except for I I happy, happy feedback.
0:22:6.230 --> 0:22:6.650
Craig Glazer
Great.
0:22:8.870 --> 0:22:9.200
Craig Glazer
Alright.
0:22:9.140 --> 0:22:21.0
Deshonna Taylor
So once that thing that I would say about the printing it out is and I'm not too keen on printing it out because I think papers get left around with patient information on it.
0:22:21.680 --> 0:22:29.820
Deshonna Taylor
And also I think that you know the point of this is to take this with us as we round on the patients.
0:22:30.70 --> 0:22:43.240
Deshonna Taylor
And I think if we print it out, we may have a likelihood of skipping our point or an area might be a little bit easier, but I wouldn't totally say don't do it.
0:22:43.250 --> 0:22:43.660
Deshonna Taylor
I just.
0:22:43.670 --> 0:22:44.930
Deshonna Taylor
I'm just not real keen on that.
0:22:49.10 --> 0:22:55.440
Craig Glazer
Yeah, I think the other disadvantage to printing it out is that it's it will be out of date very quickly.
0:22:56.900 --> 0:23:8.710
Craig Glazer
So if you print it out before rounds, but then you may it's, you know, this is kind of like a living document that if we decide today that we're not gonna do a DME, and we're gonna do a nursing home, then you know everything you printed out is now wrong.
0:23:8.720 --> 0:23:9.40
Craig Glazer
Right.
0:23:9.50 --> 0:23:10.770
Craig Glazer
So that's the advantage of it living in epic.
0:23:12.210 --> 0:23:12.720
Deshonna Taylor
Right.
0:23:12.730 --> 0:23:14.860
Deshonna Taylor
And we should be a green institution too.
0:23:15.560 --> 0:23:18.0
Craig Glazer
Yeah, for the for the sake of the trees, I agree.
0:23:20.640 --> 0:23:22.370
Craig Glazer
Mercedes is your hand raised again?
0:23:22.380 --> 0:23:24.200
Craig Glazer
Or is that from before?
0:23:25.730 --> 0:23:27.100
Mercedez Wright
I promise I lowered it.
0:23:27.250 --> 0:23:28.870
Mercedez Wright
Maybe I lowered it and raised it again.
0:23:29.220 --> 0:23:30.200
Craig Glazer
I think that's what happened.
0:23:30.220 --> 0:23:30.910
Craig Glazer
It like flickered.
0:23:33.760 --> 0:23:41.440
Craig Glazer
Alright, so mining, I think the consensus is that everyone likes this banner approach and we can build out the rest of the tasks that way.
0:23:42.840 --> 0:23:46.990
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK, then I will get it all on.
0:23:47.0 --> 0:23:50.850
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Deborah discussed triggers on the other ones.
0:23:51.40 --> 0:23:54.440
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I I did wanna talk to him about these little bit too.
0:23:55.130 --> 0:23:58.160
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Umm yeah, we can get that done.
0:23:58.750 --> 0:23:58.930
Craig Glazer
OK.
0:23:59.30 --> 0:24:3.280
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So that was the main thing that we're working on.
0:24:3.370 --> 0:24:6.690
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I've created this mode for transportation.
0:24:7.660 --> 0:24:12.710
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I just wanted to know, well, I actually have a couple things to still do in the build.
0:24:12.900 --> 0:24:15.640
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I actually just wanted to know where we wanted to place that on here.
0:24:24.470 --> 0:24:27.600
Craig Glazer
Maybe we need to open that form because I'm trying to remember that context also.
0:24:30.300 --> 0:24:31.270
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Ohm.
0:24:31.280 --> 0:24:35.390
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Let me see if I can find the almonds recommendation because I don't have it ready.
0:24:41.120 --> 0:24:41.470
Craig Glazer
Correct.
0:24:35.400 --> 0:24:50.850
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
There's some flowsheet rows with that we have already that we were gonna leverage and I was going, you know, I'm in the process of creating it to be something like this, but since it's just limited information, it could show it was in there.
0:24:51.0 --> 0:24:54.230
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And to update you could open it up and update it in here.
0:24:54.700 --> 0:25:18.200
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
This is just the raw flowsheet rows that we're seeing here and for the transportation concerns and the transportation anticipated we were talking about, if we were not actually doing a care coordination referral planning, we still always sometimes come out with issues on getting the knowing about and arranging that transportation.
0:25:21.390 --> 0:25:22.760
Craig Glazer
Can you open the dish?
0:25:22.770 --> 0:25:24.80
Craig Glazer
Bowen progression forms link.
0:25:30.510 --> 0:25:42.710
Craig Glazer
So I think the IT would the correct me if I'm wrong, but the the places that we need a transportation concern is if it's a home, right, not a placement because that's always an ambulance, right?
0:25:43.220 --> 0:25:45.470
Craig Glazer
Like you guys already know, to arrange that is what I mean, right?
0:25:46.20 --> 0:25:46.500
Debra Warrington
What?
0:25:46.540 --> 0:25:49.230
Debra Warrington
You know, that's a really good question, Doctor Glazer.
0:25:49.240 --> 0:25:53.730
Debra Warrington
Cause I think it causes confusion about who's really running the show.
0:25:54.40 --> 0:26:5.290
Debra Warrington
We do transportation when it's ambulance and we may ask the patient on admission as part of our discharge planning evaluation is you know, how do you plan?
0:26:5.760 --> 0:26:8.450
Debra Warrington
Who's gonna take you home? And they'll say family.
0:26:8.940 --> 0:26:10.430
Debra Warrington
And we'll be like, OK, cool.
0:26:10.680 --> 0:26:20.220
Debra Warrington
But we don't arrange or coordinate the transport with the patient's family, because usually by then we're done and we're already moved on to the next patient.
0:26:20.230 --> 0:26:21.60
Debra Warrington
Patient.
0:26:21.430 --> 0:26:32.940
Debra Warrington
So it's really the primary care nurse whose communicating with the patient about, hey, it looks like you're gonna be leaving about 1:00 o'clock this afternoon as your daughter or whoever's providing your, are they going to be able to be here?
0:26:33.10 --> 0:26:37.40
Debra Warrington
So that then kind of goes to that primary care nurse.
0:26:38.390 --> 0:26:38.630
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah.
0:26:37.430 --> 0:26:39.910
Debra Warrington
And I think that's confusing to the team.
0:26:41.620 --> 0:26:42.170
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah.
0:26:42.180 --> 0:26:45.570
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And they will document on these flowsheet rows.
0:26:45.580 --> 0:26:52.890
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
These are existing rows that they document on, so if they've documented it in there, you're gonna see it.
0:26:53.80 --> 0:26:57.640
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But if for some reason it's not been documented, you're gonna see that too.
0:27:0.630 --> 0:27:12.640
Debra Warrington
And to further confuse it, now that we've got the transportation staff there arranging lift, if we need a lift transport course, lift transport is last resort.
0:27:12.650 --> 0:27:13.780
Debra Warrington
We can't get family.
0:27:13.790 --> 0:27:19.200
Debra Warrington
We can't get anybody to come move this patient, so we're just gonna go ahead and set up a lift.
0:27:19.310 --> 0:27:25.60
Debra Warrington
Transportation does that now instead of the care coordinator, because that was causing problems.
0:27:25.70 --> 0:27:35.580
Debra Warrington
We'd get lift here in the patient wasn't ready and we would get, we'd get a penalty for not being down there to and we would lose our left and we'd have to reschedule it and we'd get charged 5 bucks.
0:27:39.390 --> 0:27:39.710
Craig Glazer
So.
0:27:45.810 --> 0:27:46.440
Debra Warrington
OK good.
0:27:46.450 --> 0:27:49.500
Debra Warrington
I'm cause this, yeah.
0:27:43.220 --> 0:27:52.150
Craig Glazer
That, that, that helps a lot, Deborah, if it's, if it's placement, then we know they're going to facility.
0:27:52.160 --> 0:27:54.70
Craig Glazer
Those are usually going to be ambulance, right?
0:27:54.490 --> 0:27:56.760
Debra Warrington
Well, they can be private auto.
0:27:57.30 --> 0:28:1.40
Debra Warrington
They can be ambulance or they can be wheelchair van.
0:28:1.690 --> 0:28:6.380
Debra Warrington
The only thing billable to insurance, of course, is the ambulance with medical necessity.
0:28:7.290 --> 0:28:7.980
Craig Glazer
OK.
0:28:8.70 --> 0:28:19.840
Craig Glazer
And so, so maybe we just need in this discharge needs section under all of what it would regardless of which button we need something unanticipated transport.
0:28:21.360 --> 0:28:23.310
Debra Warrington
Yeah, or even mode of transport.
0:28:23.110 --> 0:28:23.770
Craig Glazer
That's what I mean.
0:28:23.320 --> 0:28:24.110
Debra Warrington
So the team?
0:28:23.780 --> 0:28:24.360
Craig Glazer
It's just speak.
0:28:24.160 --> 0:28:26.110
Debra Warrington
Yeah, the team could even agree.
0:28:26.220 --> 0:28:30.490
Debra Warrington
Private auto and if it's private auto, then that clarifies it for everybody.
0:28:30.500 --> 0:28:33.690
Debra Warrington
Or the team may say, Oh no, this patient can't go by private auto.
0:28:33.800 --> 0:28:39.580
Debra Warrington
They're gonna need ambulance transport and that would help everybody from the very beginning.
0:28:43.660 --> 0:28:46.490
Craig Glazer
So can we add that like click home without needs for a second?
0:28:46.500 --> 0:28:47.150
Craig Glazer
Let's see what happens.
0:28:51.170 --> 0:28:51.660
Craig Glazer
Nothing.
0:28:52.110 --> 0:28:54.250
Craig Glazer
And what about if we change that to home with needs?
0:29:1.150 --> 0:29:1.480
Craig Glazer
Right.
0:28:57.370 --> 0:29:1.900
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Wow, that's going to then determine what needs.
0:29:2.630 --> 0:29:5.670
Craig Glazer
So maybe regardless of what you hit, we need another SEC.
0:29:13.870 --> 0:29:14.160
Debra Warrington
I've.
0:29:5.680 --> 0:29:19.540
Craig Glazer
We need a section that would be that you know and anticipated mode of transport upon discharge or something like that and it could be whatever choices Dev gives you there and the team can discuss it in this discharge disposition section.
0:29:20.430 --> 0:29:21.410
Debra Warrington
I completely agree.
0:29:23.350 --> 0:29:30.70
Debra Warrington
If it is a piece, I think we've kind of overlooked just because, you know, it's kind of one of those last minute things lots of times.
0:29:32.160 --> 0:29:34.920
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
O OK, now yeah, I can add to this.
0:29:34.990 --> 0:29:38.30
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But transportation, you know.
0:29:38.100 --> 0:29:39.960
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Whatever Debra specifies for me.
0:29:39.970 --> 0:29:43.960
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But it won't link to what Nursing's already documented.
0:29:46.750 --> 0:29:49.430
Craig Glazer
So, can you, Elma, do you know what?
0:29:49.440 --> 0:29:53.970
Craig Glazer
Actually, what the choices are in those sections on those flow sheets.
0:29:58.20 --> 0:30:1.0
Elma Mendes
So one of them is a free text for you.
0:30:1.370 --> 0:30:2.320
Elma Mendes
I think I have in there.
0:30:2.330 --> 0:30:3.630
Elma Mendes
So yeah, transportation concerns.
0:30:5.540 --> 0:30:12.150
Elma Mendes
And then I'll transportation and I thought I had the other screen shot too, Monty, the transportation to spit.
0:30:12.160 --> 0:30:12.430
Elma Mendes
Yeah.
0:30:12.480 --> 0:30:14.180
Elma Mendes
Those are those selections.
0:30:14.670 --> 0:30:23.660
Craig Glazer
Can we auto populate this with this transportation anticipated and the team can then discuss it and make a change or something?
0:30:23.670 --> 0:30:24.320
Craig Glazer
Or does that?
0:30:24.390 --> 0:30:25.850
Craig Glazer
Is there no way to link these at all?
0:30:27.450 --> 0:30:33.310
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I don't think there is a way to link if the flowsheet rose been answered to populate.
0:30:34.970 --> 0:30:38.200
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I don't know if there's a rule section on a smart form.
0:30:41.160 --> 0:30:42.10
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I.
0:30:40.570 --> 0:30:44.820
Debra Warrington
Hey, Elma, is that required documentation or is that kind of an optional?
0:30:47.0 --> 0:30:53.940
Elma Mendes
It it is an optional but the believe it or not, they actually do document that most of the time.
0:30:54.490 --> 0:30:54.870
Debra Warrington
Good to know.
0:30:55.800 --> 0:30:56.490
Debra Warrington
I didn't even know that.
0:30:55.910 --> 0:31:3.150
Craig Glazer
So maybe what we need to do then is, since we're displaying information on the right of our forms.
0:31:13.710 --> 0:31:15.970
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK, added the data binding right here.
0:31:19.470 --> 0:31:21.80
Craig Glazer
You're showing a sausage making.
0:31:21.90 --> 0:31:22.220
Craig Glazer
I don't know if this is a good idea.
0:31:24.240 --> 0:31:25.410
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I was just checking there.
0:31:23.630 --> 0:31:26.60
Craig Glazer
You put it on each sauces, they've seen 8 Monty.
0:31:26.680 --> 0:31:33.170
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, I was thinking if there's something obvious where I could place a rule or a programming point to link it.
0:31:33.180 --> 0:31:34.630
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I don't see a way.
0:31:33.760 --> 0:31:37.880
Craig Glazer
Man, I think we maybe we just don't even make it that complicated and on the right.
0:31:38.930 --> 0:31:44.20
Craig Glazer
Instead, it like just add a box that has those two flow sheet rolls and call it transfer.
0:31:44.30 --> 0:31:58.410
Craig Glazer
Call the box transportation and put those two flow sheet rows there and then you know people will have it in front of them when they're going to make their before you open the link to plan the discharge disposition.
0:31:58.480 --> 0:32:1.380
Craig Glazer
And everyone can know from their communication that way.
0:32:2.920 --> 0:32:3.340
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah.
0:32:3.350 --> 0:32:4.30
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
No, that's the.
0:32:4.40 --> 0:32:9.330
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
That's the path I was going down as I was creating a box to show that, but I wanted to know the position.
0:32:14.590 --> 0:32:15.220
Craig Glazer
Yeah, I would.
0:32:9.580 --> 0:32:15.240
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Should I just position it as the first box here above planned discharge disposition or?
0:32:15.270 --> 0:32:16.410
Craig Glazer
I would put it on the right.
0:32:16.50 --> 0:32:16.630
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
At the bottom.
0:32:17.580 --> 0:32:18.650
Craig Glazer
I would put it on the right.
0:32:19.60 --> 0:32:19.840
Craig Glazer
And that's my opinion.
0:32:18.740 --> 0:32:20.840
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Ohh over here on the right side.
0:32:19.850 --> 0:32:32.820
Craig Glazer
That's see whatever else says, but I mean, it looks to me like we're we're displaying necessary information to the conversation on the right half and then the the, the things where then discussing and taking action on are on the left.
0:32:32.830 --> 0:32:36.600
Craig Glazer
So I would put those transport transportation rows on the right.
0:32:38.60 --> 0:32:38.350
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK.
0:32:38.360 --> 0:32:40.910
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Gotcha. Gotcha.
0:32:39.840 --> 0:32:40.960
Craig Glazer
What does everyone else think that?
0:32:44.530 --> 0:32:44.900
Craig Glazer
Please.
0:32:40.150 --> 0:32:58.140
Elma Mendes
Could could I just make one suggestion, since since the theme is that we're using banners, could we create another banner that would only show up if the nurse actually documents in them, whether it's the concerns or anticipated needs?
0:33:2.760 --> 0:33:8.160
Elma Mendes
That way, at least you don't have to worry about it being there, unless it's there is actually a concern documented.
0:33:13.130 --> 0:33:13.580
Craig Glazer
Yeah, what do you?
0:33:13.250 --> 0:33:14.530
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Well, what I what I could?
0:33:16.700 --> 0:33:26.150
Debra Warrington
Well, I get a number of calls from staff saying, Umm, we we we probably need to go ahead and arrange an ambulance.
0:33:26.160 --> 0:33:28.770
Debra Warrington
And I'm like, well, is there a medical necessity?
0:33:28.860 --> 0:33:30.810
Debra Warrington
Well, I don't know.
0:33:30.860 --> 0:33:32.840
Debra Warrington
And I'm like, well, number one, ask your therapist.
0:33:32.850 --> 0:33:40.280
Debra Warrington
And #2, if you're not sure, talk to your physician because they need to have input into the safety of the mode of transportation.
0:33:43.20 --> 0:33:53.270
Debra Warrington
So sometimes it would help if that got triggered a little bit earlier, rather than them calling me wanting to know if I'll pay for the ambulance when it's already been arranged.
0:33:54.400 --> 0:33:54.670
Craig Glazer
Right.
0:33:54.680 --> 0:34:1.90
Craig Glazer
So what you're saying is you think it would be better to just have that information there so that everyone's aware of it, even if it's blank.
0:34:1.100 --> 0:34:3.280
Craig Glazer
And it just says none like what we're seeing here right now.
0:34:4.220 --> 0:34:9.0
Debra Warrington
I kind of think to trigger the discussion so it can be arranged earlier rather than later.
0:34:11.80 --> 0:34:11.400
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK.
0:34:11.950 --> 0:34:19.720
Debra Warrington
And granted, we may not know real close to admission because the patient may get a whole lot better and be able to go home with their family via private auto.
0:34:19.990 --> 0:34:21.410
Debra Warrington
But but then they may not.
0:34:23.370 --> 0:34:23.530
Craig Glazer
OK.
0:34:26.300 --> 0:34:26.730
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK.
0:34:27.120 --> 0:34:28.570
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So yeah, that was the that.
0:34:28.620 --> 0:34:32.350
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
That's that's the direction I've been having was to create the box.
0:34:32.900 --> 0:34:38.790
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Now I know to put it over here so I will complete that and finish that and get it on there, OK.
0:34:38.930 --> 0:34:39.210
Debra Warrington
OK.
0:34:44.300 --> 0:34:45.560
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
This is change the wording.
0:34:45.570 --> 0:34:50.130
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
The first two questions and the patient family disposition and progression form to include agree.
0:34:50.560 --> 0:35:2.750
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I have done that so it says patient family where planned disposition and degree and the patient family where the expected discharge date and agree.
0:35:7.410 --> 0:35:16.40
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
This was a different thing, so I'll skip that for just a moment, correct the spelling errors on the medical progress to be CI.
0:35:16.50 --> 0:35:17.200
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Think I've caught them.
0:35:17.850 --> 0:35:18.290
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
All.
0:35:22.950 --> 0:35:26.590
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
If you guys wanna take a look here with me and see if you see anything.
0:35:27.810 --> 0:35:28.780
Evan Galt
The uh the no.
0:35:28.830 --> 0:35:33.190
Evan Galt
No procedure pending the the first D should be C.
0:35:33.770 --> 0:35:35.630
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I I missed that one, OK.
0:35:37.850 --> 0:35:38.10
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
The.
0:35:39.60 --> 0:35:41.0
Debra Warrington
Now for spell check when you need it. Why?
0:35:41.610 --> 0:35:41.860
Evan Galt
I know.
0:35:45.10 --> 0:35:45.950
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Well, the the best.
0:35:42.880 --> 0:35:48.550
Craig Glazer
And then, umm colon a scope should say they should be colonoscopy and end with a Y.
0:35:51.330 --> 0:35:55.940
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK, well I just copied that off of the email I had.
0:35:55.950 --> 0:35:59.350
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I kind of questioned that one, but I I agree.
0:36:8.520 --> 0:36:8.650
Debra Warrington
A.
0:36:8.660 --> 0:36:9.450
Debra Warrington
Why Monty?
0:36:9.460 --> 0:36:11.870
Debra Warrington
You put it in there again, but it was a long but.
0:36:16.740 --> 0:36:17.250
Debra Warrington
He walked.
0:36:20.190 --> 0:36:25.940
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, that's the bad part about when you're in the build tool of this, you know when you're trying to tackle and get it done.
0:36:25.950 --> 0:36:27.720
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
It doesn't do any spell check in please.
0:36:28.190 --> 0:36:32.170
Evan Galt
Yeah, they they don't have auto correct, so it's.
0:36:31.190 --> 0:36:32.500
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
No, not in the bill.
0:36:32.510 --> 0:36:33.910
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Too often these things no.
0:36:34.560 --> 0:36:35.570
Evan Galt
That's dangerous.
0:36:27.770 --> 0:36:36.860
Debra Warrington
And it is staggering.
0:36:36.170 --> 0:36:37.0
Evan Galt
So used to that now.
0:36:39.70 --> 0:36:40.700
Debra Warrington
Yeah, who tries to spell anymore? It'll.
0:36:41.200 --> 0:36:41.640
Evan Galt
Yeah.
0:36:44.600 --> 0:36:48.710
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK, so I will gonna create those right after you get out the call.
0:36:49.20 --> 0:36:49.280
Debra Warrington
OK.
0:36:50.760 --> 0:37:2.410
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
This one, we said, consider adding waiting on the endoscopy and lung transplant as pending procedures on the medical progression to do to be see since we were putting the in on.
0:37:0.980 --> 0:37:4.60
Craig Glazer
Well, you got it oscopy and I think you can skip lung transplant.
0:37:5.500 --> 0:37:7.960
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK, so we got that here.
0:37:9.890 --> 0:37:12.100
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Move medically stable for discharge.
0:37:12.110 --> 0:37:13.270
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Do they to the top of the section?
0:37:18.460 --> 0:37:19.270
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And I have.
0:37:19.360 --> 0:37:21.550
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Is the patient medically stable for discharge?
0:37:22.140 --> 0:37:24.660
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
The ASK was to see if we could default this to.
0:37:24.670 --> 0:37:29.230
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Now, I'm not saying I want you to do that.
0:37:29.240 --> 0:37:35.140
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I have pinged my epic guru and Wisconsin to see if there's a way.
0:37:35.490 --> 0:37:36.920
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
To default the answer on this.
0:37:37.290 --> 0:37:40.180
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I'm not sure that that can be done, but I'm checking into it.
0:37:40.770 --> 0:37:40.950
Craig Glazer
OK.
0:37:40.720 --> 0:37:44.710
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I looked for a way to do it myself, but I could not see a way to do it.
0:37:47.330 --> 0:37:50.700
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Remove the word today on the question about being medically stable.
0:37:51.560 --> 0:37:51.760
Craig Glazer
OK.
0:37:51.170 --> 0:37:51.970
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Took it out.
0:37:52.110 --> 0:37:58.350
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Use time stamps on flowsheet rows to track discharge milestones and identify reasons for delay.
0:37:59.410 --> 0:38:3.70
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I wasn't quite sure what the ask on this one was.
0:38:3.210 --> 0:38:10.20
Craig Glazer
Just to make sure that we can track it if in the background, not you don't have to show it here, but we need to know.
0:38:9.160 --> 0:38:16.10
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, the function the flowsheet rows do have date and time stamps, so they do.
0:38:15.560 --> 0:38:17.430
Craig Glazer
What about on this tool that you have open?
0:38:23.110 --> 0:38:23.510
Craig Glazer
That's fine.
0:38:20.40 --> 0:38:30.680
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
It does, but it's gonna take a report writer to pull that information because, you know, I do create what's called data elements and the epic where it's recording that data.
0:38:30.690 --> 0:38:32.480
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And it would have time stamps on a yeah.
0:38:33.90 --> 0:38:33.350
Craig Glazer
OK.
0:38:33.360 --> 0:38:34.420
Craig Glazer
Yeah, as long as it's.
0:38:35.50 --> 0:38:37.920
Craig Glazer
I wouldn't think we need it here.
0:38:38.130 --> 0:38:41.320
Craig Glazer
I just think we need to be able to access it after the fact.
0:38:41.330 --> 0:38:52.160
Craig Glazer
So you know, I hear about IR complaints all the time, but like I'm gonna need data on how often is it an IR procedure and what is the average length of delay because of those procedures.
0:38:54.100 --> 0:38:56.820
Craig Glazer
So we'll just need to be able to get at that data.
0:39:0.690 --> 0:39:5.590
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, after you've used the tool for, say a week, maybe 2.
0:39:13.690 --> 0:39:13.890
Craig Glazer
OK.
0:39:35.890 --> 0:39:36.50
Craig Glazer
OK.
0:39:9.390 --> 0:39:37.140
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
What I would do then is I I would get with one of the clarity report writers and calling out where all these data elements and things are and start working with that cuz that's the thing I have to do is I have to say hey, we won't reports from this data and here's where the data elements are and Bill signed to somebody and I'll work with them and show them other out and show them the nuances of well documented and could be changed.
0:39:37.150 --> 0:39:37.900
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And those kind of things?
0:39:40.490 --> 0:39:45.470
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So I think that's everything that I'm responsible for also this listing.
0:39:46.740 --> 0:39:47.370
Craig Glazer
OK.
0:39:48.100 --> 0:39:50.40
Craig Glazer
And then what about the discharge milestones?
0:39:50.50 --> 0:39:50.870
Craig Glazer
Where are we with those?
0:39:50.880 --> 0:39:51.440
Craig Glazer
Are they done?
0:39:54.830 --> 0:39:57.640
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I am not sure if it's completely done.
0:39:57.650 --> 0:40:0.600
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I would have to get Elma to consult with Chris.
0:40:0.610 --> 0:40:2.340
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I know that they're working.
0:40:2.350 --> 0:40:4.610
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I know that this this order hasn't been changed.
0:40:5.950 --> 0:40:12.910
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Elma put in the milestone to check to see if the if we wrote an order for care coordination, would it trigger?
0:40:14.470 --> 0:40:22.40
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
It doesn't immediately trigger because there's a batch process that runs in the background, and while I was working on some of these tests lists.
0:40:22.50 --> 0:40:29.480
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Here Griselda went and created a badge and of course the batch to run and then went back in to see if it created the milestone.
0:40:29.530 --> 0:40:30.290
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
My dad.
0:40:30.340 --> 0:40:34.810
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So I do know that there's some tweaking here that still needs to be done, and now we're gonna change the order of this.
0:40:37.110 --> 0:40:39.790
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But Elma, have you gotten an update from Chris?
0:40:40.610 --> 0:40:41.0
Elma Mendes
Yeah.
0:40:46.80 --> 0:40:46.370
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Thank you.
0:40:41.10 --> 0:40:48.450
Elma Mendes
So I was starting to test them and so that's when I realized today that that had to do with the batch dropping.
0:40:48.780 --> 0:40:55.270
Elma Mendes
And so I'll, I will continue testing them, but I think they are all done according to Chris, they are.
0:40:55.620 --> 0:40:59.610
Elma Mendes
So all we are left to do is to make sure that we test them well.
0:41:0.310 --> 0:41:1.300
Elma Mendes
I've the other.
0:41:1.930 --> 0:41:6.200
Elma Mendes
The other thing about the discharge milestone that Chris is waiting for is this one here.
0:41:6.210 --> 0:41:27.680
Elma Mendes
You know, the one transport requisition we were talking about changing the naming of that so it doesn't confuse with the transportation, umm that is what the care coordination is is going to arrange so that so that we don't have two discharge milestones that are very similar.
0:41:29.70 --> 0:41:40.260
Elma Mendes
Uh, I think the last time we didn't have any nursing representation when we were talking about it, I was just wondering, maybe today if we could talk about the correct naming of of that milestone.
0:41:42.870 --> 0:41:53.130
Elma Mendes
Which I believe is different because it's not, it is, uh, you know, should it be a ride or or something different than transportation arranged?
0:41:59.610 --> 0:42:1.30
Deshonna Taylor
I think you bring up a great point.
0:42:2.330 --> 0:42:4.620
Deshonna Taylor
Byron, what are your thoughts on that?
0:42:4.630 --> 0:42:8.150
Deshonna Taylor
You've been at the bedside closer to the time that I have.
0:42:12.750 --> 0:42:18.460
Byron Carlisle
I unfortunately got pulled into another call and so I unfortunately do not have an answer.
0:42:25.930 --> 0:42:43.470
Deshonna Taylor
I want to make a distinction between transport within the hospital and transport without it outside of the hospital and and to be able to distinguish between the two so that the nursing staff does not get confused.
0:42:45.890 --> 0:42:47.220
Byron Carlisle
I think that that would be appropriate.
0:42:52.930 --> 0:42:53.230
Byron Carlisle
And.
0:42:48.580 --> 0:42:56.380
Deshonna Taylor
Do you have any verbiage that would be better used for an outpatient, you know, transport?
0:43:2.110 --> 0:43:3.70
Deshonna Taylor
That put you on the.
0:43:3.620 --> 0:43:4.270
Byron Carlisle
Yeah.
0:43:4.320 --> 0:43:7.320
Byron Carlisle
No, I'm just trying to think what we would use.
0:43:9.810 --> 0:43:22.20
Debra Warrington
Well, I would think we would use arrangements made with family because if we're, if we're sending the patient by ambulance or by wheelchair van, we're making that arrangement.
0:43:23.410 --> 0:43:33.920
Debra Warrington
But if they're if the transportation with family has been confirmed or requested, that's coming from the bedside nurse at the time or near the time the patients gonna be ready to roll.
0:43:34.170 --> 0:43:39.570
Debra Warrington
The other option is transporter requested slash lift ride.
0:43:43.340 --> 0:43:48.800
Briana Witherspoon
Could we use the same verbiage that's in the nursing flow sheet where the nurses document just for sake of consistency?
0:43:58.400 --> 0:44:1.490
Byron Carlisle
I think that that would make sense if there is some verbiage.
0:44:3.580 --> 0:44:9.250
Byron Carlisle
It's been a while since I've looked at discharge paperwork just because I was in the ICU as opposed to the floor.
0:44:10.790 --> 0:44:11.270
Byron Carlisle
Uh.
0:44:11.690 --> 0:44:15.80
Byron Carlisle
And so it wasn't too frequent that we would discharge patients.
0:44:18.840 --> 0:44:30.370
Elma Mendes
So I don't think right now that there there's actually a, there's not a flowsheet row that they document with that you know the the transportation mode with within the discharge milestones.
0:44:31.900 --> 0:44:36.630
Elma Mendes
Monty, if you could just open up, add a delay this couple of options.
0:44:40.350 --> 0:44:41.390
Elma Mendes
If you Scroll down.
0:44:45.930 --> 0:44:54.740
Elma Mendes
So here we have ride with wheelchair van like we talked to before, but I don't think we have any other turns.
0:44:53.870 --> 0:44:55.370
Debra Warrington
There were some at the very top.
0:44:59.110 --> 0:44:59.710
Elma Mendes
Oh, there we go.
0:45:9.440 --> 0:45:14.910
Debra Warrington
Because we do ask the skilled nursing facilities to pick the patient up because that's at no cost to us.
0:45:29.270 --> 0:45:38.920
Elma Mendes
So it isn't a Debra isn't the difference between uh, you know this, that's transportation is that one, one is the day of discharge.
0:45:38.930 --> 0:45:49.600
Elma Mendes
The other arrangement is done beforehand because that discharge milestone that care coordination well, we'll have.
0:45:49.910 --> 0:45:50.360
Elma Mendes
Do you know?
0:45:50.370 --> 0:45:53.510
Elma Mendes
We'll follow up with the directed from the.
0:45:53.870 --> 0:45:55.460
Elma Mendes
Care coordination referral, right?
0:45:56.300 --> 0:46:0.420
Elma Mendes
Because that's the only way how that discharge milestone is going to be added.
0:46:2.570 --> 0:46:19.760
Elma Mendes
So so we have the transportation discharge milestone that is triggered by the care coordination referral order and then this one here that's called the discharge transport requisition is the day of discharge that is automatically populating at the day of discharge.
0:46:21.930 --> 0:46:24.230
Elma Mendes
So what is the difference between those two?
0:46:24.310 --> 0:46:29.0
Elma Mendes
The what should the naming be to add between those two?
0:46:31.810 --> 0:46:32.660
Elma Mendes
That is the question.
0:46:35.40 --> 0:46:58.290
Debra Warrington
Yeah, one is transport, like we're calling for a wheelchair van for skilled nursing to provide and the other one is more like a ride with family, you know, to me transportation, when I think of transport, I'm thinking of ambulance type transport versus families don't normally transport their loved ones.
0:46:58.300 --> 0:47:1.10
Debra Warrington
They give them a ride or you know what I'm saying?
0:47:1.20 --> 0:47:3.530
Debra Warrington
That that, to me would be the best way to designate.
0:47:6.340 --> 0:47:6.980
Debra Warrington
Brought home.
0:47:13.740 --> 0:47:20.530
Debra Warrington
But like we may just need to ask some of our staff nurses that do this all the time, how we could best differentiate.
0:47:25.0 --> 0:47:25.140
Elma Mendes
Right.
0:47:28.60 --> 0:47:34.640
Elma Mendes
I I'll I have a agenda spot on the Nurse Practice Council for tomorrow if that would be.
0:47:37.280 --> 0:47:45.80
Elma Mendes
Where I you know if that would be a good, uh feedback from them, would that be OK with you deshonna, Brian Byron.
0:47:46.930 --> 0:47:47.990
Deshonna Taylor
I think that be great.
0:47:49.450 --> 0:47:49.970
Byron Carlisle
I would agree.
0:47:49.520 --> 0:47:51.370
Elma Mendes
OK, so that's perfect.
0:47:51.380 --> 0:47:51.720
Elma Mendes
Thank you.
0:47:50.910 --> 0:47:57.900
Deshonna Taylor
Because I thinking of transportation, think of internal transportation and not necessarily.
0:47:58.870 --> 0:48:0.160
Deshonna Taylor
Transportation.
0:48:0.210 --> 0:48:1.480
Deshonna Taylor
How they'll be moving.
0:48:2.110 --> 0:48:3.630
Deshonna Taylor
And so I think it'd be a great idea.
0:48:6.240 --> 0:48:17.20
Debra Warrington
So Deshonna, just for clarity, are you saying we need to differentiate between transport internally transport at discharge versus the ride home?
0:48:18.410 --> 0:48:18.830
Deshonna Taylor
Right.
0:48:19.700 --> 0:48:33.90
Debra Warrington
OK, because I do frequently tell my staff when they call me, I'm like, well, how are we transporting this patient throughout the hospital if we're able to transport this patient by wheelchair, why aren't we sending this patient out by wheelchair?
0:48:33.100 --> 0:48:40.590
Debra Warrington
Van Well, it may be because they're confused and they can't be left unattended, which is medical necessity for ambulance.
0:48:41.60 --> 0:48:42.670
Debra Warrington
But you see what I'm saying?
0:48:42.680 --> 0:48:46.640
Debra Warrington
It does help to know how that patients being transported within the facility.
0:48:48.230 --> 0:48:49.270
Deshonna Taylor
Yeah, got it.
0:48:55.20 --> 0:49:7.490
Homer Walag
Elma, I have a clarification to the uh when you say add milestones and then I'm seeing here PT discharge readiness OT discharge readiness and SLP discharge readiness, does that mean that?
0:49:7.500 --> 0:49:8.260
Homer Walag
Does this mean that?
0:49:10.660 --> 0:49:13.430
Homer Walag
And outpatient PT or outpatient.
0:49:13.440 --> 0:49:18.400
Homer Walag
Lt has been prepared already or this is basically from the acute side of things.
0:49:22.730 --> 0:49:29.830
Elma Mendes
So this list that you were seeing on the screen right now, the PT OT discharge readiness that is.
0:49:32.800 --> 0:49:35.850
Elma Mendes
That that we just where do you?
0:49:35.940 --> 0:49:37.420
Elma Mendes
Where did you get that from Monty?
0:49:40.640 --> 0:49:43.210
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
This is if you say add milestones.
0:49:43.300 --> 0:49:45.50
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
They have been there.
0:49:45.260 --> 0:49:47.730
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I don't know what triggers them.
0:49:47.740 --> 0:49:49.420
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I mean, I could go look I.
0:49:52.970 --> 0:49:53.290
Homer Walag
OK.
0:49:52.730 --> 0:49:55.890
Elma Mendes
Yeah, that that was done before.
0:49:54.690 --> 0:49:56.380
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I don't even know who he used.
0:49:56.430 --> 0:49:57.920
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
It's gone a long time ago.
0:49:57.930 --> 0:50:4.770
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I don't even know if they're utilized and I'm not sure what triggers them because I've never really seen them triggered on an account that I've looked at.
0:50:6.570 --> 0:50:17.240
Homer Walag
Because uh, from this information that I'm seeing, it looks like a discharge planning arrangements from the Kirk coordination referral form.
0:50:20.860 --> 0:50:22.140
Elma Mendes
So there is a mixture here.
0:50:22.150 --> 0:50:40.60
Elma Mendes
This is why I don't know exactly where it's coming from, because the care coordination referral that's triggering the discharge milestones for this project that we built was the DNA tube feeds, home, healthcare, dialysis placement, hospital outpatient rehab, home infusion and transportation, but not these last three.
0:50:41.390 --> 0:50:43.420
Elma Mendes
And so these these last three.
0:50:41.580 --> 0:50:44.360
Homer Walag
Well, that's yeah, transportation is there.
0:50:44.370 --> 0:50:49.690
Homer Walag
However, from the care coordination referral form, it states outpatient rehab.
0:51:2.580 --> 0:51:2.820
Homer Walag
Correct.
0:50:52.470 --> 0:51:8.690
Elma Mendes
Well, on the care coordination referral form, there is a you you know there's a selection where if the patient needs to have outpatient rehab for care coordination to to set it up, that is when that would be selected.
0:51:10.390 --> 0:51:10.720
Homer Walag
Umm.
0:51:8.700 --> 0:51:15.230
Elma Mendes
But these last three PT discharge readiness OT discharge readiness and SLP discharge readiness.
0:51:15.240 --> 0:51:20.830
Elma Mendes
Like Monty said, their old ones, we I do not know who created them and what what triggers them.
0:51:21.650 --> 0:51:21.950
Homer Walag
OK.
0:51:25.340 --> 0:51:27.650
Debra Warrington
I don't either, quite honestly, and I've asked in the past.
0:51:32.220 --> 0:51:32.650
Homer Walag
Who will give?
0:51:32.110 --> 0:51:49.220
Craig Glazer
It sounds like we can look at cleaning some of this stuff up later then, because I suspect if no one knows that someone had someone's been adding it manually for patients where they were like waiting for PT to clear or something like that is what I suspect is happening now.
0:51:49.230 --> 0:51:52.950
Craig Glazer
Now, but we can investigate it later, I think.
0:51:53.510 --> 0:51:53.650
Debra Warrington
Yeah.
0:51:56.550 --> 0:51:56.740
Homer Walag
Yeah.
0:51:56.750 --> 0:52:8.290
Homer Walag
Because then for home health care, then there's another trigger that would ask from the care coordination referral if there's lymphedema needs for that particular patient.
0:52:13.330 --> 0:52:20.630
Elma Mendes
So Homer, just to clarify that these discharge milestones are at the at a higher level and not specifics.
0:52:21.240 --> 0:52:21.480
Homer Walag
OK.
0:52:33.200 --> 0:52:33.630
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah.
0:52:33.640 --> 0:52:52.400
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And the kind of just expound upon that, I mean, based upon the home health care that they needed or if they needed DM me, some of that is actually being clarified within the care coordination progression towards discharge when we get to those areas for home health.
0:52:52.980 --> 0:52:57.810
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And once that order is written, it'll trigger the home health.
0:53:0.310 --> 0:53:2.180
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Well, we can just say it'll trigger the IT.
0:53:2.190 --> 0:53:6.20
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Let's just say we trigger the damning since they don't have the home health there.
0:53:6.130 --> 0:53:43.140
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But if we have that on here, that would get, that would get triggered by the order for care coordination to arrange the DNA, and then once they're down here, the specifics for the DME, like the the oxygen that we're waiting for, do we need it now doesn't need to be delivered bedside, does it need to be delivered to home if some of the specifics that they're documenting in their progression towards discharge and then once they complete that DME referral and on the flowsheet Reser documenting on it's going to satisfy this milestone.
0:53:45.440 --> 0:53:56.180
Debra Warrington
So just to clarify, are we adding the care coordination milestones to this view right here when we've actually got it down below, why would we want to do that?
0:53:57.930 --> 0:54:3.290
Craig Glazer
This is how you get them put in manually or you would put it in or or.
0:54:3.300 --> 0:54:8.40
Craig Glazer
They're populating automatically, he's just has the section open right money.
0:54:7.500 --> 0:54:8.270
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah.
0:54:8.390 --> 0:54:13.680
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Now when that DME order gets written, it's gonna create the milestone.
0:54:15.650 --> 0:54:16.690
Debra Warrington
Here or down below.
0:54:16.460 --> 0:54:17.200
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I'm not mom.
0:54:18.880 --> 0:54:23.260
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
It's gonna create it up here in the milestone.
0:54:24.500 --> 0:54:28.830
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So once that order is written, we're creating the milestone for DMA.
0:54:34.220 --> 0:54:34.540
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And then.
0:54:33.270 --> 0:54:40.700
Elma Mendes
It's automatically created and you don't have to go and select it, but I think there's a manual option, right?
0:54:41.830 --> 0:54:53.80
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, you can add an email milestone manually that you wanna add and I just added it manually, but when the order gets written for care coordination to do a DME referral, it's gonna create that DMM milestone up there.
0:54:53.350 --> 0:54:59.520
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Now as you guys through your progression down here, we're seeing here that we still have the Amy outstanding.
0:54:59.770 --> 0:55:3.60
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
We may come down here to see where we're at in that process.
0:55:3.750 --> 0:55:8.590
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
You're still waiting for insurance approval, and we're going to see that with our banner down here.
0:55:10.610 --> 0:55:19.470
Elma Mendes
Monte, could you just go into the uh care coordination progression towards discharge and complete the DM and see if that will complete it, whether it's at it manual or by the order?
0:55:19.480 --> 0:55:20.790
Elma Mendes
Could you just do that quickly?
0:55:21.180 --> 0:55:24.890
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Well, it would take a batch run for it to.
0:55:25.40 --> 0:55:25.990
Elma Mendes
Ohh, I see.
0:55:26.480 --> 0:55:27.110
Elma Mendes
That's right.
0:55:27.340 --> 0:55:30.160
Elma Mendes
Sorry, I would actually did it.
0:55:27.420 --> 0:55:31.110
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And and well, it actually did just complete right then.
0:55:31.770 --> 0:55:35.760
Griselda Cardenas
Because the batch actually runs every hour, so it's about at 2:00 o'clock.
0:55:35.770 --> 0:55:37.860
Griselda Cardenas
So yeah, you just caught it just in time.
0:55:40.650 --> 0:55:41.820
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Right at the right time.
0:55:42.150 --> 0:55:47.540
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But yeah, if this wasn't satisfied yet, you would look down here and you'd say, oh, we're still looking for interns approval.
0:55:47.850 --> 0:55:49.620
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
That's why that's not done yet up there.
0:55:50.650 --> 0:55:52.470
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
So here you can see that it's going on.
0:55:52.480 --> 0:56:0.500
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
This when you come in here, then you'll see those milestones here and then we can see well these milestones aren't completed yet.
0:56:0.510 --> 0:56:1.340
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Why not?
0:56:1.470 --> 0:56:6.100
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And we will look at our plan and then we'll see where we're at on that progression.
0:56:8.370 --> 0:56:8.600
Debra Warrington
Yeah.
0:56:12.350 --> 0:56:20.110
Craig Glazer
Alright, so we're at time, I mean, to me, I think you guys just have some final touches.
0:56:20.180 --> 0:56:41.50
Craig Glazer
Um, but you're we're basically got this thing ready to launch, so that with those final touches and yeah, we can take one quick look at them before pilot, but I feel like the next time we can really talk about training in money and Elma, when do you think you can move this to a place that everyone could see it and show it to their teams?
0:56:41.60 --> 0:56:44.40
Craig Glazer
I don't know if that's playground or POC or sub or what but.
0:56:48.40 --> 0:56:48.890
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Ohm.
0:56:49.820 --> 0:56:54.460
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, I mean, I could go through and I yeah compile it.
0:56:54.510 --> 0:57:3.220
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And because there's a lot of items, compile it on a on a Mac content management ticket, and then we can get it moved where we'd like to.
0:57:3.570 --> 0:57:16.420
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
The one thing I kind of have to figure out that I need to talk to somebody about and resulting probably on me with that is once we move it into that environment, how do we make it available to who needs to see it?
0:57:16.430 --> 0:57:19.920
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Who all's gonna want that have access to this navigator?
0:57:22.930 --> 0:57:23.370
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
With me.
0:57:22.100 --> 0:57:24.80
Craig Glazer
You for the training or in in the long run.
0:57:26.110 --> 0:57:26.910
Craig Glazer
Uh, yeah.
0:57:25.750 --> 0:57:28.270
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Ohh yeah for training and for go live.
0:57:27.50 --> 0:57:29.850
Griselda Cardenas
Because yeah, for the pilot group.
0:57:30.210 --> 0:57:32.380
Craig Glazer
I mean, I think everyone should have access to it, don't you?
0:57:33.350 --> 0:57:33.550
Griselda Cardenas
OK.
0:57:36.340 --> 0:57:43.130
Griselda Cardenas
Do you wanna just specifically just to the neurology and cardiology that we were gonna pilot with or should it be available for everybody?
0:57:42.650 --> 0:57:44.590
Craig Glazer
I would just, I mean it.
0:57:44.600 --> 0:57:47.430
Craig Glazer
It's gonna take something active to go look for it, right?
0:57:47.440 --> 0:57:48.940
Craig Glazer
So I would just make it available.
0:57:47.820 --> 0:57:49.820
Griselda Cardenas
Yep, OK.
0:57:50.30 --> 0:57:51.870
Craig Glazer
That way it's easier for you and you don't have to.
0:57:51.880 --> 0:57:54.720
Craig Glazer
Then go Adam one team at a time and everything else. So.
0:57:55.420 --> 0:57:55.610
Griselda Cardenas
It.
0:57:59.230 --> 0:58:0.680
Craig Glazer
If people start saying what is it?
0:58:0.690 --> 0:58:5.590
Craig Glazer
I want it then that'll just tell us who's the next group to pilot it after the first two.
0:58:8.320 --> 0:58:8.590
Griselda Cardenas
Gotcha.
0:58:15.210 --> 0:58:15.480
Craig Glazer
Right.
0:58:15.490 --> 0:58:16.240
Craig Glazer
So if you can do that.
0:58:17.310 --> 0:58:26.740
Craig Glazer
Um, once it's in a place that everyone gets you let us know and you know Brianna and Abby and Jennifer and the other.
0:58:26.830 --> 0:58:34.950
Craig Glazer
Brendan not can kind of start showing it to people and start thinking about like ideas on how to train may just be tip sheets and then.
0:58:36.750 --> 0:58:41.700
Craig Glazer
Well, maybe I'll talk to you and Deb separate about like getting started on that with the cause.
0:58:41.710 --> 0:58:45.0
Craig Glazer
I think since the case managers are gonna run in the meeting, then we should.
0:58:45.990 --> 0:58:49.310
Craig Glazer
That would be the that would be the the main focus group for training, I think.
0:58:56.950 --> 0:58:57.400
Craig Glazer
All right.
0:58:57.570 --> 0:58:58.10
Griselda Cardenas
Sounds good.
0:58:57.510 --> 0:58:58.180
Craig Glazer
Anyone else?
0:58:58.750 --> 0:58:59.880
Craig Glazer
Anyone else have any other thoughts?
0:59:4.660 --> 0:59:5.770
Craig Glazer
Alright, great work.
0:59:5.850 --> 0:59:6.540
Craig Glazer
Thank you everybody.
0:59:8.180 --> 0:59:8.590
Griselda Cardenas
Thank you.
0:59:8.330 --> 0:59:8.610
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK.
0:59:8.600 --> 0:59:8.750
Griselda Cardenas
Bye bye.
0:59:8.420 --> 0:59:9.10
Evan Galt
Thanks everybody.
0:59:8.620 --> 0:59:9.410
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Elma and Deborah.
0:59:9.20 --> 0:59:9.460
Evan Galt
Thanks, mommy.
0:59:11.130 --> 0:59:11.690
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Thank you.
0:59:10.930 --> 0:59:11.960
Griselda Cardenas
Debra already hopped off.
0:59:11.700 --> 0:59:14.100
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I'm a Deborah bummer, Elma.
0:59:13.490 --> 0:59:14.660
Evan Galt
That Deb had to hop off.
0:59:17.0 --> 0:59:17.790
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
It's almost alone.
0:59:18.400 --> 0:59:18.600
Craig Glazer
No.
0:59:19.160 --> 0:59:20.990
Griselda Cardenas
No, I think she hopped up as well too.
0:59:20.370 --> 0:59:21.460
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
OK.
0:59:21.930 --> 0:59:22.90
Evan Galt
It's.
0:59:22.140 --> 0:59:23.70
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
That was a dollar short.
0:59:23.80 --> 0:59:25.200
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
The day later I'll get with them.
0:59:24.720 --> 0:59:25.700
Griselda Cardenas
Alright, OK.
0:59:25.410 --> 0:59:32.110
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Yeah, because we're we're gonna have to get with them to do the triggers on each one of these other categories here for.
0:59:33.620 --> 0:59:33.900
Evan Galt
OK.
0:59:36.290 --> 0:59:36.560
Evan Galt
Yeah.
0:59:36.330 --> 0:59:37.770
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
And that's probably got.
0:59:36.570 --> 0:59:37.970
Evan Galt
Do you think you'll have that for next time?
0:59:37.980 --> 0:59:39.490
Evan Galt
Money or TBD?
0:59:41.300 --> 0:59:41.950
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I can.
0:59:41.220 --> 0:59:43.80
Griselda Cardenas
It will depend on how. Yeah.
0:59:42.0 --> 0:59:51.770
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
I'm probably, yeah, it depends on how many that we, but they define what they want to triggers to be and what they want the banner to display.
0:59:54.170 --> 1:0:6.880
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
There was a great exercise for me doing this one because it's with the rule writing got a little tricky because we have multiple select, you know, and usually with those rules you're just looking for a single item.
1:0:6.890 --> 1:0:19.160
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
But I figured it out and got it to work and but we have some multi select and things and these things and we just need to know what we want to display on the banner and what we trigger it off of in that flow.
1:0:19.520 --> 1:0:19.830
Evan Galt
O that.
1:0:19.410 --> 1:0:27.280
fc3565b7-84be-42bd-9b19-4e9abd5d3d96
Then there's 1234 of them, you know, home health, I think, is probably fairly quick, Hospice, fairly quick.
`;
const regex = /\d+:\d+:\d+\.\d+ --> \d+:\d+:\d+\.\d+\n/g;
inputString = inputString.split(regex).join('');
// estimate approximate max tokens to use in GPT prompt so length doesn't exceed 4096 tokens
const maxTokens = 3000;
const tokensToCharsMultiplier = 3.5;
const maxStrLength = maxTokens * tokensToCharsMultiplier;
// split string into chunks smaller than 10500 char length
function splitString(str) {
  if (str.length <= maxStrLength) {
    return [str];
  } else {
    // Split the string into chunks of maximum length 10500
    const chunks = [];
    for (let i = 0; i < str.length; i += maxStrLength) {
      chunks.push(str.slice(i, i + maxStrLength));
    }
    return chunks;
  }
}
inputString = splitString(inputString);

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
    const openai = new OpenAIApi(new Configuration({
      apiKey: process.env.OPENAI_API_KEY_MINUTES_MAKER,
    }));

    try {
      // Call parseMinutesWithGpt for each element in the inputString array
      const responses = await Promise.all(inputString.map(str => parseMinutesWithGpt(str, openai)));
      return responses;
    } catch (error) {
      // handle 400/429/etc. response errors
      if (response.status !== 200) {
        console.log(response);
      } else {
        console.error(error);
      }
    }
  };

  const meetingMinutes = await sendRequest(inputString);
  console.log('Generating meeting minutes...')
  console.log(`Meeting minutes generated! ${JSON.stringify(meetingMinutes)}`);
};

run();

// @todo add ability to send multiple requests and chain the responses to a single meetingMinutes & action items string
// @todo check how to prevent reg-ex from changing arrow to %20 symbol
// @todo consider final prompt to reformat summary discussion and action items