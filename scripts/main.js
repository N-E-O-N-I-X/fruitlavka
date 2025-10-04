import { loadPreview } from "./preview.js";
import { customCartMessage } from "./cart.js";
import { search } from "./search.js";

async function initialize() {
  
loadPreview();

await customCartMessage();
await search();
}

initialize()