
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Lock, User, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    
    try {
      console.log("Submitting login form with username:", username);
      await login(username, password);
    } catch (err) {
      console.error("Login error in component:", err);
      // Error is displayed via toast in auth context
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-coffee-50 to-coffee-100 p-4">
      <div className="w-full max-w-md opacity-0 animate-fadeIn" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-white rounded-full shadow-md mb-4">
            <Coffee className="h-12 w-12 text-coffee-600" />
          </div>
          <h1 className="text-3xl font-bold text-coffee-800 mb-2">Coffee Shop Manager</h1>
          <p className="text-coffee-600">Sign in to access your dashboard</p>
        </div>
        
        <Card className="glass-card border-coffee-100">
          <CardHeader>
            <CardTitle className="text-xl text-center text-coffee-800">Admin Login</CardTitle>
            <CardDescription className="text-center text-coffee-500">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="text-xs text-amber-600 border border-amber-200 bg-amber-50 p-2 rounded">
                <p><strong>Demo accounts:</strong></p>
                <p>Username: admin | Password: admin123</p>
                <p>Username: manager | Password: manager123</p>
                <p>Username: employee | Password: employee123</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-coffee-700">Username</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-4 w-4 text-coffee-400" />
                  </div>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-white/50 border-coffee-200 focus:border-coffee-400 focus:ring-coffee-400"
                    placeholder="Enter your username"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-coffee-700">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-coffee-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/50 border-coffee-200 focus:border-coffee-400 focus:ring-coffee-400"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-coffee-600 hover:bg-coffee-700 focus:ring-coffee-500"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-6 text-coffee-500 text-sm">
          © {new Date().getFullYear()} Coffee Shop Manager. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
