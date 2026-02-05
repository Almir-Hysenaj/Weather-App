import { Weather } from './components/Weather';
import sky from './assets/sky.jpg';

function App() {
  return (
    <div
      className="min-h-screen m-0 p-0 box-border grid bg-[#e2d4ff] font-SN_Pro bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${sky})` }}
    >
      <Weather />
    </div>
  );
}

export default App;
