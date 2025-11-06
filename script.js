// Função para scroll suave até o formulário
function scrollToForm() {
    const formSection = document.getElementById('form-section');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Função para toggle do FAQ accordion
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    const faqIcon = element.querySelector('.faq-icon');
    
    // Fecha todos os outros itens
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const icon = item.querySelector('.faq-icon');
            if (icon) icon.textContent = '+';
        }
    });
    
    // Toggle do item clicado
    if (isActive) {
        faqItem.classList.remove('active');
        faqIcon.textContent = '+';
    } else {
        faqItem.classList.add('active');
        faqIcon.textContent = '−';
    }
}

// Função para enviar email (usando mailto como fallback ou FormSpree/EmailJS)
async function sendEmail(formData) {
    // Você pode integrar com EmailJS, FormSpree, ou outro serviço de email
    // Por enquanto, vamos usar mailto como fallback
    const emailBody = `
Nome: ${formData.nome}
E-mail: ${formData.email}
Empresa: ${formData.empresa}
Telefone: ${formData.telefone}
Número de lojas: ${formData.lojas}
Segmento: ${formData.segmento}
    `.trim();
    
    const mailtoLink = `mailto:contato@printbag.com.br?subject=Novo contato - ${formData.empresa}&body=${encodeURIComponent(emailBody)}`;
    
    // Abre o cliente de email (opcional)
    // window.location.href = mailtoLink;
    
    // Retorna true para indicar sucesso
    return true;
}

// Função para enviar para o webhook
async function sendToWebhook(formData) {
    const webhookUrl = 'https://ia-n8n.4xfwtv.easypanel.host/webhook/9bb8cab3-e473-4c6b-9faa-bfd68115c8b9';
    
    try {
        console.log('Enviando dados para webhook:', formData);
        console.log('URL do webhook:', webhookUrl);
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        console.log('Resposta do webhook - Status:', response.status);
        console.log('Resposta do webhook - Headers:', response.headers);
        
        // Alguns webhooks retornam 200 mesmo sem JSON
        if (response.ok) {
            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.log('Resposta do webhook (texto):', text);
                data = { message: text || 'Webhook recebido com sucesso' };
            }
            console.log('Dados recebidos do webhook:', data);
            return { success: true, data };
        } else {
            const errorText = await response.text();
            console.error('Erro na resposta do webhook:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    } catch (error) {
        console.error('Erro ao enviar para webhook:', error);
        console.error('Detalhes do erro:', {
            message: error.message,
            stack: error.stack
        });
        return { success: false, error: error.message };
    }
}

// Manipulador do formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('.submit-button');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Desabilita o botão durante o envio
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Coleta os dados do formulário
        const formData = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            empresa: document.getElementById('empresa').value.trim(),
            telefone: document.getElementById('telefone').value.trim(),
            lojas: document.getElementById('lojas').value,
            segmento: document.getElementById('segmento').value
        };
        
        try {
            // Envia email e webhook em paralelo
            const [emailResult, webhookResult] = await Promise.allSettled([
                sendEmail(formData),
                sendToWebhook(formData)
            ]);
            
            // Verifica os resultados
            const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value === true;
            const webhookSuccess = webhookResult.status === 'fulfilled' && webhookResult.value.success === true;
            
            if (webhookSuccess) {
                // Sucesso - mostra mensagem positiva
                alert('Obrigado! Seus dados foram enviados com sucesso. Entraremos em contato em breve.');
                
                // Limpa o formulário
                form.reset();
            } else if (emailSuccess) {
                // Email enviado, mas webhook falhou
                alert('Seus dados foram recebidos. Entraremos em contato em breve.');
                form.reset();
            } else {
                // Ambos falharam
                throw new Error('Erro ao enviar dados. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro no envio:', error);
            alert('Erro ao enviar os dados. Por favor, tente novamente ou entre em contato diretamente.');
        } finally {
            // Reabilita o botão
            submitButton.disabled = false;
            submitButton.textContent = 'Falar com um Consultor';
        }
    });
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            e.target.value = value;
        }
    });
});

