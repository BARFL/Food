"use strict";

window.addEventListener('DOMContentLoaded', function() {

    //Tabs
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {  
        tabsContent.forEach((item, i) => {
            item.style.display = 'none';
            tabs[i].classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});

    //Modal
    const modal = document.querySelector('.modal'),
          modalOpenbuttons = document.querySelectorAll('button[data-modal]'),
          modalToggle = (modal) => {
            modal.classList.toggle('hide');
            document.body.classList.toggle('overflow_hiden');
          },
          showModalByScroll = () => {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
                modalToggle(modal);
                window.removeEventListener('scroll', showModalByScroll);
            }
          };
    
    window.addEventListener('scroll', showModalByScroll);
    
    document.addEventListener('keydown', (event) => {
        if (event.key == 'Escape' && !modal.classList.contains('hide')){
            modalToggle(modal);
        }
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-modalClose') == ''){
            modalToggle(modal);
        }
    });

    modalOpenbuttons.forEach(btn => {
        btn.addEventListener('click', () => {
            modalToggle(modal);
        });
    });

    //Timer
    let deadline = '2022-09-16';

    function setClock(selector, endtimer){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'), 
              hours = timer.querySelector('#hours'), 
              minutes = timer.querySelector('#minutes'), 
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);

        updateClock();
        function isZero(num){
            return num < 10 ? num <= 0 ? '00' :`0${num}` : num;
        }
              
        function updateClock(){
            const total = Date.parse(endtimer) - Date.parse(new Date()),
            date = {
                'days': Math.floor(total / (1000 * 60 * 60 * 24)),
                'hours': Math.floor(total / (1000 * 60 * 60) % 24),
                'minutes': Math.floor(total / (1000 * 60 ) % 60),
                'seconds': Math.floor(total / (1000) % 60)
            };

            days.innerHTML = isZero(date.days);
            hours.innerHTML = isZero(date.hours);
            minutes.innerHTML = isZero(date.minutes);
            seconds.innerHTML = isZero(date.seconds);

            if (total <= 0){
                clearInterval(timerInterval);
            }
        }

    }

    setClock('.timer', deadline);

    //Send data to server
    const forms = document.querySelectorAll('form'),
          message = {
            loading: 'Загрузка',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так'
          };

    forms.forEach(item => {
        sendData(item);
    });

    function sendData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();

            const statusMessage = document.createElement('div'),
                  formData = new FormData(form);
            console.log([...formData]);
            statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
                margin-top: 10px;
                text-align: center;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            fetch('send.php', {
                method: 'POST',
                body: formData         
            }).then((data) => {
                console.log(data);
                showInfoModal(message.success);
            }).catch(() => {
                showInfoModal(message.failure);
            }).finally(() => {
                form.reset();
                statusMessage.remove();
            });
        });
    }

    function showInfoModal(message){
        const OriginalModalDialog = document.querySelector('.modal__dialog');

        OriginalModalDialog.classList.add('hide');
        modal.classList.remove('hide');
        document.body.classList.add('overflow_hiden');

        const infoModal = document.createElement('div');
        infoModal.classList.add('modal__dialog');
        infoModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-modalclose="">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        modal.append(infoModal);

        setTimeout(() => {
            infoModal.remove();
            OriginalModalDialog.classList.remove('hide');
            modalToggle(modal);
        }, 4000);
    }
});