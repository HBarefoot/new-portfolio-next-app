import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Página No Encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Esta página de aterrizaje no existe o puede haber expirado.
          Por favor verifica la URL o contáctanos para asistencia.
        </p>
        <Link
          href="/es"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}
