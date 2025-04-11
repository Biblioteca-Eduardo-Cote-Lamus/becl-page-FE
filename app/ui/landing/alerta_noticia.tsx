'use client';

import { useEffect, useState } from 'react';
import { Noticias } from '@/app/lib/definitions';
import { getNoticias } from '@/app/actions/noticias';

export default function AlertaNoticia() {
  const [noticias, setNoticias] = useState<Noticias[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNoticias();
        setNoticias(data);
      } catch (error) {
        console.error('Error fetching noticias:', error);
      }
    };

    fetchData();
  }, []);

  if (noticias.length === 0) {
    return null;
  }
}