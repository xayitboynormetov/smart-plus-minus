import { Calculator } from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Kalkulyator</h1>
          <p className="text-muted-foreground">Zamonaviy va oson foydalanish</p>
        </div>
        <Calculator />
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Klaviaturadan ham foydalanishingiz mumkin
        </div>
      </div>
    </div>
  );
};

export default Index;
