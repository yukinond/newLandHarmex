document.addEventListener('DOMContentLoaded', function () {
    const firstAccordionButton = document.querySelector('.accordion-btn');
    const firstAccordionPanel = firstAccordionButton.nextElementSibling;

    firstAccordionButton.setAttribute('aria-expanded', 'true');
    firstAccordionPanel.style.maxHeight = firstAccordionPanel.scrollHeight + 'px';

    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-btn');
        const panel = item.querySelector('.accordion-panel');

        button.addEventListener('click', function () {
            const isOpen = button.getAttribute('aria-expanded') === 'true';

            accordionItems.forEach(otherItem => {
                const otherButton = otherItem.querySelector('.accordion-btn');
                const otherPanel = otherItem.querySelector('.accordion-panel');
                otherButton.setAttribute('aria-expanded', 'false');
                otherPanel.style.maxHeight = null;
                console.log('open')
            });

            if (!isOpen) {
                button.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + 16 + 'px';
            }
        });
    });
});