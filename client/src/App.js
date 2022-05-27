import "./index.css";

function App() {
  return (
    <div className="App">
      <div class="rounded-lg overflow-hidden mx-auto max-w-sm bg-white shadow text-center">
        <div class="bg-blue-800 py-1">
          <p class="text-white font-bold text-2xl">2 GB</p>
        </div>

        <div class="py-4">
          <div class="flex justify-center">
            <span class="text-3xl self-start font-thin">$</span>
            <span class="text-7xl font-semibold">9</span>
            <span class="text-3xl self-end font-thin">/mo</span>
          </div>

          <p class="mt-1 text-sm">$10 activation fee</p>

          <a
            class="inline-block mt-4 bg-blue-800 text-white py-1 px-4 rounded-full font-semibold"
            href="#"
          >
            View Plan
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
