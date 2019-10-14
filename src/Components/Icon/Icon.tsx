import * as React from 'react';

import mushrooms from '../../Resources/Images/mushrooms.jpg';
import lumber from '../../Resources/Images/lumber.png';
import bones from '../../Resources/Images/bones.jpg';
import blood from '../../Resources/Images/blood.jpg';
import deer from '../../Resources/Images/deer.jpg';
import fat from '../../Resources/Images/fat.jpg';
import fur from '../../Resources/Images/fur.png';
import hide from '../../Resources/Images/hide.jpg';
import meat from '../../Resources/Images/meat.png';
import planks from '../../Resources/Images/planks.jpg';
import rats from '../../Resources/Images/rats.jpg';
import stone from '../../Resources/Images/stone.png';


const icons:{ [key: string]: string } = {
    labor: 'M149.067 112.024a33.938 33.938 0 0 0 8.839-6.361c6.131 6.104 14.579 9.883 23.893 9.883a33.657 33.657 0 0 0 16.718-4.43c5.234 11.968 17.182 20.356 31.058 20.356 4.949 0 9.649-1.075 13.892-2.991v36.507c0 14.401-11.716 26.118-26.117 26.118h-11.663c-5.521 0-9.997 4.476-9.997 9.997v85.901c0 5.521 4.476 9.997 9.997 9.997s9.997-4.476 9.997-9.997V211.1h1.666c25.425 0 46.11-20.685 46.11-46.111V42.25c0-14.515-11.808-26.325-26.324-26.325h-15.122c-2.78 0-5.46.436-7.977 1.239C210.309 7.152 200.655 0 189.36 0h-15.122a26.184 26.184 0 0 0-16.327 5.698A26.186 26.186 0 0 0 141.583 0h-15.122a26.192 26.192 0 0 0-16.328 5.698A26.187 26.187 0 0 0 93.806 0H78.685C64.17 0 52.361 11.808 52.361 26.324v54.399c-10.87 3.239-18.821 13.32-18.821 25.228v15.122c0 10.061 5.675 18.817 13.99 23.246l4.282 19.325c5.391 24.326 24.711 42.576 48.326 46.615v76.745c0 5.521 4.476 9.997 9.997 9.997s9.997-4.476 9.997-9.997v-85.901c0-5.521-4.476-9.997-9.997-9.997-.492 0-.983-.009-1.473-.026-17.975-.635-33.327-13.695-37.331-31.761l-2.642-11.922h46.512c9.795 0 18.628-4.182 24.82-10.849 4.815 4.01 7.894 10.036 7.894 16.778v31.851c0 5.521 4.476 9.997 9.997 9.997s9.997-4.476 9.997-9.997v-31.851c0-14.713-7.639-27.666-19.153-35.128.211-1.533.311-4.584.311-6.174zM78.685 19.993h15.121a6.339 6.339 0 0 1 6.332 6.331v53.304H72.354V26.324a6.338 6.338 0 0 1 6.331-6.331zm36.516 107.411H59.864a6.338 6.338 0 0 1-6.331-6.331v-15.122a6.338 6.338 0 0 1 6.331-6.331h55.337c7.659 0 13.892 6.232 13.892 13.892s-6.233 13.892-13.892 13.892zm4.93-47.414V26.324a6.338 6.338 0 0 1 6.331-6.331h15.122a6.338 6.338 0 0 1 6.331 6.331v55.337c0 4.646-2.301 8.756-5.814 11.279-5.251-6.849-13.05-11.644-21.97-12.95zm61.668 15.563c-7.659 0-13.892-6.232-13.892-13.892V26.324a6.338 6.338 0 0 1 6.331-6.331h15.122a6.338 6.338 0 0 1 6.331 6.331v55.337c0 7.659-6.233 13.892-13.892 13.892zm47.776 15.926c-7.659 0-13.892-6.232-13.892-13.892V42.25a6.339 6.339 0 0 1 6.331-6.332h15.122a6.339 6.339 0 0 1 6.331 6.332v55.337c0 7.66-6.232 13.892-13.892 13.892z',
    trash: 'M192 1024h640l64-704h-768zM640 128v-128h-256v128h-320v192l64-64h768l64 64v-192h-320zM576 128h-128v-64h128v64z',
    facebook: 'M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z',
};

const images:{ [key: string]: any } = {
    mushrooms: mushrooms,
    lumber: lumber,
    bones: bones,
    blood: blood,
    deer: deer,
    fat: fat,
    fur: fur,
    hide: hide,
    meat: meat,
    planks: planks,
    rats: rats,
    stone: stone
}


export enum EIconType {
    svg = 'svg',
    img = 'img'
}

type DefaultProps = {
    type?: EIconType 
}

interface IProps extends Partial<DefaultProps> {
    icon: string
}

class Icon extends React.Component<IProps> {
    static defaultProps:DefaultProps = {
        type: EIconType.svg
    }
    public render() {
        if (this.props.type === EIconType.svg) {
            const icon = icons[this.props.icon];
            return (
                <svg width="22" height="22" viewBox="0 0 1024 1024">
                    <path d={icon}></path>
                </svg>
            );
        }
        else if (this.props.type === EIconType.img) {
            return (
                <img src={images[this.props.icon]} alt={this.props.icon}/>
            );
        }
        else {
            return null;
        }
    }
}

export default Icon;
