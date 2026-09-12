import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index.tsx";
import NewArrivalPage from "./pages/NewArrivalPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import DesignsPage from "./pages/DesignsPage.tsx";
import AdvantagePage from "./pages/AdvantagePage.tsx";
import PortfolioPage from "./pages/PortfolioPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import { ChatWidget } from "./components/ChatWidget";

const queryClient = new QueryClient();

const WhatsAppButton = () => (
  <a
    href="https://wa.me/918796363097?text=Hi%20OcaVerse"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: "fixed",
      bottom: "20px",
      right: "90px",
      backgroundColor: "#25D366",
      color: "white",
      borderRadius: "50px",
      padding: "12px 20px",
      fontSize: "14px",
      fontWeight: "bold",
      textDecoration: "none",
      zIndex: 9999,
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    }}
  >
    💬 Chat on WhatsApp
  </a>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/new-arrival" element={<NewArrivalPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/tools" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/designs" element={<DesignsPage />} />
          <Route path="/advantage" element={<AdvantagePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ChatWidget />
      <WhatsAppButton />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
