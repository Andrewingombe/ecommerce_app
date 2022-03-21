import webpackLogo from "../images/webpack_logo.png";

const Home = () => {
  return (
    <div>
      <h1>Webpack Module Bundler & Transpiler</h1>
      <hr />
      <img className="image" src={webpackLogo} alt="webpack logo" />
    </div>
  );
};

export default Home;
