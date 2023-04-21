import * as React from "react";
import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { handlerAPIPost, parseJwt } from "../../services/HandlerService";
type typeUser = {
  username: string;
  userID: string;
};
const AddAddressMUI = ({ check, getOpen, ...props }: any) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<typeUser>({
    username: "",
    userID: "",
  });
  const numberRef = React.useRef<TextFieldProps>(null);
  const addressRef = React.useRef<TextFieldProps>(null);
  const token: string | null = sessionStorage.getItem("token");
  const handleClose = () => {
    setOpen(false);
    getOpen(false);
  };
  const handleSubmit = () => {
    setOpen(false);
    getOpen(false);

    if (numberRef.current?.value === "" || addressRef.current?.value === "") {
      toast.error("Vui lòng điền đầy đủ thông tin", {
        pauseOnHover: false,
        delay: 0,
        autoClose: 1500,
      });
      setOpen(true);
      getOpen(true);
    } else {
      const result: any = handlerAPIPost(
        "https://stroreapp-be.herokuapp.com/api/auth/createAccountAddress",
        {
          userID: user.userID,
          username: user.username,
          phone: numberRef.current?.value,
          address: addressRef.current?.value,
        }
      );
      toast.success("Thêm thành công", {
        pauseOnHover: false,
        delay: 0,
        autoClose: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1300);
    }
  };
  React.useEffect(() => {
    setOpen(check);
  }, [check]);
  React.useEffect(() => {
    if (token !== null) {
      try {
        setUser(parseJwt(token));
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm địa chỉ mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="number"
            label="Số điện thoại"
            type="number"
            fullWidth
            variant="standard"
            className="appearance-none"
            autoComplete="off"
            required
            inputRef={numberRef}
          />
          <TextField
            required
            margin="dense"
            id="address"
            label="Địa chỉ"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="off"
            inputRef={addressRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit}>Thêm địa chỉ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAddressMUI;
