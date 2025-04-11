import { getUserById } from "@/app/actions/users";
import UserForm from "@/app/ui/dashboard/UserForm";
import { notFound } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUserById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Usuario</h1>
      <UserForm user={user} />
    </div>
  );
}
