const form = document.getElementById("generate-form");
const promptInput = document.getElementById("prompt");
const imageGrid = document.getElementById("image-grid");
const statusText = document.getElementById("status");
const button = document.getElementById("generate-btn");


const API_KEY = "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";
";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const prompt = promptInput.value.trim();
  if (prompt.length < 5) {
    statusText.textContent = "Please enter a more detailed description.";
    return;
  }

  button.disabled = true;
  statusText.textContent = "Generating image...";
  statusText.classList.add("loading");

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        input: prompt,
        size: "1024x1024"
      })
    });

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const data = await response.json();
    displayImage(data.data[0].url);

    statusText.textContent = "Image generated successfully!";
  } catch (error) {
    console.error(error);
    statusText.textContent = "Something went wrong. Try again.";
  } finally {
    button.disabled = false;
    statusText.classList.remove("loading");
  }
});

function displayImage(url) {
  const card = document.createElement("div");
  card.className = "image-card";

  card.innerHTML = `
    <img src="${url}" alt="AI generated image">
    <a href="${url}" download target="_blank">⬇ Download</a>
  `;

  imageGrid.prepend(card);
}

