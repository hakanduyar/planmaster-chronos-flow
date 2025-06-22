
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingTestimonials from '@/components/landing/LandingTestimonials';
import LandingCTA from '@/components/landing/LandingCTA';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Eğer kullanıcı giriş yapmışsa dashboard'a yönlendir
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-modern">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCTA />
    </div>
  );
}
