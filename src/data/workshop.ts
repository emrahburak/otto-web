import type { CardData } from "../types/types";
import { binicilikAtolyesi } from "./contents/aktivite/binicilik";
import { ciftciCocukAtolyesi } from "./contents/aktivite/ciftci";
import { comlekAtolyesi } from "./contents/aktivite/comlek";
import { kampVeCadirAtolyesi } from "./contents/aktivite/kamp";
import { kuklaAtolyesi } from "./contents/aktivite/kukla";
import { mutfakAtolyesi } from "./contents/aktivite/mutfak";
import { gelenekselSokakOyunlariAtolyesi } from "./contents/aktivite/geleneksel-sokak";
import { futbolVoleybolAtis } from "./contents/aktivite/spor-atis";
import { ziplineSurvivorParkuru } from "./contents/aktivite/zipline";
import { dramaAtolyesi } from "./contents/aktivite/drama";
import { yazOkulu } from "./contents/aktivite/yaz-okulu";
import { cocukOyunu } from "./contents/aktivite/cocuk-oyunu";
import { okulGezisi } from "./contents/aktivite/okul-gezisi";

export const workshops: CardData[] = [
  binicilikAtolyesi,
  ciftciCocukAtolyesi,
  comlekAtolyesi,
  kampVeCadirAtolyesi,
  kuklaAtolyesi,
  mutfakAtolyesi,
  gelenekselSokakOyunlariAtolyesi,
  futbolVoleybolAtis,
  ziplineSurvivorParkuru,
  dramaAtolyesi,
  yazOkulu,
  cocukOyunu,
  okulGezisi,
];
