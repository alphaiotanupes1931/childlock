export const colors = {
  primary: "#3498db",
  primaryDark: "#2980b9",
  primaryLight: "#5dade2",
  secondary: "#34495e",
  secondaryLight: "#5d6d7e",
  success: "#27ae60",
  warning: "#f39c12",
  danger: "#e74c3c",
  info: "#17a2b8",
  light: "#ffffff",
  dark: "#2c3e50",
  muted: "#95a5a6",
  border: "#bdc3c7",
  background: "#f8f9fa",
  backgroundAlt: "#ecf0f1",
} as const;

export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryLight} 100%)`,
  success: `linear-gradient(135deg, ${colors.success} 0%, #229954 100%)`,
  hero: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 50%, ${colors.primaryDark} 100%)`,
} as const;
