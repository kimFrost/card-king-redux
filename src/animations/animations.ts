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

export const animateDraw = (target: HTMLElement, offset: [number, number]): Promise<void> => {
    //return new Promise((resolve, reject) => {
    const timeline = anime.timeline();
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
    return timeline.finished;

    // Set card offset and animate to zero
    //translateX: offset[0],
    //translateY: offset[1],


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

export const animateDrawCard = (target: HTMLElement, uniqueID: string): Promise<void> => {
    return new Promise((resolve, reject) => {
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
            animateDraw(target, [deckRect.left - targetRect.left, deckRect.top - targetRect.top]).then(resolve);
        }
        else {
            reject();
        }
    });
}


export const offsetElementToTarget = (element: Element, target: Element): void => {
    const elementRect = element.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    anime({
        targets: element,
        translateX: elementRect.left - targetRect.left,
        translateY: elementRect.top - targetRect.top
    })
}

export const reveal = (element: Element): Promise<void> => {
    const timeline = anime.timeline();
    timeline.add({
        targets: element,
        duration: 0,
        rotateY: 180
    });
    timeline.add({
        targets: element,
        duration: 500,
        easing: 'easeInOutSine',
        rotateY: 0
    });
    return timeline.finished;
}

export const moveTo = (toTarget: HTMLElement, fromTarget: HTMLElement): Promise<void> => {
    return new Promise((resolve, reject) => {
        const fromRect = fromTarget.getBoundingClientRect();
        const targetRect = toTarget.getBoundingClientRect();
    });
}

export const bounce = (target: HTMLElement): Promise<void> => {
    const timeline = anime.timeline();
    timeline.add({
        targets: target,
        duration: 200,
        easing: 'easeInOutSine',
        translateY: -100
    });
    timeline.add({
        targets: target,
        duration: 400,
        easing: 'easeInOutSine',
        translateY: 0
    });
    return timeline.finished;
}

export const moveHome = (element: Element): Promise<void> => {
    return anime({
        targets: element,
        translateX: 0,
        translateY: 0,
        duration: 500
    }).finished
}

/*
export const drawCard = (): Promise<void> => {
    // Element is the card in hand. We need to offset and hide it. Then reveal, parse and move to orignal space in hand

    let el = document.querySelector('.game__deck');
    
}
*/
 
export const animateDrawToken = (target: HTMLElement, uniqueID: string) => animateCardIn(target);

// animate reveal card => Parse effects => animate to hand => Trigger done flow

// animations should not have anything to do with actions. They move things and report back when they are done. Thats it!