Other Frameworks/Tech/Approaches
================================

We've covered REST apis's and Single-Page-Webapps .. the world is a LOT bigger.

Objectives
* Understand a range of other tangentially related technologies (and frameworks)
    * why this is important ..
        * Interviews ..?
        * Future self learning ..?
    * What problem are these technologies trying to solve


Company TechStack
-----------------

* KaraKara tech stack
    *  python, typescript, sanic, hyperapp, mqtt, ffmpeg
* [How to OVER Engineer a Website // What is a Tech Stack?](https://www.youtube.com/watch?v=Sxxw3qtb3_g) YouTube 11min FireShip
    * Talks though all the tech for client, server, ci, containers and then suggests a cutdown concept
    * [stackshare.io/stacks](https://stackshare.io/stacks) - Popular Tech Stacks: The open source tools and SaaS behind popular tech companies
        * todo: find another site - stackshare is an ad-ridden mess
* Companies often list their tech stack in job descriptions
    * e.g. [MultiVerse Careers](https://www.multiverse.io/en-GB/careers) look for 'Software Engineers'
        * Elixir, Phoenix, Postgres, LiveView, Elm, Docker, Terraform & AWS

TASK: Using stackshare.io, find a company and find some technologies in it's tech stack


Serverless Architecture
-----------------------

* Not a framework - more of a methodology
* You don't run your own http server - the provider does
* a cloud function == container with ram and disk state ready to go - ready to be deployed/run to any edge in the world
    * aws lambda
* Pay per function execution
    * Investigate the cost of a aws lambda function in London https://aws.amazon.com/lambda/pricing/
* No visitors/users == no idle server costs
* Billions of visitors == fine (you just pay per function execution) Infinite(?) scaling!

* https://www.twilio.com/docs/glossary/what-is-serverless-architecture
* [Tutorial: Build a Hello World REST API with Lambda proxy integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html)

### Edge rendering

* vercel.com [Build your own web framework](https://vercel.com/blog/build-your-own-web-framework)
    * build your own web framework that also deploys to edge and serverless infrastructure? 
    * What features does a modern framework need to support, and how can we ensure that these features allow us to build a scalable, performant web application?
        * Static Files to statically render pages
        * Incremental Static Regeneration to automatically revalidate and regenerate pages after a specific timeout
        * Edge Functions to enable edge rendering and middleware
        * Automatic Image Optimization to efficiently serve the images using the latest format, enable lazy loading, and prevent layout shift
        * Serverless Functions to server-render dynamic pages and create data fetching endpoints
        * Edge Caching to quickly serve static files to users globally


Question: What problem is 'serverless' trying to solve?


NoSQL
-----

* https://www.guru99.com/nosql-tutorial.html
* https://www.freecodecamp.org/news/nosql-databases-5f6639ed9574/
* Fireship: [7 Database Paradigms](https://www.youtube.com/watch?v=W2Z7fbCLSTw) YouTube 10min
* Traditional relational databases are ridged to maintain data consistency (all or nothing! locking transactions)
* The concept of 'eventual consistency'

Question: What problems is NoSQL trying to solve?


GraphQL
-------

* Not a framework - query language for api's
* https://www.howtographql.com/basics/1-graphql-is-the-better-rest/ page + (12min video)

Question: When would you use GraphQL over REST? Is there a point in ever using REST?
What problems is GraphQL tring to solve?




IPFS + Blockchain hosting
----

* [HTTP is obsolete. It's time for the distributed, permanent web](https://ipfs.io/ipfs/QmNhFJjGcMPqpuYfxL62VVB9528NXqDNMFXiqN5bgFYiZ1/its-time-for-the-permanent-web.html)
    * [[http]] has problems - this beautifully describes why
    * HTTP servers need to be kept on all the time. When they go, all their data is inaccessible. The Web is centralised because of http/
    * Could you host pages on Mars?
* [Host your Website on the Blockchain, Permanently](https://medium.com/fullstacked/i-saved-60-per-year-forever-by-hosting-my-website-on-the-blockchain-6f7bf07d35d9) - How to host a simple website on Arweave’s perma-web
* [Decentralizing your Website](https://towardsdatascience.com/decentralizing-your-website-f5bca765f9ed) - IPFS + ENS

Question: What is the problem IPFS is trying to solve?



Static Site Generation
----------------------

Other approach: Static Site Generation

* [What is a Static Site Generator? And 3 ways to find the best one](https://www.netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/)
* Really scalable and performant (cacheable, use of existing simple performant systems, distributable)
* Frameworks
    * [hugo](https://gohugo.io/) Golang
    * [jekyll](https://jekyllrb.com/) Ruby
    * [hyde](https://hyde.github.io/) Python
    * [nikola](https://getnikola.com/) Python
    * [next.js](https://nextjs.org/) Typescript
        * hybrid static & server rendering
    * [gatsbyjs](https://www.gatsbyjs.com/) a static site generator with react?


https://github.com/calaldees/TeachProgramming/tree/master/teachprogramming/static/projects/web/static_site_generation/nikola
```Makefile
# Nikola in Docker - Inspired by https://getnikola.com/getting-started.html

DOCKER_IMAGE:=dragas/nikola:alpine
CONTAINER_WORKDIR:=/nikola/
USER=$(shell id -u):$(shell id -g)
DOCKER_RUN_PARMS:=docker run --rm -it --user ${USER} --volume ${PWD}:${CONTAINER_WORKDIR} --publish 8000:8000
DOCKER_RUN:=${DOCKER_RUN_PARMS} --workdir ${CONTAINER_WORKDIR}/demo ${DOCKER_IMAGE}


serve: demo/output
	${DOCKER_RUN} nikola auto --address 0.0.0.0
demo/output: demo
	${DOCKER_RUN} nikola build
demo:
	${DOCKER_RUN_PARMS} --workdir ${CONTAINER_WORKDIR} ${DOCKER_IMAGE} nikola init -q --demo ./demo
shell:
	${DOCKER_RUN} /bin/sh

# edit some of the text in (auto-reload? or start/stop server) + see changes
#	demo/posts/1.rst
#	demo/pages/listing-demo.rst
```

Question: When would you use static site generation?
Question: What problem is static-site-generation trying to solve?


Server State Frameworks
-----------------------

### Fusion
* [Stl.Fusion](https://github.com/servicetitan/Stl.Fusion)
    * > Fusion is a .NET library that implements Distributed REActive Memoization (DREAM) – a novel technique that gracefully solves a number of well-known problems
    * Fusion+Blazor Sample delivering real-time updates to 3 browser windows ... (see link above)
        * https://fusion-samples.servicetitan.com/consistency
    * [How Similar Is Fusion to SignalR?](https://medium.com/swlh/how-similar-is-stl-fusion-to-signalr-e751c14b70c3)
        * Modelling an application based on state changes that propagate to client
        * > the only end result of your actions is that the client-side state (of every client) becomes consistent with the server-side state!
### Phoenix LiveView (Elixir)
* [Phoenix.LiveView behaviour](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html) 
    * > LiveView provides rich, real-time user experiences with server-rendered HTML
### Dream
* [Dream](https://github.com/aantron/dream) [docs](https://aantron.github.io/dream/) - Tidy Web framework for OCaml and ReasonML 
    * > Easy-to-use, feature-complete Web framework without boilerplate.
    * SQL, WebSockets, Middleware, Streams, Cookies

Question: What problem is the 'DREAM' pattern trying to solve?


BlockChain Applications
-----------------------

### HyperLedger
* [introduction](https://hyperledger.github.io/composer/v0.19/introduction/introduction.html)
    * HyperLedger Composer is an extensive, open development toolset and framework to make developing blockchain applications easier.
    * [key-concepts]https://hyperledger.github.io/composer/v0.19/introduction/key-concepts.html

Question: What problems are blockchain applications trying to solve?


---

Question: What technology today was the most interesting and why?

---


Mobile Frameworks
-----------------

Applications in other domains or ecosystems

### Android Activity Lifecycle
Not really a framework, but your app sites within a bigger ecosystem
* https://developer.android.com/guide/components/activities/activity-lifecycle


Game Frameworks
---------------

* If you are writing the `main` method and calling it - its a library
* If you are writing code that is called by other code - that is using a framework
* engines are bigger suites of tools

* [what-is-the-difference-between-a-game-framework-and-a-game-engine](https://gamedev.stackexchange.com/questions/31772/what-is-the-difference-between-a-game-framework-and-a-game-engine)
* Example
    * [LittleJS](https://killedbyapixel.github.io/LittleJS/docs/) - The Tiny JavaScript Game Engine That Can
        * notice how you place your code with a known object structure
        * [HelloWorld Example](https://github.com/calaldees/TeachProgramming/tree/master/teachprogramming/static/projects/game/frameworks/LittleJS)
            * copy `Makefile` and `index.html`
    * [PyGame](https://en.wikipedia.org/wiki/Pygame)
        * https://realpython.com/pygame-a-primer/#basic-pygame-program
        * A library not a framework - if you implement the game loop - its not a framework
