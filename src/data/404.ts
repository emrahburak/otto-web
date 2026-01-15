import type { PageData } from "../types/types";

export const sayfaBulunamadi: PageData = {
  id: 404,
  slug: "404",
  title: "Amanın! Ormanda Yolunuzu mu Kaybettiniz?",
  description: "Aradığınız sayfa Otto Doğa Okulu sınırları içinde bulunamadı.",
  content: `
<div style="text-align: center; padding: 20px 0;">
  <h1 style="font-size: 80px; color: #2d5a27; margin-bottom: 10px;">404</h1>
  <p style="font-size: 20px; color: #666;">Görünüşe göre yanlış patikaya saptınız.</p>
  <br/>

  <div style="background-color: #f9f9f9; border-radius: 15px; padding: 30px; border: 1px dashed #2d5a27;">
    <h3>Ne Olmuş Olabilir?</h3>
    <ul style="text-align: left; display: inline-block;">
      <li>Sayfa başka bir ağacın altına taşınmış olabilir.</li>
      <li>Adres (URL) yazılırken bir harf hatası yapılmış olabilir.</li>
      <li>Aradığınız etkinlik artık doğanın bir parçası olmuş (silinmiş) olabilir.</li>
    </ul>
  </div>

  <br/>
  <h3>Hemen Ana Kampa Dönün</h3>
  <p>Endişelenmeyin, pusulanız hala çalışıyor! Aşağıdaki bağlantıları kullanarak güvenli yola dönebilirsiniz:</p>
  
  <div style="margin-top: 20px;">
    <a href="/" style="display: inline-block; background-color: #2d5a27; color: white; padding: 12px 25px; border-radius: 30px; text-decoration: none; margin: 5px; font-weight: bold;">Ana Sayfaya Dön</a>
    <a href="/aktiviteler" style="display: inline-block; background-color: #7ab317; color: white; padding: 12px 25px; border-radius: 30px; text-decoration: none; margin: 5px; font-weight: bold;">Aktiviteleri Keşfet</a>
  </div>

  <br/><br/>
  <p>Hala yardıma ihtiyacınız varsa orman korucularımıza (bize) <a href="/iletisim">buradan</a> ulaşabilirsiniz.</p>
</div>
  `.trim(),
};
