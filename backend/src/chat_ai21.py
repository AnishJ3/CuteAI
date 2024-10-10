# from langchain_huggingface import HuggingFaceEmbeddings

# embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# from langchain_core.messages import HumanMessage
# from langchain_mistralai.chat_models import ChatMistralAI
# import os

# api_key = og.getenv("MISTRAL_API_KEY")
# chat = ChatMistralAI(api_key=api_key)

from langchain_ai21 import ChatAI21
from langchain_core.prompts import ChatPromptTemplate

import os
from getpass import getpass
from dotenv import load_dotenv

def get_response_llm(query):

    load_dotenv()


    AI21_API_KEY = os.getenv("AI21_API_KEY")

    # Initialize the chat model with the correct API key
    chat = ChatAI21(model="jamba-instruct")

    # Create the prompt template
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a knowledgeable bot about cricket. Answer only cricket related queries. Don't answer any queries about different sports"),
            ("human","{input}"),
        ]
    )

    # Create the chain from the prompt and chat model
    chain = prompt | chat

    # Invoke the chain with the input text
    result = chain.invoke({"input": {query}})

    # return "hi there"

    return result.content



