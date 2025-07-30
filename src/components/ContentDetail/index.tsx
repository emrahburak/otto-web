interface ContentDetailProps {
  content: string;      // HTML içerik stringi
  images?: string[];    // Opsiyonel, string dizisi (image URL'leri)
}


export default function ContentDetail({ content, images }: ContentDetailProps) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {images && images.length > 0 && (
        <div className="images-gallery">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`Image ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}

