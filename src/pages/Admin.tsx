import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "@/components/AdminPanel";
import BlogManagement from "@/components/admin/BlogManagement";
import Analytics from "@/components/admin/Analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import AuthComponent from "@/components/Auth";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-primary text-center mb-8">
            Admin Dashboard
          </h1>
          <AuthComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-display font-bold text-primary">Admin Dashboard</h1>
          <button
            onClick={() => {
              supabase.auth.signOut();
              navigate("/");
              toast({
                title: "Signed Out",
                description: "You have been signed out successfully",
              });
            }}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Sign Out
          </button>
        </div>
        
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
          
          <TabsContent value="locations">
            <AdminPanel />
          </TabsContent>
          
          <TabsContent value="blogs">
            <BlogManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;