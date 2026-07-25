import { createTheme } from '@mui/material/styles';
import { Priority, PriorityValue } from "./types";
import { PRIO1, PRIO2, PRIO3, PRIMARY_MAIN as PRIMARY_MAIN_TYPE} from "./utils/colors";
import { grey } from "@mui/material/colors";
import { Theme } from '@mui/material';


export const TOAST_AUTO_HIDE_DURATION = 4000;
export const LOCAL_STORAGE_KEY = "knboard-data";

export const grid = 8;
export const borderRadius = 4;
export const imageSize = 40;
export const barHeight = 50;
export const sidebarWidth = 120;
export const taskHeaderTextareaWidth = 180;
export const taskWidth = 250;
export const taskSideWidth = 220;
export const taskDialogHeight = 800;
export const commentBoxWidth = 390;
export const commentBoxWidthMobile = 300;

export const PRIORITY_1: Priority = { value: "H", label: "High" };
export const PRIORITY_2: Priority = { value: "M", label: "Medium" };
export const PRIORITY_3: Priority = { value: "L", label: "Low" };

export const PRIORITY_OPTIONS: Priority[] = [
  PRIORITY_1,
  PRIORITY_2,
  PRIORITY_3,
];

export const PRIORITY_MAP = PRIORITY_OPTIONS.reduce((acc, curr) => {
  acc[curr.value] = curr;
  return acc;
}, {} as Record<PriorityValue, Priority>);

export const PRIO_COLORS = {
  H: PRIO1,
  M: PRIO2,
  L: PRIO3,
};

export const MD_EDITOR_PLUGINS = [
  "header",
  "fonts",
  "table",
  "link",
  "mode-toggle",
  "full-screen",
];

export const MD_EDITOR_CONFIG = {
  view: {
    menu: true,
    md: true,
    html: false,
  },
  canView: {
    menu: true,
    md: true,
    html: true,
    fullScreen: true,
    hideMenu: false,
  },
};

export const MD_EDITING_CONFIG = {
  view: {
    menu: false,
    md: true,
    html: false,
  },
  canView: {
    menu: false,
    md: true,
    html: false,
    fullScreen: false,
    hideMenu: false,
  },
};

export const MD_READ_ONLY_CONFIG = {
  view: {
    menu: false,
    md: false,
    html: true,
  },
  canView: {
    menu: false,
    md: false,
    html: true,
    fullScreen: false,
    hideMenu: false,
  },
};


const PRIMARY_MAIN = '#e94560';
const SECONDARY_MAIN = '#FDB915';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: PRIMARY_MAIN,
    },
    secondary: {
      light: grey[700],
      main: SECONDARY_MAIN,
    },
    background: {
      default: '#0a0a1a',
      paper: '#1a1a2e',
    },
  },
  typography: {
    fontFamily: '"Inter var", sans-serif',
  },
  // ════════════════════════════════════════════════════
  // COMPONENT CUSTOMIZATIONS
  // ════════════════════════════════════════════════════
  components: {
    // ============================================
    // MuiButton
    // ============================================
    MuiButton: {
      defaultProps: {
        disableRipple: true,        // Disable ripple effect
        disableElevation: true,     // Remove shadow on buttons
        variant: 'contained',       // Default variant
        size: 'medium',             // Default size
        color: 'primary',           // Default color
      },
      styleOverrides: {
        root: {
          '&:hover': {
            transition: 'none',
          },
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
       contained: {
      // Styles for all contained buttons
      '&.MuiButton-containedPrimary': {
        // Primary contained button styles
      },
      '&.MuiButton-containedSecondary': {
        // Secondary contained button styles
      },
    },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },

    // ============================================
    // MuiPaper
    // ============================================
    MuiPaper: {
      defaultProps: {
        elevation: 0,              // Default no shadow
        square: false,             // Rounded corners by default
        variant: 'elevation',      // Default variant
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: '#1a1a2e',
          padding: '16px',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(255,255,255,0.05)',
        },
        elevation1: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
        },
        elevation2: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        },
        elevation3: {
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        },
        elevation4: {
          boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
        },
        outlined: {
          border: '2px solid rgba(255,255,255,0.1)',
          background: 'transparent',
        },
      },
    },

    // ============================================
    // MuiCard
    // ============================================
    MuiCard: {
      defaultProps: {
        elevation: 0,              // No shadow by default
        square: false,             // Rounded corners
        variant: 'elevation',      // Default variant
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            borderColor: `rgba(233, 69, 96, 0.3)`,
          },
        },
      },
    },

    // ============================================
    // MuiCardActions
    // ============================================
    MuiCardActions: {
      defaultProps: {
        disableSpacing: false,    // Keep spacing
      },
      styleOverrides: {
        root: {
          padding: '16px',
          justifyContent: 'flex-end',
        },
      },
    },

    // ============================================
    // MuiCardContent
    // ============================================
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '20px',
          '&:last-child': {
            paddingBottom: 20,
          },
        },
      },
    },

    // ============================================
    // MuiCardHeader
    // ============================================
    MuiCardHeader: {
      defaultProps: {
     
      },
      styleOverrides: {
        root: {
          padding: '20px 20px 0 20px',
        },
      },
    },

    // ============================================
    // MuiButtonBase (all clickable elements)
    // ============================================
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },

    // ============================================
    // MuiDialog
    // ============================================
    MuiDialog: {
      defaultProps: {
        transitionDuration: 100,
      },
      styleOverrides: {
        paper: {
          borderRadius: 16,
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.05)',
        },
      },
    },
  },
});

export default theme;


export const modalPopperIndex = theme.zIndex.modal + 100;
export const modalPopperAutocompleteIndex = modalPopperIndex + 100;
export const modalPopperAutocompleteModalIndex =
  modalPopperAutocompleteIndex + 100;
export const modalPopperWidth = 300;

export enum Key {
  Enter = 13,
  Escape = 27,
}



