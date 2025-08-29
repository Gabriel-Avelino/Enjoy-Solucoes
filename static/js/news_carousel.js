const controls2 = document.querySelectorAll(".control2");
const container2 = document.querySelector('.galery-wrapper2'); // Selecione o contêiner do carrossel

let currentItem2 = 0;
const items2 = document.querySelectorAll('.item2');

const maxItems2 = items2.length;

controls2.forEach(control => {
    control.addEventListener('click', () => {
        const isLeft = control.classList.contains("arrow-left");
        
        if (isLeft) {
            currentItem2 -= 1;
        } else {
            currentItem2 += 1;
        }

        if (currentItem2 >= maxItems2) {
            currentItem2 = 0;
        } else if (currentItem2 < 0) {
            currentItem2 = maxItems2 - 1;
        }

        items2.forEach(item => item.classList.remove('current-item2'));

        items2[currentItem2].classList.add('current-item2');

        scrollToItem2(currentItem2);
    });
});

function scrollToItem2(index) {
    const item = items2[index];
    const containerRect = container2.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    
    const offsetLeft = itemRect.left - containerRect.left + container2.scrollLeft - (containerRect.width / 2) + (itemRect.width / 2);
    
    container2.scrollTo({
        left: offsetLeft,
        behavior: 'smooth'
    });
}

let lastScrollLeft2 = 0;
let ticking2 = false;
const scrollThreshold2 = 50; // Sensibilidade da mudança de item
let itemChanged2 = false; // Variável para controlar a mudança de item
let touchStartX2 = 0;

container2.addEventListener('touchstart', (e) => {
    touchStartX2 = e.touches[0].clientX;
    lastScrollLeft2 = container2.scrollLeft;
});

container2.addEventListener('touchmove', (e) => {
    const touchCurrentX2 = e.touches[0].clientX;
    const touchDifference2 = touchCurrentX2 - touchStartX2;
    const currentScrollLeft2 = container2.scrollLeft;

    if (!ticking2) {
        window.requestAnimationFrame(() => {
            const isLeft2 = touchDifference2 > 0;
            const scrollDifference2 = Math.abs(currentScrollLeft2 - lastScrollLeft2);

            if (scrollDifference2 > scrollThreshold && !itemChanged2) {
                if (isLeft2) {
                    currentItem2 -= 1;
                } else {
                    currentItem2 += 1;
                }

                if (currentItem2 >= maxItems2) {
                    currentItem2 = 0;
                } else if (currentItem2 < 0) {
                    currentItem2 = maxItems2 - 1;
                }

                items2.forEach(item => item.classList.remove('current-item2'));
                items2[currentItem2].classList.add('current-item2');

                scrollToItem2(currentItem2);

                itemChanged2 = true; // Marca que o item foi mudado
            }

            ticking2 = false;
        });

        ticking2 = true;
    }
});

container2.addEventListener('touchend', () => {
    itemChanged2 = false; // Permite uma nova mudança de item no próximo scroll significativo
    ticking2 = false;
});