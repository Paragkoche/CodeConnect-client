import { ReactNode } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars-2";

import { Box, useTheme } from "@mui/material";

interface ScrollbarProps {
  className?: string;
  children?: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Scrollbar = ({ className, children, ...rest }: ScrollbarProps) => {
  const theme = useTheme();

  return (
    <Scrollbars
      autoHide
      universal
      renderThumbVertical={() => {
        return (
          <Box
            sx={{
              width: 5,
              background: `${theme.colors.alpha.black[10]}`,
              borderRadius: `${theme.general.borderRadiusLg}`,
              transition: `${theme.transitions.create(["background"])}`,

              "&:hover": {
                background: `${theme.colors.alpha.black[30]}`,
              },
            }}
          />
        );
      }}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Scrollbar;
