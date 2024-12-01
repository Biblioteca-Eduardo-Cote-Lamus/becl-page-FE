
import Image from 'next/image';

interface AuthenticatedImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const AuthenticatedImage: React.FC<AuthenticatedImageProps> = ({ src, alt = "Image", className = "" }) => {
  const fullImageUrl = src.startsWith('http') 
    ? src 
    : `${process.env.NEXT_PUBLIC_API_URL}${src}`;

  return (
    <Image
      src={fullImageUrl}
      alt={alt}
      className={className}
      onError={(e) => {
        console.error('Error loading image:', fullImageUrl);
        e.currentTarget.src = '/placeholder.png'; // Asegúrate de tener una imagen de placeholder
      }}
      layout="responsive"
      width={500} // Set appropriate width
      height={300} // Set appropriate height
    />
  );
};

export default AuthenticatedImage;