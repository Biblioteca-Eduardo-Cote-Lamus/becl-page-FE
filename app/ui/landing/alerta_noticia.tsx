import { useEffect, useState } from 'react';
import { fetchNoticias } from '@/app/lib/data';
import { Noticias } from '@/app/lib/definitions';
import Alert from './alert';

const AlertaNoticia: React.FC = () => {
    const [noticia, setNoticia] = useState<Noticias | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const obtenerNoticia = async () => {
            const noticias = await fetchNoticias();
            const noticiaImportante = noticias.find((noticia: Noticias) => noticia.importante);
            if (noticiaImportante) {
                setNoticia(noticiaImportante);
                setShowAlert(true);
            }
        };

        obtenerNoticia();
    }, []);

    const handleClose = () => {
        setShowAlert(false);
    };

    return (
        <>
            {showAlert && noticia && <Alert noticia={noticia} onClose={handleClose} />}
        </>
    );
};

export default AlertaNoticia;