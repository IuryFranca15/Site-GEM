import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from typing import Optional, List

load_dotenv()

EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def enviar_newsletter_customizada(
        destinatario: str,
        assunto: str,
        corpo_html: Optional[str] = None,
        corpo_texto: Optional[str] = None,
        imagens_urls: Optional[List[str]] = None
):
    """
    Monta e envia uma newsletter customizada.
    A função prioriza o corpo_html se ambos forem fornecidos.
    """
    try:
        final_html = ""

        if corpo_html:
            # Se o usuário enviou um HTML completo, use-o
            final_html = corpo_html
        elif corpo_texto:
            # Se enviou texto, construa um HTML simples ao redor dele
            imagens_html = ""
            if imagens_urls:
                for url in imagens_urls:
                    # Adiciona as imagens ao corpo do e-mail
                    imagens_html += f'<img src="{url}" alt="Imagem da Newsletter" style="max-width:100%; height:auto; margin-bottom:15px;"><br>'

            # Usa um template básico para envolver o texto e as imagens
            final_html = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                        .container {{ max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }}
                        .footer {{ font-size: 0.8em; color: #888; text-align: center; margin-top: 20px; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <p>{corpo_texto.replace('\n', '<br>')}</p>
                        {imagens_html}
                    </div>
                    <div class="footer">
                        <p>Você está recebendo este e-mail porque se inscreveu na newsletter do GEM.</p>
                    </div>
                </body>
            </html>
            """

        if not final_html:
            print("Nenhum conteúdo fornecido para o e-mail.")
            return False

        # Monta e envia o e-mail
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = destinatario
        msg['Subject'] = assunto
        msg.attach(MIMEText(final_html, 'html'))

        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)

        print(f"Newsletter customizada enviada com sucesso para {destinatario}")
        return True
    except Exception as e:
        print(f"Falha ao enviar newsletter customizada para {destinatario}: {e}")
        return False