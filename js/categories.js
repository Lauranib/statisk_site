const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then(showCategories);

function showCategories(cats) {
  cats.forEach(showCategory);
}

function showCategory(cat) {
  // Fanger vores template
  const template = document.querySelector("template").content;

  // Cloner
  const clone = template.cloneNode(true);

  // Ændre indhold
  clone.querySelector("a").textContent = cat.category;
  clone.querySelector("a").href = `productlist.html?category=${cat.category}`;

  // Appender
  document.querySelector(".kategoriliste").appendChild(clone);
}
