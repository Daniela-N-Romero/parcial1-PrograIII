export function showAlert(message: string,  actions?: { label: string, callback: () => void }[]) {

    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'alert-overlay';
    document.body.appendChild(alertOverlay);

    const alertBox = document.createElement('div');
    alertBox.className = `alert-box`;
    alertBox.innerHTML = `
                            <div class="alert-body">
                                <p>${message}</p>
                            </div>
                            <div class="alert-actions"></div>
`;

    const actionsContainer = alertBox.querySelector('.alert-actions');

    if (actions) {
        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'alert-action';
            btn.textContent = action.label;

            btn.addEventListener('click', () => {
                action.callback();
                document.body.removeChild(alertOverlay);
            });

            actionsContainer?.appendChild(btn);
        });
    }

    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);
    alertOverlay.style.display = 'flex';

    alertOverlay.addEventListener('click', (e) => {
        if (e.target === alertOverlay) {
            document.body.removeChild(alertOverlay);
        }
    });
}