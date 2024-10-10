from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")



llm = ChatOpenAI(

    model="gpt-4o-mini",
    temperature=0,
    max_tokens=5,
    timeout=None,
    max_retries=2,
)

messages = [
    (
        "system",
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
    ),
    ("human", "I love programming."),
]
ai_msg = llm.invoke(messages)

print(ai_msg.content)



