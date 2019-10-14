//import * as anime from 'animejs'
import anime from 'animejs'


const easing = 'spring(1, 150, 10)';

const ANIMATION_DONE_EVENT = 'animation::done'
const triggerAnimationDoneEvent = (node: HTMLElement) =>
    node.dispatchEvent(new Event(ANIMATION_DONE_EVENT))

const createOpacityAnimationConfig = (animatingIn: any, duration: number = 500) => ({
    value: animatingIn ? [0, 1] : 0,
    easing: 'linear',
    duration: duration
})

export const addEndListener = (node: HTMLElement, done: any) =>
    node.addEventListener(ANIMATION_DONE_EVENT, done)

export const animateCardIn = (target: HTMLElement) => {
    anime({
        targets: target,
        opacity: createOpacityAnimationConfig(true, 500),
        translateY: [50, 0],
        complete: () => triggerAnimationDoneEvent(target)
    })
}

export const animateCardOut = (target: HTMLElement) => {
    //JSX.Element
    /*
    anime({
        targets: target,
        opacity: 0,
        duration: 0,
        complete: () => triggerAnimationDoneEvent(target)
    })
    */
    target.classList.add('placeholder');
    anime({
        targets: target,
        translateY: -10,
        opacity: createOpacityAnimationConfig(false, 500),
        complete: () => triggerAnimationDoneEvent(target)
    })
}

export const animateDraw = (target: HTMLElement, offset: [number, number]) => {
    // Set card offset and animate to zero
    //translateX: offset[0],
    //translateY: offset[1],

    let timeline = anime.timeline();
    timeline.add({
        targets: target,
        duration: 0,
        translateX: offset[0],
        translateY: offset[1],
    });
    timeline.add({
        targets: target,
        duration: 500,
        translateX: 0,
        translateY: 0,
        easing: 'easeInOutSine'
    });


    /*
    anime({
        targets: target,
        opacity: createOpacityAnimationConfig(true),
        translateX: 0,
        translateY: 0,
        complete: () => triggerAnimationDoneEvent(target)
    })
    */
}

export const animateDrawCard = (target: HTMLElement, uniqueID: string) => {
    let el = document.querySelector('.game__deck');
    // Search for card in previous render locations
    let elements = document.querySelectorAll(`[data-id="${uniqueID}"]`)
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (element && element !== target) {
            el = element;
            break;
        }
    }
    /*
    let cardEl = document.getElementById(uniqueID);
    if (cardEl && cardEl !== target) {
        el = cardEl;
    }
    */
    if (el) {
        const deckRect = el.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        animateDraw(target, [deckRect.left - targetRect.left, deckRect.top - targetRect.top]);
    }
}

export const animateDrawToken = (target: HTMLElement, uniqueID: string) => {
    animateCardIn(target);
}