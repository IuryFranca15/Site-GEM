from mailchimp_marketing import Client
from mailchimp_marketing.api_client import ApiClientError
import os

api_key = os.getenv("MAILCHIMP_API_KEY")
server = os.getenv("MAILCHIMP_SERVER_PREFIX")  # ex: 'us21'
list_id = os.getenv("MAILCHIMP_LIST_ID")

mailchimp = Client()
mailchimp.set_config({
    "api_key": api_key,
    "server": server
})

def subscribe_email(email: str):
    try:
        response = mailchimp.lists.add_list_member(list_id, {
            "email_address": email,
            "status": "subscribed"
        })
        return response
    except ApiClientError as e:
        raise e
