export function getclassificationImc(imc) {
  let classification;
  let colorClassification;
  let informativeMessage;

  if (imc < 18.5) {
    classification = "Magreza";
    colorClassification = "#e69a9a";
    informativeMessage =
      "De acordo com a Organização Mundial da Saúde, seu IMC é considerado magreza.";
  } else if (imc >= 18.5 && imc <= 24.9) {
    classification = "Normal";
    colorClassification = "#68C651";
    informativeMessage =
      "De acordo com a Organização Mundial da Saúde, seu IMC é considerado normal.";
  } else if (imc >= 25 && imc <= 29.9) {
    classification = "Sobrepeso";
    colorClassification = "#f9d423";
    informativeMessage =
      "De acordo com a Organização Mundial da Saúde, seu IMC indica sobrepeso.";
  } else if (imc >= 30 && imc <= 34.9) {
    classification = "Obesidade grau I";
    colorClassification = "#fa7d09";
    informativeMessage =
      "De acordo com a Organização Mundial da Saúde, seu IMC indica obesidade grau I.";
  } else if (imc >= 35 && imc <= 39.9) {
    classification = "Obesidade grau II";
    colorClassification = "#e12d39";
    informativeMessage =
      "De acordo com a Organização Mundial da Saúde, seu IMC indica obesidade grau II.";
  } else {
    classification = "Obesidade grau III";
    colorClassification = "#9b1d20";
    informativeMessage =
      "De acordo com a Organização Mundial da Saúde, seu IMC indica obesidade grau III.";
  }

  return { classification, colorClassification, informativeMessage };
}
