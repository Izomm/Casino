import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { ReactComponent as TimesIcon } from "../static/svg/times.svg";

const Container = styled.div<{ onPopper?: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;

  ${({ onPopper }) =>
    onPopper &&
    `
    top: 0.5rem;
    right: 0.5rem;
  `}
`;

interface Props {
  onClose: () => void;
  onPopper?: boolean;
}

const Close = ({ onClose, onPopper = false }: Props) => {
  return (
    <Container onPopper={onPopper}>
      <IconButton
        size="small"
        onClick={onClose}
        aria-label="close"
        data-testid={onPopper ? "close-popper" : "close-dialog"}
        sx={{
          height: "2.5rem",
          width: "2.5rem",
          color: "text.secondary",
          padding: "0.75rem",
          "&:hover": {
            color: "text.primary",
            bgcolor: "rgba(255,255,255,0.08)",
          },
        }}
      >
        <TimesIcon />
      </IconButton>
    </Container>
  );
};

export default Close;
