import Image from 'next/image';
import { useState } from 'react';

interface AuthenticatedImageProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

const AuthenticatedImage: React.FC<AuthenticatedImageProps> = ({ 
  src, 
  alt = "Image", 
  className = "",
  width = 500,
  height = 300
}) => {
  const [error, setError] = useState(false);
  
  const getImageUrl = (src: string) => {
    if (src.startsWith('http')) {
      return src;
    }
    if (src.startsWith('/')) {
      return src;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}${src}`;
  };

  const imageUrl = getImageUrl(src);

  return (
    <Image
      src={error ? '/placeholder.png' : imageUrl}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => {
        console.error('Error loading image:', imageUrl);
        setError(true);
      }}
      priority={false}
      loading="lazy"
    />
  );
};

export default AuthenticatedImage;