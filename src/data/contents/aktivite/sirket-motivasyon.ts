import sirketLogo from "@/assets/icons/sirket-logo-01.svg";

import type { CardData } from "../../../types/types";

const imageLoaders = import.meta.glob(`@/assets/images/sirket/webp/*.webp`, {
  eager: false,
  import: "default",
});

export const sirketMotivasyon: CardData = {
  id: 17,
  title: "Şirket Motivasyon Etkinliği",
  description:
    "Doğanın dönüştürücü gücüyle ekip bağlarını güçlendiren, size özel tasarlanmış motivasyon etkinlikleri.",
  logo: sirketLogo,
  images: Object.values(imageLoaders) as (() => Promise<string>)[], // string[] yerine
  content: `
  <h2>Otto Doğa Okulu’nda Neden Şirket Motivasyon Etkinliği Yapmalısınız?</h2>
  <p>
  Çünkü güçlü ekipler, yalnızca birlikte çalışan değil; birlikte deneyimleyen, düşünen ve bağ kuran
ekiplerdir. Otto Doğa Okulu, ekiplerin bu bağı yeniden ve doğal yollarla kurabilmesi için
tasarlanmış bir deneyim alanıdır.
  </p>
<p>
Doğa içinde gerçekleşen etkinlikler, günlük iş rutinlerinin yarattığı mesafeyi ortadan kaldırır.
Hiyerarşilerin yumuşadığı, iletişimin doğal biçimde akmaya başladığı bu ortamda ekipler, birbirini
daha gerçek ve samimi bir bağlamda tanıma fırsatı bulur.
</p>
<p>
Otto Doğa Okulu’nda sunulan motivasyon etkinlikleri; hazır kalıplardan oluşmaz. Her program,
kurumun kültürü, ekip yapısı ve hedeflenen kazanımlar doğrultusunda birlikte tasarlanır. Bu sayede
etkinlik, kısa süreli bir motivasyon anı olmaktan çıkar; ekip içinde kalıcı etki yaratan bir deneyime
dönüşür.
</p>
<p>
Doğanın sakinleştirici ve dönüştürücü etkisi, yaratıcı düşünmeyi ve birlikte üretmeyi destekler.
Katılımcılar, iş temposundan uzaklaşarak zihinsel olarak yenilenir; bu da ekip içi iletişime, problem
çözme becerilerine ve motivasyona doğrudan yansır.
</p>
<p>
Otto Doğa Okulu, şirketler için yalnızca bir etkinlik alanı değil; ekiplerin güçlendiği, tazelendiği ve
birlikte geliştiği bir buluşma alanıdır.
</p>

  `.trim(),
};
