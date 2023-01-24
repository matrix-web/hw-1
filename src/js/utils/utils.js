export const formatError = text => `
  <span style="color: red;">
    ${text}
  </span>
`;

export const changeClasses = (tabElementOne, tabElementTwo) => {
  if (tabElementOne.classList.contains("visible")) {
    tabElementOne.classList.remove("visible");
    tabElementOne.classList.add("hide");
  }
  tabElementTwo.classList.remove("hide");
  tabElementTwo.classList.add("visible");
}
