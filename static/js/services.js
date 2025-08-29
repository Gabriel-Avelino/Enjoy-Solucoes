let openPopUp = null;

class PopUpAbrir {
    /**
    * @param  element
    */
    constructor(element) {
        this.elemento = element;
        this.elemento.classList.add('open');
        this.elemento.classList.remove('closing');
        this.elemento.classList.remove('ocultar');
        this.elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

class PopUpFechar {
    /**
    * @param  element
    */
    constructor(element) {
        this.elemento = element;
        this.elemento.classList.remove('open');
        this.elemento.classList.add('closing');
        setTimeout(() => {
            this.elemento.classList.add('ocultar');
            this.elemento.classList.remove('closing');
        }, 300); // Tempo da transição (deve coincidir com o tempo de transição no CSS)
    }
}

function togglePopUp() {
    let elementoClasse = `abrir${event.currentTarget.classList[0]}`; // Usar event.currentTarget para pegar a div .servico

    let popUpElement = document.querySelector(`.${elementoClasse}`);

    if (openPopUp && openPopUp !== popUpElement) {
        new PopUpFechar(openPopUp);
        setTimeout(() => {
            new PopUpAbrir(popUpElement);
            openPopUp = popUpElement;
        }, 500);
    } else{
        if (popUpElement.classList.contains('open')) {
            new PopUpFechar(popUpElement);
            openPopUp = null;
        } else {
            new PopUpAbrir(popUpElement);
            openPopUp = popUpElement;
        }
    }
}