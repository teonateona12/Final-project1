const ul = document.querySelector("#companies");
const list = document.createDocumentFragment();
const url =
  "https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json";
const companyData = [];

function fetchData() {
  fetch(url)
    .then((responce) => responce.json())
    .then((data) => {
      data.forEach((el) => {
        companyData.push(...data);
      });
    })
    .catch((err) => console.log(err));
}

window.onload = (e) => {
  fetchData();
};

function displayList(data) {
  ul.addEventListener("click", (e) => {
    let findCompany = data.find((el) => el.name == e.target.innerText);
    if (findCompany) {
      const numberBoxes = document.querySelector("#numberBoxes");
      const company = document.querySelector("#name");
      const contact = document.querySelector("#email");
      const name = document.createTextNode(findCompany.name);
      const email = document.createTextNode(findCompany.email);
      const boxes = document.createTextNode(findCompany.boxes);
      numberBoxes.innerHTML = "";
      company.innerHTML = "";
      contact.innerHTML = "";
      company.appendChild(name);
      contact.appendChild(email);
      numberBoxes.appendChild(boxes);
    }
    const getNum = findCompany.boxes
      .split(",")
      .map((el) => {
        return Number(el);
      })
      .reduce((acc, el) => acc + el);
    const countBoxes = Math.ceil(getNum / 10);
    document.getElementById("cargo").innerHTML = countBoxes;
  });
}

displayList(companyData);
