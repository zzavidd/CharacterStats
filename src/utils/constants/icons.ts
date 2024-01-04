import Physical from 'src/assets/icons/classes/Physical.png';
import Special from 'src/assets/icons/classes/Special.png';
import Status from 'src/assets/icons/classes/Status.png';
import Bug from 'src/assets/icons/types/Bug.png';
import Dark from 'src/assets/icons/types/Dark.png';
import Dragon from 'src/assets/icons/types/Dragon.png';
import Electric from 'src/assets/icons/types/Electric.png';
import Fairy from 'src/assets/icons/types/Fairy.png';
import Fighting from 'src/assets/icons/types/Fighting.png';
import Fire from 'src/assets/icons/types/Fire.png';
import Flying from 'src/assets/icons/types/Flying.png';
import Ghost from 'src/assets/icons/types/Ghost.png';
import Grass from 'src/assets/icons/types/Grass.png';
import Ground from 'src/assets/icons/types/Ground.png';
import Ice from 'src/assets/icons/types/Ice.png';
import {
  default as Normal,
  default as Unknown,
} from 'src/assets/icons/types/Normal.png';
import Poison from 'src/assets/icons/types/Poison.png';
import Psychic from 'src/assets/icons/types/Psychic.png';
import Rock from 'src/assets/icons/types/Rock.png';
import Steel from 'src/assets/icons/types/Steel.png';
import Water from 'src/assets/icons/types/Water.png';

import { DamageClass, Type } from './enums';

const PokeIcon = <const>{
  Classes: {
    [DamageClass.PHYSICAL]: Physical,
    [DamageClass.SPECIAL]: Special,
    [DamageClass.STATUS]: Status,
  },
  Types: {
    [Type.BUG]: Bug,
    [Type.DARK]: Dark,
    [Type.DRAGON]: Dragon,
    [Type.ELECTRIC]: Electric,
    [Type.FAIRY]: Fairy,
    [Type.FIGHTING]: Fighting,
    [Type.FIRE]: Fire,
    [Type.FLYING]: Flying,
    [Type.GHOST]: Ghost,
    [Type.GRASS]: Grass,
    [Type.GROUND]: Ground,
    [Type.ICE]: Ice,
    [Type.NORMAL]: Normal,
    [Type.POISON]: Poison,
    [Type.PSYCHIC]: Psychic,
    [Type.ROCK]: Rock,
    [Type.STEEL]: Steel,
    [Type.WATER]: Water,
    [Type.UNKNOWN]: Unknown,
  },
};

export default PokeIcon;
