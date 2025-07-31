import type { CardData } from "../../../types/types";

import ziplineLogo from "@/assets/icons/zipline-logo-01.svg";

const images = import.meta.glob(
  "@/assets/images/zipline-survivor/*.{png,jpg,jpeg,svg,JPG}",
  {
    eager: true,
    import: "default",
  },
);

export const ziplineSurvivorParkuru: CardData = {
  id: 10,
  title: "Zipline & Survivor Parkuru",
  description: "Kahkahaların ormanda yankılandığı bir serüven",
  logo: ziplineLogo,
  images: Object.values(images) as string[],
  content: `
    <p>Cesaretin, dengeyle buluştuğu; kahkahaların ormanda yankılandığı bir serüven!</p>
    <p>Bu parkurda çocuklar sınırlarını zorlamıyor, kendi cesaretlerini keşfediyor. Yüksekten kaymak, dengede durmak, engelleri aşmak… Her adım bir özgüven, her düşüp kalkış bir öğrenme!</p>
    <p>Atölyede çocuklar:</p>
    <ul>
      <li>🌟 Zipline ile güvenli kayış deneyimi yaşar,</li>
      <li>🪢 Denge, koordinasyon ve esneklik gerektiren engelleri aşar,</li>
      <li>👟 Ekip çalışması, strateji kurma ve dayanıklılık geliştirir,</li>
      <li>🌿 Eğlenerek hareket eder, doğayla uyum içinde kendini keşfeder.</li>
    </ul>
    <p>Burada amaç yarışmak değil, cesaret etmek!<br />
    Doğanın içinde, güvenli ekipmanlarla donatılmış bu parkurda çocuklar hem çok eğlenir hem de "Ben yapabildim!" demenin gururunu yaşar.</p>
  `.trim(),
};
