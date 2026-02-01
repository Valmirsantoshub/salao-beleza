function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

function openAgendamento(servico) {
    const servicoSelect = document.getElementById('servico');
    const agendamentoSection = document.getElementById('agendamento');
    
    if (servico === 'Corte') {
        servicoSelect.value = 'Corte Feminino';
    } else if (servico === 'Coloração') {
        servicoSelect.value = 'Coloração';
    } else if (servico === 'Escova') {
        servicoSelect.value = 'Escova';
    } else if (servico === 'Manicure') {
        servicoSelect.value = 'Manicure';
    } else if (servico === 'Maquiagem') {
        servicoSelect.value = 'Maquiagem';
    } else if (servico === 'Pacote Especial') {
        servicoSelect.value = 'Pacote Especial';
    }
    
    agendamentoSection.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formAgendamento');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const servico = document.getElementById('servico').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;
        
        const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
        
        const mensagem = `Olá! Gostaria de agendar um horário:\n\n` +
                        `Nome: ${nome}\n` +
                        `Telefone: ${telefone}\n` +
                        `Serviço: ${servico}\n` +
                        `Data: ${dataFormatada}\n` +
                        `Horário: ${horario}`;
        
        const mensagemEncoded = encodeURIComponent(mensagem);
        const numeroWhatsApp = '5511987654321';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemEncoded}`;
        
        window.open(urlWhatsApp, '_blank');
        
        form.reset();
    });
    
    const dataInput = document.getElementById('data');
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', hoje);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});