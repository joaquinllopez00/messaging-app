export const lengthChecker = (val, func) => {
  func("error");
  setTimeout(() => {
    func("");
  }, 3000);
  return;
};

export const addMessage = async (ref, val, store, loc, uid, photoURL, displayName) => {
  val.childNodes.forEach((el) => {
    el.contentEditable = false;
  });

  await ref.add({
    text: val.innerHTML,
    createdAt: store.FieldValue.serverTimestamp(),
    group: loc,
    uid,
    photoURL,
    displayName,
  });
};

const acceptableKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace"];
export const editHtml = ({ setTextOption, setOptions, textOption }, formData, parsedMess, option, e = "") => {
  // textOption !== "" ? setOptions(true) : setOptions(false);
  let data = formData.current;
  console.log(option);
  // let lastChild = data.childNodes[data.childNodes.length - 1];

  if (option !== "editing") {
    setTextOption(option);
    let currentHTML = data.innerHTML + ` <p contenteditable='true' tabindex='0' class=${`${option}`}>/</p>`;
    data.innerHTML = currentHTML;
    let elArr = document.querySelectorAll(`.${option}`);
    let targetEl = elArr[elArr.length - 1];
    // setTimeout(() => {
    //   targetEl.focus();
    // }, 0);
  } else {
    console.log(textOption);
    let elArr = document.querySelectorAll(`.${textOption}`);
    let targetEl = elArr[elArr.length - 1];
    console.log(elArr, "elArr");
    console.log(targetEl, "target El");
    targetEl.innerText = targetEl.innerText.replace("/", "");
  }
  cEMoveCursorToEnd(data);
  acceptableKeys.includes(e.code) && setTextOption("");
};

export const cEMoveCursorToEnd = (data) => {
  let range = document.createRange();
  let sel = window.getSelection();
  let el = data.childNodes[data.childNodes.length - 1];
  range.setStart(el, 1);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
};
