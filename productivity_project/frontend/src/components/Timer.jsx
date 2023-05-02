export const Timer = ({ seconds, minutes, hours }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <span>{String(hours).padStart(2, "0")}</span>:
        <span>{String(minutes).padStart(2, "0")}</span>:
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
    </div>
  );
};
