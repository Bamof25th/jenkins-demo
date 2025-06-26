document.addEventListener("DOMContentLoaded", () => {
  const inp = document.getElementById("inp");

  inp.addEventListener("change", (e) => {
    if (e.target.value) {
      fetchData(e.target.value);
    }
  });

  var fetchData = async (value) => {
    try {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value ? value : 150}`
      );
      let data = await response.json();
      console.log("pokemon-data", data);
      renderPokemon(data);
    } catch (error) {
      renderPokemon("");
      console.log(error);
    }
  };

  window.fetchData = fetchData;

  const renderPokemon = (data) => {
    const pokedex = document.getElementById("Pokedesk");
    let pokemonHTMLString;

    if (data && data.sprites && data.name) {
      // Card for valid Pokémon
      pokemonHTMLString = `
        <li class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-2 border-gray-700">
          <!-- Pokédex top section with lights -->
          <div class="px-4 pt-3 pb-1 flex items-center border-b-2 border-gray-700">
            <div class="w-8 h-8 rounded-full bg-blue-500 border-2 border-white mr-2 flex items-center justify-center">
              <div class="w-6 h-6 rounded-full bg-blue-400 animate-pulse"></div>
            </div>
            <div class="flex space-x-1">
              <div class="w-3 h-3 rounded-full bg-red-500 border border-gray-700"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500 border border-gray-700"></div>
              <div class="w-3 h-3 rounded-full bg-green-500 border border-gray-700"></div>
            </div>
            <div class="ml-auto text-xs text-gray-300 font-mono">KANTO DEX v1.0</div>
          </div>

          <!-- Screen section -->
          <div class="p-4 bg-gray-700 mx-3 my-3 rounded-lg border-2 border-gray-600">
            <div class="bg-gray-600 p-2 rounded border-2 border-gray-500">
              <img
                class="w-40 h-40 mx-auto object-contain bg-gradient-to-b from-green-200 to-green-300 rounded p-1"
                src="${data.sprites.front_default}"
                alt="${data.name}"
              />
            </div>
          </div>

          <!-- Data section -->
          <div class="px-6 py-3 bg-gray-700 mx-3 mb-3 rounded-lg border-2 border-gray-600">
            <div class="flex items-center mb-2">
              <div class="text-xs font-mono text-gray-400 mr-1">NO.</div>
              <h2 class="text-xl font-bold text-gray-200 font-mono">
                #${data.id.toString().padStart(3, "0")} ${
        data.name.charAt(0).toUpperCase() + data.name.slice(1)
      }
              </h2>
            </div>

            <div class="flex items-center">
              <div class="text-xs font-mono text-gray-400 mr-1">TYPE:</div>
              <p class="text-gray-200">
                ${data.types
                  .map(
                    (type) =>
                      `<span class="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2 border border-gray-500">${type.type.name}</span>`
                  )
                  .join("")}
              </p>
            </div>
          </div>

          <!-- Bottom controls -->
          <div class="px-4 py-2 flex justify-between items-center border-t-2 border-gray-700">
            <div class="w-10 h-10 rounded-full bg-gray-600"></div>
            <div class="flex space-x-2">
              <div class="w-6 h-2 bg-gray-600 rounded"></div>
              <div class="w-6 h-2 bg-gray-600 rounded"></div>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div class="w-4 h-4 bg-gray-600 rounded"></div>
              <div class="w-4 h-4 bg-gray-600 rounded"></div>
              <div class="w-4 h-4 bg-gray-600 rounded"></div>
              <div class="w-4 h-4 bg-gray-600 rounded"></div>
            </div>
          </div>
        </li>
      `;
    } else {
      // Card for "Not Found"
      pokemonHTMLString = `
        <li class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gradient-to-b from-gray-700 to-gray-800 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-2 border-gray-600">
          <div class="p-4 bg-gray-700 mx-3 my-3 rounded-lg border-2 border-gray-600">
            <div class="bg-gray-600 p-2 rounded border-2 border-gray-500">
              <img
                class="w-40 h-40 mx-auto object-contain bg-gradient-to-b from-gray-500 to-gray-600 rounded p-1"
                src="pokeball.svg"
                alt="Not Found"
              />
            </div>
          </div>
          <div class="px-6 py-3 bg-gray-700 mx-3 mb-3 rounded-lg border-2 border-gray-600">
            <h2 class="text-xl font-bold text-gray-200 font-mono text-center">Pokémon Not Found</h2>
          </div>
        </li>
      `;
    }

    pokedex.innerHTML = pokemonHTMLString;
  };
});
