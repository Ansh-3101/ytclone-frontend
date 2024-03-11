// import styles from "@/styles/App.css";
// import styles from "@/styles/index.module.css";
// import "@/styles/app.css";
import HomeVideo from "@/components/HomeVideo";
import { useSelector } from "react-redux";

const Index = () => {
  const user = useSelector((state) => state.userAuth.user);
  const isOpen = useSelector((state) => state.sideBarToggle.isOpen);
  console.log("user", user);

  return (
    <>
      <HomeVideo />
    </>
  );
};

export default Index;
