from langchain_anthropic import ChatAnthropic

import os
from dotenv import load_dotenv


def get_response_llm(query):

    load_dotenv()

    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")

    llm = ChatAnthropic(
        model="claude-3-sonnet-20240229",
        temperature=0,
        max_tokens=1000,
        timeout=None,
        max_retries=2,
        # other params...
    )

    messages = [
        (
            "system",
            "You are a helpful assistant that translates English to French. Translate the user sentence.",
        ),
        ("human", "{query}"),
    ]
    ai_msg = llm.invoke(messages, input=query)

    return ai_msg.content