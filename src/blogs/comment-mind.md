---
title: "Comment Mind - Analyze YouTube Comments and Discover Insights"
seoTitle: "Comment Mind"
datePublished: 2023-04-29
tags: ['project']
---

## Overview

Checkout the demo video here: https://youtu.be/MzKr5FGoTVk

This is our project for [Hashnode](https://cloud.mindsdb.com) and [MindsDB](https://hashnode.com) hackathon - **Comment Minds** a comment and sentiment-analysis tool for the Youtube-comment section.

The link to the project is here: [https://github.com/bios-community/comment-mind](https://github.com/bios-community/comment-mind)

In today's digital world, social media platforms like YouTube have become a hotspot for user-generated content. It is essential to monitor and understand the sentiments of users towards the content posted on these platforms. Our tool addresses this need by using cutting-edge technologies to perform sentiment analysis on YouTube comments.

Taking advantage of Mindsdb integration with a pre-trained Hugging-Face classifier pipeline, and also using a GradientBoostingClassifier to classify comments into feedback and questions we can plot some wonderful and interactive graphs for the content creator to understand his audience. The hugging face integration further classifies feedback into **Positive** and **Negative** ones to understand the sentiment of feedback and store them in the MongoDB database.

Furthermore, to enhance the user experience, we integrated Reactjs and graph libraries to create visually appealing graphs that represent the sentiment analysis results. The results are presented in an intuitive and easy-to-understand manner, enabling users to quickly analyze and understand the sentiment of the comments on a particular video, without the hassle of going through the comment section manually.

## Features

* **Tables** - The application provides distinct tables for feedback and questions which allow the user to access all the analysis in one place without the inconvenience of having to scroll through the data to determine whether it is feedback or a question. This feature improves the user experience by providing easy navigation and quick access to the necessary information.
    
* **Graphs** - The app offers various graphs based on the data analyzed using MindsDB, providing the user with easy-to-understand insights. These graphs can help the user to gain a better understanding of the sentiment of comments, the frequency of certain words, and other relevant information. The graphs are designed to simplify the analysis process, allowing users to easily conclude the data presented.
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682712274806/f375932b-2371-43bc-8d9f-f514847d782e.png)

The picture is from our database from the document of **Question**. *Seems like some guys are really in trouble*. But now the creator knows what to talk about in his next video, addressing the problem of his audience. If I get a chance to make a video after looking at this, I would surely address the problem of **tutorial hell** and suggest my audience participate in awesome hackathons like this one!

## How does the app work?

### Illustration

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682835684121/e797680e-fc78-455a-b097-c78a505a3484.png)

* The user provides a link to the app.
    
* The app sends a request to the ExpressJS server using the `post` method, and the link is sent through the body.
    
* The ExpressJS server runs a Python script using the `child_process` module and the `.spawn()` method.
    
* The Python script fetches all the comments from the YouTube video linked in the input.
    
* The Python script connects to MindsDB, which performs sentiment analysis on the comments.
    
* It then uploads all the analyzed data to MongoDB Atlas.
    
* NodeJS handler functions fetch the analyzed data from MongoDB Atlas.
    
* The analyzed data is sent to the Analysis page, where it is used to generate and display graphs.
    

### Technically

The below code connects to Mindsdb Cloud using the Pymongo library of Python. after connecting a list of comments brought from the Youtube API is passed through the hugging face sentiment model through the collection named **sentiment\_classifier** which classifies comments into **Positive**, **Negative**, and **Neutral**. A Pymongo cursor for documents is received after running a find of the comments. Later this pymongo cursors are read in parallel with the **futures** library to speed up the process with max\_workers as 4, which means using 4 CPU threads in parallel to read the cursors asynchronously. All this is finally inserted in the main Altas database with a document containing the Video title, subscriber count, analysed comments and questions asked by the audience

```python
mindsdb_cloud = MongoClient(CloudConnection_string)
mindsdb = mindsdb_cloud.mindsdb
sentiment_classifier = mindsdb.sentiment_classifier
pred_list = [sentiment_classifier.find({'comment':i}) for i in feedback_comments]
pred_list1 = pred_list[:int(len(pred_list)/2)]
pred_list2 = pred_list[int(len(pred_list)/2):]

sentiment_list = []
def process_cursor(cursor):
    for doc in cursor:
        sentiment_list.append(doc)

# Process cursors in parallel
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor1, \
    concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor2:
    futures1 = [executor1.submit(process_cursor, cursor) for cursor in pred_list1]
    futures2 = [executor2.submit(process_cursor,cursor)for cursor in pred_list2]

    concurrent.futures.wait(futures1 + futures2)

video_details.insert_one({
    'Title':video_title,
    'Subscriber': subscriber_count,
    'Channel Name': channel_name,
    'comment': sentiment_list,
    'question': interrogative_comments
})
```

## Future of Comment Mind

### Login and SignUp

Adding login and Sign Up for Comment Mind can map content creators with their dataset and all their channel videos can display one dashboard with an overall analysis of their comments and audience sentiment.

### Other app-integrations

We can add more app integrations to the app like Twitter with the help of Twitter API. So the app won't be just limited to Youtube.

### Make spam classifier better

We were also going the add the hugging-face spam classifier with the help of MindsDB to the app. But it wasn't giving some good results and was unable to classify between spam and ham most of the time. Below is the code sample from Mongosh shell

### Improve the ML Model

Add more ML methods to the app with mindsdb linear-regression models, which can predict an increase in subscriber count for the future, and predict impressions of the channel with the help of the comments data. Also, increase the accuracy of the GradientBoostingClassifier with the help of hyperparameter tuning techniques which can differentiate between questions and feedback more accurately and confidently

### Reduce app loading time

The app right now takes quite some time to process the comments from a video and generate graphs from there, reducing the time would significantly improve the user experience. However, till now, we were able to reduce some time using parallel processing of the Pymongo cursors with Python. Further, the loading time can be reduced more with the help of fast MongoDB clusters, and create a word cloud on your own without the help of third-party API.

### Other simpler features:

* **Add Responsiveness** - Make the web app responsive so it works fine on the mobile phone as well.
    
* **Comment Limit** - Analyzing a video with a lot of comments take time, so add an optional input field to take the number of comments the user wants to analyze.
    
* **More Graphs** - Add more graphs that can help the user gain some insights into the video. Also, add an input field to let the user decide what kind of graphs he wants.
    

### Deploying the app

As we started working on this project, we focused on building its core functionalities and features. However, we knew that deploying our application on a cloud platform was equally important to make it accessible to a wider audience. Therefore, we started learning about various cloud platforms and the deployment process. We researched different options and studied their pros and cons, and we are now experimenting with a few of them to find the best fit for our application. We are determined to overcome this challenge and make our app available to everyone.

### Improve code quality

This project may be unique as no one may have used Python's Mongoshell package to utilize **MindsDB** in an application before. Therefore, we must enhance the code's readability by adding more comments. This will ensure that any developer who wishes to achieve a similar outcome can easily comprehend our code and understand its functionality.

## What problem does it solve?

Although many applications available online provide YouTube Analytics, few of them focus on analyzing the feedback and insights garnered from video comments. However, with this app, content creators can obtain a more in-depth analysis of their audience's thoughts and feelings, as well as identify ways to improve their content based on this feedback.

The app categorizes comments into two groups: feedback and comments, allowing users to view all questions asked about a video in one convenient location. This feature saves users a significant amount of time.

### Why is it better than other apps?

Most other applications have a complicated process to view even the most basic insights, whereas this app prioritizes user experience by streamlining the process and creating charts with a single link.

Moreover, this app provides easy-to-understand graphs that users can effortlessly interpret and use to conclude. In contrast, other applications generally make it difficult for users to understand complex data analysis, and users require technical expertise to draw meaningful insights from the data.

In essence, this app stands out by prioritizing user experience and providing accessible and easy-to-understand data analysis, setting it apart from other, more complicated applications.

### How's the code?

#### Readable

We prioritized writing clean and well-organized code while following industry best practices when developing the app. We ensured readability by including clear comments and proper indentation and incorporated modular programming, version control, and thorough testing for efficiency, robustness, and scalability. By following these principles, we aimed to create a functional, efficient, and easy-to-use app.

#### Maintainable & Scalable

The code is maintainable to a large extent. Thanks to Mindsdb integrations, we can use some of the best models in the industry just with some SQL and MQL commands. Mindsdb models also receive updates related to performance and features which makes it more easy to maintain the code. It can be changed according to the needs of the user with some changes in the database of MindsDB

## Contributions we made

### Monkeylearn handler

Worked on one of the app-integrations applications. Which implemented the Monkeylearn handler for Mindsdb. The handler is almost complete and soon a pull request with a Loom video demonstrating the handler will be submitted. Got too much busy with the hackathon!

[Link to](https://github.com/mindsdb/mindsdb/pull/5543) PR: Monkeylearn handler for Mindsdb #5543

### Improved the official MindsDB documentation

While learning and working with MindsDB, we also encountered some errors which were due to wrong documentation or missing information in the documentation. We just corrected them on the way, so no one else faces the issue later. That's what Open-Source is!

* [Link to PR](https://github.com/mindsdb/mindsdb/pull/5586) - Fixed the Python code for REST API #5586
    
* [Link to PR](https://github.com/mindsdb/mindsdb/pull/5580) - Added documentation code block for starting MongoDB API with MindsDB local installation.
    

### Web App for testing

Made a simple MERN Stack Web App for testing how MindsDB works with Mongoose.

[Link to GitHub Repo.](https://github.com/inclinedadarsh/predictive_webapp)

I have been approached by MindsDB engineer, Zoran to write a small documentation page explaining how MindsDB can work with Mongoose, will be working on it as soon as I get some time.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1682831629791/fc560fc0-aae7-4199-ba44-18a663cbbe16.png)

### Encouraged others to contribute

We also encouraged our friends and community members to contribute to MindsDB, and one of our friends successfully got his 1st PR merged in Mindsdb.

[Link to PR](https://github.com/mindsdb/mindsdb/pull/5608) - Removed wrong implementation section #5608

## What we learnt and our journey

### Pranav's learning

It was my first time working with databases, got introduced to SQL and NoSQL databases. From I choose to learn MongoDB due to its whole ecosystem of Mongoshell, MongoDB Altas and MongoDB Compass, and also popular Python and Javascript libraries like Mongoose and Pymongo which makes it easier to work and interact with MongoDB database. It was fun working with MongoDB and creating CRUD applications with the help of Express and Flask.

After learning databases, I learnt about MindsDB, AI-tables and working with mindsdb. While working with MindsDB I also started working for a handler for mindsdb, the **MonkeyLearn Handler**. Due to this, I learned about text classification with Monkeylearn using pre-trained models as well as training our own models with the help of their GUI.

After going through all of this, I finally started to work on the actual project. While making the project I learnt about Google services and Youtube API. For working with the Youtube API with Python I learned about the **requests** library of Python which sends http methods to the server or an API, bringing out some useful information for the project.

### Adarsh's learning

To make charts for the project, I experimented with various libraries before settling on ChartJS with `react-chartjs-2` wrapper for use in a ReactJS project. Through this process, I learned how to create different types of graphs using ChartJS in React.

While exploring all the possibilities we can use MindsDB, a few of them was by using JavaScript, so I learnt how I can use MindsDB with Mongoose. However, the time it took was so much that we couldn't afford having it. Other than that, I learnt how `mindsdb-js-sdk` works and how we can make predictions using it. However, the method I wanted to use wasn't capable of making batch predictions so decided to drop that as well. (We still have a branch that has the file that consumes `minds-js-sdk` and some comments that explain what each function does. [Link to that file](https://github.com/bios-community/comment-mind/blob/mindsdb-js-sdk/server/handlers/mindsDBHandler.js)).

Prior to working on this project, I had experience working on projects that were either solely frontend or backend. This was my first time working on a MERN (MongoDB, Express, React, Node) stack project that utilized both frontend and backend technologies. The experience felt like a series of experiments, as I was constantly learning and implementing new concepts such as how forms work, how states work, and other general MERN concepts. However, the most valuable lesson I learned during this project was how to learn on the go and effectively solve errors by reading documentation and engaging in discussions.

## Conclusion

When we first began working on this project, we didn't have much experience in developing a full-stack web application using the MERN stack. However, we were determined to learn and create something impactful. We set our sights on building an application that could provide valuable insights to YouTube content creators by analyzing the sentiments of the comments on their videos.

Over the course of 30 days, we worked tirelessly to learn new technologies, overcome challenges, and create a functional application that we are proud of. While our initial goal was to "win" by creating the best possible application, we've come to realize that the real victory was in the skills and knowledge we gained along the way. We are truly grateful for the experience and excited to see where our newfound skills will take us in the future.

Once again, if you'd like to visit the github repo for the app, it is here: [https://github.com/bios-community/comment-mind](https://github.com/bios-community/comment-mind)

You can connect to both of us. You can find all the options to connect to Pranav [here](https://bento.me/pranavv) and to connect to Adarsh [here](https://bento.me/adarsh).