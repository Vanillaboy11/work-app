import Header from './Header';
import Hero from './Hero';
import FeaturedJobs from './FeaturedJobs';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <FeaturedJobs />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;