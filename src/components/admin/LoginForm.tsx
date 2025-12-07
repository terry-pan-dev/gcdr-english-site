import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { authApi } from "../../lib/admin-api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (authApi.isAuthenticated()) {
      window.location.href = "/admin/dashboard";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authApi.login(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        // Redirect to dashboard
        window.location.href = "/admin/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#EBE9CF" }}>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg" style={{ borderColor: "#c9a050", borderWidth: "2px" }}>
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#1c1917" }}>
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#1c1917" }}>
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#1c1917" }}>
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={{ backgroundColor: "#c9a050", color: "#1c1917" }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

