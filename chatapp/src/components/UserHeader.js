import "../styles/userHeader.css";

export function UserHeader(props) {
  const floatClass = props.classProp;

  return (
    <div className={`user-header ${floatClass}-header`}>
      {floatClass === "sent" ? (
        <>
          <p>{props.user.displayName}</p>
          <img src={props.user.photoURL} alt="User"></img>
        </>
      ) : (
        <>
          <img src={props.user.photoURL} alt="User"></img>
          <p>{props.user.displayName}</p>
        </>
      )}
    </div>
  );
}
