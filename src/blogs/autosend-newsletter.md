---
title: "Building a Newsletter App with Next.js and AutoSend"
datePublished: 2025-11-23
seoTitle: "Building a Newsletter App with Next.js and AutoSend"
seoDescription: "I built a complete newsletter application using Next.js and AutoSend, handling email deliverability, unsubscriptions, and bulk sending. Here's how I did it and what I learned along the way."
tags: ['project', 'webdev', 'guide']
---

Even after having a newsletter form right on this website, I never bothered actually sending emails through it, because of two major reasons:

1. Sending emails to all subscribers automatically, without having to set it up manually. This includes the major part: being able to render the markdown text for the email.

2. Setting up unsubscription services. Even if I could set up a system to handle sending emails, setting up unsubscription links and all that is a really big task. If you've ever thought about scale, you'd understand how unmanageable it would get if I don't care about it enough while developing.

Because of these two reasons, I never used those emails I collected to send newsletters to them.

![Autosend Homepage](/images/autosend-newsletter/autosend-homepage.png)

However, I recently came across [AutoSend](https://autosend.com/), which solves all these problems in a way that allows me to not just bother with these, but also leave this all directly to AutoSend. To play around with it, I built a newsletter app that has a form to collect emails, admin panels to send newsletters to all those collected emails, and also publishes them right on the website. At the end, we'll also use AutoSend's dashboard to see the deliverability of our emails. There are a few more features from AutoSend that we'll be using, which I'll cover later in the blog. The goal was to not just create a *toy* version—it was to create something that I could use in real life.

This blog is going to be about that application. Think of it as a guide to creating a newsletter app using Next.js and AutoSend, where I don't just provide you with code snippets (I'll be doing that as well though), but also share some of my architectural design decisions. Here's a sneak peek of how it's going to look:

![Newsletter App Screenshot](/images/autosend-newsletter/newsletter-homepage.png)

The entire source code is available at [github.com/inclinedadarsh/autosend-newsletter](https://github.com/inclinedadarsh/autosend-newsletter). Do check it out, and feel free to raise PRs to improve it! If you want to check the website yourself, the newsletter app is live at [https://autosend-newsletter.vercel.app](https://autosend-newsletter.vercel.app).

## Getting started with AutoSend

Getting started with AutoSend was pretty easy. All I had to do was create an account, choose a pricing plan, and create an API key. I chose the most basic plan from AutoSend because I wanted it to be cheap. Even after choosing the most basic plan, I was able to build everything that I was aiming for.

One of the features I used from AutoSend was sending bulk emails. The [`POST /mails/bulk`](https://docs.autosend.com/api-reference/mails/bulk) API lets you send an email to 100 recipients per request. Another feature I used was the unsubscription part. Wherever in the email you use `<a href="{{unsubscribe}}">Unsubscribe</a>`, AutoSend automatically creates a unique unsubscribe link for all the recipients in that email. Just by using `href="{{unsubscribe}}"` in the anchor tag, you have access to the unsubscribe feature. Just one line of code, that's all it took. The way unsubscriptions work in AutoSend is that whenever a person unsubscribes from an email, that person's email is stored in AutoSend, and if you try sending that email another mail under the same mail group, AutoSend itself doesn't send the email to that person.

Another very cool feature I used is known as [email templates](https://docs.autosend.com/transactional-emails/email-templates). It allows me to change the emails that are sent to users, without even opening my IDE. Other than that, we can have dynamic variables inside the emails we're sending.

To get started, sign up for AutoSend and create an API key, which you'll need for this application.

## Project Scope

In the spirit of building a newsletter app, it's important to understand that we're not building Substack. Before proceeding, we must figure out a scope for the project. It's important to think about the scope for some time, because we don't want to build something unusable, but at the same time we shouldn't aim at building Substack in the first go.

1. General audience should be able to subscribe to the newsletter.

2. There should be a password-authenticated admin dashboard.

3. Admin should be able to write and edit newsletter issues in markdown using a WYSIWYG editor.

4. Admin should be able to send those issues to all the subscribed emails.

5. Two-factor verification. It's important that we have some sort of verification system that would prevent fake emails from subscribing to our newsletter.

6. Looks good. One of the most important goals is to make it visually appealing.

Now that we have some features and project scope in mind, let's decide on a tech stack.

## Tech Stack

- **Full stack framework:** I love [**Next.js**](https://nextjs.org/) for its simplicity and development speed, so I built this app using it.

- **Database:** Technically you can use any database, but I used [**Supabase**](https://supabase.com/) because it's pretty easy to set up. However, I wanted others to use this app as well, so I used [**Drizzle**](https://orm.drizzle.team/) instead of Supabase SDK because it gives me (or others) the flexibility to change databases.

- **Email:** As I mentioned, I used [**AutoSend**](https://autosend.com/) to send emails and manage unsubscriptions.

We have everything decided, and now it's time to build!

## Building the app

Let's start looking at problems one by one, and I'll try to share code snippets, my strategies, and a few other things, leaving you with enough knowledge to explore the [codebase](https://github.com/inclinedadarsh/autosend-newsletter).

### Figuring out the database architecture

It's very obvious that we'll be needing tables for `issues` as well as `subscribers`. So by a bit of brainstorming and talking to Claude, I figured out the schemas for both of those. For auth, because we only have 1 user (the admin), I decided to go ahead with stateful architecture to keep it simple and secure. For that, we'll need a `sessions` table which will contain information about all the logged-in sessions.

![Database Schema](/images/autosend-newsletter/database-schema.png)

Now that we have our database set up, we can start with actually writing some code!

### Subscription flow

As mentioned in the start, we'll be having an email verification when a person tries to subscribe to the newsletter, so that we don't keep sending emails to bots or fake email addresses. To do that, we'll create a verification token when a new person tries to subscribe to the newsletter, and then send that token in a link to that person's email. When the person clicks on the link, it should take them to the website again to verify their email. Here's an architecture I designed for better understanding:

![Subscription Flow](/images/autosend-newsletter/subscription-sequence.png)

### Sending emails

[AutoSend Docs](https://docs.autosend.com/) mention all the endpoints and payloads clearly. To use these in my application, I decided to create functions wrapping around these endpoints for my use case, and then use those in the API routes. Honestly speaking, I didn't even create these functions myself—I just had to tell Claude to do this. The docs are so clear that Claude did it in one prompt. It created three functions in total: `sendVerificationEmail`, `sendWelcomeEmail`, and `sendNewsletterBulk`.

For verification and welcome emails, I used AutoSend's **email templates**. It allows me to keep the template design in the AutoSend dashboard, so I can edit it anytime without having to worry about coming back to the codebase and redeploying the website.

![AutoSend Templates](/images/autosend-newsletter/autosend-templates.png)

In the `sendVerificationEmail` function, I could just use the template ID provided by AutoSend and pass on dynamic data for name, email, and verification link. Here's the minimal code snippet for example:

```ts
export async function sendVerificationEmail(
  email: string,
  token: string,
  name?: string,
) {
  const response = await fetch("https://api.autosend.com/v1/mails/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AUTOSEND_API_KEY}`,
    },
    body: JSON.stringify({
      to: {
        email: email,
        name: name,
      },
      from: {
        email: "newsletter@mail.adarshdubey.com",
        name: "Adarsh Dubey",
      },
      templateId: VERIFICATION_TEMPLATE_ID,
      dynamicData: {
        name: name || email,
        link: `${SITE_LINK}/?verification-token=${token}`,
      },
      replyTo: {
        email: "dubeyadarshmain@gmail.com",
      },
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to send verification email");
  }
}
```

![Email Template Screenshot](/images/autosend-newsletter/verification-template.png)

Just like this, I did the same for `sendWelcomeEmail` as well. However, it gets tricky when creating the `sendNewsletterBulk` function, because in that case, we first have to create the entire HTML from markdown-based content and then use it in the email. For that, I created a few utility functions, in which `markdownToHtml` is the most important one, which converts markdown to HTML using remark.

At the end of the issue email, we put in our unsubscribe link as `<a href="{{unsubscribe}}">Unsubscribe</a>` so that AutoSend can handle unsubscriptions. To make sure this works fine, in the payload we define `unsubscribeGroupId` as the global group from the AutoSend dashboard.

![Subscription Groups](/images/autosend-newsletter/subscription-groups.png)

The best part is that we can define multiple groups and then let people subscribe to those groups individually. In this way, when we put the `unsubscribeGroupId` for a different group, the email will be unsubscribed only for that group. And we can even put `<a href="{{unsubscribe_preferences}}">Unsubscribe Preferences</a>` as a link in the email, and when the user clicks on it, they'll see a window where they can manage their subscriptions.

Other than this, I'm using [`POST /mails/bulk`](https://docs.autosend.com/api-reference/mails/bulk) which lets you send an email to 100 recipients per request. This makes sending bulk emails even more handy, because suppose we have to send our issue to 1000 people, we just have to make 10 API calls rather than looping over all 1000 emails. This makes sending emails 100x faster! Here's how I implemented the `sendNewsletterBulk` function:

```ts
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function sendNewsletterBulk(
  recipients: Recipient[],
  issueTitle: string,
  contentHtml: string,
): Promise<void> {
  const html = buildNewsletterHtml(contentHtml);
  const recipientChunks = chunkArray(recipients, 100);

  // Send each chunk serially
  for (const chunk of recipientChunks) {
    const response = await fetch("https://api.autosend.com/v1/mails/bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTOSEND_API_KEY}`,
      },
      body: JSON.stringify({
        recipients: chunk.map((r) => ({
          email: r.email,
          name: r.name,
        })),
        from: {
          email: "newsletter@mail.adarshdubey.com",
          name: "Adarsh Dubey",
        },
        subject: `${issueTitle} - Adarsh's Newsletter`,
        html: html,
        replyTo: {
          email: "dubeyadarshmain@gmail.com",
          name: "Adarsh Dubey",
        },
        unsubscribeGroupId: UNSUBSCRIBE_GROUP_ID,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to send newsletter batch: ${response.status} ${errorText}`,
      );
    }
  }
}
```

With AutoSend, I don't have to worry about email deliverability, speed of sending emails, managing unsubscriptions, and creating templates. Isn't that amazing?

### Creating a super fast website

One thing that I love about [my website](https://adarshdubey.com) is that it's super fast. Any blog page loads as soon as you click on it. No loading bars and no delay, just the blog as soon as you click on it. The strategy I used on it is SSG though, which means I write the blogs in markdown directly in my codebase, and then I build the entire website every time I need to deploy it. This strategy isn't possible in this case, because we want the admin to be able to write issues right on the website itself.

So we want to build specific pages on demand and leave the rest of the website as it is. This can only mean one thing: ISR (Incremental Site Regeneration)! Next.js allows us to revalidate paths on demand (either when done in the code or by timing). So every time we write an issue, say with the slug `/hello-world`, we can simply ask Next.js to build (or technically speaking, revalidate) the `/issues/hello-world` page. We'll do this every time the admin either publishes a new issue or edits an old one. Other than that, though possible, we won't be doing any timely revalidation, because the content doesn't really change unless the admin does something (which we'll be handling). Here's how I'm doing it in the create new issue route ([`src/app/api/issues/route.ts`](https://github.com/inclinedadarsh/autosend-newsletter/blob/main/src/app/api/issues/route.ts)):

```ts
import { revalidatePath } from "next/cache";
// Other imports

export async function POST(request: NextRequest) {
  const {
    title,
    slug,
    content,
    publishingDate
  } = await request.json();
  const [issue] = await db
    .insert(issues)
    .values({
      title,
      slug,
      content,
      publishedAt: new Date(publishingDate),
    })
    .returning();

  // Revalidate the home page, issues list page, and the specific issue page
  revalidatePath("/");
  revalidatePath("/issues");
  revalidatePath(`/issues/${slug}`);

  // Fetch updated issue to return
  const [updatedIssue] = await db
    .select()
    .from(issues)
    .where(eq(issues.id, issue.id))
    .limit(1);

  return NextResponse.json(updatedIssue || issue, { status: 201 });
}
```

And then in the [`src/app/issues/[slug]/page.tsx`](https://github.com/inclinedadarsh/autosend-newsletter/blob/main/src/app/issues/%5Bslug%5D/page.tsx) file, we can simply ask Next.js to *force* the page as a static page. Here's how the page looks:

```tsx
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { issues } from "@/db/schema";

export const dynamic = "force-static";
export const revalidate = false;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getIssue(slug: string) {
  const [issue] = await db
    .select()
    .from(issues)
    .where(eq(issues.slug, slug))
    .limit(1);

  return issue;
}

export default async function IssuePage({ params }: PageProps) {
  const { slug } = await params;
  const issue = await getIssue(slug);

  if (!issue) {
    notFound();
  }

  return (
   <h1>{slug}</h1> 
  );
}
```

As you can see, just by doing `dynamic = "force-static"` and the default export `async`, this page is now static, and every time someone requests this page, it'll be delivered in no time.

### Creating manual authentication

I believe setting up a whole auth provider like Clerk or BetterAuth would be an overkill for this project. We only need one admin, and only they should be able to publish or edit issues.

To do that, I set up stateful authentication where whenever the admin logs into the app, we verify the password with the one stored as an environment variable as `ADMIN_PASSWORD`, then we create a new token, store it in the database, and also send it to the user's browser. From then on, whenever the admin tries to perform any restricted action, like creating a new issue, we send the token as the bearer token, and then on the backend we get the token from the database, check if it has expired, and if not, then we let the admin perform the action. That's it! Here's a visual representation of the system architecture:

![Auth Architecture](/images/autosend-newsletter/auth-flow.png)

### Rest of the stuff

I took a little bit of inspiration from AutoSend's dashboard and designed the one for admin. Admin can publish new issues, edit old ones, and delete the ones not needed. Moreover, while publishing an issue, the admin can choose not to publish the issue at that time and publish it later. As you can see in the dashboard, some issues have the button "Send to subscribers" which means that they're not sent to subscribers via email yet, however some issues have the date on which the issue was sent to the subscribers.

![Admin Page Screenshot](/images/autosend-newsletter/admin-page.png)

I used [MDXEditor](https://mdxeditor.dev/) for a WYSIWYG editor for admin to publish new issues using markdown or visual editor, whatever they prefer. The admin can also choose the title, optionally description, published date, slug, and whether to send the issue to the subscribers as soon as it's published.

![New Issue Page Screenshot](/images/autosend-newsletter/new-issue-page.png)

Now by putting all of these things together, we have an application that's not just a toy, but actually usable. One can actually clone this repository and build their own newsletter application out of it.

## Future scope

Even though this application is usable right now, we can still add tons of features to it. I'll list a few here in case some of you want to contribute by opening PRs on the repository.

- **Support image uploads.** As of now, we only support images which are hosted somewhere else, so having an image upload option to some storage buckets will be amazing.

- **Automatic open graph image generation.** It should be triggered whenever the admin publishes an issue.

- **Scheduling issues.** Currently the issues have to be published instantly after writing. It'll be great if the admin can schedule issues and also schedule when they'll be sent through emails.

- **Application onboarding.** It would be great if this application can have an onboarding feature, where once the admin clones the repo, they should be able to edit author name, image, password, and all that without having to work through code.

These are some features that I believe will make this app 10x better. If you have some other features in mind, feel free to open a pull request.

## Conclusion

I had a lot of fun building with AutoSend. This blog only touched the surface of what AutoSend can do—there are marketing campaigns, webhooks, and what not, so definitely check that out.

If you liked the newsletter application, please leave a star on the [repository](https://github.com/inclinedadarsh/autosend-newsletter). I hope you learned something from the blog. You can connect with me on [Peerlist](https://peerlist.io/inclinedadarsh) or [X (Twitter)](https://x.com/inclinedadarsh).

Thanks for reading 😊