import EditNoticia from "@/app/ui/dashboard/noticias/EditNoticia";

export default function EditNoticiaPage({ params }: { params: { id: string } }) {
    return <EditNoticia params={params} />;
}