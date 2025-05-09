import { Metadata } from 'next';
import PersonalList from './components/PersonalList';
import DesarrolladoresList from './components/DesarrolladoresList';
import AddPersonForm from './components/AddPersonForm';
 
export const metadata: Metadata = {
  title: 'Nosotros',
};

export default function NosotrosPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Nosotros</h1>
      
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Personal de la Biblioteca</h2>
          <PersonalList />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Desarrolladores</h2>
          <DesarrolladoresList />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Añadir Nuevo Miembro</h2>
          <AddPersonForm />
        </div>
      </div>
    </div>
  );
}
