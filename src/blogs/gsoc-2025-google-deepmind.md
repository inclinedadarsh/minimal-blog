---
title: "Landing GSoC 2025 with Google DeepMind"
datePublished: 2025-05-14
seoTitle: "Landing GSoC 2025 with Google DeepMind"
seoDescription: "Discover how I navigated the journey to securing a project with Google DeepMind for GSoC 2025. In this blog, I share my background, the steps I took in preparation, the challenges I faced, and how I made it through the application process. From learning new skills to working on prototypes, this is the first chapter of my GSoC experience."
---

Hey everyone 👋,

I'm Adarsh, a third-year B.Tech undergrad student, specializing in Artificial Intelligence and Data Science. Recently, I got selected for Google Summer of Code 2025 under the Google DeepMind organization. *(Can't tell you how happy I am!)*

This blog series will be about my GSoC '25 journey. I'll be releasing a blog *each week*, describing the work I’ve done the previous week, the difficulties I faced and how I solved them, and what I'm looking forward to. I'll also be *hopefully* making YouTube vlogs along with this, trying to capture as many things as I can. So if you're into that, you can [subscribe to my channel](https://youtube.com/@inclinedadarsh).

![X announcement screenshot](/images/pre-gsoc/tweet-ss.png)

I'm starting with this blog because a lot of people have been asking me how I got into Google DeepMind, what my preparations were, and about my proposal. So if you're one of those then this one's for you! I'll be talking about my background, prep for GSoC '25, project details, and will also be sharing my proposal too!

> I know a lot of people might want to skip straight to the proposal part, so if that's the case for you, check out [Proposal](#proposal).


## Background

I got really into websites back in 11th grade, so I started designing and developing them just for fun. It’s been more than two years now that I’ve been working as a freelance web developer at various places. I’ve always enjoyed both designing and building websites. Focusing on user experience has always been my main priority, and I love the idea of making things more accessible through the web.

When I started my degree, I got super curious about machine learning and began exploring it out of pure interest. Making machines learn felt like magic, and honestly, it still does. These days, I’ve been deep-diving into LLMs and trying to understand how they actually work. I’ve given several talks on machine learning topics at local tech meetups and have always been fascinated by what goes on behind the scenes. With the recent boom in LLMs, I’ve developed a strong interest in fine-tuning models.

I first heard about GSoC from [Kunal Kushwaha](https://www.youtube.com/@KunalKushwaha/), and since then, it’s been on my radar. Last year, my friend [Shreyash Saitwal](https://www.linkedin.com/in/shreyashsaitwal/) was a GSoC 2024 contributor for the MIT App Inventor organization, and that really got me excited to apply this year!

## Timeline

### Pre-organization announcement

To increase my chances of landing a project in the program, I started contributing to [Aeon](https://www.aeon-toolkit.org/), which comes under the NumFOCUS umbrella organization. This was even before the projects were announced—around December last year. Here's my first-ever comment on an issue in the Aeon project: [https://github.com/aeon-toolkit/aeon/issues/1430](https://github.com/aeon-toolkit/aeon/issues/1430#issuecomment-2550500041). While I initially thought it was a simple documentation fix, the maintainers started discussing it in depth, and it turned into a major API design revision. That eventually became a GSoC project in itself.

![Aeon's PR Comment SS](/images/pre-gsoc/aeon-pr-comment-ss.png)

This gave me a huge confidence boost and the assurance that, if nothing else, I could at least apply for this project. But I wanted to work on something big—something that would push me to learn new concepts during GSoC—so I kept contributing to Aeon across multiple issues.

Around January, Aeon released its project list for the 2025 season. Among all the projects, the one that really caught my eye was [**Project #3: Forecasting - Deep learning for forecasting**](https://github.com/aeon-toolkit/aeon-admin/blob/main/gsoc/gsoc-2025-projects.md#project-3-forecasting---deep-learning-for-forecasting). I loved it because, at the time, I was already diving deep into deep learning models—so this felt like the perfect opportunity to apply that knowledge to something practical.

### Organization announcement

The GSoC organizations were announced on the 27th of February, and while browsing through the list, I found that *for the first time ever* Google DeepMind was participating! For a few days, I kept telling myself not to even think about applying to DeepMind. But eventually, I convinced myself: I’m going to apply. Since I was already contributing to Aeon, I had the confidence that if nothing worked out, I could still submit a solid proposal there—so applying to DeepMind felt like a risk I could afford.

I had been really interested in working with LLMs over the past couple of months, but for one reason or another, I kept thinking I didn’t know enough to get started. But with the excitement of possibly contributing to DeepMind, I picked up [Hands-On Large Language Models](https://www.llm-book.com/). I got hooked right from the start and ended up finishing the entire book in just a few weeks!

At the same time, I didn’t want to lose focus on Aeon. So to better understand time series data and how deep learning can be applied to forecasting, I started reading [Time Series Forecasting in Python](https://www.manning.com/books/time-series-forecasting-in-python-book).

Honestly, this was one of the most fun parts of my preparation, though others might find it boring. But for me, just reading the books and running the code exercises was super engaging, for both the LLM and time series books.

While doing all this, I also started looking through Google DeepMind’s project list to find something that interested me and felt *doable*. That’s when I came across [**Gemma Model Fine-tuning UI**](https://gist.github.com/dynamicwebpaige/92f7739ad69d2863ac7e2032fe52fbad#:~:text=Gemma%20Model%20Fine%2Dtuning%20UI). I've always believed that simple web apps can lower the barrier to complex tools, and this project was literally about doing just that. It would push me to learn how to fine-tune LLMs and let me build a web app to make the process easier for others. What more could I ask for? I was absolutely sure: *this* was the project I was going to apply to.

### Proposal submission begins!

By this point, I had a solid understanding of both projects thanks to the books and exploration I’d done. I was confident I could write two strong proposals and now the only thing left was to actually write them. To make them stand out, I decided to build prototypes for each project, giving a MVP of what I was proposing.

Implementing the prototype for Aeon’s project was straightforward. I had to understand the requirements, read about the existing models, and implement new ones. The tricky part was aligning my implementation with Aeon’s codebase standards. Since I’d be contributing to their actual codebase during GSoC, following their structure was crucial. It showed I wasn’t just familiar with the topic but could also work seamlessly within their ecosystem.

After a few iterations, I built a solid prototype: three deep learning models using Keras, structured according to Aeon’s repository standards. (More technical details are in the proposal.)

Google DeepMind’s prototype, however, was a different story. I’d never fine-tuned a model before, so before I even thought about the UI, I first had to learn how to fine-tune one myself. What sounds easy now was anything but. It took 10+ failed attempts just to wrap my head around what was going on. But that’s also what made me more passionate about the project because I knew exactly how hard it is for beginners, and how valuable a good UI could be. Eventually, I was able to fine-tune a model and understood how things worked behind the scenes—PEFT, LoRA, and all the other core concepts.

![Fine-tuned model screenshot](/images/pre-gsoc/hf-model.jpg)

Then came the UI prototype. My initial choices were Streamlit or Gradio. I went with Streamlit since I had used it before (*spoiler: bad decision*). Streamlit's architecture didn’t suit the needs of the project, its synchronous flow just didn’t work well here. After a few failed attempts and a chat with ChatGPT, I realized Gradio was the better fit with its async support and event-driven design.

After a couple of tries, I was able to finall build a working prototype, that was able to load a dataset, choose a model and tuning parameters, fine tune the model and push it to the hub!

A couple of tries later, I had a working prototype! You could simply load a dataset, choose a model and tuning parameters, fine-tune it, and push it to the Huggingface Hub!

Once the prototypes were done, I began writing both proposals. I ended up submitting them just **2 minutes** before the deadline and spent the final minute switching my first preference to Google DeepMind.

### Projects announcement!

After months of learning, building, and refining prototypes, I was finally selected for **Google Summer of Code 2025 with Google DeepMind**! 🎉

You can check out my project here: [Implementing Web Interface For Fine-Tuning Gemma Models Using Gradio](https://summerofcode.withgoogle.com/programs/2025/projects/6ep1Zcf2)

![GSoC Project Screenshot](/images/pre-gsoc/gsoc-project-ss.png)

## Technical details

### Project details

**Title**: Implementing web interface for fine-tuning Gemma models using Gradio.

This project is about building a user-friendly web interface using Gradio that makes fine-tuning Gemma models simple and accessible for everyone—even those without deep technical knowledge. The app will allow users to upload datasets in various formats, select from different fine-tuning styles like Alpaca-style, conversational, or continuous pretraining, and choose between efficient LoRA or full fine-tuning based on their needs. Once fine-tuned, users will be able to convert models into formats like PyTorch or GGUF, making them easy to use with tools like Ollama.

The app will also support integration with platforms like Vertex AI, enabling users to fine-tune models without worrying about infrastructure setup. To make the process even smoother, the project will include a set of easy-to-follow guides and documentation—covering everything from model selection to parameter tuning—so that users can make informed decisions at every step. The goal is to remove the complexity from LLM fine-tuning and empower more people to adapt powerful Gemma models for their own use cases.

### Prototype

**Prototype**: https://github.com/inclinedadarsh/gemma-finetune-ui/

**Demo videos**:
- [Application working](https://youtu.be/NKV788bQEgE)
- [How can you run the prototype](https://youtu.be/KKHP4wLV_I8)

The repo contains a Gradio app, sample dataset, ready-to-run notebooks (Colab compatible with free GPU), and a clear README. You can fine-tune the Gemma model on your own dataset with minimal setup. Check out the [repo](https://github.com/inclinedadarsh/gemma-finetune-ui/) for full details and folder structure.

![Repo structure](/images/pre-gsoc/repo-structure.jpg)

### Proposal

You can find the proposal here: https://github.com/inclinedadarsh/deepmind-proposal

You will find all the technical details in the proposal itself, so do check it out if that's what interests you!

## Conclusion

As the journey begins, I’m excited to take on new challenges and build something meaningful. I’m also looking forward to connecting with other contributors and the brilliant folks at Google DeepMind this summer.

I’ll be sharing regular updates through this blog series, so stay tuned!

Thanks for reading. Signing off.