// OR Option 2: Default export
export default function RegisterPage() {
  const { handleAuthSuccess } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <RegisterForm onSuccess={handleAuthSuccess} />
    </div>
  );
}