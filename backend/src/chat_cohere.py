import cohere
import os
from getpass import getpass
from dotenv import load_dotenv


def get_response_llm(query):

    load_dotenv()

    COHERE_API_KEY = os.getenv("COHERE_API_KEY")
    co = cohere.ClientV2(COHERE_API_KEY)
    system_message = "Write your responses in less than 100 words"

    response = co.chat(
        model="command-r-plus-08-2024",

        messages=[
            {"role":"system", "content":system_message},
            {
                "role": "user",
                "content": query
            }
        ]
    )

    return response.message.content[0].text

print(get_response_llm("tell me about yourself"))