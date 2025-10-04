"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function LandingPageViewer() {
  const params = useParams();
  const slug = params.slug as string;
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchLandingPage = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/${slug}`, {
          method: 'GET',
          headers: {
            'Accept': 'text/html',
          },
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            setError("Landing page not found");
          } else {
            setError("Failed to load landing page");
          }
          return;
        }

        const htmlContent = await response.text();
        setHtml(htmlContent);
      } catch (err) {
        console.error("Error fetching landing page:", err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading landing page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  // Render the HTML content
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: html }}
      className="landing-page-container"
    />
  );
}
