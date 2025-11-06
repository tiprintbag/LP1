"""
🚀 Criar Webhook do Pipedrive apontando para o n8n

Fluxo: Pipedrive → n8n → (processamento interno)
"""

import requests

# 🔐 Configurações
PIPEDRIVE_API_TOKEN = "d7fd1fc95fedf49ea5d0a30ede5890dbfb488fef"
N8N_WEBHOOK_URL = "https://ia-n8n.4xfwtv.easypanel.host/webhook/9bb8cab3-e473-4c6b-9faa-bfd68115c8b9"
AUTH_USER = "user"
AUTH_PASS = "strongpass"

# 📦 Corpo do webhook
payload = {
    "name": "Webhook Leads → n8n",
    "subscription_url": N8N_WEBHOOK_URL,
    "event_action": "create",
    "event_object": "lead",
    "version": "2.0",
    "http_auth_user": AUTH_USER,
    "http_auth_password": AUTH_PASS
}

# 🔗 Envio para API do Pipedrive
url = f"https://api.pipedrive.com/v1/webhooks?api_token={PIPEDRIVE_API_TOKEN}"
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

# 📋 Resultado
if response.status_code == 201:
    print("Webhook criado com sucesso!")
    print(response.json())
elif response.status_code == 400:
    print("Verifique se o webhook ja existe ou se a URL e valida.")
    print(response.json())
else:
    print(f"Erro ({response.status_code}):", response.text)

