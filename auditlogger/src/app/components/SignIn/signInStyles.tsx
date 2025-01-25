import { styled } from "@mui/system";
import Image from "next/image";
import { Box, Button, Checkbox, MenuItem, TextField } from "@mui/material";



export const ProcoreLogo = styled(Image)`
  width: 20px; 
  height: 20px;
  
`;

export const ProcoreButton = styled("div")`
  margin-top: 20px;
  flex-direction: coloumn;
  background-color: var(--global-color-primary);
  cursor: pointer;
  border: 1px solid #BF4F74;
  border-radius: 4px;
  border-color: #101F4B;
  padding: 10px 20px;
  display: flex;
`;
export const TextContainer = styled("div")`
  flex: 1 ; 
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  color : var(--global-color-background) ;
  font-family: var(--global-font-family);
  font-style: normal;
  font-weight: 400;
  font-size: "16px";
`;



export const SectionShowcase = styled("section")({
  position: "absolute",
  right: "0",
  width: "100%",
  minHeight: "100vh",
  padding: "100px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: "2",

  // border: "2px solid blue",
});

export const HeaderContainer = styled("header")({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  zIndex: "1000",
  paddingTop: "23px",
  paddingLeft: "30px",
});

// export const HeaderImageLogo = styled(Image)({
//     maxWidth:"248px",
//     maxHeight:"51px"
// });
export const HeaderImageLogo = styled(Image)({
  cursor:"pointer",
  maxWidth:"248px",
  maxHeight:"51px"
});
export const IllustrationBackground = styled(Image)({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  //   opacity: "0.8",
});

export const Overlay = styled("div")({
  //   position: "absolute",
  //   top: "0",
  //   left: "0",
  //   width: "100%",
  //     height: "100%",
  //   mixBlendMode: "overlay",
});

export const FormDiv = styled("div")({
  position: "absolute",
  right: "0",
  height: "100%",
  zIndex: "10",
  background: " var(--global-color-background)",
//   border: "2px solid blue",

  // border: "2px solid blue",
//   boxShadow:"rgba(0, 0, 0, 0.25)"
filter:"drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.25))"
});

export const FormContainerSign = styled("div")({
  width: "460px",
  borderRadius: "4px",

  paddingLeft: "60px",
  paddingRight: "60px",
  paddingTop: "68px",
});

export const SignInHeader = styled("div")({
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "22px",
  color: "#36415D",
});

export const FormText = styled("div")({
  marginTop: "21px",
});

// export const StyledTextField = styled(TextField)({
//   width: "340px",
//   height: "40px",

//   borderRadius: "4px",
//   fontFamily: " var(--global-font-family)",
//   fontStyle: "normal",
//   fontWeight: 400,
//   fontSize: 14,
//   color: "#101F4B",
//   "& .MuiOutlinedInput-notchedOutline": {
//     border: "1px solid #36415d",
//   },

//   "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
//     height: "40px",
//     "& fieldset": { border: "1px solid #36415d" },
//   },
//   "&:focus-within fieldset": {
//     border: "1px solid #F1742E !important",
//   },
//   ".css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
//     // background: 'red',
//     height: "7px",
//   },
// });
export const StyledTextField = styled(TextField)({
  width: "340px",
  height: "40px",
  borderRadius: "4px",
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#101F4B",

  "& .MuiInputBase-root.MuiOutlinedInput-root": {
    height: "40px",
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #36415d",
  },

  "&:focus-within .MuiOutlinedInput-notchedOutline": {
    border: "1px solid var(--global-color-primary) !important",
  },

  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    height: "7px",
  },
});

export const StyledPasswordField = styled(TextField)({
  marginTop: "40px",
  width: "340px",
  height: "40px",

  borderRadius: "4px",
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#101F4B",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #36415d",
  },

  "& .css-2ehmn7-MuiInputBase-root-MuiOutlinedInput-root": {
    height: "40px",
    "& fieldset": { border: "1px solid #36415d" },
  },
  "&:focus-within fieldset": {
    border: "1px solid var(--global-color-primary) !important",
  },
  ".css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
    // background: 'red',
    height: "7px",
  },
  //   ".css-152mnda-MuiInputBase-input-MuiOutlinedInput-input": {
  //     padding: "8.5px 14px !important",
  //   },
});

export const ShowHideDiv = styled("div")({
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  color: "var(--global-text-secondary)",
  cursor: "pointer",
});

export const ExtraTickDiv = styled("div")({
  marginTop: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ParentTickDiv = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const CheckTickDiv = styled("div")({});

export const CheckTickBox = styled(Checkbox)({
  "& .MuiIconButton-root": {
    padding: 0,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1.5rem",
  },
});

export const RememberDiv = styled("div")({
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "#36415D",
  marginLeft: "10px",
  marginTop:"2px"
  
});

export const ForgotDiv = styled("div")({
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "var(--global-color-primary)",
  marginLeft: "3px",
  cursor:"pointer"
});

export const CustomSignInButton = styled(Button)({
  width: "340px",
  height: "40px",
  textTransform: "none",

  //   background: "#F1742E",
  //   border: "1px",
});

export const SignInContainedButton = styled(CustomSignInButton)({
  backgroundColor: "var(--global-color-primary) !important",
  color: "#ffffff",
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "16px",
  // lineHeight: "16px",
  "&:hover": {
    backgroundColor: "var(--global-color-primary)",
    color: "#ffffff",
  },
});

export const ButtonSection = styled("div")({
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",

  // margin:"auto"
});

export const NewUserDiv = styled("div")({
  // marginTop: "160px",
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "#36415D",
  display: "flex",
  justifyContent: "center",
  position: "absolute",
    bottom: "8%",
    right: "50%",
    transform: "translateX(50%)"
});

export const NewUserSpan = styled("span")({
  fontFamily: " var(--global-font-family)",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "var(--global-color-primary)",
  cursor: "pointer",
  paddingLeft:"4px"
});
