import React from "react";
import styled from "@emotion/styled";
import { Popover, Button, Link, Alert, AlertTitle } from "@mui/material";

const Container = styled.div`
  position: absolute;
  padding-bottom: 1rem;
  width: 100%;
  bottom: 0;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "about-popover" : undefined;

  return (
    <Container>
      <List>
        <Item>
          <Button
            aria-describedby={id}
            onClick={handleClick}
            sx={{
              padding: 0,
              textTransform: "initial",
              color: "#888",
              fontWeight: 400,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            About
          </Button>
        </Item>
      </List>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="info"
          sx={{
            padding: "1rem 1rem 2rem 1rem",
            maxWidth: "400px",
          }}
        >
          <AlertTitle>About</AlertTitle>
          <p>
            <b>Casino</b> is an app that helps you enjoy casino games.
          </p>
          <p>
            Built with React & Redux, available on{" "}
            <Link
              href="https://github.com/your-repo/casino"
              target="_blank"
              rel="noopener"
              sx={{ color: "primary.main" }}
            >
              GitHub
            </Link>
          </p>
        </Alert>
      </Popover>
    </Container>
  );
};

export default Footer;
