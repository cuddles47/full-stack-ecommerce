"use client";
import { Provider } from "react-redux";
import { store } from "../../store";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Warning from "../../features/cart/components/Warning";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Header />
      <main className="min-h-screen bg-gray-50 py-4">
        {children}
      </main>
      <Footer />
      <Warning />
    </Provider>
  );
};

export default StoreLayout;
