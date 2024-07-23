import axios from 'axios';

(async () => {

    const actions = ['deposit', 'withdraw', 'shopping', 'cancellation', 'reversal'];

    console.log('Starting... ', new Date());

    for (let index = 0; index < 100; index++) {
        const code = generateRandomAccount(10);

        await createAccount(code);
        for (let j = 0; j < 200; j++) {
            const event = randomItem(actions);
            await executeBalanceChange(code, {
                amount: Math.random() * 1000,
                event,
                type: ['deposit', 'cancellation', 'reversal'].includes(event) ? 1 : -1,
                timestamp: new Date().getTime()
            })
        }
    }

    console.log('Finished. ', new Date());

})();

function generateRandomAccount(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
}

async function createAccount(code) {
    const response = await axios.get(`http://localhost:3000/wallet/${code}/balance`);
    return response.data;
}

async function executeBalanceChange(code, data) {
    const response = await axios.post(`http://localhost:3000/wallet/${code}/transact`, data);
    return response.data;
}
