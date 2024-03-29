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
import Normal from 'src/assets/icons/types/Normal.png';
import Poison from 'src/assets/icons/types/Poison.png';
import Psychic from 'src/assets/icons/types/Psychic.png';
import Rock from 'src/assets/icons/types/Rock.png';
import Steel from 'src/assets/icons/types/Steel.png';
import Water from 'src/assets/icons/types/Water.png';

import { DamageClass, PokeType } from './enums';

const AppIcon = <const>{
  Classes: {
    [DamageClass.PHYSICAL]: Physical,
    [DamageClass.SPECIAL]: Special,
    [DamageClass.STATUS]: Status,
  },
  Types: {
    [PokeType.BUG]: Bug,
    [PokeType.DARK]: Dark,
    [PokeType.DRAGON]: Dragon,
    [PokeType.ELECTRIC]: Electric,
    [PokeType.FAIRY]: Fairy,
    [PokeType.FIGHTING]: Fighting,
    [PokeType.FIRE]: Fire,
    [PokeType.FLYING]: Flying,
    [PokeType.GHOST]: Ghost,
    [PokeType.GRASS]: Grass,
    [PokeType.GROUND]: Ground,
    [PokeType.ICE]: Ice,
    [PokeType.NORMAL]: Normal,
    [PokeType.POISON]: Poison,
    [PokeType.PSYCHIC]: Psychic,
    [PokeType.ROCK]: Rock,
    [PokeType.STEEL]: Steel,
    [PokeType.WATER]: Water,
    [PokeType.UNKNOWN]: Normal,
    [PokeType.SHADOW]: Dark,
  },
};

export default AppIcon;
