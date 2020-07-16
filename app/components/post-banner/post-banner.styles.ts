import { ViewStyle, TextStyle } from "react-native"
import { color, typography } from "../../theme"

export const postBannerStyles = {
  WRAPPER: {
    justifyContent: 'center',
  } as ViewStyle,
  TEXT: {
    fontFamily: typography.primary,
    fontSize: 14,
    color: color.primary
  } as TextStyle,
  FAB: {
    zIndex: 100,
    position: "absolute",
    right: 16,
    bottom: -25,
  },
}
