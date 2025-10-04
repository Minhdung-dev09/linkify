"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAuthToken, isAuthenticated } from "@/lib/auth";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function AuthDebug() {
  const [showToken, setShowToken] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const authToken = getAuthToken();
    setToken(authToken);
  }, []);

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      toast.success("Token copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const testAuth = async () => {
    try {
      const response = await fetch('/api/landing-pages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Authentication successful!");
      } else {
        const error = await response.json();
        toast.error(`Auth failed: ${error.message}`);
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Authentication Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Status:</span>
          <Badge variant={isAuthenticated() ? "default" : "destructive"}>
            {isAuthenticated() ? "Authenticated" : "Not Authenticated"}
          </Badge>
        </div>

        {token && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">Token:</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyToken}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            {showToken && (
              <div className="p-2 bg-gray-100 rounded text-xs font-mono break-all">
                {token}
              </div>
            )}
          </div>
        )}

        <Button 
          onClick={testAuth} 
          disabled={!token}
          className="w-full"
          size="sm"
        >
          Test Authentication
        </Button>
      </CardContent>
    </Card>
  );
}
