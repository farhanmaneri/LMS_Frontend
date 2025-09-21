export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">
        Sorry, the page you are looking for doesn’t exist yet.
      </p>
    </div>
  );
}
