const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?limit=15")
  .then((res) => res.json())
  .then(showSports);

function showSports(sports) {
  // looper og kalder showSport

  sports.forEach(showSport);
}

function showSport(sport) {
  console.log(sport);
  // fange template
  const template = document.querySelector(".sport_template").content;
  // lave en kopi
  const copy = template.cloneNode(true);
  // ændre indhold
  copy.querySelector("h3").textContent = sport.productdisplayname;

  copy.querySelector(".sport_img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${sport.id}.webp`;
  copy.querySelector(".sport_img").alt = sport.productdisplayname;

  copy.querySelector(".price").textContent = sport.price + " DKK";

  if (sport.discount === null) {
    copy.querySelector(".discount").textContent = "";
  } else {
    copy.querySelector(".discount").textContent = "-" + sport.discount + "%";
  }

  if (sport.soldout === 0) {
    // produktet er udsolgt
    copy.querySelector(".udsolgt").classList.add("udsolgt");
    // console.log("Soldout value:", sport.soldout);

    // copy.querySelector(".favourit").style.display = "none";

    // blur img når udsolgt
    const sportImg = copy.querySelector(".sport_img");
    sportImg.addEventListener("mouseenter", blurTil);
    sportImg.addEventListener("mouseleave", blurTil);
  } else {
    copy.querySelector(".udsolgt").style.display = "none";
  }

  copy.querySelector(".read_more").setAttribute("href", `product.html?id=${sport.id}`);

  // appende
  document.querySelector(".sport_container").appendChild(copy);
}

// blur img
function blurTil() {
  this.classList.toggle("blur");
}

//   "id": 1163,
//   "gender": "Men",
//   "category": "Apparel",
//   "subcategory": "Topwear",
//   "articletype": "Tshirts",
//   "season": "Summer",
//   "productionyear": 2011,
//   "usagetype": "Sports",
//   "productdisplayname": "Sahara Team India Fanwear Round Neck Jersey",
//   "price": 895,
//   "discount": null,
//   "brandname": "Nike",
//   "soldout": 0
// }
