// ==UserScript==
// @name         Universal Prompt Manager (LOADER)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Загрузчик - код загружается с GitHub
// @author       You
// @match        https://chat.qwen.ai/*
// @match        https://chat.deepseek.com/*
// @match        https://alice.yandex.ru/*
// @match        https://giga.chat/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// @downloadURL  https://github.com/supersvetodiod/prompt-manager/raw/refs/heads/main/loader.user.js
// @updateURL    https://github.com/supersvetodiod/prompt-manager/raw/refs/heads/main/loader.user.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Функция для загрузки основного кода
    function loadCore() {
        const coreUrl = 'https://github.com/supersvetodiod/prompt-manager/raw/refs/heads/main/corer.js';
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: coreUrl,
            onload: function(response) {
                if (response.status === 200) {
                    // Выполняем загруженный код
                    eval(response.responseText);
                    console.log('✅ Prompt Manager загружен');
                } else {
                    console.error('❌ Ошибка загрузки:', response.status);
                    setTimeout(loadCore, 5000); // Повтор через 5 секунд
                }
            },
            onerror: function() {
                console.error('❌ Не удалось загрузить код');
                setTimeout(loadCore, 5000);
            }
        });
    }
    
    // Ждём загрузки страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCore);
    } else {
        loadCore();
    }
    
})();
