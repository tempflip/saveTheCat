export class Listener {


    listening = [];

    // keysPressed = [];
    // keysUp = [];

    constructor() {
        document.addEventListener('keydown', (ev) => { this.registerKey(ev, true) });
        document.addEventListener('keyup', (ev) => { this.registerKey(ev, false) });
        document.addEventListener('lostgame', (ev) => { this.registerEvent('lostgame') });
    }

    registerKey(ev, isDown) {
        this.listening.forEach(l => {
            if (isDown) {
                l.keysPressed.push(ev.code)
            } else {
                l.keysUp.push(ev.code)
            }

        });

    }

    registerEvent(ev) {
        this.listening.forEach(l => {
            l.events.push(ev);
            // console.log('>>> ' + l.events);
        });

    }

    addListening(l) {
        this.listening.push(l);
    }

    resetKeys() {
        this.listening.forEach(l => {
            l.keysPressed = [];
            l.keysUp = [];
            l.events = [];
        });
    }
}