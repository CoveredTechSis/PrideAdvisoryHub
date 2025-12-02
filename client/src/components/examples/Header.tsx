import Header from "../layout/Header";

export default function HeaderExample() {
  return <Header isDark={false} onToggleTheme={() => console.log("Toggle theme")} />;
}
