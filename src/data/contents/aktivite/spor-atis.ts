import type { CardData } from "../../../types/types";
import futbolIcon from "@/assets/icons/futbol-logo.svg";

const images = import.meta.glob(
  "@/assets/images/spor-atis/*.{png,jpg,jpeg,svg,JPG}",
  {
    eager: true,
    import: "default",
  },
);

export const futbolVoleybolAtis: CardData = {
  id: 9,
  title: "Futbol, Voleybol ve Atış Oyunları",
  description:
    "Ormanın ortasında birlikte hareket etmenin, takım ruhunun ve odaklanmanın oyunla buluştuğu anlar!",
  logo: futbolIcon,
  images: Object.values(images) as string[],
  content: `
    <p>Ormanın ortasında birlikte hareket etmenin, takım ruhunun ve odaklanmanın oyunla buluştuğu anlar!</p>

    <h2>⚽ Futbol</h2>
    <p>Top sadece kale değil, birlikte oynamaya da gider!</p>
    <p>Ormanın içinde özgürce koşan çocuklar, paslaşmanın, takım olmanın ve birlikte başarmanın keyfini yaşıyor. Kurallar basit, eğlence büyük!</p>
    <p>Burada çocuklar:</p>
    <ul>
      <li>👟 Pas, şut, kontrol gibi temel futbol becerilerini öğrenir,</li>
      <li>🤝 Takım olma, paylaşma ve stratejik düşünme deneyimi kazanır,</li>
      <li>💨 Koordinasyon, hız ve denge becerilerini geliştirir.</li>
    </ul>
    <p>Gol atmak güzeldir ama en güzeli takımca gülmektir!</p>

    <hr/>

    <h2>🏐 Voleybol</h2>
    <p>Top havada, dikkat oyunda!</p>
    <p>Burada çocuklar paslaşır, servis atar ve birlikte hareket etmenin ritmini yakalar. Hem eğlenceli hem öğretici bir takım oyunu!</p>
    <p>Burada çocuklar:</p>
    <ul>
      <li>🏐 Temel voleybol tekniklerini (pas, manşet, servis) öğrenir,</li>
      <li>🧠 Dikkat, refleks ve işbirliği becerilerini geliştirir,</li>
      <li>💬 Sessiz iletişimin, beden dilinin ve takım uyumunun gücünü keşfeder.</li>
    </ul>
    <p>Topu düşürmemek bazen dostluğu yükseltmektir!</p>

    <hr/>

    <h2>🎯 Atış Oyunları</h2>
    <p>Odaklan, nefes al… Ve hedefe gönder!</p>
    <p>Atış Oyunları’nda çocuklar hem eğleniyor hem de odaklanma ve el-göz koordinasyonu becerilerini geliştiriyor. Renkli halkalar, hedef tahtaları, mini oklar ve doğayla iç içe mini meydan okumalar!</p>
    <p>Bu atölyede çocuklar:</p>
    <ul>
      <li>🎯 Hedef belirleme, dikkatli nişan alma ve sabır geliştirme deneyimi yaşar,</li>
      <li>🤹‍♀️ El-göz koordinasyonu ve ince motor becerilerini güçlendirir,</li>
      <li>🏹 Eğlenceli yarışmalarla özgüven kazanır.</li>
    </ul>
    <p>Hedefi tutturmak bir başarıdır, denemek ise cesarettir!</p>
  `.trim(),
};
