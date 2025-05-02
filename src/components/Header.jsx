import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const goToRandom = () => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    navigate(`/pokemon/${randomId}`);
  };

  return (
    <header className="header">
      <h1>Pokémon Search</h1>
      <button onClick={goToRandom}>Random Pokémon</button>
    </header>
  );
}
  export default Header;
  