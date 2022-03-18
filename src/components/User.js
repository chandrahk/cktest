import { useSelector } from "react-redux";

export default function UserPreference() {
  const defaultLanguage = 0;
  const lang = useSelector((state) => state.languages);
  //onChange={(event) => setSelected(event.value)}
  return (
    <>
      <h2>User Preferences</h2>
      <h3> Select language of choice for voice rendering </h3>
      <Select
        defaultValue={lang[defaultLanguage]}
        options={lang}
        classNamePrefix="react-select"
        className="react-select--inline"
      />
    </>
  );
}
