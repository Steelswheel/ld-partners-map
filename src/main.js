import { createApp } from 'vue';
import App from './App';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './css/style.scss';
import currency from 'currency.js';

const app = createApp(App);
app.use(ElementPlus).mount('#app');

const moneyFormat = (n, p = 0, s = true) => {
    let result = currency(n, { separator: ' ', precision: p })
        .format()
        .replace('$', '');

    if (s) {
        result += ' ₽';
    }

    return result;
}

export { moneyFormat };