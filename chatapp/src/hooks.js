export const lengthChecker = (val, func) => {
  func("error");
  setTimeout(() => {
    func("");
  }, 3000);
  return;
};

export const addMessage = async (ref, val, store, loc, uid, photoURL, displayName) => {
  await ref.add({
    text: val,
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
  console.log(textOption);
  let lastChild = data.childNodes[data.childNodes.length - 1];
  setTextOption(option);

  if (lastChild.nodeName !== "P") {
    // setLastTextEl(parsedMess.length - 1);
    let currentHTML =
      data.innerHTML +
      ` <p contenteditable='true' tabindex='0' class=${textOption !== "" ? `${textOption}` : `${option}`}>/</p>`;
    data.innerHTML = currentHTML;
    let elArr = document.querySelectorAll(`${textOption !== "" ? `.${textOption}` : `.${option}`}`);
    let targetEl = elArr[elArr.length - 1];
    setTimeout(() => {
      targetEl.focus();
    }, 0);
  } else {
    let elArr = document.querySelectorAll(`${textOption !== "" ? `.${textOption}` : `.${option}`}`);
    let targetEl = elArr[elArr.length - 1];
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
