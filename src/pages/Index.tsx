
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-coffee-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-coffee-600 mx-auto mb-4" />
        <h1 className="text-2xl font-medium text-coffee-800">Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
