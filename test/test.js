const target = "coursecareers";
const delimiter = '|';
const spacing = "1";

function stringEditor () {
  let newString = '';
  for (let i = 0; i < Math.round(target.length/Number(spacing) + 1); i++) {
    newString += target.slice(i * Number(spacing),(i + 1) * Number(spacing));
    if (i + 1 !== Math.round(target.length/Number(spacing) + 1)) {
      console.log(i);
      newString += delimiter;
    }
  }
  console.log(newString);
}

stringEditor();
