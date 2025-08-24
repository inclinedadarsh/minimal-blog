---
title: "Meeting My Peers at Google DeepMind"
datePublished: 2025-06-02
seoTitle: "Meeting My GSoC Peers at Google DeepMind"
seoDescription: "Getting to know my fellow GSoC contributors at Google DeepMind, from robot dog builders to ML researchers. Here's what happened during community bonding and why I'm excited about the people I'll be working with this summer."
tags: ['gsoc', 'worklog']
notebookLM: "https://notebooklm.google.com/notebook/5141f194-2982-4e2c-9f6a-a817dda0a6f1?artifactId=16f3f17d-7fa6-4ab4-8c8f-bba626e9c5fc"
---

Hey everyone! 👋

Most of you probably already know me if you're reading this, but for those who don't - I'm Adarsh and I got selected for Google DeepMind's program this year. This blog series is all about my GSoC '25 journey. Think of it as my weekly worklog where I'll share what I've been working on, what's still left to do, and what I'm planning for the next week.

Following up from my [previous blog](https://blog.adarshdubey.com/blog/gsoc-2025-google-deepmind), this one's about the community bonding period. The community bonding period ran from May 8 to June 1, so almost a full month. However, I didn't get to code anything during this time because I had my 6th semester engineering exams going on.

## People I'm working with

Though I didn't code a lot, a lot of things did happen during this time, and the most exciting part was meeting my peers. I finally got to know the other contributors, and woah! I absolutely love the group I'm in. There are around 44 students in the DeepMind organization, and first thing we did was get invited to our official Google Chat (yep, that's our main way of communicating!).

After that, some folks in the org created an unofficial Discord server for all the DeepMind contributors so we could get to know each other better. That's where I met some really amazing people who I'll be bonding with, coding alongside, and just having fun with over the next few months.

Some of these amazing folks include [Green Code](https://www.youtube.com/@Green-Code) (hell yeah, he's in DeepMind too - pretty excited to be working alongside him), [Rodrigo Sagastegui](https://www.linkedin.com/in/rodrigosagastegui/) (this guy's literally building a [robot dog](https://youtu.be/o4HV_wnNwyg?si=3QxoMx7TjQ-gSyYK), he's such a gem to talk to), and [Jet Chiang](https://www.linkedin.com/in/jet-chiang/) (he's an ML researcher at NUS, and we're actually collaborating on our GSoC project - more on that later). And let me tell you, this list isn't even close to exhaustive, there are so many other incredible people I could talk about.

My mentor for this program is [Paige Bailey](https://www.linkedin.com/in/dynamicwebpaige/) and I'm really excited to build my project with her guidance. Even though she's super busy, she's been incredibly supportive and welcoming to all of us. We also have plenty of other mentors we can reach out to if needed, so I'm definitely planning to connect with at least a handful of them.

## My project progress

Like I mentioned in my previous blog, I already had a prototype ready for my proposal. So to start off, I was just trying to see if I could get it working on Google Vertex AI so that way I'd have something to show the mentors and get their feedback. Funny enough, Jet is doing something very similar, but he's working with Google Cloud Run instead. I think we're both just really excited to get things rolling.

But here's the thing, we both kinda suck at this, especially when it comes to ML deployment stuff. The good news is that a lot of our mentors are actively working on Google Cloud Run and other services, so we'll be reaching out to them over the next few weeks to get some help.

While we were talking about how to get started, I realized his architecture was way better than mine (I mean, mine was literally just a couple of Jupyter notebooks). His setup actually included a way to integrate with Google Cloud Run later when we deploy the project. Looking at the bigger picture, we decided to move forward with his prototype while trying to reuse some parts from mine.

![Architecture Diagram](/images/gsoc-community-bonding/architecture-diagram.jpeg)
_This is a very simple architecture overview. A lot of things will definitely change as we build._

Right now we have a pretty good idea of what we'll be working on this summer and how we're approaching the project. We've also roughly divided up the work between us, but the main goal is for both of us to work on things we haven't done before; that way we both step out of our comfort zones and actually learn during this program.

## What's next?

This is a question I've been asking myself a bunch of times, and while it's still not crystal clear, I have a rough idea of what we're going to do.

My next immediate goal is setting up the project locally on my machine and getting familiar with the codebase. I'll also be learning how Google Cloud Run works so I can stay in sync with Jet. After that, we'll start working on the data preprocessing pipeline. I'll handle all the text-related stuff while Jet works on preprocessing the images. We don't really know exactly how this is gonna work out, but I think that's part of the fun, right?

The long-term goal is to have the core fine-tuning pipeline set up on Google Cloud Run before mid-term evaluations, and to have a working product by the end of the program. We really don't want to just graduate through the program - we actually want to build something useful, something that makes fine-tuning easier for people.

We have so many features in mind that it's almost a never-ending list. To keep things simple and doable, we're trying to sort the features by priority and tackle the high-priority stuff first. Hopefully, we'll be able to create something really useful by the end. The repo is private right now because it's pretty disorganized, but we'll be making it public very soon.

## Conclusion

So yeah, that pretty much sums up my community bonding period. I'll post the next blog very soon, which will be about my progress from the first week. Things seem a bit slow right now, but I like how everything's falling into place. Hopefully I'll be speeding up by the end of week 1 or 2.

If you enjoyed reading this blog, you can [follow me on Twitter](https://x.com/inclinedadarsh) where I post updates from the program and other stuff I'm working on.

Thanks for reading 😊