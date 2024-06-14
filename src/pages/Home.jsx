import { Footer, Articles, Feedback, Header, Recipes } from "../components";

const Home = () => {
  return (
    <section className="flex w-full flex-col">
      <Header />
      <Articles />
      <Recipes />
      <Feedback />
      <Footer />
    </section>
  );
};

export default Home;
