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
