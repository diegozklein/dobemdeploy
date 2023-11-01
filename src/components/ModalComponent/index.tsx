import Modal from "react-modal";
import Image from "next/image";
import styles from "./styles.module.css";
import CloseIcon from "../../../public/svgs/close.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0rem",
    borderRadius: "0.5rem",
    width: "100%",
    maxWidth: "35rem",
  },
};

interface ModalComponentProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  label?: string;
}

Modal.setAppElement("#root");
export default function ModalComponent({
  isOpen,
  close,
  children,
  label = "",
}: ModalComponentProps) {
  return (
    <div className={styles.modalContainer}>
      <Modal
        isOpen={isOpen}
        onRequestClose={close}
        style={customStyles}
      >
        <div className={styles.header}>
          <h2>{label}</h2>
          <Image
            src={CloseIcon}
            width={32}
            height={32}
            alt='Close'
            onClick={close}
          />
        </div>
        {children}
      </Modal>
    </div>
  );
}
