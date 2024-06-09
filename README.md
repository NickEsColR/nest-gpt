
# Nest GPT

Welcome to the Nest GPT, a web application chat based to use different features available with OpenAI API like, bot assistant, image generation, text correction, text translation, etc.
 
This is the **backend** of the application. Remember to run de backend first. the frontend repository to use the application can be found [here](https://github.com/NickEsColR/react-gpt)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OPENAI_API_KEY`
`SERVER_URL`

An environment template is provided, you just need to rename it from ".env.template" to ".env" and paste your values

## Features

- Chatbot assistant
- convert audio to text
- Convert text to audio
- Generate images
- ortography correction
- translate to other languages
- identify pros and cons from asking topic


## Run Locally

**Remember to run this first**

Clone the project

```bash
  git clone https://github.com/NickEsColR/nest-gpt.git
```

Go to the project directory

```bash
  cd nest-gpt
```

Install dependencies

```bash
  npm Install
```

Start the application

```bash
  npm run dev
```


## Tech Stack

**Client:** 

- React 
- React Router
- React Markdown

**Server:** 

- NestJS
- OpenAI

