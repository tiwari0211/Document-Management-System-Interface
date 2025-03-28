import MessageScreen from "../../components/MessageScreen";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
function Home() {
  return (
    <MessageScreen
      icon={
        <HourglassTopOutlinedIcon
          fontSize="large"
          sx={{ "& .MuiSvgIcon-root": { width: "60px !important" } }}
        />
      }
      heading={"Coming Soon."}
      message={" "}
    />
  );
}

export default Home;
