import { useParams } from "react-router-dom";

export default function ServiceDetailPage() {
  const { slug } = useParams();

  return (
    <div>
      <h1>Service Detail: {slug}</h1>
      {/* Buradan slug'a göre veri çekebilir veya filtre uygulayabilirsin */}
    </div>
  );
}

