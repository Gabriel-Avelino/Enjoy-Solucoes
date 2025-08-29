const constrols = document.querySelectorAll(".control");
const container = document.querySelector('.galery-wrapper'); // Selecione o contêiner do carrossel

let currentItem = 0;
const items = document.querySelectorAll('.item');

const maxItems = items.length;

constrols.forEach(control=>{
    control.addEventListener('click', ()=> {
        const isLeft = control.classList.contains("arrow-left");
        
        if (isLeft) {
            currentItem -= 1;
        } else {
            currentItem += 1;
        }

        if (currentItem >= maxItems) {
            currentItem = 0;
        } else if (currentItem < 0) {
            currentItem = maxItems - 1;
        }

        items.forEach(item => item.classList.remove('current-item'));

        scrollToItem(currentItem);

        items[currentItem].classList.add('current-item');

        // Reset the interval
        clearInterval(intervalId);
        intervalId = setInterval(carrossel, 4800);
    })
})


function scrollToItem(index) {
    const item = items[index];
    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    const offsetLeft = itemRect.left - containerRect.left + container.scrollLeft - (containerRect.width / 2) + (itemRect.width / 2);
    
    container.scrollTo({
        left: offsetLeft,
        behavior: 'smooth'
    });
}

let lastScrollLeft = 0;
let ticking = false;
const scrollThreshold = 50; // Sensibilidade da mudança de item
let itemChanged = false; // Variável para controlar a mudança de item
let touchStartX = 0;

container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    lastScrollLeft = container.scrollLeft;
});

container.addEventListener('touchmove', (e) => {
    const touchCurrentX = e.touches[0].clientX;
    const touchDifference = touchCurrentX - touchStartX;
    const currentScrollLeft = container.scrollLeft;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            const isLeft = touchDifference > 0;
            const scrollDifference = Math.abs(currentScrollLeft - lastScrollLeft);

            if (scrollDifference > scrollThreshold && !itemChanged) {
                if (isLeft) {
                    currentItem -= 1;
                } else {
                    currentItem += 1;
                }

                if (currentItem >= maxItems) {
                    currentItem = 0;
                } else if (currentItem < 0) {
                    currentItem = maxItems - 1;
                }

                items.forEach(item => item.classList.remove('current-item'));
                items[currentItem].classList.add('current-item');

                scrollToItem(currentItem);

                itemChanged = true; // Marca que o item foi mudado
            }

            ticking = false;
        });

        ticking = true;
    }
});

container.addEventListener('touchend', () => {
    itemChanged = false; // Permite uma nova mudança de item no próximo scroll significativo
    ticking = false;
});


function carrossel(){
    currentItem++;

    if (currentItem >= maxItems) {
        currentItem = 0;
    } else if (currentItem < 0) {
        currentItem = maxItems - 1;
    }

    items.forEach(item => item.classList.remove('current-item'));

    scrollToItem(currentItem);

    items[currentItem].classList.add('current-item');
}

intervalId = setInterval(carrossel, 4800);